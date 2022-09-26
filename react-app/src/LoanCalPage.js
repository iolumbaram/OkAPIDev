import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './index.css';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class About extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      values: {
        income: '',
        age: '20 and below',
        martial_status: 'Single',
        ctos: '',
        size: 0,
        cost: 0,
        downpayment: 0
      },
      ui: {
        isInputFieldsValid: false,
        isNumber: true
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleDropDown = this.handleDropDown.bind(this);
    this.handleCalculate = this.handleCalculate.bind(this);
    this.handleClearAll = this.handleClearAll.bind(this);
    this.handleValidate = this.handleValidate.bind(this);
  }

  handleValidate(event) {
    event.preventDefault();

    let isInputFieldsValid = this.state.ui.isInputFieldsValid;

    const userObject = {
      income: this.state.values.income,
      age: this.state.values.age,
      martial_status: this.state.values.martial_status,
      ctos: this.state.values.ctos,
      size: this.state.values.size,
      cost: this.state.values.cost,
      downpayment: this.state.values.downpayment,
    };

    isInputFieldsValid = Object.values(userObject).every(value => {
      if (value === null) {
        return false;
      } else if (value === '') {
        return false;
      }
      return true;
    });

    this.setState({
      ui: {
        isInputFieldsValid: isInputFieldsValid,
      }
    });

    if (!isInputFieldsValid) {
      toast.warning('Please fill up the form: ' + this.state.ui.isNumber);
    }
  }

  handleChange(event) {
    this.setState(prevState => ({
      values: {
        ...prevState.values,
        [event.target.name]: event.target.value
      }
    }));

    if(event.target.id == 'income' && !isNaN(event.target.value)){
      this.setState({
        ui: {
          isNumber: true,
        }
      });
    }

    
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
    const isInputFieldsValid = this.state.ui.isInputFieldsValid;
    // const isNumber = this.state.ui.isNumber; // set false as initial value


    return <Container>
      <Row>
        <Col>
          <h2 className="title">OKAPI</h2>
        </Col>
      </Row>

      <Row>
        <ToastContainer />
        <form>
          <Row xs={2} md={4} lg={10}>
            <label>
              <p className="fw-bold"> Borrower/Homeowner Income (RM): </p>
              <input id='income' 
              // style={{color: isNumber ? '' : 'red'}} 
              
              type="text" onChange={this.handleChange} name="income" value={this.state.values.income} />
            </label>
          </Row>
          <Row xs={2} md={4} lg={10}>
            <label>
              <p className="fw-bold"> Borrower/Homeowner Age: </p>
              <select name="age" value={this.state.values.age} onChange={this.handleDropDown}>
                <option value="20"> {'20 and below'} </option>
                <option value="30">21 to 30</option>
                <option value="40">31 to 40</option>
                <option value="50">41 to 50</option>
                <option value="60">51 to 60</option>
                <option value="70">61 to 70</option>
                <option value="80">71 to 80</option>
                <option value="90">81 to 90</option>
                <option value="100">91 to 100</option>
              </select>
              {/* <input type="text" onChange={this.handleChange} name="age" value={this.state.values.age} /> */}
            </label>
          </Row>
          <Row xs={2} md={4} lg={10}>
            <label>
              <p className="fw-bold"> Borrower Marital Status: </p>
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
              <p className="fw-bold"> Borrower CTOS Score(if known): </p>
              <input type="text" onChange={this.handleChange} name="ctos" value={this.state.values.ctos} />
            </label>
          </Row>
          <Row xs={2} md={4} lg={10}>
            <label>
              <p className="fw-bold">  System Size (kwp): </p>
              <input type="text" onChange={this.handleChange} name="size" value={this.state.values.size} />
              {/* <select name="size" value={this.state.values.size} onChange={this.handleDropDown}>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
              </select> */}
              {/* <input type="text" onChange={this.handleChange} name="size" value={this.state.values.size} /> */}
            </label>
          </Row>
          <Row xs={2} md={4} lg={10}>
            <label>
              <p className="fw-bold"> System Cost (RM): { } </p>
              <input type="text" onChange={this.handleChange} name="cost" value={this.state.values.cost} />
              {/* <select name="cost" value={this.state.values.cost} onChange={this.handleDropDown}>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
              </select> */}
              {/* <input type="text" onChange={this.handleChange} name="cost" value={this.state.values.cost} /> */}
            </label>
          </Row>
          <Row xs={2} md={4} lg={10}>
            <label>
              <p className="fw-bold">Downpayment (RM): </p>
              <input type="text" onChange={this.handleChange} name="downpayment" value={this.state.values.downpayment} />
            </label>
          </Row>

          <br />

          <Row xs={2} md={4} lg={5}>

            {isInputFieldsValid ?
              <Button variant="info" size="sm" onClick={this.handleCalculate}>
                <NavLink style={{ color: 'black', textDecoration: 'none' }}
                  to={{
                    pathname: '/results',
                    info: {
                      data: this.state.values
                    }
                  }}
                  exact
                >Calculate</NavLink>
              </Button> : <Button variant="warning" size="sm" onClick={this.handleValidate}>Validate</Button>
            }

            <Button variant="danger" size="sm" onClick={this.handleClearAll}>Clear All</Button>

          </Row>
        </form>
      </Row>
    </Container>
  }
}

export default About;