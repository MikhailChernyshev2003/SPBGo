import React, {useEffect} from "react";
import styled from "styled-components";
import Header from "../components/Events/header/header";
import EventsBody from "../components/Events/body/eventsBody";
import {useActions} from "../hooks/useActions";
import {ReadCookie} from "../hooks/Cookies";
import {useTypedSelector} from "../hooks/useTypedSelector";

const Body = styled.div`
  width: 90vw;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-left: 5vw;
`

const Events: React.FC = () => {

    const {GetProfileAction} = useActions();

    const {name} = useTypedSelector(state => state.auth)

    useEffect(() => {
        GetProfileAction();
    }, [])

    return(
        <Body>
            <Header name={name}/>
            <EventsBody/>
        </Body>
    )
}

export default Events;