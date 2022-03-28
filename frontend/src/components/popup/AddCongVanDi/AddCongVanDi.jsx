import React from "react";

export default function AddCongVanDi(props) {
    return (props.trigger) ? (
        <div className="popup-main">
            <form className="popup-inner"></form>
        </div>
    ) : "";
}