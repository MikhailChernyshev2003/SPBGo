import React, {useRef} from "react";
import styled from "styled-components";
import EventBody from "../body/eventsBody";
import IsPaidImage from "../../../static/svg/isPaid.svg";
import {useDispatch} from "react-redux";
import {EventsTypes} from "../../../types/Evants/EventsTypes";

interface EventInterface {
    name: string;
    day: string;
    date: string;
    paid: boolean;
    image: string;
    id: number
}

const EventCard = styled.div`
  width: calc(100% / 3.2);
  //width: 430px;
  height: 25vh;
  margin-bottom: 5vh;
  //height: 230px;
  //margin-bottom: 30px;
  position: relative;
  border-radius: 15px;
  display: flex;
  cursor: pointer;
`

const EventCardImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 15px;
  z-index: 10;
`

const ImageOverlay = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 100;
  border-radius: 15px;
  background: linear-gradient(rgba(0, 0, 0, 0.7), transparent, rgba(0, 0, 0, 0.7));
  transition: all 0.5s ease-in-out;
  
  &:hover {
    opacity: 0.5;
    //background: linear-gradient(rgba(0, 0, 0, 0.4), transparent, rgba(0, 0, 0, 0.4));
    //transition: 1s ease-in-out;
  }
`

const CardName = styled.div`
  color: white;
  z-index: 10000;
  position: absolute;
  //font-family: Manrope;
  font-weight: 400;
  font-size: 25px;
  display: flex;
  align-items: start;
  //width: 95%;
  margin-left: 15px;
  margin-top: 15px;
`

const CardDate = styled.div`
  position: absolute;
  bottom: 15px;
  left: 15px;
  z-index: 10000;
  color: white;
  //font-family: Manrope;
`

const IsPaid = styled.img`
  position: absolute;
  z-index: 10000;
  bottom: 15px;
  right: 15px;
`

const CardInfo = styled.div`
`

const Event: React.FC<EventInterface> = (props) => {

    const dateString = new Date(props.date);

    const dispatch = useDispatch();

    // const handleMouseOver = (event: any) => {
    //     if(!ref.current) {
    //         return
    //     }
    //     event.stopPropagation();
    //     event.preventDefault();
    //     ref.current.style!.width = ref.current.getBoundingClientRect().width * 1.5 + "px";
    //     ref.current.style!.height = ref.current.getBoundingClientRect().height * 1.5 + "px";
    //
    // }
    //
    // const handleMouseOut = (event: any) => {
    //     if(!ref.current) {
    //         return
    //     }
    //     event.stopPropagation();
    //     event.preventDefault();
    //     ref.current.style!.width = ref.current.getBoundingClientRect().width / 1.5 + "px";
    //     ref.current.style!.height = ref.current.getBoundingClientRect().height / 1.5 + "px";
    //     console.log("Морозов пидор")
    // }



    return(
        <EventCard onClick={() => dispatch({type: EventsTypes.OPEN_EVENT, payload: {eventVisible: true, id: props.id}})}>
            <EventCardImage src={props.image} />
            <ImageOverlay/>
            <CardName>{props.name}</CardName>
            <CardInfo>
                <CardDate>
                    {`${props.day} ${dateString.toISOString().substring(0, 10).replace(/-/g, ".")}`}
                </CardDate>
                {!props.paid && <IsPaid src={IsPaidImage}/>}
            </CardInfo>
        </EventCard>
    )
}

export default Event;