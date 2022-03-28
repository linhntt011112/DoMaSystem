import React from 'react'
import "./topbar.css"
import { NotificationsNone, Language, Settings, Search } from '@material-ui/icons';
import Logo from '../../img/logo_4.png';
import { useHistory } from 'react-router-dom';

export default function Topbar({user, setToken}) {
    let history = useHistory();
    console.log(user);

    const handleLogoutClick = () => {
    
        setToken(null);
        history.push("/login");
      };


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
                    <button onClick={handleLogoutClick}> Logout</button>
                </div>
                
                <ul className="topRight">
                    <li className='top-nav-search'>
                        <form>
                            <input className='form-control' type="text" placeholder='Search here'></input>
                            <button className='btn' type='Submit'>
                                <Search />
                            </button>
                        </form>
                    </li>
                    <li className='topbarIconContainer'>
                        <div class="dropdown-toggle nav-link">
                            <NotificationsNone/>
                            <span className='topIconBadge'>2</span>
                        </div>
                    </li>
                    <li className='topbarIconContainer'>
                        <Language />
                        <span className='topIconBadge'>2</span>
                    </li>
                    <li className='topbarIconContainer'>
                        <Settings />
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