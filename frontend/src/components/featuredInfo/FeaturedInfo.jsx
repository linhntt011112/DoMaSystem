import React from 'react'
import './featuredInfo.css';
import { ArrowDownward, Group } from '@material-ui/icons';

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
                        <span>Employees</span>
                    </span>
                </div>
            </div>
            <div className='featuredItem'>
                <div className='featuredMoneyContainer'>
                    <span className='featuredMoney'>
                        <Group/>
                    </span>
                    <span className='featuredMoneyRate'>
                        <h3>218</h3>
                        <span>Documents</span>
                    </span>
                </div>
            </div>
            <div className='featuredItem'>
                <div className='featuredMoneyContainer'>
                    <span className='featuredMoney'>
                        <Group/>
                    </span>
                    <span className='featuredMoneyRate'>
                        <h3>218</h3>
                        <span>Documents</span>
                    </span>
                </div>
            </div>
            <div className='featuredItem'>
                <div className='featuredMoneyContainer'>
                    <span className='featuredMoney'>
                        <Group/>
                    </span>
                    <span className='featuredMoneyRate'>
                        <h3>218</h3>
                        <span>Documents</span>
                    </span>
                </div>
            </div>
        </div>
    )
}
