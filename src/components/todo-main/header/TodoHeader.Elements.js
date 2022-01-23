import styled from 'styled-components'

import {Link as LinkRouter} from "react-router-dom";

export const Header = styled.div`
  background: #ffb94d;
  height: 80px;
  margin-top: -80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
  @media screen and (max-width: 960px) {
    transition: 0.8s all ease;
  }
`
export const Logo = styled(LinkRouter)`
    color: white;
    justify-self: flex-start;
    cursor: pointer;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    margin-left: 10px;
    font-weight: bold;
    text-decoration: none;
`;
export const HeaderContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  //height: 80px;
  
  z-index: 1;
  width: 100%;
  padding: 0 24px;
  max-width: 1100px;
`
export const HeaderBtnWrapper = styled.div`
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const HeaderBtn = styled(LinkRouter)`
  border-radius: 50px;
  background: ${({primary}) => (primary? '#01BF71' : '#010606')};
  white-space: nowrap;
  padding: 12px 30px;
  color: ${({dark}) =>(dark ? '#010606': `#fff`)};
  font-size: ${({fontBig}) => (fontBig? '20px':'16px')};
  outline: none;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  
  &:hover {
    transition: all 0.2s ease-in-out;
    background: ${({primary}) => (primary? '#fff' : '#01BF71')};
  }
`
export const MobileIcon = styled.div`
  display: flex;
  position: relative;
  padding: 0 30px 30px 0;
  transform: translate(0,20%);
  font-size: 1.8rem;
  cursor: pointer;
  color: #fff;
  margin-left: 10px;

`;