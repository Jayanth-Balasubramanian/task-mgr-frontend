import styled from 'styled-components'
import {Link} from 'react-router-dom'
export const MainContainer = styled.div`

  background: white;
  height: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 30px;
  position: relative;
  z-index: 1;
  
  :before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(180deg, rgba(255,185,77,0.2) 0%, rgba(255,185,77,0.6) 100%),
    linear-gradient(180deg, rgba(255,185,77,0.2) 0%, transparent 100%);
    z-index: 2;
  }
`

export const MainBackground = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left:0;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const VideoBg = styled.video`
  width: 100%;
  height: 100%;
  -o-object-fit: cover;
  object-fit: cover;
  background: #232a34;
`

export const MainContent = styled.div`
  z-index: 3;
  max-width: 1200px;
  position: absolute;
  padding: 8px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
export const MainText = styled.h1`
  color: black;
  font-size: 48px;
  text-align: center;
  
  @media screen and (max-width: 768px){
    font-size: 40px;
  }
  @media screen and (max-width: 480px){
    font-size: 32px;
  }
`
export const MainBtnWrapper = styled.div`
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const MainBtnLink = styled(Link)`
  text-decoration: none;
  border-radius: 50px;
  background: ${({primary}) => (primary? '#01BF71' : '#010606')};
  white-space: nowrap;
  padding: ${({big}) => (big? '14px 48px' : '12px 30px')};
  color: ${({dark}) =>(dark ? '#010606': `#fff`)};
  font-size: ${({fontBig}) => (fontBig? '20px':'16px')};
  outline: none;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;
  
  &:hover {
    transition: all 0.2s ease-in-out;
    background: ${({primary}) => (primary? '#fff' : '#01BF71')};
  }
`