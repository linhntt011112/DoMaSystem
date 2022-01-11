import React from 'react'
import './sidebar.css'
import { LineStyle, Timeline,TrendingUp } from '@material-ui/icons'

export default function Sidebar() {
    return (
        <div className='sidebar'>
            <div className='sidebarWrapper'>
                <div className='sidebarMenu'>
                    <h3 className='sidebarTitle'>Nhân viên</h3>
                </div>
                <div className='sidebarMenu'>
                    <h3 className='sidebarTitle'>Loại công văn</h3>
                </div>
                <div className='sidebarMenu'>
                    <h3 className='sidebarTitle'>Công văn đi</h3>
                    <ul className='sidebarList'>
                        <li className='sidebarListItem'>
                            <LineStyle className='sidebarIcon'/>
                            Tất cả công văn
                        </li>
                        <li className='sidebarListItem'>
                            <Timeline className='sidebarIcon'/>
                            Loại công văn
                        </li>
                        <li className='sidebarListItem'>
                            <TrendingUp className='sidebarIcon'/>
                            Mức độ khẩn cấp
                        </li>
                        <li className='sidebarListItem'>
                            <TrendingUp className='sidebarIcon'/>
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
                            <LineStyle className='sidebarIcon'/>
                            Tất cả công văn
                        </li>
                        <li className='sidebarListItem'>
                            <Timeline className='sidebarIcon'/>
                            Loại công văn
                        </li>
                        <li className='sidebarListItem'>
                            <TrendingUp className='sidebarIcon'/>
                            Mức độ khẩn cấp
                        </li>
                        <li className='sidebarListItem'>
                            <TrendingUp className='sidebarIcon'/>
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
