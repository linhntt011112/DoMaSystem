import React from 'react'
import './featuredInfo.css';
import { Group } from '@material-ui/icons';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';

export default function FeaturedInfo() {
    return (
        <div className='featured'>
            <div className='featuredItem'>
                <div className='featuredMoneyContainer'>
                    <span className='featuredMoney'>
                        <Group/>
                    </span>
                    <span className='featuredMoneyRate'>
                        <h3>218</h3>
                        <span>Người dùng</span>
                    </span>
                </div>
            </div>
            <div className='featuredItem'>
                <div className='featuredMoneyContainer'>
                    <span className='featuredMoney'>
                        <DocumentScannerIcon/>
                    </span>
                    <span className='featuredMoneyRate'>
                        <h3>218</h3>
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
                        <h3>218</h3>
                        <span>Công văn đến</span>
                    </span>
                </div>
            </div>
        </div>
    )
}
