import React, { useState } from "react";
import "./deletepopup.css";
import { useHistory } from "react-router-dom";
import { Box, FormControl, MenuItem, Select, Button } from "@mui/material";
import { Close } from "@material-ui/icons";
import * as backend_config from "../../../config/backend"
import { toast } from 'react-toastify';

export function DeletePopup(props) {
    const { id, url, token, refreshFunc, message, handleDelete } = props;
    // backend_config.AI_MODEL_VERSION_DELETE_BY_ID.replace('{ai_model_version_id}', id),
    // Are you sure to delete version "{name}" ?

    const noDeleteUserNotify = () => {
      toast.error("Không thể xóa quản trị viên", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: true
      })
    }

    const deleteUserNotify = () => {
      toast.success("Xóa người dùng thành công", {
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
            deleteUserNotify();
          });
        } else {
          response.text().then((text) => {
            // console.log(`Duplicate ${name}!`);
            // alert(`Can not delete ! \n Reason: ${text}`);
            noDeleteUserNotify();
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
  