import React from "react";
import "./addLoaiCongVan.css";
import {Box, FormControl, MenuItem, Select} from "@mui/material";
import { Close } from '@material-ui/icons';

export default function AddLoaiCongVan(props) {
    const [trang_thai, setTrangThai] = React.useState('');
    const [ma_loai, setMaLoai] = React.useState('');
    const [loai_cong_van, setLoaiCongVan] = React.useState('');
    const [mo_ta, setMoTa] = React.useState('');

    const handleChangeTrangThai = (event) => {
        setTrangThai(event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        submitAddLoaiCongVan();
        props.setTrigger(false);
    }

    const submitAddLoaiCongVan = async() => {
        let form = new FormData();
        form.append("ma_loai", ma_loai);
        form.append("loai_cong_van", loai_cong_van);
        form.append("mo_ta", mo_ta);
        form.append("trang_thai", trang_thai);
    }

    return (props.trigger) ? (
        <div className="add-loai-cong-van-popup-main" style={{top: '15px'}}>
            <form className="popup-inner" onSubmit={handleSubmit}>
                <Close className="close-btn" onClick={() => props.setTrigger(false)}/>
                <div className='addLoaiCongVan'>
                    <h5 className='modal-title'>Thêm mới loại công văn</h5>
                    <div className='modal-body'>
                        <div className='loaiCongVanAddItem'>
                            <label>
                                Mã loại
                                <span className='text-danger' style={{color: 'red'}}>  *</span>
                            </label>
                            <input
                                type="text"
                                className='loaiCongVanAddInput'
                                required
                                onChange={(e) => setMaLoai(e.target.value)}
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
                                onChange={(e) => setLoaiCongVan(e.target.value)}
                            />
                        </div>
                        <div className='loaiCongVanAddItem'>
                            <label>
                                Mô tả
                            </label>
                            <input
                                type="text"
                                className='loaiCongVanAddInput'
                                onChange={(e) => setMoTa(e.target.value)}
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
                                        value={trang_thai}
                                        onChange={handleChangeTrangThai}
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
                    <div className='modal-footer'>
                        <button className='userAddButtonSubmit' type='submit'>Lưu</button>
                    </div>
                </div>
            </form>
        </div>
    ) : "";
}