import React, { useState } from "react";
import "./AddEvent.css";
import {Box, FormControl, MenuItem, Select} from "@mui/material";
import { Close } from '@material-ui/icons';
import { toast } from 'react-toastify';
import * as backend_config from '../../../config/backend'


export default function AddEvent(props) {
    const {token, user_id, refreshFunc} = props;
    const [name, setName] = useState(null);
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);

    const addEventSuccessNotify = () => {
        toast.success(<div>Thêm sự kiện thành công!</div>, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: true
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const body = JSON.stringify({
            name: name,
            start_time: start,
            end_time: end,
        })

        backend_config.makeRequest("POST", 
            backend_config.LICH_POST_CREATE, 
            token,
            body
        )
        .then((response) => {
            if (response.ok){
                response.json().then((response_json) => {
                    addEventSuccessNotify();
                    props.setTrigger(false);

                    refreshFunc();
                    setName(null);
                    setStart(null);
                    setEnd(null);
                })
            }
            else {
                response.text().then((text) => {
                    let error = JSON.parse(text).detail;
                    switch (error) {
                        // case "Duplicate ten_tai_khoan!": 
                        //     addUserNotifyDuplicateUsername();
                        //     return;
                        default:
                            alert(text);
                            return;
                    }
                })
            }
        })
        
    }

    return (props.trigger) ? (
        <div className="popup-main">
            <form className="add-event-popup-inner" onSubmit={handleSubmit}>
                <Close className="close-btn" onClick={() => props.setTrigger(false)}/>
                <div className="add-event">
                    <h5 className="add-event-title">Thêm sự kiện mới</h5>
                    <div className="add-event-body">
                        <div className="add-event-item">
                            <label>
                                Tên sự kiện
                                <span className='text-danger' style={{color: 'red'}}>  *</span>
                            </label>
                            <input
                                type="text"
                                className='add-event-input'
                                required
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="add-event-item">
                            <label>
                                Ngày bắt đầu
                                <span className='text-danger' style={{color: 'red'}}>  *</span>
                            </label>
                            <input
                                type="date"
                                className='datepicker'
                                onKeyDown={(e) => {
                                    e.preventDefault();
                                }}
                                style={{
                                    width: '263px',
                                    fontSize: '15px',
                                    paddingLeft: '10.5px'
                                }}
                                required
                                onChange={(e) => setStart(e.target.value)}
                            />
                        </div>
                        <div className="add-event-item">
                            <label>
                                Ngày kết thúc
                                <span className='text-danger' style={{color: 'red'}}>  *</span>
                            </label>
                            <input
                                type="date"
                                className='datepicker'
                                onKeyDown={(e) => {
                                    e.preventDefault();
                                }}
                                style={{
                                    width: '263px',
                                    fontSize: '15px',
                                    paddingLeft: '10.5px'
                                }}
                                required
                                onChange={(e) => setEnd(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='modal-footer'>
                        <button className='add-event-button-submit' type='submit'>Lưu</button>
                    </div>
                </div>
            </form>
        </div>
    ) : "";
}