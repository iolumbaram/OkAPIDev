import React from 'react';

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      sell: 'anything',
      sliderVal: 0
    };
  }
  render() {
    return <Container>
      <Row>
        <Col>
          <h2 className="title">RM 0</h2>
        </Col>
        <Col>
          <Box>
            <Slider
              size="small"
              defaultValue={0}
              aria-label="Small"
              valueLabelDisplay="auto"
              //onChange={(e, val) => this.props.update(e, this.props.sliderVal, val)}
              onChange={ (e, val) => this.setState({sliderVal: val})}  
            />
          </Box>
        </Col>
        {/* <Col>
          <Box>
            <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />    
          </Box>
        </Col> */}
        <Col>
          <h2 className="title">RM 100</h2>
        </Col>
      </Row>
      <Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Before Solar</th>
              <th>After Solar</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div>
                  <UpdateTableBeforeSolar val={this.state.sliderVal}></UpdateTableBeforeSolar>
                </div>
              </td>
              <td>
                <div>
                  <Container>
                    <Row>
                      <Col>
                        <UpdateTableAfterSolar1 val={497}></UpdateTableAfterSolar1>
                      </Col>
                      <Col>
                        <UpdateTableAfterSolar2 val={497}></UpdateTableAfterSolar2>
                      </Col>
                    </Row>
                  </Container>
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>FOR CALCULATIONS</td>
            </tr>
          </tbody>
        </Table>
      </Row>
    </Container>
  }
}

function UpdateTableBeforeSolar(props) {
  return (
    <><div> YOU PAY {props.val} PER MONTH</div></>
  );
}

function UpdateTableAfterSolar1(props) {
  return (
    <><div> YOU SAVE RM {props.val} PER MONTH </div></>
  );
}

function UpdateTableAfterSolar2(props) {
  return (
    <><div> YOU ONLY PAY RM  {props.val} BILL PER MONTH</div></>
  );
}

// const About = () => (
//   <div className="content-container">
//     <div className="content-title-group not-found">
//       <h2 className="title">Loan Calculator</h2>
//       <p>
//         Coming soon!
//       </p>
//       <br />
//     </div>
//   </div>
// );

export default About;