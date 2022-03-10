import React from "react";
import "./editLoaiCongVan.css";
import {Box, FormControl, MenuItem, Select} from "@mui/material";
import { Close } from '@material-ui/icons';

export default function EditLoaiCongVan(props) {
    const [loaiTrangThai, setLoaiTrangThai] = React.useState('');

    const handleChangeLoaiTrangThai = (event) => {
        setLoaiTrangThai(event.target.value);
    };

    return (props.trigger) ? (
        <div className="edit-loai-cong-van-popup-main">
            <form className="popup-inner">
                <Close className="close-btn" onClick={() => props.setTrigger(false)}/>
                <div className='addLoaiCongVan'>
                    <h5 className='modal-title'>Chỉnh sửa loại công văn</h5>
                    <div className='modal-body'>
                        <div className='loaiCongVanAddItem'>
                            <label>
                                Mã loại
                                <span className='text-danger' style={{color: 'red'}}>  *</span>
                            </label>
                            <input
                                type="text"
                                className='loaiCongVanAddInput'
                                defaultValue="PD"
                                required
                            />
                        </div>
                        <div className='loaiCongVanAddItem'>
                            <label>
                                Loại công văn
                                <span className='text-danger' style={{color: 'red'}}>  *</span>
                            </label>
                            <input
                                type="text"
                                className='loaiCongVanAddInput'
                                required
                                defaultValue="Phúc đáp"
                            />
                        </div>
                        <div className='loaiCongVanAddItem'>
                            <label>
                                Mô tả
                            </label>
                            <input
                                type="text"
                                className='loaiCongVanAddInput'
                                defaultValue="Phúc đáp"
                            />
                        </div>
                        <div className='loaiCongVanAddItem'>
                            <label>
                                Trạng thái
                            </label>
                            <Box sx={{ }} style={{width: '100%'}}>
                                <FormControl fullWidth>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        defaultValue={1}
                                        onChange={handleChangeLoaiTrangThai}
                                    >
                                        <MenuItem value={1}>Hoạt động 1</MenuItem>
                                        <MenuItem value={2}>Hoạt động 2</MenuItem>
                                        <MenuItem value={3}>Hoạt động 3</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </div>
                    </div>
                    <div className='modal-footer'>
                        <button className='userAddButtonSubmit' type='submit'>Lưu</button>
                    </div>
                </div>
            </form>
        </div>
    ) : "";
}