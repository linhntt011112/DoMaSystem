import React, { useState } from "react";
import './changepassword.css';

export default function ChangePassword() {

    const [currentPassword, setCurrentPassword] = useState(null)
    const [newPassword, setNewPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        validatePassword();
        submitChangePassword();
    }

    function validatePassword() {
        console.log(newPassword, confirmPassword);
        if(newPassword !== confirmPassword) {
            alert("Mật khẩu không khớp!")
          return false;
        } else {
          return true;
        }
    }

    const submitChangePassword = () => {
        const body = JSON.stringify({
            
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
        </div>
    );
}