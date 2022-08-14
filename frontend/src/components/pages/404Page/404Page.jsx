import React from "react";
import './404Page.css';

export default function PageNotFound() {
 return (
    <div className="mainbox">
        <div className="err">4</div>
        <div className="err1">0</div>
        <div className="err2">4</div>
        <div className="msg">Maybe this page moved? Got deleted? Is hiding out in quarantine? Never existed in the first place?<p>Let's go <a href="/dashboard">home</a> and try from there.</p></div>
    </div>
 );
}