import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './index.css';
import Button from 'react-bootstrap/Button';


class About extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {value: ''};

    this.state = {
      values: {
        income: '',
        age: '',
        martial_status: '',
        ctos: '',
        size: '',
        cost: '',
        downpayment: ''
      }
    };


    this.handleChange = this.handleChange.bind(this);
    this.handleDropDown = this.handleDropDown.bind(this);
    this.handleCalculate = this.handleCalculate.bind(this);
    this.handleClearAll = this.handleClearAll.bind(this);
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
              <input type="text" onChange={this.handleChange} name="income" value={this.state.values.income} />
            </label>
          </Row>
          <Row xs={2} md={4} lg={10}>
            <label>
              Estimated Monthly Instalment (RM):
              <br />
              <input type="text" onChange={this.handleChange} name="age" value={this.state.values.age} />
            </label>
          </Row>
          <Row xs={2} md={4} lg={10}>
            <label>
              Estimated Monthly Cash Flow Savings (RM):
              <br />
              <input type="text" onChange={this.handleChange} name="martial_status" value={this.state.values.martial_status} />
            </label>
          </Row>
          <Row xs={2} md={4} lg={10}>
            <label>
              Customer Name:
              <input type="text" onChange={this.handleChange} name="ctos" value={this.state.values.ctos} />
            </label>
          </Row>
          <Row xs={2} md={4} lg={10}>
            <label>
              Contact Number:
              <br />
              {/* <input type="text" onChange={this.handleChange} name="size" value={this.state.values.size} /> */}
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

            {/* <Col>
              <input className="calculateButtonStyle" type="calculate" defaultValue="Calculate" />

            </Col>
            <Col>
              <input className="clearAllButtonStyle" type="clear" defaultValue="Clear All" />

            </Col> */}
          </Row>
        </form>
      </Row>
    </Container>
  }
}

export default About;