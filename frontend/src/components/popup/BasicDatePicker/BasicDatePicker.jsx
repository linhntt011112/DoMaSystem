import React, { useState } from 'react';
import './basicdatepicker.css';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

export default function BasicDatePicker() {
    const [selectedDate, setSelectedDate] = useState(null);

    return (
        <div className='basic-datepicker'>
            <DatePicker
                className='datepicker'
                selected={selectedDate} 
                onChange={date => setSelectedDate(date)}
                dateFormat='dd/MM/yyyy'
                filterDate={date => date.getDay() !== 6 && date.getDay() !== 0 }
                isClearable
                showYearDropdown
                scrollableMonthYearDropdown
            ></DatePicker>
        </div>
    );
}
