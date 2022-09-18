import React, { Component, lazy, Suspense } from 'react';
import 'bulma/css/bulma.css';
import './styles.scss';
import { Redirect, Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import { NotFound } from './components';
import About from './About';
import ContactUs from './ContactUs';
import ServicePage from './ServicesPage';
import LoanCalPage from './LoanCalPage';
import LoanCalResultPage from './LoanCalResultPage';

const Products = withRouter(
  lazy(() => import(/* webpackChunkName: "products" */ './products/Products'))
);

class App extends Component {
  render() {
    return (
      <div>
          <main className="column">
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                <Redirect from="/" exact to="/products" />
                <Route path="/products" component={Products} />
                <Route path="/about" component={About} />
                <Route path="/contactus" component={ContactUs} />
                <Route path="/services" component={ServicePage} />
                <Route path="/loancal" component={LoanCalPage} />
                <Route path="/results" component={LoanCalResultPage} />
                <Route exact path="**" component={NotFound} />
              </Switch>
            </Suspense>
          </main>
      </div>
    );
  }
}

export default App;
