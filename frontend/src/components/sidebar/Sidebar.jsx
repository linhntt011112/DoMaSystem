import {React, useState, useEffect} from 'react'
import './sidebar.css'
import { Group, Assignment, CallMade, CalendarToday } from '@material-ui/icons'
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import SubMenu from './SubMenu';
import { SidebarDataAdmin } from './SidebarDataAdmin'

import * as AiIcons from 'react-icons/ai'
import * as RiIcons from 'react-icons/ri'
import * as IoIcons from 'react-icons/io'

import * as backend_config from "../../config/backend"



export default function Sidebar({updateSidebar, user, userPermission, token, setToken}) {
    let history = useHistory();

    const handleLogoutClick = () => {
        setToken(null);
        history.push("/login");
    };

    // const [num_chua_duyet, setNum_chua_duyet] = useState(null);
    // const [num_cho_duyet, setNum_cho_duyet] = useState(null);
    // const [num_cho_xu_ly, setNum_cho_xu_ly] = useState(null);
    // const [num_chua_xu_ly, setNum_chua_xu_ly] = useState(null);
    // const [num_dang_theo_doi, setNum_dang_theo_doi] = useState(null);

    const numOf = {
        chua_duyet: useState(0),
        cho_duyet: useState(0),
        cho_xu_ly: useState(0),
        chua_xu_ly: useState(0),
        dang_theo_doi: useState(0)
    }

    const urlOf = {
        chua_duyet: backend_config.CONG_VAN_GET_LIST_CHUA_DUYET + "?count=true",
        cho_duyet: backend_config.CONG_VAN_GET_LIST_CHO_DUYET + "?count=true",
        cho_xu_ly: backend_config.CONG_VAN_GET_LIST_CHO_XU_LY + "?count=true",
        chua_xu_ly: backend_config.CONG_VAN_GET_LIST_CHUA_XU_LY + "?count=true",
        dang_theo_doi: backend_config.CONG_VAN_DEN_GET_LIST_DANG_THEO_DOI + "?count=true"
    }

    // useEffect(() => {
    //     for (const [tp, url] of Object.entries(urlOf)){
    //         backend_config.makeRequest("GET", urlOf[tp], token)
    //         .then((data) => data.json())
    //         .then((data) => {
    //             numOf[tp][1](data)
    //         })
    //     }
    //     console.log(updateSidebar)
    
    // }, [])

    let SidebarDataUser = [
        {
            title: 'Công văn đi',
            path: '/cong-van-di',
            icon: <RiIcons.RiArrowRightUpLine />,
            iconClosed: <RiIcons.RiArrowDownSFill/>,
            iconOpened: <RiIcons.RiArrowUpSFill />,
            subNav: [
                {
                    title: 'Thêm mới',
                    path: '/cong-van-di/add_cvdi',
                    icon: <IoIcons.IoIosDocument />,
                },
                {
                    title: 'Chưa duyệt',
                    path: '/cong-van-di/chua_duyet',
                    icon: <IoIcons.IoIosDocument />,
                    // number: numOf.chua_duyet[0],
                },
                {
                    title: 'Chờ duyệt',
                    path: '/cong-van-di/cho_duyet',
                    icon: <IoIcons.IoIosDocument />,
                    // number: numOf.cho_duyet[0],
                },
                {
                    title: 'Chờ xử lý',
                    path: '/cong-van-di/cho_xu_ly',
                    icon: <IoIcons.IoIosDocument />,
                    // number: numOf.cho_xu_ly[0],
                },
                {
                    title: 'Đã hoàn tất',
                    path: '/cong-van-di/da_hoan_tat',
                    icon: <IoIcons.IoIosDocument />,
                }
            ]
        },
        {
            title: 'Công văn đến',
            path: '/cong-van-den',
            icon: <RiIcons.RiArrowLeftDownLine />,
            iconClosed: <RiIcons.RiArrowDownSFill/>,
            iconOpened: <RiIcons.RiArrowUpSFill />,
            subNav: [
                {
                    title: 'Chưa xử lý',
                    path: '/cong-van-den/chua_xu_ly',
                    icon: <IoIcons.IoIosDocument />,
                    // number: numOf.chua_xu_ly[0],
                },
                {
                    title: 'Đã hoàn tất',
                    path: '/cong-van-den/da_hoan_tat',
                    icon: <IoIcons.IoIosDocument />,
                }
            ]
        },
        {
            title: 'Công văn đang theo dõi',
            path: '/cong-van/dang_theo_doi',
            icon: <IoIcons.IoIosDocument />,
            // number: numOf.dang_theo_doi[0],
        },
        {
            title: 'Lịch',
            path: '/calendar',
            icon: <AiIcons.AiFillCalendar />,
        },
    ]


    return (
        <div className='sidebar'>
            <div className='sidebarWrapper'>
                {
                    userPermission === "admin" && 
                    SidebarDataAdmin.map((item, index) => {
                        return <SubMenu item={item} key={index}></SubMenu>
                    })
                }
                {
                    SidebarDataUser.map((item, index) => {
                        return <SubMenu item={item} key={index} ></SubMenu>
                    })
                }
                <div className="navigation-logout" onClick={handleLogoutClick}>
                <a className="navigation-logout-button" href="">
                    <img className="navigation-logout-img" src="https://media.istockphoto.com/photos/logout-icon-cyan-blue-glossy-round-button-picture-id613335728?k=20&m=613335728&s=170667a&w=0&h=4_qwfDJG4OPFZOMaYOH6LaYnkrMdJJEjPjr4oa8ewOw="/>
                    <div className="navigation-logout-text">LOGOUT</div>
                </a>
            </div>
            </div>
            
        </div>
    )
}
