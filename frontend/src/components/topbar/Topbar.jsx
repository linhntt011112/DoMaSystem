import React from 'react'
import "./topbar.css"
import { NotificationsNone, Language, Settings } from '@material-ui/icons';
import Logo from '../../img/logo_4.png';

export default function Topbar() {
    return (
        <div className='topbar'>
            <div className="topbarWrapper">
                <div className="topLeft">
                    <img src={Logo} alt='' className='logoIcon'/>
                </div>
                <div className="topRight">
                    <div className='topbarIconContainer'>
                        <NotificationsNone />
                        <span className='topIconBadge'>2</span>
                    </div>
                    <div className='topbarIconContainer'>
                        <Language />
                        <span className='topIconBadge'>2</span>
                    </div>
                    <div className='topbarIconContainer'>
                        <Settings />
                    </div>
                    <img src="https://www.w3schools.com/howto/img_avatar2.png" alt="" className="topAvatar" />
                </div>
            </div>
        </div>
    )
}
