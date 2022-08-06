import React, { useEffect, useState } from "react";
import { Close } from '@material-ui/icons';
import "./editCongVanDi.css";
import {Box, FormControl, MenuItem, Select} from "@mui/material";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import Button from '@material-ui/core/Button';
import * as backend_config from "../../../config/backend"
import draftToHtml from 'draftjs-to-html';
import { stateFromHTML } from 'draft-js-import-html'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EditCongVan(props) {
    
    const {token, cong_van_luu_truData, refreshFunc} = props;

    const [ten_cong_van, setTenCongVan] = React.useState(cong_van_luu_truData.ten_cong_van);
    const [noi_nhan, setNoiNhan] = React.useState(cong_van_luu_truData.phong_ban_nhan);

    const [nguoi_tao, setNguoiKTao] = React.useState(cong_van_luu_truData.nguoi_tao);
    const [ngay_tao, setNgayTao] = React.useState(cong_van_luu_truData.ngay_tao);
    const [nguoi_ky, setNguoiKy] = React.useState(cong_van_luu_truData.nguoi_ky);
    const [ngay_ky, setNgayKy] = React.useState(cong_van_luu_truData.ngay_ky);

    const [bo_phan_phat_hanh, setBoPhanPhatHanh] = React.useState(cong_van_luu_truData.phong_ban_phat_hanh);
    const [loai_cong_van, setLoaiCongVan] = React.useState(cong_van_luu_truData.loai_cong_van);
    
    const [so_luong_van_ban, setSoLuongVanBan] = React.useState(cong_van_luu_truData.so_luong_van_ban);
    const [muc_do_uu_tien, setMucDoUuTien] = React.useState(cong_van_luu_truData.muc_do_uu_tien);
    // const [ngay_phat_hanh, setNgayPhatHanh] = React.useState(null);
    const [nguoi_xu_ly, setNguoiXuLy] = React.useState(cong_van_luu_truData.nguoi_xu_ly);
    // console.log(cong_van_luu_truData)

    const [ly_do, setLyDo] = React.useState(cong_van_luu_truData.ly_do);

    const [file_dinh_kem, setFileDinhKem] = React.useState(null);
    // console.log(cong_van_luu_truData.noi_dung);

    const [editorState, setEditorState] = React.useState(
        () => EditorState.createWithContent(stateFromHTML(cong_van_luu_truData.noi_dung)),
      );


    const fetchOneStaticTableData = (name, setData) => {
        return backend_config.makeRequest("GET", backend_config.STATIC_TABLE_GET_LIST.replace('{static_table_name}', name), token)
        .then((response) => response.json())
        .then((data) => {
            setData(data);
            // console.log(data);
        })
    }



    // useEffect(() => {
    // }, [])

    const updateCongVanSuccessNotify = (response_json) => {
        toast.success(<div>Chỉnh sửa công văn lưu trữ thành công!</div>, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: true
        })
    }



    const uploadTepDinhKem = (id) => {
        let formData = new FormData();

        formData.append('cong_van_id', id);
        if (file_dinh_kem !== null) formData.append('tep_dinh_kem_input', file_dinh_kem, file_dinh_kem.name);

        const body = formData;

        backend_config.makeRequest("POST",
            backend_config.CONG_VAN_LUU_TRU_POST_UPDATE_TEP_DINH_KEM.replace("{id}", id),
            token,
            body,
            null,
            true
        )
        .then((response) => {
            if (response.ok) {
                setFileDinhKem(null);
                return true;
            }
        else {
            response.text().then((text) => {
                toast.error(<div>Không thể thêm tệp đính kèm!</div>, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: false
                })
                console.log(text);
                return false;
            })
        }})
    }

    const updateCongVan = () => {
        const body = {
            ten_cong_van: ten_cong_van,
            phong_ban_nhan: noi_nhan,
            nguoi_xu_ly: nguoi_xu_ly,
            // ngay_hoan_tat: ngay_hoan_tat,
            phong_ban_phat_hanh: bo_phan_phat_hanh,
            nguoi_ky: nguoi_ky,
            ngay_ky: ngay_ky,

            muc_do_uu_tien: muc_do_uu_tien,
            ngay_tao: ngay_tao,
            loai_cong_van: loai_cong_van,
            so_luong_van_ban: so_luong_van_ban,
            ly_do: ly_do,
            noi_dung: draftToHtml(convertToRaw(editorState.getCurrentContent())).replace('\n', '. '),
        }
        // console.log(body);
        let new_body = {}
        let formData = new FormData();
        for (const [key, value] of Object.entries(body)) {
            if (value !== null) 
            {
                formData.append(key, value);
                new_body[key] = value;
            }
        }

        new_body = JSON.stringify(new_body)
        console.log(new_body)

        backend_config.makeRequest("PUT", 
            backend_config.CONG_VAN_LUU_TRU_PUT_UPDATE.replace("{id}", cong_van_luu_truData.id), 
            token,
            new_body
        )
        .then((response) => {
            if (response.ok){
                response.json().then((response_json) => {
                    // setTrigger(false);
                    // refreshFunc();
                    console.log(response_json);
                    if (file_dinh_kem !== null ) {
                        if (uploadTepDinhKem(response_json.id) === false){
                            return 
                        }
                        
                    }
                    props.setTrigger(false);
                    updateCongVanSuccessNotify();
                    refreshFunc();
                })
            }
            else {
                response.text().then((text) => {
                    alert(`Error with message: ${text}`);
                })
            }
        })

        // setEditorState(() => EditorState.createEmpty())
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        updateCongVan();
        // props.setTrigger(false);
    }

    const handleClose = (e) => {
        e.preventDefault();
        props.setTrigger(false);
        // setEditorState(() => EditorState.createEmpty())
    }

    return (props.trigger) ? (
        <div className="popup-main" style={{left: '115px'}}>
            <form className="popup-inner" onSubmit={handleSubmit}>
                <Close className="close-btn" onClick={handleClose}/>
                <div className="cong-van-di-update">
                    <div className="cong-van-di-update-header">
                        <span className="cong-van-di-update-title">Chỉnh sửa công văn đi</span>
                    </div>
                    <div className="cong-van-di-update-body">
                        <div className="cong-van-di-update-body-column-1">
                            <div className="cong-van-di-update-item">
                                <label>
                                    Tên công văn
                                    {/* <span className='text-danger' style={{color: 'red'}}> *</span> */}
                                </label>
                                <input
                                    type="text"
                                    value={ten_cong_van}
                                    className='cong-van-di-update-input'
                                    onChange={(e) => setTenCongVan(e.target.value)}
                                    // required
                                />
                            </div>
                            <div className="cong-van-di-update-item">
                                <label>
                                    Nơi nhận
                                    {/* <span className='text-danger' style={{color: 'red'}}> *</span> */}
                                </label>
                                <input
                                    type="text"
                                    value={noi_nhan}
                                    className='cong-van-di-update-input'
                                    onChange={(e) => setNoiNhan(e.target.value)}
                                    // required
                                />
                            </div>
                            <div className="cong-van-di-update-item">
                                <label>
                                    Người nhận và xử lý
                                    {/* <span className='text-danger' style={{color: 'red'}}> *</span> */}
                                </label>
                                <input
                                    type="text"
                                    value={nguoi_xu_ly}
                                    className='cong-van-di-update-input'
                                    onChange={(e) => setNguoiXuLy(e.target.value)}
                                    // required
                                />
                            </div>
                            <div className="cong-van-di-update-item">
                                <label>
                                    Bộ phận phát hành
                                    {/* <span className='text-danger' style={{color: 'red'}}> *</span> */}
                                </label>
                                <input
                                    type="text"
                                    value={bo_phan_phat_hanh}
                                    className='cong-van-di-update-input'
                                    onChange={(e) => setBoPhanPhatHanh(e.target.value)}
                                    // required
                                />
                            </div>
                            <div className="cong-van-di-update-item">
                                <label>
                                    Người duyệt và ký
                                    {/* <span className='text-danger' style={{color: 'red'}}> *</span> */}
                                </label>
                                <input
                                    type="text"
                                    value={nguoi_ky}
                                    className='cong-van-di-update-input'
                                    onChange={(e) => setNguoiKy(e.target.value)}
                                    // required
                                />
                            </div>
                            <div className='cong-van-add-item'>
                                <label>
                                    Ngày ký
                                </label>
                                <input 
                                    type="date" 
                                    className='datepicker' 
                                    value={ngay_ky}
                                    onKeyDown={(e) => {
                                        e.preventDefault();
                                    }}
                                    onChange={(e) => setNgayKy(e.target.value)}
                                    //required
                                    style={{
                                        width: '244px',
                                        fontSize: '15px',
                                        paddingLeft: '10.5px'
                                    }}
                                />
                            </div>
                        </div>
                        <div className="cong-van-di-update-body-column-2">
                            <div className="cong-van-di-update-item">
                                <label>
                                    Người tạo
                                    {/* <span className='text-danger' style={{color: 'red'}}> *</span> */}
                                </label>
                                <input
                                    type="text"
                                    value={nguoi_tao}
                                    className='cong-van-di-update-input'
                                    onChange={(e) => setNguoiXuLy(e.target.value)}
                                    // disabled
                                />
                            </div>
                            <div className="cong-van-di-update-item">
                                <label>
                                    Người nhận và xử lý
                                    {/* <span className='text-danger' style={{color: 'red'}}> *</span> */}
                                </label>
                                <input
                                    type="text"
                                    value={nguoi_xu_ly}
                                    className='cong-van-di-update-input'
                                    onChange={(e) => setNguoiXuLy(e.target.value)}
                                    // required
                                />
                            </div>
                        <div className="cong-van-di-update-item">
                                <label>
                                    Loại công văn
                                    {/* <span className='text-danger' style={{color: 'red'}}> *</span> */}
                                </label>
                                <input
                                    type="text"
                                    value={loai_cong_van}
                                    className='cong-van-di-update-input'
                                    onChange={(e) => setLoaiCongVan(e.target.value)}
                                    // required
                                />
                            </div>
                           
                            <div className="cong-van-di-update-item">
                                <label>
                                    Mức độ ưu tiên
                                    {/* <span className='text-danger' style={{color: 'red'}}> *</span> */}
                                </label>
                                <input
                                    type="text"
                                    value={muc_do_uu_tien}
                                    className='cong-van-di-update-input'
                                    onChange={(e) => setMucDoUuTien(e.target.value)}
                                    // required
                                />
                            </div>
                            <div className="cong-van-di-update-item">
                                <label>
                                    Số lượng văn bản
                                    {/* <span className='text-danger' style={{color: 'red'}}> *</span> */}
                                </label>
                                <input
                                    type="number"
                                    value={so_luong_van_ban}
                                    className='cong-van-di-update-input'
                                    onChange={(e) => setSoLuongVanBan(e.target.value)}
                                    // required
                                />
                            </div>
                            <div className='cong-van-add-item'>
                                <label>
                                    Ngày tạo
                                </label>
                                <input 
                                    type="date" 
                                    className='datepicker' 
                                    value={ngay_tao}
                                    onKeyDown={(e) => {
                                        e.preventDefault();
                                    }}
                                    onChange={(e) => setNgayTao(e.target.value)}
                                    //required
                                    style={{
                                        width: '244px',
                                        fontSize: '15px',
                                        paddingLeft: '10.5px'
                                    }}
                                />
                            </div>
                            
                            
                                            
                        </div>
                    </div>
                    <div className="cong-van-di-update-item-reason">
                        <label>
                            Lý do
                        </label>
                        <input
                            type="text"
                            value={ly_do}
                            className='cong-van-di-update-input-reason'
                            onChange={(e) => setLyDo(e.target.value)}
                        />
                    </div>
                    <div className="cong-van-di-update-item-content">
                        Nội dung
                        <span className='text-danger' style={{color: 'red'}}> *</span>
                    </div>
                    <div style={{ border: "1px solid black", padding: '2px', minHeight: '400px' }} >
                        <Editor
                            editorState={editorState}
                            onEditorStateChange={setEditorState}
                            //required
                        />
                    </div>
                    <div className="cong-van-di-update-item-file">
                        <label>
                            Tệp đính kèm
                        </label>
                        <input
                            type="file"
                            accept="*"
                            // style={{ display: 'none' }}
                            id="contained-button-file"
                            className="cong-van-di-update-input-file"
                            onChange={(event)=>{setFileDinhKem(event.target.files[0])}}
                        />
                        <h5>{file_dinh_kem == null && cong_van_luu_truData.tep_dinh_kem?.name}</h5>
                    </div>
                    <div className='cong-van-di-update-footer'>
                        <button className='cong-van-di-update-button'>Lưu</button>
                    </div>
                </div>
            </form>
        </div>
    ) : "";
}