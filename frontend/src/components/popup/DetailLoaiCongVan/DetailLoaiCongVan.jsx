import React from "react";
import "./detailLoaiCongVan.css";
import {Box, FormControl, Select, MenuItem} from "@mui/material";

export default function DetailLoaiCongVan() {
    
    return(
        <div className="detailLoaiCongVan">
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
                        Loại công văn
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
                            >
                                <MenuItem value={1}>Hoạt động 1</MenuItem>
                                <MenuItem value={2}>Hoạt động 2</MenuItem>
                                <MenuItem value={3}>Hoạt động 3</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </div>
            </div>
        </div>
    )
    
}