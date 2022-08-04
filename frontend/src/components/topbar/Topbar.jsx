import {React, useEffect, useState} from 'react'
import "./topbar.css"
import { NotificationsNone, Settings} from '@material-ui/icons';
import Logo from '../../img/logo_4.png';
import { Link } from "react-router-dom";
import * as backend_config from "../../config/backend"
import NotificationList from './Notifications';

export default function Topbar({user, token}) {
    const [notifications, setNotifications] = useState([]);
    const [showNotificationList, setShowNotificationList] = useState(false);

    const getUnreadNotifications = () => {
        backend_config.makeRequest("GET", backend_config.NOTIFICATION_GET_LIST_UNREAD, token)
          .then((data) => data.json())
          .then((data) => {setNotifications(data)})
    }

    useEffect(() => {
        getUnreadNotifications();
        const myInterval = setInterval(() => {
            getUnreadNotifications();
          }, 5000);
          // clear out the interval using the id when unmounting the component
          return () => clearInterval(myInterval);
    }, [])

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
                    <li className='topbarIconContainer' style={{display: 'block'}}>
                        <div class="dropdown-toggle nav-link">
                            <NotificationsNone onClick={() => {console.log(notifications); setShowNotificationList(!showNotificationList)}}/>
                            {/* {notifications.length > 0 && <NotificationList all_data={notifications} trigger={showNotificationList}></NotificationList>} */}
                            <span className='topIconBadge'>{notifications.length}</span>
                        </div>
                    </li>
                    <li className='change-password-icon-Container'>
                        <Link to={"/change-password/"} className='top-bar-link'>
                            <Settings>
                            </Settings>
                            <span class="change-password-text">Change password</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={"/my-profile/"} className='link'>
                            <div className='user-current'>
                                <span className='user-img'>
                                    <img src="https://www.w3schools.com/howto/img_avatar2.png" alt="" className="topAvatar" />
                                    <span className="status online"></span>
                                </span>    
                                <span className='username'>{user?.name}</span>
                            </div>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}