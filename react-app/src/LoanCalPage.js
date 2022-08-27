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
              Borrower/Homeowner Income (RM):
              <br />
              <input type="text" onChange={this.handleChange} name="income" value={this.state.values.income} />
            </label>
          </Row>
          <Row xs={2} md={4} lg={10}>
            <label>
              Borrower/Homeowner Age:
              <br />
              <select name="age" value={this.state.values.age} onChange={this.handleDropDown}>
                <option value="20"> {'<20'} </option>
                <option value="30">21-30</option>
                <option value="40">31-40</option>
                <option value="50">41-50</option>
                <option value="60">51-60</option>
                <option value="70">61-70</option>
                <option value="80">71-80</option>
                <option value="90">81-90</option>
                <option value="100">91-100</option>
              </select>
              {/* <input type="text" onChange={this.handleChange} name="age" value={this.state.values.age} /> */}
            </label>
          </Row>
          <Row xs={2} md={4} lg={10}>
            <label>
              Borrower Marital Status:
              <br />
              <select name="martial_status" value={this.state.values.martial_status} onChange={this.handleDropDown}>
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="divorced">Divorced</option>
              </select>
              {/* <input type="text" onChange={this.handleChange} name="martial_status" value={this.state.values.martial_status} /> */}
            </label>
          </Row>
          <Row xs={2} md={4} lg={10}>
            <label>
              Borrower CTOS Score(if known):
              <input type="text" onChange={this.handleChange} name="ctos" value={this.state.values.ctos} />
            </label>
          </Row>
          <Row xs={2} md={4} lg={10}>
            <label>
              System Size (kwp):
              <br />
              <select name="size" value={this.state.values.size} onChange={this.handleDropDown}>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
              {/* <input type="text" onChange={this.handleChange} name="size" value={this.state.values.size} /> */}
            </label>
          </Row>
          <Row xs={2} md={4} lg={10}>
            <label>
              System Cost (RM): { }
              <br />
              <select name="cost" value={this.state.values.cost} onChange={this.handleDropDown}>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
              {/* <input type="text" onChange={this.handleChange} name="cost" value={this.state.values.cost} /> */}
            </label>
          </Row>
          <Row xs={2} md={4} lg={10}>
            <label>
              Downpayment (RM):
              <br />
              <input type="text" onChange={this.handleChange} name="downpayment" value={this.state.values.downpayment} />
            </label>
          </Row>

          <br />

          <Row xs={2} md={4} lg={5}>
            <Button variant="info" size="sm" onClick={this.handleCalculate}>Calculate</Button>{' '}
            <Button variant="danger" size="sm" onClick={this.handleClearAll}>Clear All</Button>{' '}


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