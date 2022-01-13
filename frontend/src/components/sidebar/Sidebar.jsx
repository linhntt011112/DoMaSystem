import React from 'react'
import './sidebar.css'
import { TrendingUp, Group, Assignment, CallMade, ChromeReaderMode, PriorityHigh, Security } from '@material-ui/icons'

export default function Sidebar() {
    return (
        <div className='sidebar'>
            <div className='sidebarWrapper'>
                <div className='sidebarMenu'>
                    <h3 className='sidebarTitle'>
                        <Group className='sidebarIcon'/>
                        Nhân viên
                    </h3>
                </div>
                <div className='sidebarMenu'>
                    <h3 className='sidebarTitle'>
                        <Assignment className='sidebarIcon'/>
                        Loại công văn
                    </h3>
                </div>
                <div className='sidebarMenu'>
                    <h3 className='sidebarTitle'>
                        <CallMade className='sidebarIcon'/>    
                        Công văn đi
                    </h3>
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