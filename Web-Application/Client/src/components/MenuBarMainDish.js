import React from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'shards-react';

export default function MenuBar() {
  return (
    <Navbar type="dark" theme="primary" expand="md">
      <NavbarBrand href="/">Recipe Recommendation</NavbarBrand>
      <Nav navbar>
        <NavItem>
          <NavLink active href="/homepage">
            Home
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active href="/maindishes">
            Main Dish
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active href="/user">
            User
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active href="/recommendation">
            Recommendation
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active href="/compare">
            Nutrition Compare
          </NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
}
