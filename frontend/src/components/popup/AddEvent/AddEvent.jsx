import React from "react";
import "./AddEvent.css";
import {Box, FormControl, MenuItem, Select} from "@mui/material";
import { Close } from '@material-ui/icons';
import { toast } from 'react-toastify';

export default function AddEvent(props) {
    const {token} = props;

    const addEventSuccessNotify = () => {
        toast.success(<div>Thêm sự kiện thành công!</div>, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: true
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addEventSuccessNotify();
        props.setTrigger(false);
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
                                // onChange={(e) => setMaLoai(e.target.value)}
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
                                // onChange={(e) => setMaLoai(e.target.value)}
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
                                // onChange={(e) => setMaLoai(e.target.value)}
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