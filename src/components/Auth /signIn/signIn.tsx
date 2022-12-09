import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import OpenEye from "../../../static/svg/openEye.svg";
import CloseEye from "../../../static/svg/closeEye.svg";
import {useDispatch} from "react-redux";
import {useActions} from "../../../hooks/useActions";
import {AuthTypes} from "../../../types/Auth/AuthTypes";
import ErrorImg from "../../../static/svg/error.svg";

const SignInBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const SignInTitle = styled.h1`
  //font-family: Manrope;
  font-weight: 400;
  font-size: 40px;
`

const SignInInput = styled.input<{valid: boolean}>`
  position: relative;
  width: 300px;
  height: 50px;
  border-radius: 15px;
  border: 1px solid #202020;
  margin-bottom: 15px;
  outline: none;
  padding-left: 30px;
  font-size: 20px;
  background: ${props => props.valid ? "white" : "#FAEDED"};
  //font-family: Manrope;
`

const SignInButton = styled.button<{active: boolean}>`
  width: 300px;
  height: 50px;
  background: ${props => props.active ? "black" : "rgba(32, 32, 32, 0.15)"};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  border-radius: 15px;
  border: 0;
  margin-top: 50px;
  cursor: ${props => props.active ? "pointer" : "default"};
`

const RegForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const RegButton = styled.button`
  font-size: 15px;
  //font-family: Manrope;
  color: black;
  background: transparent;
  border: 0;
  margin-top: 15px;
  cursor: pointer;
`

const InputWrapper = styled.div`
  position: relative;
`

const EyeImage = styled.img`
  position: absolute;
  right: 15px;
  top: 18px;
  cursor: pointer;
`

const ErrorWrapper = styled.div`
  position: absolute;
  right: -337px;
  top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ErrorMsg = styled.div`
  font-size: 15px;
  color: #EDC0BE;
  margin-left: 10px;
  width: 283px;
`

const SignInComponent: React.FC = () => {

    const loginInput = useRef(null);
    const passwordInput = useRef(null);

    const [activeButton, setActiveButton] = useState(false);
    const [valid, setValid] = useState(true);
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState("");
    const [passwordValid, setPasswordValid] = useState(true);
    const [loginValid, setLoginValid] = useState(true);
    const [visiblePassword, setVisiblePassword] = useState(false);
    const [passwordType, setPasswordType] = useState("password");

    const { SignUpPageVisible } = useActions();

    const dispatch = useDispatch();

    useEffect(() => {
        visiblePassword && setPasswordType("text");
        !visiblePassword && setPasswordType("password");
    }, [visiblePassword])

    const loginHandler = (event: any) => {
        setLogin(event.target.value)
    }

    const passwordHandler = (event: any) => {
        setPassword(event.target.value)
    }

    const checkValidation = () => {
        if (login.match(/\W/) || login.length > 15 || login.length < 3) {
            setValid(false);
            setLoginValid(false);
        } else {
            setValid(true);
            setLoginValid(true);
        }
        if (password.match(/\s/) || password.length > 20 || password.length < 5 || password.match(/W/)) {
            setValid(false);
            setPasswordValid(false);
        } else {
            setValid(true);
            setPasswordValid(true);
        }
    }

    useEffect(()=> {
        if (login.replace(/\s+/, "").length >= 1 && password.replace(/\s/, "").length >= 1) {
            setActiveButton(true);
        } else {
            setActiveButton(false);
        }
    },[login,password])

    // useEffect(() => {console.log(valid)}, [valid])

    const {SignInAction} = useActions();

    return(
        <SignInBody>
            <SignInTitle>
                Вход
            </SignInTitle>
            <RegForm onSubmit={(event) => {
                event.preventDefault();
                checkValidation();
                valid && SignInAction(login, password);
            }}>
                <InputWrapper>
                    <SignInInput valid={loginValid} placeholder={"Логин"} ref={loginInput} value={login} onChange={() => loginHandler(event)}/>
                    {!loginValid && <ErrorWrapper>
                        <img src={ErrorImg}/>
                        <ErrorMsg>
                            Логин должен состоять из 3-15 латинских букв и цифр.
                        </ErrorMsg>
                    </ErrorWrapper>}
                </InputWrapper>

                <InputWrapper>
                    <SignInInput id={"password"} type={passwordType} valid={passwordValid} placeholder={"Пароль"} ref={passwordInput} value={password} onChange={() => passwordHandler(event)}/>
                    {!visiblePassword && <EyeImage src={OpenEye} onClick={() => setVisiblePassword(!visiblePassword)}/>}
                    {visiblePassword && <EyeImage src={CloseEye} onClick={() => setVisiblePassword(!visiblePassword)}/>}
                    {!passwordValid && <ErrorWrapper>
                        <img src={ErrorImg}/>
                        <ErrorMsg>
                            Пароль должен состоять из 5-20 символов
                        </ErrorMsg>
                    </ErrorWrapper>}
                </InputWrapper>

                <SignInButton id={"submit"} active={activeButton} type={"submit"} disabled={!activeButton}>
                    Войти
                </SignInButton>
            </RegForm>

            <RegButton onClick={() => {
                dispatch({type: AuthTypes.SIGNUP_PAGE_VISIBLE, payload: true})
            }}>Нет аккаунта? Зарегистрироваться.</RegButton>
        </SignInBody>
    )
}

export default SignInComponent;