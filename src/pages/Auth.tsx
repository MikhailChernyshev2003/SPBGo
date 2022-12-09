import React from "react";
import SignInComponent from "../components/Auth /signIn/signIn";
import styled from "styled-components";
import SignUpComponent from "../components/Auth /signUp/signUp";
import {useTypedSelector} from "../hooks/useTypedSelector";

const AuthBody = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Auth: React.FC = () => {

    const {visible} = useTypedSelector(state => state.auth);

    return(
        <AuthBody>
            {!visible && <SignInComponent/>}
            {visible && <SignUpComponent/>}
        </AuthBody>
    )
}

export default Auth