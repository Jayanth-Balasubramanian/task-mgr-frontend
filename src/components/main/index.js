import React, {useState} from 'react';
import {
    MainBackground,
    VideoBg,
    MainText,
    MainContainer,
    MainBtnWrapper,
    MainBtnLink,
    MainContent
} from "./Main.Elements";
import Video from '../../assets/video/VideoBg.mp4'
function Main(props) {
    const [hover, setHover] = useState(false);
    const onHover = () => {
        setHover(!hover);
    };
    return (
        <MainContainer>
            <MainBackground>
                <VideoBg autoPlay loop muted src={Video} type='video/mp4' />
            </MainBackground>
            <MainContent>
                <MainText>
                    Get Things Done. <br/>
                    Start Planning.
                </MainText>
                <MainBtnWrapper>
                    <MainBtnLink to="signup" onMouseEnter={onHover} onMouseLeave={onHover}>Sign up</MainBtnLink>
                </MainBtnWrapper>
            </MainContent>

        </MainContainer>

    );
}

export default Main;