import React from 'react'
import './sidebar.css'
import { Group, Assignment, CallMade, CalendarToday } from '@material-ui/icons'
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';

export default function Sidebar({user, setToken}) {

    let history = useHistory();
    console.log(user);

    const handleLogoutClick = () => {
    
        setToken(null);
        history.push("/login");
      };

    return (
        <div className='sidebar'>
            <div className='sidebarWrapper'>
                <div className='sidebarMenu'>
                    <Link to={"/dashboard/users/"} className='link'>
                        <h3 className='sidebarTitle'>
                            <Group className='sidebarIcon'/>
                            Nhân viên
                        </h3>
                    </Link> 
                </div>
                <div className='sidebarMenu'>
                    <Link to={"/dashboard/loai-cong-van/"} className='link'>
                        <h3 className='sidebarTitle'>
                            <Assignment className='sidebarIcon'/>
                            Loại công văn
                        </h3>
                    </Link>
                </div>
                <div className='sidebarMenu'>
                    <Link to={"/dashboard/cong-van-di/"} className='link'> 
                        <h3 className='sidebarTitle'>
                            <CallMade className='sidebarIcon'/>    
                            Công văn đi
                        </h3>
                    </Link>
                </div>
                <div className='sidebarMenu'>
                    <Link to={"/dashboard/cong-van-den/"} className='link'> 
                        <h3 className='sidebarTitle'>
                            <CallMade className='sidebarIcon'/>    
                            Công văn đến
                        </h3>
                    </Link>
                </div>
                <div className='sidebarMenu'>
                    <Link to={"/dashboard/calendar/"} className='link'> 
                        <h3 className='sidebarTitle'>
                            <CalendarToday className='sidebarIcon'/>    
                            Lịch
                        </h3>
                    </Link>
                </div>
            </div>
            <div className="navigation-logout" onClick={handleLogoutClick}>
                <a className="navigation-logout-button" href="">
                    <img className="navigation-logout-img" src="https://pbs.twimg.com/profile_images/378800000639740507/fc0aaad744734cd1dbc8aeb3d51f8729_400x400.jpeg"/>
                    <div className="navigation-logout-text">LOGOUT</div>
                </a>
            </div>
        </div>
    )
}
