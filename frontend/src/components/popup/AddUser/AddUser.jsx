import React from 'react'
import "./addUser.css";
import { Close } from '@material-ui/icons';

export default function AddUser(props) {
    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <Close className="close-btn" onClick={() => props.setTrigger(false)}/>
                { props.children }
            </div>
        </div>
    ) : "";
};
