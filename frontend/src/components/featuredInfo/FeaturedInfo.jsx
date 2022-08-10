import {React, useState, useEffect} from 'react'
import './featuredInfo.css';
import { Group } from '@material-ui/icons';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import * as backend_config from "../../config/backend"

export default function FeaturedInfo({userPermission, token}) {

    let numOf = {
        Users: useState(0),
        Cvdi: useState(0),
        Cvden: useState(0)
    }

    const urlOf = {
        Users: backend_config.USER_GET_LIST_API + "?count=true",
        Cvdi: backend_config.CONG_VAN_GET_LIST_CVDI + "?count=true",
        Cvden: backend_config.CONG_VAN_GET_LIST_CVDEN + "?count=true"
    }

    if (userPermission !== "admin"){
        delete numOf.Users
        delete urlOf.Users
    }


    useEffect(() => {
        for (const [tp, url] of Object.entries(urlOf)){
                    backend_config.makeRequest("GET", url, token)
                    .then((data) => data.json())
                    .then((data) => {
                        numOf[tp][1](data)
                        // console.log(data, url,  numOf[tp])
                    })
                }
    }, [])

    return (
        <div className='featured'>
            {
                userPermission === "admin" && 
                <div className='featuredItem'>
                    <div className='featuredMoneyContainer'>
                        <span className='featuredMoney'>
                            <Group/>
                        </span>
                        <span className='featuredMoneyRate'>
                            <h3>{numOf["Users"][0]}</h3>
                            <span>Người dùng</span>
                        </span>
                    </div>
                </div>
            }
            <div className='featuredItem'>
                <div className='featuredMoneyContainer'>
                    <span className='featuredMoney'>
                        <DocumentScannerIcon/>
                    </span>
                    <span className='featuredMoneyRate'>
                        <h3>{numOf["Cvdi"][0]}</h3>
                        <span>Công văn đi</span>
                    </span>
                </div>
            </div>
            <div className='featuredItem'>
                <div className='featuredMoneyContainer'>
                    <span className='featuredMoney'>
                        <DocumentScannerIcon/>
                    </span>
                    <span className='featuredMoneyRate'>
                        <h3>{numOf["Cvden"][0]}</h3>
                        <span>Công văn đến</span>
                    </span>
                </div>
            </div>
        </div>
    )
}
