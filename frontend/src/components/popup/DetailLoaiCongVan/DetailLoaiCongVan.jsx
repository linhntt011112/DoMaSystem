import React from "react";
import "./detailLoaiCongVan.css";
import {Box, FormControl, Select, MenuItem} from "@mui/material";
import { Close } from '@material-ui/icons';
import OutsideAlerter from "../Common/OutsideClick";

export default function DetailLoaiCongVan(props) {
    
    return(props.trigger) ? (
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
                                placeholder="PD"
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
                                placeholder="Phuc dap"
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
                                value="Lâu nay nghe mọi người khen nương nương này sang, nương nương kia sang mà vẫn không xác định được tiêu chuẩn sang của quý vị nó như thế nào."
                                disabled="true"
                            />
                        </div>
                        <div className="loaiCongVanDetailItem">
                            <label>
                                Trạng thái
                                <span className='text-danger' style={{color: 'red'}}> *</span>
                            </label>
                            <Box sx={{ }} style={{width: '100%'}}>
                                <FormControl fullWidth>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        // value={loaiTrangThai}
                                        // onChange={handleChangeLoaiTrangThai}
                                        defaultValue={3}
                                        disabled="true"
                                        style={{height: '36px'}}
                                    >
                                        <MenuItem value={1}>Hoạt động 1</MenuItem>
                                        <MenuItem value={2}>Hoạt động 2</MenuItem>
                                        <MenuItem value={3}>Hoạt động 3</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </div>
                    </div>
                </form>
            </OutsideAlerter>
        </div>
    ) : "";
}