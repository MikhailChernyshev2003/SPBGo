import React, {useEffect, useState} from "react";
import styled from "styled-components";
import Event from "../event/event";
import EventPopup from "../../EventPopup/EventPopup";
import {useActions} from "../../../hooks/useActions";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import {EventsTypes} from "../../../types/Evants/EventsTypes";

const EventBodyWrapper = styled.div`
  //display: flex;
  //flex-wrap: wrap;
  //display: grid;
  //grid-template-columns: repeat(3, 1fr);
  //grid-template-rows: repeat(3, 1fr);
  //justify-items: center;
  //align-items: center;
  //justify-content: center;
  //align-content: center;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 85vh;
  justify-content: space-between;
`

const FetchChips = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  padding-bottom: 30px;
`
const EventsBody : React.FC = () => {

    const { GetEventsAction, InitEventsAction, SetFetchingDispatch, GetEventAction } = useActions();

    const [offset, setOffset] = useState(18);
    // const [limit, setLimit] = useState(18);
    const [hasMore, setHasMore] = useState(true);
    const [fetching, setFetching] = useState(false);

    const {events, eventVisible, Fetching, id, event} = useTypedSelector(state => state.event);
    const {accessToken} = useTypedSelector(state => state.auth);

    const dispatch = useDispatch();

    useEffect(() => {

        InitEventsAction("http://77.234.215.138:60866/spbgo/api/events?offset=0&limit=18");
        // console.log(events);
    }, [])

    // useEffect(() => {
    //     if (limit + 18 > OrdersCount && limit <= OrdersCount) {
    //         setHasMore(false);
    //     }
    // }, [limit])
    //
    // function FetchEvents() {
    //     if (offset + 18 < OrdersCount){
    //         // setOffset(18);
    //         // setLimit(36);
    //         offset+=18;
    //         // limit+=18;
    //         console.log(offset, limit);
    //         const params = new URLSearchParams({
    //             offset: offset.toString(),
    //             limit: limit.toString()
    //         })
    //         const url = "http://77.234.215.138:60866/spbgo/api/events?" + params.toString();
    //         GetEventsAction(url, events);
    //     } else if (limit < OrdersCount){
    //         // setOffset(limit);
    //         // setLimit(limit + (OrdersCount - limit));
    //         const params = new URLSearchParams({
    //             offset: offset.toString(),
    //             limit: limit.toString()
    //         })
    //         const url = "http://77.234.215.138:60866/spbgo/api/events?" + params.toString();
    //         GetEventsAction(url, events);
    //     }
    // }

    useEffect(() => {
        document.addEventListener('scroll', ScrollHandler);
        return function () {
            document.removeEventListener('scroll', ScrollHandler);
        }
    },[])

    useEffect(() => {
        if (Fetching) {
            setOffset(offset + 18);
            GetEventsAction(`http://77.234.215.138:60866/spbgo/api/events?offset=${offset}&limit=18`, events);
            // console.log(events);
        }
    },[Fetching])

    useEffect(() => {
        if (eventVisible) {
            GetEventAction(`http://77.234.215.138:60866/spbgo/api/event?id=${id}`)
        }
    },[eventVisible])

    const ScrollHandler = (event: any) => {
        if (event.target.documentElement.scrollHeight - (event.target.documentElement.scrollTop + window.innerHeight) < 100) {
            dispatch({type: EventsTypes.SET_FETCHING, payload: true})
        }
    }

    useEffect(() => {

    },[])

    return(
        <EventBodyWrapper>
            {events.map(value =>
                value &&  value.event && <Event
                    name={value.event.title}
                    date={value.event.date}
                    day={value.event.weekday}
                    paid={value.event.is_free}
                    image={value.event.image}
                    id={value.event.id}
                />
            )}
            {Fetching && <FetchChips>
                Мероприятия загружаются, пожалуйста, подождите.
            </FetchChips>}
            {eventVisible && event && event.event && <EventPopup date={event.event.date} image={event.event.image} name={event.event.title} price={123} description={event.event.description} place={event.event.place} weekday={event.event.weekday} link={event.event.site_url}/>}
        </EventBodyWrapper>
    )
}

export default EventsBody;