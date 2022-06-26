import React from "react";
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as RiIcons from 'react-icons/ri'
import * as IoIcons from 'react-icons/io'

export const SidebarDataUser = [
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