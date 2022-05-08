import React from 'react'
import "./topbar.css"
import { NotificationsNone} from '@material-ui/icons';
import Logo from '../../img/logo_4.png';

export default function Topbar({user, setToken}) {
    console.log(user);

    return (
        <div className='topbar'>  
            <div className="topbarWrapper">
                <div className="topLeft">
                    <a href='/dashboard'>
                        <img src={Logo} alt='' className='logoIcon'/>
                    </a>
                    <div className='page-title-box'>
                        <h3>Documentary Management System</h3>
                    </div>
                </div>
                
                <ul className="topRight">
                    <li className='topbarIconContainer'>
                        <div class="dropdown-toggle nav-link">
                            <NotificationsNone/>
                            <span className='topIconBadge'>2</span>
                        </div>
                    </li>
                    <li>
                        <div className='user-current'>
                            <span className='user-img'>
                                <img src="https://www.w3schools.com/howto/img_avatar2.png" alt="" className="topAvatar" />
                                <span className="status online"></span>
                            </span>    
                            <span className='username'>{user?.name}</span>
                        </div>
                        
                    </li>
                    
                </ul>
            </div>
            
        </div>
    )
}