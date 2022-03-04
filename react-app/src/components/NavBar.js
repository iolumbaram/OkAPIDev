import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = (props) => (
  <nav className="column is-2 menu">
    <p className="menu-label">Menu</p>
    <ul className="menu-list">
      <NavLink to="/products" activeClassName="active-link">
        Home
      </NavLink>
      <NavLink to="/about" activeClassName="active-link">
        Services
      </NavLink>
      <NavLink to="/about" activeClassName="active-link">
        Loan Calculator
      </NavLink>
      <NavLink to="/about" activeClassName="active-link">
        Contact us
      </NavLink>
    </ul>
    {props.children}
  </nav>
);

export default NavBar;
