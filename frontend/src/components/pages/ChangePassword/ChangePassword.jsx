import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import './changepassword.css';
import { ToastContainer, toast } from 'react-toastify';
import * as backend_config from "../../../config/backend"
import { useToken } from '../../../context/TokenContext';

    

export default function ChangePassword(props) {
    const {token, setToken} = props;
    let history = useHistory();

    const [currentPassword, setCurrentPassword] = useState(null)
    const [newPassword, setNewPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validatePassword()) submitChangePassword();
    }

    function validatePassword() {
        if(newPassword !== confirmPassword) {
            validatePasswordFail();
            return false;
        } else {
            return true;
        }
    }

    const changePasswordSuccess = () => {
        toast.success(<div>Thay đổi mật khẩu thành công</div>, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: true
        })
    }

    const changePasswordFail = () => {
        toast.error(<div>Sai mật khẩu hiện tại!</div>, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: true
        })
    }

    const validatePasswordFail = () => {
        toast.error(<div>Mật khẩu không khớp!</div>, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: true
        })
    }

    const submitChangePassword = () => {
        const body = JSON.stringify({
            current_plain_password: currentPassword,
            new_plain_password: newPassword
        })
        // console.log(body)

        backend_config.makeRequest("PUT", 
            backend_config.USER_PUT_CHANGE_PASSWORD, 
            token,
            body
        )
        .then((response) => {
            // console.log(body);
            if (response.ok){
                // console.log(body);
                response.json().then((response_json) => {
                    console.log(response_json);
                    // setToken(null);
                    changePasswordSuccess();
                    setTimeout(() => history.push("/dashboard"), 2000);
                })
            }
            else {
                response.text().then((text) => {
                    let error = JSON.parse(text).detail;
                    switch (error) {
                        case "Wrong password!": 
                            changePasswordFail();
                            return;
                        default:
                            alert(text);
                            return;
                    }
                })
            }
        })
    }

    return (
        <div className="change-password-main">
            <div className="change-password-cardStyle">
                <form action="" name="change-password-Form" id="change-password-Form" onSubmit={handleSubmit}>
                    <h2 className="change-password-formTitle">
                        Thay đổi mật khẩu
                    </h2>

                    <div className="change-password-inputDiv">
                        <label className="change-password-inputLabel" for="password">Mật khẩu hiện tại</label>
                        <input 
                            type="password" 
                            id="currentPassword" 
                            className="change-password-input" 
                            required 
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                    </div>
            
                    <div className="change-password-inputDiv">
                        <label className="change-password-inputLabel" for="password">Mật khẩu mới</label>
                        <input 
                            type="password" 
                            id="newPassword" 
                            className="change-password-input" 
                            onChange={(e) => setNewPassword(e.target.value)} 
                            required />
                    </div>
            
                    <div className="change-password-inputDiv">
                        <label className="change-password-inputLabel" for="confirmPassword">Xác nhận mật khẩu mới</label>
                        <input type="password" id="confirmPassword" className="change-password-input" onChange={(e) => setConfirmPassword(e.target.value)} required/>
                    </div>
            
                    <div className="change-password-buttonWrapper">
                        <button type="submit" id="submitButton" className="change-password-submitButton pure-button pure-button-primary">
                            <span>Đổi mật khẩu</span>
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer/>
        </div>
    );
}