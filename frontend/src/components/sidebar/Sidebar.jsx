import React from 'react'
import './sidebar.css'
import { Group, Assignment, CallMade, CalendarToday } from '@material-ui/icons'
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import SubMenu from './SubMenu';
import { SidebarDataAdmin } from './SidebarDataAdmin';
import { SidebarDataUser } from './SidebarDataUser';

export default function Sidebar({userPermission, setToken}) {

    let history = useHistory();
    // console.log(user);

    const handleLogoutClick = () => {
    
        setToken(null);
        history.push("/login");
      };

    return (
        <div className='sidebar'>
            <div className='sidebarWrapper'>
                {
                    userPermission === "admin" && 
                    SidebarDataAdmin.map((item, index) => {
                        return <SubMenu item={item} key={index}></SubMenu>
                    })
                }
                {
                    SidebarDataUser.map((item, index) => {
                        return <SubMenu item={item} key={index}></SubMenu>
                    })
                }
                <div className="navigation-logout" onClick={handleLogoutClick}>
                <a className="navigation-logout-button" href="">
                    <img className="navigation-logout-img" src="https://media.istockphoto.com/photos/logout-icon-cyan-blue-glossy-round-button-picture-id613335728?k=20&m=613335728&s=170667a&w=0&h=4_qwfDJG4OPFZOMaYOH6LaYnkrMdJJEjPjr4oa8ewOw="/>
                    <div className="navigation-logout-text">LOGOUT</div>
                </a>
            </div>
            </div>
            
        </div>
    )
}
