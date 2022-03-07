import React from 'react'
import './sidebar.css'
import { TrendingUp, Group, Assignment, CallMade, ChromeReaderMode, PriorityHigh, Security } from '@material-ui/icons'
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
                    <ul className='sidebarList'>
                        <li className='sidebarListItem'>
                            <ChromeReaderMode className='sidebarIcon'/>
                            Tất cả công văn
                        </li>
                        <li className='sidebarListItem'>
                            <Assignment className='sidebarIcon'/>
                            Loại công văn
                        </li>
                        <li className='sidebarListItem'>
                            <PriorityHigh className='sidebarIcon'/>
                            Mức độ khẩn cấp
                        </li>
                        <li className='sidebarListItem'>
                            <Security className='sidebarIcon'/>
                            Mức độ bảo mật
                        </li>
                        <li className='sidebarListItem'>
                            <TrendingUp className='sidebarIcon'/>
                            Tình trạng xử lý
                        </li>
                    </ul>
                </div>
                <div className='sidebarMenu'>
                    <h3 className='sidebarTitle'>Công văn đến</h3>
                    <ul className='sidebarList'>
                        <li className='sidebarListItem'>
                            <ChromeReaderMode className='sidebarIcon'/>
                            Tất cả công văn
                        </li>
                        <li className='sidebarListItem'>
                            <Assignment className='sidebarIcon'/>
                            Loại công văn
                        </li>
                        <li className='sidebarListItem'>
                            <PriorityHigh className='sidebarIcon'/>
                            Mức độ khẩn cấp
                        </li>
                        <li className='sidebarListItem'>
                            <Security className='sidebarIcon'/>
                            Mức độ bảo mật
                        </li>
                        <li className='sidebarListItem'>
                            <TrendingUp className='sidebarIcon'/>
                            Tình trạng xử lý
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
