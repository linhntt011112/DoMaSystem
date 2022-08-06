import React, { Component, useState, useRef } from "react";
import EditEventPopup from "./EditEventPopup";
import * as backend_config from '../../../config/backend'
import { useUserInfo } from "../../../context/TokenContext";

export default function Event(event) {
  // const {token, eventUser} = props;
  const [editButtonPopup, setEditButtonPopup] = useState(false);
  const [mark, setMark] = useState(null);
  const {user} = useUserInfo();
  const [allEvents, setAllEvents] = useState([]);

  const refreshFunc = () => {
    // backend_config.makeRequest("GET", backend_config.LICH_GET_LIST_BY_USER_ID.replace("{user_id}", user.id), token)
    //   .then((data) => data.json())
    //   .then((data) => {
    //     setAllEvents(data)
    // })
}

  return (
    <div>
      <div onClick={() => {setMark(event.id); setEditButtonPopup(true)}}>{event.title}</div>
      <EditEventPopup 
        trigger={editButtonPopup} 
        setTrigger={setEditButtonPopup}
        // token={token}
        // eventUser={event}
        // mark={mark}
        // refreshFunc={refreshFunc}
      ></EditEventPopup>
    </div>
  );
}