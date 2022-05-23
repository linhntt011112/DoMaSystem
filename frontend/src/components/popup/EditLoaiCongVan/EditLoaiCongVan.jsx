import React from "react";
import "./editLoaiCongVan.css";
import {Box, FormControl, MenuItem, Select} from "@mui/material";
import { Close } from '@material-ui/icons';
import { toast } from 'react-toastify';

export default function EditLoaiCongVan(props) {
    const [trang_thai, setTrangThai] = React.useState(null);
    const [ma_loai, setMaLoai] = React.useState(null);
    const [ten_loai, setTenLoai] = React.useState(null);
    const [mo_ta, setMoTa] = React.useState(null);

    const handleChangeTrangThai = (event) => {
        setTrangThai(event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        submitEditLoaiCongVan();
        props.setTrigger(false);
        editLoaiCongVanSuccessNotify();
    }

    const editLoaiCongVanSuccessNotify = (response_json) => {
        toast.success(<div>Lưu dữ liệu thành công!</div>, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: true
        })
    }

    const submitEditLoaiCongVan = () => {
        const body = JSON.stringify({
            id: ma_loai,
            name: ten_loai,
            trang_thai: trang_thai === 1 ? "hoat_dong" : "khong_hoat_dong",
            mo_ta: mo_ta
        })
        console.log(body)
        setTrangThai(null);
    }

    return (props.trigger) ? (
        <div className="popup-main">
            <form className="edit-loai-cong-van-popup-inner" onSubmit={handleSubmit}>
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
                                onChange={(e) => setMaLoai(e.target.value)}
                            />
                        </div>
                        <div className='loaiCongVanAddItem'>
                            <label>
                                Tên loại công văn
                                <span className='text-danger' style={{color: 'red'}}>  *</span>
                            </label>
                            <input
                                type="text"
                                className='loaiCongVanAddInput'
                                required
                                defaultValue="Phúc đáp"
                                onChange={(e) => setTenLoai(e.target.value)}
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
                                onChange={(e) => setMoTa(e.target.value)}
                            />
                        </div>
                        <div className='loaiCongVanAddItem'>
                            <label>
                                Trạng thái
                                <span className='text-danger' style={{color: 'red'}}>  *</span>
                            </label>
                            <Box sx={{ }} style={{width: '100%'}}>
                                <FormControl fullWidth>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        defaultValue={1}
                                        onChange={handleChangeTrangThai}
                                        style={{height: '36px'}}
                                    >
                                        <MenuItem value={1}>Hoạt động</MenuItem>
                                        <MenuItem value={2}>Không hoạt động</MenuItem>
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