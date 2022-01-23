import React, {useState} from 'react';
import {SignInContainer, FormWrap, FormInput, Form, FormH1, FormLabel, FormButton, Icon, FormContent} from "../sign in/SignIn.Elements";
import axios from "axios";
import {useNavigate} from "react-router-dom";
function SignUp() {
    let auth_token = "";
    const url = "http://localhost:3000/signup";
    let push = useNavigate();
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
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
            .catch(function (error){})
    }

    return (

        <SignInContainer>

            <FormWrap>
                <Icon to="/">Task Planner</Icon>
                <FormContent>
                    <Form action="/" onSubmit={HandleSubmit}>
                        <FormH1>Sign Up for a new account</FormH1>
                        <FormLabel htmlFor='for'>Email</FormLabel>
                        <FormInput value={user.email} onChange={handleChange('email')} type='email' placeholder="Type your email" required />
                        <FormLabel htmlFor='for'>Username</FormLabel>
                        <FormInput value={user.name} onChange={handleChange('name')} type='text' placeholder="Your Username" required />
                        <FormLabel htmlFor='for'>Password</FormLabel>
                        <FormInput value={user.password} onChange={handleChange('password')} type='password' placeholder="Your Password" required/>
                        <FormLabel htmlFor="for">Confirm Password</FormLabel>
                        <FormInput value={user.password_confirmation} onChange={handleChange('password_confirmation')} type='password' placeholder="confirm password" required/>
                        <FormButton type='submit'> Continue </FormButton>
                    </Form>
                </FormContent>
            </FormWrap>
        </SignInContainer>
    );
}

export default SignUp;