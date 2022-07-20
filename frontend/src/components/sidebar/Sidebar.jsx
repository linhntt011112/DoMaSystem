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
                    <img className="navigation-logout-img" src="https://pbs.twimg.com/profile_images/378800000639740507/fc0aaad744734cd1dbc8aeb3d51f8729_400x400.jpeg"/>
                    <div className="navigation-logout-text">LOGOUT</div>
                </a>
            </div>
            </div>
            
        </div>
    )
}
