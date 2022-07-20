import React, {useState} from "react";
import { Link } from "react-router-dom";
import './submenu.css';

export default function SubMenu({item}) {
    const [subnav, setSubNav] = useState(false);

    const showSubNav = (e) => {
        e.preventDefault();
        setSubNav(!subnav);
        // console.log(subnav);
    }

    return (
        <>
            <Link className="sub-menu-link" to={item.path} onClick={item.subNav && showSubNav}>
                <div style={{display: 'flex'}}>
                    <div style={{margin: '5px 0px 0px 0px'}}>{item.icon}</div>
                    <h3 className="sub-menu-span">{item.title}</h3>
                </div>
                <div>
                    {
                        item.subNav && subnav 
                        ? item.iconOpened 
                        : item.subNav 
                        ? item.iconClosed 
                        : null}
                </div>
            </Link>
            {subnav && item.subNav.map((item, index) => {
                return (
                    <Link className="dropdown-link" to={item.path} key={index}>
                        {item.icon}
                        <span className="sub-menu-span">{item.title}</span>
                    </Link>
                )
            })}
        </>
    )
}