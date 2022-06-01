import React from "react";
import "./addLoaiCongVan.css";
import {Box, FormControl, MenuItem, Select} from "@mui/material";
import { Close } from '@material-ui/icons';
import { toast } from 'react-toastify';
import * as backend_config from '../../../config/backend'

export default function AddLoaiCongVan(props) {
    const {token, refreshFunc} = props;

    const [trang_thai, setTrangThai] = React.useState(null);
    const [ma_loai, setMaLoai] = React.useState(null);
    const [ten_loai, setTenLoai] = React.useState(null);
    const [mo_ta, setMoTa] = React.useState(null);

    const handleChangeTrangThai = (event) => {
        setTrangThai(event.target.value);
    };

    const addLoaiCongVanSuccessNotify = (response_json) => {
        toast.success(<div>Thêm dữ liệu thành công!</div>, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: true
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        submitAddLoaiCongVan();
        props.setTrigger(false);
    }

    const submitAddLoaiCongVan = () => {
        const body = JSON.stringify({
            ma_loai: ma_loai,
            name: ten_loai,
            trang_thai: trang_thai === 1 ? "hoat_dong" : "khong_hoat_dong",
            mo_ta: mo_ta
        })
        console.log(body);

        backend_config.makeRequest("POST", 
            backend_config.LOAI_CONG_VAN_POST_CREATE, 
            token,
            body
        )
        .then((response) => {
            if (response.ok){
                response.json().then((response_json) => {
                    addLoaiCongVanSuccessNotify(response_json);
                    props.setTrigger(false);

                    refreshFunc();
                    setTenLoai(null);
                    setMaLoai(null);
                    setMoTa(null);
                    setTrangThai(null);
                })
            }
            else {
                response.text().then((text) => {
                    let error = JSON.parse(text).detail;
                    switch (error) {
                        // case "Duplicate ten_tai_khoan!": 
                        //     addUserNotifyDuplicateUsername();
                        //     return;
                        default:
                            alert(text);
                            return;
                    }
                })
            }
        })

    }

    return (props.trigger) ? (
        <div className="popup-main">
            <form className="add-loai-cong-van-popup-inner" onSubmit={handleSubmit}>
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
                                Tên loại công văn
                                <span className='text-danger' style={{color: 'red'}}>  *</span>
                            </label>
                            <input
                                type="text"
                                className='loaiCongVanAddInput'
                                required
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
                                        value={trang_thai}
                                        onChange={handleChangeTrangThai}
                                        style={{height: '36px'}}
                                        required
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