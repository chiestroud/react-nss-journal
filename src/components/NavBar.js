import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Button
} from 'reactstrap';
import { signInUser, signOutUser } from '../helpers/auth';

const NavBar = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <Link className='navbar-brand' to="/">NSS Journal 2021</Link>
        {user
          && <div>
          <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
            <NavItem>
              <Link className='nav-link' to="/july">July</Link>
            </NavItem>
            <NavItem>
              <Link className='nav-link' to="/june">June</Link>
            </NavItem>
            <NavItem>
              <Link className='nav-link' to="/may">May</Link>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Jan ~ Apr
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <Link className='nav-link' to="/jan-apr/">Jan ~ Apr</Link>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            </Nav>
            </Collapse>
        </div>
          }
          {
              !user
                ? <Button color='info' onClick={signInUser}>Sign In</Button>
                : <Button color='danger' onClick={signOutUser}>Log Out</Button>
        }
        <NavbarText>Welcome</NavbarText>
      </Navbar>
    </div>
  );
};

NavBar.propTypes = {
  user: PropTypes.any
};

export default NavBar;
