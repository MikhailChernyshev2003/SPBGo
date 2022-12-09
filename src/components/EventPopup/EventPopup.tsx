import React from "react";
import styled from "styled-components";
import CloseButtonImg from "../../static/svg/closeButton.svg";
import {EventsTypes} from "../../types/Evants/EventsTypes";
import {useDispatch} from "react-redux";
import KudaGo from "../../static/svg/kudaGo.svg";

interface EventPopupInterface {
    image: string,
    price: number,
    name: string,
    description: string,
    place: string,
    date: string,
    weekday: string,
    link: string
}

const Overlay = styled.div`
  background: rgba(0,0,0,0.9);
  z-index: 10000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`

const PopupBody = styled.div`
  height: 100vh;
  width: 50vw;
  margin-left: 25vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`

const CloseButton = styled.button`
    //position: absolute;
  background: transparent;
  align-self: end;
  border: 0;
  //margin-right: 20px;
  margin-bottom: 20px;
  cursor: pointer;
`

const PopupImage = styled.img`
  width: 100%;
  height: 50vh;
  margin-bottom: 30px;
  border-radius: 30px;
`

const InfoWrapper = styled.div`
  height: 30vh;
  width: 100%;
  background: white;
  border-radius: 30px;
  padding: 30px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  box-sizing: border-box;
`

const PlaceAndPrice = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const PlaceWrapper = styled.div`
  display: flex;
`

const Place = styled.div`
  font-size: 20px;
  //font-family: Manrope;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
`

const DateWrapper = styled.div`
  color: rgba(0,0,0,0.5);
  font-size: 20px;
  //font-family: Manrope;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Price = styled.a`
  height: 28px;
  border-radius: 16px;
  padding: 0 10px 0 10px;
  background: black;
  color: white;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  //font-family: Manrope, Inter;
`



const Name = styled.div`
  //font-family: Manrope;
  font-weight: 700;
  font-size: 30px;
`

const Description = styled.div`
  //font-family: Manrope;
  font-size: 25px;
  min-height: 50%;
  overflow: scroll;
  //text-overflow: ellipsis;
`

const Weekday = styled.div`
  font-size: 20px;
  //font-family: Manrope;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
`

const KDGimg = styled.img`
  width: 60px;
  height: 60px;
`

const EventPopup: React.FC<EventPopupInterface> = (props) => {

    const dateString = new Date(props.date);

    const dispatch = useDispatch();

    return(
        <Overlay>
            {props && <PopupBody>
                <CloseButton onClick={() => dispatch({type: EventsTypes.OPEN_EVENT, payload: false})}>
                    <img src={CloseButtonImg}/>
                </CloseButton>
                <PopupImage src={props.image}/>
                <InfoWrapper>
                    <PlaceAndPrice>
                        <PlaceWrapper>
                            <Place>{props.place}</Place>
                            <Weekday>{` - ${props.weekday}`}</Weekday>
                            {props.date && <DateWrapper>{`${dateString.toISOString().substring(8, 10)}${dateString.toISOString().substring(4, 7).replace(/-/g, ".")}.${dateString.toISOString().substring(0, 4).replace(/-/g, ".")}`}</DateWrapper>}
                        </PlaceWrapper>
                        <Price href={props.link}>Ссылка на KudaGo</Price>
                    </PlaceAndPrice>
                    <Name>{props.name}</Name>
                    <Description>{props.description}</Description>
                </InfoWrapper>
            </PopupBody>}
        </Overlay>
    )
}

export default EventPopup;