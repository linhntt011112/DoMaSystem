import React from "react";
import "./editLoaiCongVan.css";
import {Box, FormControl, MenuItem, Select} from "@mui/material";
import { Close } from '@material-ui/icons';
import { toast } from 'react-toastify';
import * as backend_config from '../../../config/backend'

export default function EditLoaiCongVan(props) {
    const {loai_cong_van, token, refreshFunc } = props;
    const [trang_thai, setTrangThai] = React.useState(loai_cong_van?.trang_thai);
    const [ma_loai, setMaLoai] = React.useState(loai_cong_van?.ma_loai);
    const [ten_loai, setTenLoai] = React.useState(loai_cong_van?.name);
    const [mo_ta, setMoTa] = React.useState(loai_cong_van?.mo_ta);

    const handleChangeTrangThai = (event) => {
        setTrangThai(event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        submitEditLoaiCongVan();
    }

    const editLoaiCongVanSuccessNotify = (response_json) => {
        toast.success(<div>Lưu dữ liệu thành công!</div>, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: true
        })
    }

    const submitEditLoaiCongVan = () => {
        const body = JSON.stringify({
            id: loai_cong_van?.id,
            ma_loai: ma_loai ,
            name: ten_loai,
            trang_thai: trang_thai === 1 ? "hoat_dong" : "khong_hoat_dong",
            mo_ta: mo_ta
        })
        // console.log(body)
        // setTrangThai(null);
        backend_config.makeRequest("PUT", 
            backend_config.LOAI_CONG_VAN_PUT_UPDATE, 
            token,
            body
        )
        .then((response) => {
            if (response.ok){
                response.json().then((response_json) => {
                    editLoaiCongVanSuccessNotify();
                    props.setTrigger(false);
                    refreshFunc();
                    // setTenLoai(null);
                    // setMaLoai(null);
                    // setMoTa(null);
                    // setTrangThai(null);
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

    return props.trigger && props.mark === loai_cong_van?.id ? (
        <div className="popup-main">
            <form className="edit-loai-cong-van-popup-inner" onSubmit={handleSubmit}>
                <Close className="close-btn" onClick={() => props.setTrigger(false)}/>
                <div className='edit-LoaiCongVan'>
                    <h5 className='modal-title'>Chỉnh sửa loại công văn</h5>
                    <div className='modal-body'>
                        <div className='loaiCongVan-edit-Item'>
                            <label>
                                Mã loại
                                <span className='text-danger' style={{color: 'red'}}>  *</span>
                            </label>
                            <input
                                type="text"
                                className='loaiCongVan-edit-Input'
                                defaultValue={loai_cong_van?.ma_loai}
                                required
                                onChange={(e) => setMaLoai(e.target.value)}
                            />
                        </div>
                        <div className='loaiCongVan-edit-Item'>
                            <label>
                                Tên loại công văn
                                <span className='text-danger' style={{color: 'red'}}>  *</span>
                            </label>
                            <input
                                type="text"
                                className='loaiCongVan-edit-Input'
                                required
                                defaultValue={loai_cong_van?.name}
                                onChange={(e) => setTenLoai(e.target.value)}
                            />
                        </div>
                        <div className='loaiCongVan-edit-Item'>
                            <label>
                                Mô tả
                            </label>
                            <input
                                type="text"
                                className='loaiCongVan-edit-Input'
                                defaultValue={loai_cong_van?.mo_ta}
                                onChange={(e) => setMoTa(e.target.value)}
                            />
                        </div>
                        <div className='loaiCongVan-edit-Item' style={{display: 'none'}}>
                            <label>
                                Trạng thái
                                <span className='text-danger' style={{color: 'red'}}>  *</span>
                            </label>
                            <Box sx={{ }} style={{width: '100%'}}>
                                <FormControl fullWidth>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        defaultValue={loai_cong_van?.trang_thai === "hoat_dong" ? 1 : 2}
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