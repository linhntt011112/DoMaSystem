import React from 'react'
import "./popup.css";
import { Close } from '@material-ui/icons';

export default function Popup(props) {
    return (props.trigger) ? (
        <div className="popup-main">
            <div className="popup-inner">
                <Close className="close-btn" onClick={() => props.setTrigger(false)}/>
                { props.children }
            </div>
        </div>
    ) : "";
};
