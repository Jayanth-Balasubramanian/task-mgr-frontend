import React, {useState} from 'react';
import {SignInContainer, FormWrap, FormInput, Form, FormH1, FormLabel, FormButton, Icon, FormContent, Text} from "./SignIn.Elements";
import axios from "axios";
import {useNavigate} from "react-router-dom";
function SignIn() {
    const [showIncorrectPassword, setShowIncorrectPassword] = useState(false);
    const url = "http://localhost:3000/auth/login";
    let push = useNavigate();
    let auth_token = "";
    const[user, setUser] = useState({
        email: "",
        password: ""
    })
    const handleChange = name => e => {
        setUser({ ...user, [name]: e.target.value });
    };
    const HandleSubmit = (event) => {
        event.preventDefault();
        axios.post(`${url}`, user)
            .then(function (response) {
                auth_token = response.data.auth_token;
                push('/app',
                    {state: auth_token});
            })
            .catch(function (error){if (error.message === "Request failed with status code 401"){
                setShowIncorrectPassword(true);
            }})
    }
    return (

            <SignInContainer>

                <FormWrap>
                    <Icon to="/">Task Planner</Icon>
                    <FormContent>
                    <Form action="#" onSubmit={HandleSubmit}>
                        <FormH1>Sign in to your account</FormH1>
                        <FormLabel htmlFor='for'>Email</FormLabel>
                        <FormInput value={user.email} onChange={handleChange('email')} type='email' placeholder="Email Address" required />
                        <FormLabel htmlFor='for'>Password</FormLabel>
                        <FormInput value={user.password} onChange={handleChange('password')} type='password' placeholder="Password" required/>
                        <FormButton type='submit'> Continue </FormButton>
                        {showIncorrectPassword? <Text> Incorrect Username or Password </Text> : ""}
                    </Form>
                    </FormContent>
                </FormWrap>
            </SignInContainer>
    );
}

export default SignIn;