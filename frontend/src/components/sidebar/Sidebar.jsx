import React from 'react'
import './sidebar.css'
import { TrendingUp, Group, Assignment, CallMade, CalendarToday } from '@material-ui/icons'
import { Link } from "react-router-dom";

export default function Sidebar() {
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
        </div>
    )
}
