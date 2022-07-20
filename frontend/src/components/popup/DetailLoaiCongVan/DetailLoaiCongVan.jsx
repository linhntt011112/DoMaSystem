import React from "react";
import "./detailLoaiCongVan.css";
import {Box, FormControl, Select, MenuItem} from "@mui/material";
import { Close } from '@material-ui/icons';
import OutsideAlerter from "../Common/OutsideClick";

export default function DetailLoaiCongVan(props) {
    const {loai_cong_van, token } = props;
    
    return(props.trigger && props.mark === loai_cong_van?.id) ? (
        <div className="popup-main">
            <OutsideAlerter setTrigger={props.setTrigger}>    
                <form className="chi-tiet-loai-cong-van-popup-inner">
                    <Close className="close-btn" onClick={() => props.setTrigger(false)}/>
                    <h5 className="modal-title">
                        Chi tiết loại công văn
                    </h5>
                    <div className="modal-body">
                        <div className="loaiCongVanDetailItem">
                            <label>
                                Mã loại
                                <span className='text-danger' style={{color: 'red'}}> *</span>
                            </label>
                            <input 
                                type="text"
                                className="loaiCongVanDetailInput"
                                placeholder={loai_cong_van?.ma_loai}
                                disabled="true"
                            />
                        </div>
                        <div className="loaiCongVanDetailItem">
                            <label>
                                Tên loại công văn
                                <span className='text-danger' style={{color: 'red'}}> *</span>
                            </label>
                            <input 
                                type="text"
                                className="loaiCongVanDetailInput"
                                placeholder={loai_cong_van?.name}
                                disabled="true"
                            />
                        </div>
                        <div className="loaiCongVanDetailItem">
                            <label>
                                Mô tả
                            </label>
                            <textarea 
                                type="text"
                                className="loaiCongVanDetailInput"
                                value={loai_cong_van?.mo_ta}
                                disabled="true"
                            />
                        </div>
                    </div>
                </form>
            </OutsideAlerter>
        </div>
    ) : "";
}