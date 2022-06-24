import './dmscalendar.css';
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import {Button} from "@mui/material";
import {Add} from "@material-ui/icons";
import AddEvent from '../../popup/AddEvent/AddEvent';
import { ToastContainer} from 'react-toastify';

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
    const [newEvent, setNewEvent] = useState({title: "", start: "", end: ""})
    const [allEvents, setAllEvents] = useState(events);
    const [addButtonPopup, setAddButtonPopup] = useState(false);

    function handleAddEvent() {
        setAllEvents([...allEvents, newEvent])
    }

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
                startAccessor="start" 
                endAccessor="end"
                selectable
                tooltipAccessor={null}
            />
            <AddEvent trigger={addButtonPopup} setTrigger={setAddButtonPopup}
                token={token}>
            </AddEvent>
            <ToastContainer className="event-notify"/>
        </div>
    );
}

export default DMSCalendar;