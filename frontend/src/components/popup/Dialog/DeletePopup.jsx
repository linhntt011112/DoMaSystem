import React, { useState } from "react";
import "./deletepopup.css";
import { useHistory } from "react-router-dom";
import { Box, FormControl, MenuItem, Select, Button } from "@mui/material";
import { Close } from "@material-ui/icons";
import * as backend_config from "../../../config/backend"
import { toast } from 'react-toastify';

export function DeletePopup(props) {
    const { id, url, token, refreshFunc, message, handleDelete } = props;
    let [ successNotifyMessage, failedNotifyMessageCollection ] = [null, null];
    if ('notifyMessage' in props) {
      if ('successNotifyMessage' in props.notifyMessage) successNotifyMessage = props.notifyMessage;
      if ('failedNotifyMessageCollection' in props.notifyMessage) failedNotifyMessageCollection = props.notifyMessage;
    }

    if (successNotifyMessage === null) successNotifyMessage = "Xóa thành công!";
    if (failedNotifyMessageCollection === null) {
      failedNotifyMessageCollection = {}
    }
    const defaultFailedNotifyMessage = "Không thể xóa!";
    
    // backend_config.AI_MODEL_VERSION_DELETE_BY_ID.replace('{ai_model_version_id}', id),
    // Are you sure to delete version "{name}" ?

    const deleteFailedNotify = (message) => {
      toast.error(message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: true
      })
    }

    const deleteSuccessNotify = (message) => {
      toast.success(message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: true
      })
    }

    

  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      backend_config.makeRequest("DELETE", url, token).then((response) => {
        if (response.ok) {
          response.json().then((response_json) => {
            props.setTrigger(false);
            refreshFunc();
            deleteSuccessNotify(successNotifyMessage);
          });
        } else {
          response.text().then((text) => {
            let error = JSON.parse(text).detail;
            console.log(error)
            for (const [errorKey, errorMessage] of Object.entries(failedNotifyMessageCollection)) {
              if (error === errorKey) {
                deleteFailedNotify(errorMessage);
                return;
              }
            }
            deleteFailedNotify(defaultFailedNotifyMessage);
          });
        }
      });
    };
  
    return props.trigger && props.mark === id ? (
      <form className="delete-popup-main" onSubmit={handleSubmit}>
        <Close
          className="delete-close"
          style={{ cursor: "pointer" }}
          onClick={() => props.setTrigger(false)}
        />
        <div className="delete-container">
          <h3 className="delete-title">{message}</h3>
          <div className="delete-buttons">
            <Button
              type="submit"
              className="delete-button-yes"
            >
              Xóa
            </Button>
            <Button
              className="delete-button-no"
              onClick={() => props.setTrigger(false)}
            >
              Hủy
            </Button>
          </div>
        </div>
        
      </form>
    ) : (
      ""
    );
  }
  