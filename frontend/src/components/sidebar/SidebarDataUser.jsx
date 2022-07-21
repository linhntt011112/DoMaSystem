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
            },
            {
                title: 'Chờ duyệt',
                path: '/cong-van-di/cho_duyet',
                icon: <IoIcons.IoIosDocument />,
            },
            {
                title: 'Chờ xử lý',
                path: '/cong-van-di/cho_xu_ly',
                icon: <IoIcons.IoIosDocument />,
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
            },
            {
                title: 'Đã hoàn tất',
                path: '/cong-van-den/da_hoan_tat',
                icon: <IoIcons.IoIosDocument />,
            }
        ]
    },
    {
        title: 'Lịch',
        path: '/calendar',
        icon: <AiIcons.AiFillCalendar />,
    },
]