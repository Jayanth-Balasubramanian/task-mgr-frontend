import React from 'react';
import {Nav, NavbarContainer, NavLogo, MobileIcon, NavMenu,
    NavItem, NavLinks, NavBtn, NavBtnLink} from "./Navbar.Elements";


import {FaBars} from 'react-icons/fa'

function Navbar({ toggle }) {
    return (
        <Nav>
                <NavbarContainer>
                    <NavLogo to='/'> Task Planner </NavLogo>

                    <NavBtn>
                        <NavBtnLink to="signin">Sign In</NavBtnLink>
                    </NavBtn>

                </NavbarContainer>
        </Nav>

    );
}

export default Navbar;