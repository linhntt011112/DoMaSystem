import React from "react";
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as RiIcons from 'react-icons/ri'
import * as IoIcons from 'react-icons/io'

export const SidebarData = [
    {
        title: 'Cong van den',
        path: '/cong-van-den',
        icon: <AiIcons.AiFillHome />,
        iconClosed: <RiIcons.RiArrowDownSFill/>,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        subNav: [
            {
                title: 'Tat ca cong van',
                path: '/cong-van-den/all',
                icon: <IoIcons.IoIosPaper />,
            },
            {
                title: 'Loai cong van',
                path: '/cong-van-den/loai-cong-van',
                icon: <IoIcons.IoIosPaper />,
            },
        ]
    }
]