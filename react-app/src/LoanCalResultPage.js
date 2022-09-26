import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './index.css';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

var pmt = require('formula-pmt');

const EIR_APR = 8 / 100; //percentage
const INSTALMENT_TENOR_YEARS = 10; //number

const kwP_TO_MONTHLY_kwH_RATIO = 111.630036630037; //number

const SST = 6; //percentage
const KWTBB = 1.60; //percentage



class About extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      values: {
        income: props.location.info.data.income,
        age: props.location.info.data.age,
        martial_status: props.location.info.data.martial_status,
        ctos: props.location.info.data.ctos,
        size: props.location.info.data.size,
        cost: props.location.info.data.cost,
        downpayment: props.location.info.data.downpayment,
        customername: '',
        customernumber: '',
        customeraddress: ''
      },
      ui: {
        estimated_monthly_tnb_bill_savings_rm: '',
        estimated_monthly_instalment_rm: '',
        estimated_monthly_cash_flow_savings_rm: ''
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleDropDown = this.handleDropDown.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClearAll = this.handleClearAll.bind(this);
    this.getResidentialTariffTier = this.getResidentialTariffTier.bind(this);
    this.getResidentialTariffTierCustom = this.getResidentialTariffTierCustom.bind(this);
    this.calculate = this.calculate.bind(this);
  }

  componentDidMount() {
    let userSystemInputData = { 'systemSize': this.state.values.size, 'totalCost': this.state.values.cost, 'upfrontPayment': this.state.values.downpayment };
    this.calculate(userSystemInputData);
  }

  getResidentialTariffTier(tariff_amount) {
    let result = { residential_tariff_amount: null, rm_kwh: null, cumulative: null };
    tariff_amount = Number(tariff_amount);

    if (0 < tariff_amount && tariff_amount < 200) {
      result.residential_tariff_amount = 200;
      result.rm_kwh = 0.218;
      result.cumulative = 43.6;

    } else if (200 <= tariff_amount && tariff_amount < 300) {
      result.residential_tariff_amount = 300;
      result.rm_kwh = 0.334;
      result.cumulative = 77;

    } else if (300 <= tariff_amount && tariff_amount < 600) {
      result.residential_tariff_amount = 600;
      result.rm_kwh = 0.516;
      result.cumulative = 231.8;

    } else if (600 <= tariff_amount && tariff_amount < 900) {
      result.residential_tariff_amount = 900;
      result.rm_kwh = 0.546;
      result.cumulative = 395.6;

    } else if (900 <= tariff_amount && tariff_amount < 1000000) {
      result.residential_tariff_amount = 1000000;
      result.rm_kwh = 0.571;
      result.cumulative = 10000000;

    } else {
      result.rm_kwh = 0;
      result.cumulative = 0;
    }

    return result;
  }

  //Following Ben's cal sheet where indexing requires -1
  getResidentialTariffTierCustom(tariff_amount) {
    let result = { residential_tariff_amount: null, rm_kwh: null, cumulative: null };
    tariff_amount = Number(tariff_amount);

    if (0 < tariff_amount && tariff_amount < 200) {
      result.residential_tariff_amount = 0;
      result.rm_kwh = 0;
      result.cumulative = 0;

    } else if (200 <= tariff_amount && tariff_amount < 300) {
      result.residential_tariff_amount = 200;
      result.rm_kwh = 0.218;
      result.cumulative = 43.6;

    } else if (300 <= tariff_amount && tariff_amount < 600) {
      result.residential_tariff_amount = 300;
      result.rm_kwh = 0.334;
      result.cumulative = 77;

    } else if (600 <= tariff_amount && tariff_amount < 900) {
      result.residential_tariff_amount = 600;
      result.rm_kwh = 0.516;
      result.cumulative = 231.8;

    } else if (900 <= tariff_amount && tariff_amount < 1000000) {
      result.residential_tariff_amount = 900;
      result.rm_kwh = 0.546;
      result.cumulative = 395.6;

    } else {
      result.rm_kwh = 0;
      result.cumulative = 0;
    }

    return result;
  }

  calculate(userSystemInputData) {
    // let financing_ratio = (userSystemInputData['totalCost'] - userSystemInputData['upfrontPayment']) / userSystemInputData['totalCost'];

    //calculate field B : Monthly Instalment (RM) ROUND(-PMT(C10/12,K4*12,J4),0) 
    //Payment = pv* apr/12*(1+apr/12)^(nper*12)/((1+apr/12)^(nper*12)-1)
    let financed_amount_pv = userSystemInputData['totalCost'] - userSystemInputData['upfrontPayment'];
    // console.log('financed_amount_pv: ' + financed_amount_pv);
    // console.log(Math.pow(2, 3));

    let monthly_instalment_rm = Math.ceil(-1 * pmt(EIR_APR / 12, INSTALMENT_TENOR_YEARS * 12, financed_amount_pv));

    //let monthly_instalment_rm = Math.pow(financed_amount_pv * EIR_APR / 12 * ( 1 + EIR_APR / 12 ), (INSTALMENT_TENOR_YEARS * 12)/( Math.pow((1 + EIR_APR / 12) ^ (INSTALMENT_TENOR_YEARS * 12)) - 1));

    //calculate field A 
    let monthly_kwh = userSystemInputData['systemSize'] * kwP_TO_MONTHLY_kwH_RATIO;
    let tariff_tier_data = this.getResidentialTariffTier(monthly_kwh);
    let tariff_tier_data_custome = this.getResidentialTariffTierCustom(monthly_kwh);
    let tnb_bill_savings_rm = (tariff_tier_data_custome.cumulative + (monthly_kwh - tariff_tier_data_custome.residential_tariff_amount) * tariff_tier_data.rm_kwh) * ((100 + (SST + KWTBB)) * 0.01) - (231.8 * SST * 0.01);

    // console.log('tariff_tier_data.cumulative ' + tariff_tier_data.cumulative) //1000000
    // console.log('monthly_kwh - tariff_tier_data.residential_tariff_amount ' + (monthly_kwh - tariff_tier_data.residential_tariff_amount)) //-998682.7655677656
    // console.log("'tariff_tier_data.rm_kwh' " + tariff_tier_data.rm_kwh) //0.571
    // console.log('"------------"')
    // console.log("'1 + (SST + KWTBB)' ")
    // console.log (100+ (SST + KWTBB)) //107.6
    // console.log("'231.8 * SST * 0.01' ")
    // console.log(231.8 * SST * 0.01) //13.908000000000001
    // console.log('"------------"')
    // console.log((tariff_tier_data.cumulative + (monthly_kwh - tariff_tier_data.residential_tariff_amount) * tariff_tier_data.rm_kwh ))
    // console.log((tariff_tier_data.cumulative + (monthly_kwh - tariff_tier_data.residential_tariff_amount) * tariff_tier_data.rm_kwh )* ((100 + (SST + KWTBB)) * 0.01))
    // console.log(tnb_bill_savings_rm)

    //calculate field C
    let net_monthly_cash_flow_rm = (monthly_instalment_rm - tnb_bill_savings_rm) * -1;

    this.setState({
      ui: {
        estimated_monthly_tnb_bill_savings_rm: tnb_bill_savings_rm.toFixed(2),
        estimated_monthly_instalment_rm: monthly_instalment_rm.toFixed(2),
        estimated_monthly_cash_flow_savings_rm: net_monthly_cash_flow_rm.toFixed(2)
      }
    });
  }

  handleChange(event) {
    this.setState(prevState => ({
      values: {
        ...prevState.values,
        [event.target.name]: event.target.value
      }
    }));
  }


  handleDropDown(event) {
    this.setState(prevState => ({
      values: {
        ...prevState.values,
        [event.target.name]: event.target.value
      }
    }));
  }

  handleSubmit(event) {
    event.preventDefault();

    const userObject = {
      income: this.state.values.income,
      age: this.state.values.age,
      martial_status: this.state.values.martial_status,
      ctos: this.state.values.ctos,
      size: this.state.values.size,
      cost: this.state.values.cost,
      downpayment: this.state.values.downpayment,
      estimated_monthly_tnb_bill_savings_rm: this.state.ui.estimated_monthly_tnb_bill_savings_rm,
      estimated_monthly_instalment_rm: this.state.ui.estimated_monthly_instalment_rm,
      estimated_monthly_cash_flow_savings_rm: this.state.ui.estimated_monthly_cash_flow_savings_rm,
      customername: this.state.values.customername,
      customernumber: this.state.values.customernumber,
      customeraddress: this.state.values.customeraddress
    };

    axios.post('http://localhost:4000/userform/submit', userObject).then((res) => {
      if (res.data === 'success') {
        window.location.href = '/';
      }

    }).catch((error) => {
      toast.warning('Message to Okapi Failed. Please try sending again: ' + error);
    });;
  }


  handleClearAll(event) {
    event.preventDefault();
  }


  render() {
    return <Container>
      <Row>
        <ToastContainer />
        <Col>
          <h2 className="title">OKAPI</h2>
        </Col>
      </Row>

      <Row>
        <form>
          <Row xs={2} md={4} lg={10}>
            <label>
              <p className="fw-bold"> Estimated Monthly TNB Bill Savings (RM): </p>
              <input disabled={true} type="text" onChange={this.handleChange} name="estimated_monthly_tnb_bill_savings_rm" value={this.state.ui.estimated_monthly_tnb_bill_savings_rm} />
            </label>
          </Row>
          <Row xs={2} md={4} lg={10}>
            <label>
              <p className="fw-bold"> Estimated Monthly Instalment (RM): </p>
              <input disabled={true} type="text" onChange={this.handleChange} name="estimated_monthly_instalment_rm" value={this.state.ui.estimated_monthly_instalment_rm} />
            </label>
          </Row>
          <Row xs={2} md={4} lg={10}>
            <label>
              <p className="fw-bold"> Estimated Monthly Cash Flow Savings (RM): </p>
              <input disabled={true} type="text" onChange={this.handleChange} name="estimated_monthly_cash_flow_savings_rm" value={this.state.ui.estimated_monthly_cash_flow_savings_rm} />
            </label>
          </Row>
          <Row xs={2} md={4} lg={10}>
            <label>
              <p className="fw-bold"> Customer Name: </p>
              <input type="text" onChange={this.handleChange} name="customername" />
            </label>
          </Row>
          <Row xs={2} md={4} lg={10}>
            <label>
              <p className="fw-bold"> Contact Number: </p>
              <input type="text" onChange={this.handleChange} name="customernumber" />
            </label>
          </Row>
          <Row xs={2} md={4} lg={10}>
            <label>
              <p className="fw-bold"> Address: </p>
              <input type="text" onChange={this.handleChange} name="customeraddress" />
            </label>
          </Row>
          <br />

          <Row xs={2} md={4} lg={5}>
            <Button variant="success" size="sm" onClick={this.handleSubmit}>Send To Okapi</Button>{' '}
          </Row>
        </form>
      </Row>
    </Container>
  }
}

export default About;