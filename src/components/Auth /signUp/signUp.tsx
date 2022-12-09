import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import OpenEye from "../../../static/svg/openEye.svg";
import CloseEye from "../../../static/svg/closeEye.svg";
import {AuthTypes} from "../../../types/Auth/AuthTypes";
import {useDispatch} from "react-redux";
import {useActions} from "../../../hooks/useActions";
import ErrorImg from "../../../static/svg/error.svg";

const SignUpBody = styled.div`
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
  width: 300px;
  height: 50px;
  border-radius: 15px;
  //border: 1px solid ${props => props.valid ? "black" : "#FAEDED"};
  border: 1px solid black;
  margin-bottom: 15px;
  outline: none;
  padding-left: 30px;
  font-size: 20px;
  background: ${props => props.valid ? "white" : "#FAEDED"};
  //background: white;
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
  //margin-left: 7.5px;
`

const EyeImage = styled.img`
  position: absolute;
  right: 15px;
  top: 18px;
  cursor: pointer;
`

const RegInputWrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 15px;
`

const ErrorWrapper = styled.div`
  position: absolute;
  right: -337px;
  top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const LeftErrorWrapper = styled.div`
  position: absolute;
  left: -337px;
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

const LeftErrorMsg = styled.div`
  font-size: 15px;
  color: #EDC0BE;
  margin-right: 10px;
  width: 283px;
  display: flex;
  justify-content: end;
  align-items: center;
  text-align: end;
