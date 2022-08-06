import {React, useEffect, useState, useCallback} from 'react'
import "./topbar.css"
import { useHistory } from 'react-router-dom';
import { NotificationsNone, Settings} from '@material-ui/icons';
import Logo from '../../img/logo_4.png';
// import defaultAvatar from "../../img/img_avatar2.png"
import { Link } from "react-router-dom";
import * as backend_config from "../../config/backend"
import NotificationList from './Notifications';
import * as Pusher from 'pusher-js';
import Notifications from "react-notifications-menu";

export default function Topbar({user, token}) {
    const [notifications, setNotifications] = useState([]);
    const history = useHistory();
    const [showNotificationList, setShowNotificationList] = useState(false);
    const notificationEvents = ["create_cong_van", "update_cong_van", "duyet_cong_van", "xu_ly_cong_van", "add_trao_doi_cong_van"]

    const convert_data = (data) =>{
        const time = new Date(data.create_on)
        const result= { 
            id: data.id,
            image: "https://www.w3schools.com/howto/img_avatar2.png" ,
            message: data["template"].replace("{{actor_id}}", data["{{actor_id}}"]). replace("{{entity_id}}", data["{{entity_id}}"]),
            _detailPage: data.entity_type === "cong_van" ? `/cong-van-di/${data["{{entity_id}}"]}`: null,
            receivedTime: time.toLocaleString("vi-VN")
        }
        return result
    }

    const getUnreadNotifications = () => {
        backend_config.makeRequest("GET", backend_config.NOTIFICATION_GET_LIST_UNREAD, token)
          .then((data) => data.json())
          .then((data) => {

            setNotifications(data.map(convert_data))
        })
    }

    const read_all_notifications = () => {
        backend_config.makeRequest("GET", backend_config.NOTIFICATION_GET_READ_ALL, token)
          .then((data) => data.json())
          .then((data) => {
            setNotifications([]);
        })
    }

    const onclick_notification = (data) => {
        backend_config.makeRequest("GET", backend_config.NOTIFICATION_GET_READ_ID.replace("{id}", data.id), token)
          .then((_) => _.json())
          .then((_) => {
            history.push(data._detailPage);
            getUnreadNotifications();
        })
    }

    useEffect(() => {
        getUnreadNotifications()

        const pusher = new Pusher("0ec381f4de9bc7aa5e7b", {
            cluster: 'ap1'
        });
        
        // console.log(user.id)
        var channel = pusher.subscribe(user.id.toString());

        channel.bind_global((eventName, data) => {
            // console.log(eventName, data)
            // console.log(notifications.concat([data]))
            if (data?.id) setNotifications([convert_data(data), ...notifications]);
        });

        return () => {
            channel.unbind();
        };
    }, []);

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
                    {/* <Notifications
                        data={notifications}
                        header={{
                        title: "Thông báo",
                        option: { text: "Xem tất cả", onClick: () => console.log("Clicked") }
                        }}
                        // markAsRead={(data) => {
                        //     console.log(data);
                        // }}
                    /> */}
                        <Notifications
                            data={notifications}
                            cardOption={onclick_notification}
                            header={{
                            title: "Thông báo",
                            option: { text: "Xem tất cả", onClick: read_all_notifications }
                            }}
                            markAsRead={(data) => {
                                console.log(data);
                            }}
                        />
                            

                    {/* <li className='topbarIconContainer' style={{display: 'block'}}>
                        <div class="dropdown-toggle nav-link">
                            <NotificationsNone onClick={() => {console.log(notifications); setShowNotificationList(!showNotificationList)}}/>
                            
                            <span className='topIconBadge'>{notifications.length}</span>
                        </div>
                    </li> */}
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

            {notifications.length > 0 && <NotificationList all_data={notifications} trigger={showNotificationList}></NotificationList>}
        </div>
    )
}