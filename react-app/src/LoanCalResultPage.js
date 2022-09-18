import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './index.css';
import Button from 'react-bootstrap/Button';

const EIR_APR = 8 / 100; //percentage
const INSTALMENT_TENOR_YEARS = 10; //number

const kwP_TO_MONTHLY_kwH_RATIO = 111.630036630037; //number

const SST = 6 / 100; //percentage
const KWTBB = 1.60 / 100; //percentage

class About extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      values: {
        income: '',
        age: '',
        martial_status: '',
        ctos: '',
        size: props.location.info.data.size,
        cost: props.location.info.data.cost,
        downpayment: props.location.info.data.downpayment
      },
      ui :{
        estimated_monthly_tnb_bill_savings_rm: '',
        estimated_monthly_instalment_rm: '',
        estimated_monthly_cash_flow_savings_rm: ''
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleDropDown = this.handleDropDown.bind(this);
    this.handleCalculate = this.handleCalculate.bind(this);
    this.handleClearAll = this.handleClearAll.bind(this);
    this.getResidentialTariffTier = this.getResidentialTariffTier.bind(this);
    this.calculate = this.calculate.bind(this);
  }

  componentDidMount() {
    let userSystemInputData = {'systemSize':this.state.values.size, 'totalCost':this.state.values.cost, 'upfrontPayment': this.state.values.downpayment};
    this.calculate(userSystemInputData);
  }

  getResidentialTariffTier(tariff_amount){
    let result = {residential_tariff_amount: null, rm_kwh: null, cumulative: null};

    if(0 < tariff_amount < 200) {
        result.residential_tariff_amount = 200;
        result.rm_kwh = 0.218;
        result.cumulative = 43.6;

    } else if (200 <= tariff_amount < 300) {
        result.residential_tariff_amount = 300;
        result.rm_kwh = 0.334;
        result.cumulative = 77;

    } else if (300 <= tariff_amount < 600) {
        result.residential_tariff_amount = 600;
        result.rm_kwh = 0.516;
        result.cumulative = 231.8;
        
    } else if (600 <= tariff_amount < 900) {
        result.residential_tariff_amount = 900;
        result.rm_kwh = 0.546;
        result.cumulative = 395.6;
        
    } else if (900 <= tariff_amount < 1000000) {
        result.residential_tariff_amount = 1000000;
        result.rm_kwh = 0.571;
        result.cumulative = 10000000;
        
    } else {
        result.rm_kwh = 0;
        result.cumulative = 0;
    }

    return result;
  }

  calculate(userSystemInputData){
    // let financing_ratio = (userSystemInputData['totalCost'] - userSystemInputData['upfrontPayment']) / userSystemInputData['totalCost'];

    //calculate field B : Monthly Instalment (RM) ROUND(-PMT(C10/12,K4*12,J4),0) 
    //Payment = pv* apr/12*(1+apr/12)^(nper*12)/((1+apr/12)^(nper*12)-1)
    let financed_amount_pv = userSystemInputData['totalCost'] - userSystemInputData['upfrontPayment']; 
    
    let monthly_instalment_rm = financed_amount_pv * EIR_APR / 12 * ( 1 + EIR_APR / 12 ) ^ (INSTALMENT_TENOR_YEARS * 12)/((1 + EIR_APR / 12) ^ (INSTALMENT_TENOR_YEARS * 12) - 1);

    //calculate field A 
    let monthly_kwh = userSystemInputData['systemSize'] * kwP_TO_MONTHLY_kwH_RATIO;
    let tariff_tier_data = this.getResidentialTariffTier(monthly_kwh);
    let tnb_bill_savings_rm = (tariff_tier_data.cumulative + (monthly_kwh - tariff_tier_data.residential_tariff_amount)) * tariff_tier_data.rm_kwh * (1 + (SST + KWTBB)) - (231.8 * SST);

    //calculate field C
    let net_monthly_cash_flow_rm = monthly_instalment_rm - tnb_bill_savings_rm;

    this.setState({
      ui: {
        estimated_monthly_tnb_bill_savings_rm: tnb_bill_savings_rm,
        estimated_monthly_instalment_rm: monthly_instalment_rm,
        estimated_monthly_cash_flow_savings_rm: net_monthly_cash_flow_rm
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

  handleCalculate(event) {
    event.preventDefault();
  }


  handleClearAll(event) {
    event.preventDefault();
  }


  render() {
    return <Container>

      <Row>
        <Col>
          <h2 className="title">OKAPI</h2>
        </Col>
      </Row>

      <Row>
        <form onSubmit={this.handleCalculate}>
          <Row xs={2} md={4} lg={10}>
            <label>
              Estimated Monthly TNB Bill Savings (RM):
              <br />
              <input disabled={true} type="text" onChange={this.handleChange} name="estimated_monthly_tnb_bill_savings_rm" value={this.state.ui.estimated_monthly_tnb_bill_savings_rm} />
            </label>
          </Row>
          <Row xs={2} md={4} lg={10}>
            <label>
              Estimated Monthly Instalment (RM):
              <br />
              <input disabled={true} type="text" onChange={this.handleChange} name="estimated_monthly_instalment_rm" value={this.state.ui.estimated_monthly_instalment_rm} />
            </label>
          </Row>
          <Row xs={2} md={4} lg={10}>
            <label>
              Estimated Monthly Cash Flow Savings (RM):
              <br />
              <input disabled={true} type="text" onChange={this.handleChange} name="estimated_monthly_cash_flow_savings_rm" value={this.state.ui.estimated_monthly_cash_flow_savings_rm} />
            </label>
          </Row>
          <Row xs={2} md={4} lg={10}>
            <label>
              Customer Name:
              <br />
              <input type="text" onChange={this.handleChange} name="ctos" value={this.state.values.ctos} />
            </label>
          </Row>
          <Row xs={2} md={4} lg={10}>
            <label>
              Contact Number:
              <br />
              <input type="text" onChange={this.handleChange} name="size" value={this.state.values.size} />
            </label>
          </Row>
          <Row xs={2} md={4} lg={10}>
            <label>
              Address:
              <br />
              <input type="text" onChange={this.handleChange} name="cost" value={this.state.values.cost} />
            </label>
          </Row>
          <br />

          <Row xs={2} md={4} lg={5}>
            <Button variant="success" size="sm" onClick={this.handleCalculate}>Send To Okapi</Button>{' '}
          </Row>
        </form>
      </Row>
    </Container>
  }
}

export default About;