`

const SignUpComponent: React.FC = () => {

    const loginInput = useRef(null);
    const passwordInput = useRef(null);

    const [activeButton, setActiveButton] = useState(false);
    const [valid, setValid] = useState(false);
    const [validFinal, setValidFinal] = useState(false);
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState("");
    const [name, setName] = useState("");
    const [passwordReplay, setPasswordReplay] = useState("");
    const [passwordValid, setPasswordValid] = useState(true);
    const [loginValid, setLoginValid] = useState(true);
    const [nameValid, setNameValid] = useState(true);
    const [passwordReplayValid, setPasswordReplayValid] = useState(true);
    const [visiblePassword, setVisiblePassword] = useState(false);
    const [passwordType, setPasswordType] = useState("password");
    const [visiblePasswordReplay, setVisiblePasswordReplay] = useState(false);
    const [passwordReplayType, setPasswordReplayType] = useState("password");

    const { SignUpPageVisible } = useActions();

    const dispatch = useDispatch();

    useEffect(() => {
        visiblePassword && setPasswordType("text");
        !visiblePassword && setPasswordType("password");
    }, [visiblePassword])

    useEffect(() => {
        visiblePasswordReplay && setPasswordReplayType("text");
        !visiblePasswordReplay && setPasswordReplayType("password");
    }, [visiblePasswordReplay])

    const nameHandler = (event: any) => {
        setName(event.target.value);
    }

    const replayPasswordHandler = (event: any) => {
        setPasswordReplay(event.target.value);
    }

    const loginHandler = (event: any) => {
        setLogin(event.target.value)
    }

    const passwordHandler = (event: any) => {
        setPassword(event.target.value)
    }

    const checkValidation = () => {
        if (login.match(/\W/) || login.length > 15 || login.length < 3) {
            setLoginValid(false);
        } else {
            setLoginValid(true);
        }
        if (password.match(/\s/) || password.length > 20 || password.length < 5 || password.match(/W/) || !(password.match(/[0-9]/))) {
            setPasswordValid(false);
        } else {
            setPasswordValid(true);
        }
        if (!(name.match(/[а-яА-ЯёЁa-zA-Z]+$/)) || name.length > 30 || name.length < 2) {
            setNameValid(false);
        } else {
            setNameValid(true);
        }
        if (passwordReplay !== password) {
            setPasswordReplayValid(false);
        } else {
            setPasswordReplayValid(true)
        }

        // if (login.match(/[а-яА-ЯёЁa-zA-Z0-9]/) && login.length >= 3 && login.length <=15) {
        //     setLoginValid(true);
        // }
        // if (password.match(/[A-Za-z0-9]/) && password.length <= 20 && password.length>=5) {
        //     setPasswordValid(true);
        // }
        // if (name.match(/[a-zA-zА-Яа-я]/) && name.length >=2 && name.length <=30) {
        //     setNameValid(true);
        // }
        // if (passwordReplay === password) {
        //     setPasswordReplayValid(true);
        // }

        setValidFinal(true);
    }

    useEffect(() => {
        if(loginValid && passwordValid && nameValid && passwordReplayValid && activeButton && validFinal) {
            setValid(true);
            SignUpAction(name,login,password);
        } else {
            setValid(false);
        }
    },[nameValid, passwordValid, loginValid, passwordReplayValid, activeButton, validFinal])

    useEffect(()=> {
        if (login.replace(/\s+/, "").length >= 1 && password.replace(/\s/, "").length >= 1 && name.replace(/\s/, "").length >= 1 && passwordReplay.replace(/\s/, "").length >= 1) {
            setActiveButton(true);
        } else {
            setActiveButton(false);
        }
    },[login,password, name, passwordReplay])

    // useEffect(() => {console.log(valid)}, [valid]);

    const { SignUpAction } = useActions();

    return(
        <SignUpBody>
            <SignInTitle>
                Регистрация
            </SignInTitle>
            <RegForm onSubmit={(event) => {
                event.preventDefault();
                checkValidation();
                // valid && SignUpAction(name,login,password);
                // setTimeout(() => {valid && console.log("ok")}, 100);
            }}>
                <RegInputWrapper>
                    <InputWrapper>
                        <SignInInput valid={nameValid} placeholder={"Имя"} ref={loginInput} value={name} onChange={() => nameHandler(event)}/>
                        {!nameValid && <LeftErrorWrapper>
                            <LeftErrorMsg>
                                Имя должно состоять из 2-30 символов латиницы или кириллицы.
                            </LeftErrorMsg>
                            <img src={ErrorImg}/>
                        </LeftErrorWrapper>}
                    </InputWrapper>
                    <InputWrapper>
                        <SignInInput type={passwordType} valid={passwordValid} placeholder={"Пароль"} ref={passwordInput} value={password} onChange={() => passwordHandler(event)}/>
                        {!visiblePassword && <EyeImage src={OpenEye} onClick={() => setVisiblePassword(!visiblePassword)}/>}
                        {visiblePassword && <EyeImage src={CloseEye} onClick={() => setVisiblePassword(!visiblePassword)}/>}
                        {!passwordValid && <ErrorWrapper>
                            <img src={ErrorImg}/>
                            <ErrorMsg>
                                Пароль должен состоять из 5-20 символов и содержать хотя бы 1 цифру
                            </ErrorMsg>
                        </ErrorWrapper>}
                    </InputWrapper>
                    <InputWrapper>
                        <SignInInput valid={loginValid} placeholder={"Логин"} ref={loginInput} value={login} onChange={() => loginHandler(event)}/>
                        {!loginValid && <LeftErrorWrapper>
                            <LeftErrorMsg>
                                Логин должен состоять из 3-15 латинских букв и цифр.
                            </LeftErrorMsg>
                            <img src={ErrorImg}/>
                        </LeftErrorWrapper>}
                    </InputWrapper>
                    <InputWrapper>
                        <SignInInput type={passwordReplayType} valid={passwordReplayValid} placeholder={"Повторите пароль"} ref={passwordInput} value={passwordReplay} onChange={() => replayPasswordHandler(event)}/>
                        {!visiblePasswordReplay && <EyeImage src={OpenEye} onClick={() => setVisiblePasswordReplay(!visiblePasswordReplay)}/>}
                        {visiblePasswordReplay && <EyeImage src={CloseEye} onClick={() => setVisiblePasswordReplay(!visiblePasswordReplay)}/>}
                        {!passwordReplayValid && <ErrorWrapper>
                            <img src={ErrorImg}/>
                            <ErrorMsg>
                                Пароли не совпадают
                            </ErrorMsg>
                        </ErrorWrapper>}
                    </InputWrapper>
                </RegInputWrapper>
                <SignInButton id={"submit"} active={activeButton} type={"submit"} disabled={!activeButton}>
                    Зарегистрироваться
                </SignInButton>
            </RegForm>
            <RegButton onClick={() => {
                dispatch({type: AuthTypes.SIGNUP_PAGE_VISIBLE, payload: false})
            }}>Уже есть аккаунт? Войти.</RegButton>
        </SignUpBody>
    )
}

export default SignUpComponent;