import React from "react";
import styled from "styled-components";
// @ts-ignore
import LogOutImage from "../../../static/svg/logOut.svg";
import {useActions} from "../../../hooks/useActions";

interface headerInterface {
    name: string;
}

const HeaderWrapper = styled.header`
  display: flex;
  width: 90vw;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`

const EventsTitle = styled.h1`
  //font-family: Manrope;
`

const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
`

const Name = styled.div`
  font-size: 20px;
  margin-right: 20px;
  //font-family: Manrope;
`

const LogOutButton = styled.img`
  width: 40px;
  height: 40px;
  cursor: pointer;
`

const Header: React.FC<headerInterface> = (props) => {

    const {SetAccessToken, SetLogged, SetProfileName} = useActions();

    return(
        <HeaderWrapper>
            <EventsTitle>Мероприятия</EventsTitle>
            <ProfileInfo>
                <Name>
                    {props.name}
                </Name>
                <LogOutButton src={LogOutImage} onClick={() =>{
                    SetAccessToken("");
                    SetLogged(false);
                    SetProfileName("");
                }}/>
            </ProfileInfo>
        </HeaderWrapper>
    )
}

export default Header;