import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = (props) => (
  <nav className="column is-2 menu">
    <p className="menu-label">Menu</p>
    <ul className="menu-list">
      <NavLink to="/" activeClassName="active-link">
        Homes
      </NavLink>
      <NavLink to="/services" activeClassName="active-link">
        Services
      </NavLink>
      <NavLink to="/loancal" activeClassName="active-link">
        Loan Calculator
      </NavLink>
      <NavLink to="/contactus" activeClassName="active-link">
        Contact us
      </NavLink>
    </ul>
    {props.children}
  </nav>
);

export default NavBar;
