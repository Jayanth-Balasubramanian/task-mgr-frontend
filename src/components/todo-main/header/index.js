import React, {useState} from 'react';
import {Header, HeaderContainer, HeaderBtnWrapper, HeaderBtn, Logo, MobileIcon} from "./TodoHeader.Elements";
import {FiBell} from "react-icons/fi"
import {BsArrowRight} from "react-icons/bs"
function TodoHeader({ handleLogout }) {
    const [hover, setHover] = useState(false);
    const onHover = () => {
        setHover(!hover);
    };
    return(
        <Header>

            <Logo to="/">Task Manager</Logo>
            <HeaderContainer>

                <MobileIcon> <FiBell /> </MobileIcon>
                <HeaderBtn to="/" onClick={handleLogout} onMouseEnter={onHover} onMouseLeave={onHover}>Log out {hover? <BsArrowRight /> : ""}</HeaderBtn>

            </HeaderContainer>


        </Header>
    )
    ;
}

export default TodoHeader;