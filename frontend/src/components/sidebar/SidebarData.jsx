import React from "react";
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as RiIcons from 'react-icons/ri'
import * as IoIcons from 'react-icons/io'

export const SidebarData = [
    {
        title: 'Quản lý dữ liệu',
        path: '/management',
        icon: <AiIcons.AiFillDatabase />,
        iconClosed: <RiIcons.RiArrowDownSFill/>,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        subNav: [
            {
                title: 'Nhân viên',
                path: '/management/users',
                icon: <FaIcons.FaUserFriends />,
            },
            {
                title: 'Loại công văn',
                path: '/management/loai-cong-van',
                icon: <IoIcons.IoIosDocument />,
            },
            {
                title: 'Phòng ban',
                path: '/management/phong-ban',
                icon: <AiIcons.AiFillSchedule />,
            },
            {
                title: 'Chức vụ',
                path: '/management/chuc-vu',
                icon: <RiIcons.RiGitRepositoryFill />,
            },
        ]
    },
    {
        title: 'Công văn đi',
        path: '/cong-van-di',
        icon: <RiIcons.RiArrowRightUpLine />,
    },
    {
        title: 'Công văn đến',
        path: '/cong-van-den',
        icon: <RiIcons.RiArrowLeftDownLine />,
    },
    {
        title: 'Lịch',
        path: '/calendar',
        icon: <AiIcons.AiFillCalendar />,
    },
]