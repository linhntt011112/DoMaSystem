import './dmscalendar.css';
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import {Button} from "@mui/material";
import {Add} from "@material-ui/icons";
import AddEvent from '../../popup/AddEvent/AddEvent';
import { ToastContainer} from 'react-toastify';
import * as backend_config from '../../../config/backend'
import { useUserInfo } from "../../../context/TokenContext";

const locales = {
    "en-US": require("date-fns/locale/en-US")
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
})

const events = [
    {
        title: "Big Meeting",
        allDay: true,
        start: new Date(2022, 3, 0),
        end: new Date(2022, 3, 0)
    },
    {
        title: "Vacation",
        start: new Date(2022,3,7),
        end: new Date(2022,3,10)
    },
    {
        title: "Conference",
        start: new Date(2022, 3, 20),
        end: new Date(2022,3,23)
    }
]

function DMSCalendar(props) {
    const {token} = props;
    const {user} = useUserInfo();
    // console.log(user)
    const [newEvent, setNewEvent] = useState({title: "", start: "", end: ""})
    const [allEvents, setAllEvents] = useState([]);
    const [addButtonPopup, setAddButtonPopup] = useState(false);

    function handleAddEvent() {
        setAllEvents([...allEvents, newEvent])
    }
    
    const refreshFunc = () => {
        backend_config.makeRequest("GET", backend_config.LICH_GET_LIST_BY_USER_ID.replace("{user_id}", user.id), token)
          .then((data) => data.json())
          .then((data) => {
            setAllEvents(data)
        })
    }

    useEffect(() => {
        refreshFunc();
    }, [])

    return (
        <div className='Calendar'>
            <h1 className='calendar-title'>Lịch</h1>
            <div className='calendar-top'>
                <Button
                    className='button-add-event'
                    style={{
                        margin: '10px 10px 10px auto',
                        display: 'flex',
                        border: '1px solid #ff9b44',
                        padding: '5px',
                        backgroundColor: '#ff9b44',
                        borderRadius: '50px',
                        cursor: 'pointer',
                        color: 'white',
                        fontSize: '16px',
                        textTransform: 'inherit',
                    }}
                    startIcon={<Add/>}
                    onClick={() => setAddButtonPopup(true)}
                >
                    Thêm mới
                </Button>
            </div>
            <Calendar 
                localizer={localizer} 
                events={allEvents} 
                titleAccessor="name"
                startAccessor="start_time" 
                endAccessor="end_time"
                selectable
                tooltipAccessor={null}
                style={{position: 'inherit'}}
            />
            <AddEvent trigger={addButtonPopup} setTrigger={setAddButtonPopup}
                token={token} user_id={user.id} refreshFunc={refreshFunc}>
            </AddEvent>
            <ToastContainer className="event-notify"/>
        </div>
    );
}

export default DMSCalendar;