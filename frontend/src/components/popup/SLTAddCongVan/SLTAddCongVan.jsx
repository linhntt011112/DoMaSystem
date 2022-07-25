import React, { useEffect, useState } from "react";
import { Close } from '@material-ui/icons';
import "./SLTAddCongVan.css";
import {Box, FormControl, MenuItem, Select} from "@mui/material";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import Button from '@material-ui/core/Button';
import * as backend_config from "../../../config/backend"
import draftToHtml from 'draftjs-to-html';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SLTAddCongVan(props) {

    const {token, refreshFunc} = props;
    // console.log(token)
    const [loai_cong_van_table, setLoaiCongVanTable] = React.useState([]);
    const [muc_do_uu_tien_table, setMucDoUuTienTable] = React.useState([]);   
    const [tinh_trang_xu_ly_table, setTinhTrangXuLyTable] = React.useState([]); 

    const [usersData, setUsersData] = useState([]);

    const [ten_cong_van, setTenCongVan] = React.useState(null);
    const [noi_nhan, setNoiNhan] = React.useState(null);
    const [nguoi_xu_ly, setNguoiXuLy] = React.useState(null);
    const [bo_phan_phat_hanh, setBoPhanPhatHanh] = React.useState(null);
    const [nguoi_ky, setNguoiKy] = React.useState(null);
    const [ngay_ky, setNgayKy] = React.useState(null);

    const [muc_do_uu_tien, setMucDoUuTien] = React.useState(null);
    const [tinh_trang_xu_ly, setTinhTrangXuLy] = React.useState("Đã xử lý");
    const [ngay_tao, setNgayTao] = React.useState(null);
    const [nguoi_tao, setNguoiTao] = React.useState(null);
    const [loai_cong_van, setLoaiCongVan] = React.useState(null);
    const [ngay_hoan_tat, setNgayHoanTat] = React.useState(null);
    
    const [ly_do, setLyDo] = React.useState(null);
    const [file_dinh_kem, setFileDinhKem] = React.useState(null);
    const [editorState, setEditorState] = React.useState(
        () => EditorState.createEmpty(),
      );

    const handleChangeNoiNhan = (event) => {
        const value = event.target.value;
        setNoiNhan(event.target.value);
    }

    const handleChangeNguoiXuLy = (event) => {
        setNguoiXuLy(event.target.value);
    }

    const handleChangeBoPhanPhatHanh = (event) => {
        const value = event.target.value;
        setBoPhanPhatHanh(event.target.value);
    }

    const handleChangeNguoiKy = (event) => {
        setNguoiKy(event.target.value);
    }


    const handleChangeMucDoUuTien = (event) => {
        setMucDoUuTien(event.target.value);
    }

    const handleChangeTinhTrangXuLy = (event) => {
        setTinhTrangXuLy(event.target.value);
    }

    const handleChangeNguoiTao = (event) => {
        setNguoiTao(event.target.value);
    }

    const handleChangeLoaiCongVan = (event) => {
        setLoaiCongVan(event.target.value);
    }
 
    const fetchOneStaticTableData = (name, setData) => {
        return backend_config.makeRequest("GET", backend_config.STATIC_TABLE_GET_LIST.replace('{static_table_name}', name), token)
        .then((response) => response.json())
        .then((data) => {
            setData(data);
        })
    }

    const fetchLoaiCongVanTable = () =>{
        backend_config.makeRequest("GET", backend_config.LOAI_CONG_VAN_GET_LIST, token)
          .then((data) => data.json())
          .then((data) => {setLoaiCongVanTable(data)})
    }

    useEffect(() => {
        fetchOneStaticTableData('muc_do_uu_tien', setMucDoUuTienTable);
        fetchOneStaticTableData('tinh_trang_xu_ly', setTinhTrangXuLyTable);
        fetchLoaiCongVanTable();
    }, [])

    const addCongVanSuccessNotify = (response_json) => {
        toast.success(<div>Tạo mới công văn thành công!</div>, {
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

    const addCongVan = () => {
        const body = {
            ten_cong_van: ten_cong_van,
            phong_ban_nhan: noi_nhan,
            nguoi_xu_ly: nguoi_xu_ly,
            ngay_hoan_tat: ngay_hoan_tat,
            phong_ban_phat_hanh: bo_phan_phat_hanh,
            nguoi_ky: nguoi_ky,
            ngay_ky: ngay_ky,

            muc_do_uu_tien: muc_do_uu_tien,
            tinh_trang_xu_ly: tinh_trang_xu_ly,
            ngay_tao: ngay_tao,
            nguoi_tao: nguoi_tao,
            loai_cong_van: loai_cong_van,
            so_luong_van_ban: 0,
            ly_do: ly_do,
            noi_dung: draftToHtml(convertToRaw(editorState.getCurrentContent())).replace('\n', '. '),
        }
        
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

        backend_config.makeRequest("POST", 
            backend_config.CONG_VAN_LUU_TRU_POST_CREATE, 
            token,
            new_body,
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
                    addCongVanSuccessNotify();
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
        addCongVan();
        // props.setTrigger(false);
    }

    const handleClose = (e) => {
        e.preventDefault();
        props.setTrigger(false);
        setEditorState(() => EditorState.createEmpty())
    }

    return (props.trigger) ? (
        <div className="popup-main">
            <form className="popup-inner" onSubmit={handleSubmit}>
                <Close className="close-btn" onClick={handleClose}/>
                <div className="cong-van-add">
                    <div className="cong-van-add-header">
                        <span className="cong-van-add-title">Thêm mới công văn</span>
                    </div>
                    <div className="cong-van-add-body">
                        <div className="cong-van-add-body-column-1">
                            <div className="cong-van-add-item">
                                <label>
                                    Tên công văn
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <input
                                    type="text"
                                    className='cong-van-add-input'
                                    onChange={(e) => setTenCongVan(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="cong-van-add-item">
                                <label>
                                    Nơi nhận
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <input
                                    type="text"
                                    className='cong-van-add-input'
                                    onChange={(e) => setNoiNhan(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='cong-van-add-item'>
                                <label>
                                    Người nhận và xử lý
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <input
                                    type="text"
                                    className='cong-van-add-input'
                                    onChange={(e) => setNguoiXuLy(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='cong-van-add-item'>
                                <label>
                                    Bộ phận phát hành
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <input
                                    type="text"
                                    className='cong-van-add-input'
                                    onChange={(e) => setBoPhanPhatHanh(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='cong-van-add-item'>
                                <label>
                                    Người duyệt và ký
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <input
                                    type="text"
                                    className='cong-van-add-input'
                                    onChange={(e) => setNguoiKy(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='cong-van-di-add-item'>
                                <label>
                                    Ngày ký
                                </label>
                                <input 
                                    type="date" 
                                    className='datepicker' 
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
                        <div className="cong-van-di-add-body-column-2">
                            <div className='cong-van-add-item'>
                                <label>
                                    Mức độ ưu tiên
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <Box className='cong-van-add-select'>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            onChange={handleChangeMucDoUuTien}
                                            // defaultValue={3}
                                            style={{
                                                height: '36px'
                                            }}
                                            //required
                                        >
                                            {muc_do_uu_tien_table.map((item) => {
                                                return (<MenuItem value={item.name}>{item.name}</MenuItem> )
                                            })}
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
                            <div className="cong-van-add-item" style={{display: 'none'}}>
                                <label>
                                    Số lượng văn bản đính kèm
                                </label>
                                <input
                                    type="number"
                                    defaultValue={1}
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                          event.preventDefault();
                                        }
                                    }}
                                    className='cong-van-add-input'
                                    // onChange={(e) => setSoLuongVanBan(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='cong-van-add-item'>
                                <label>
                                    Tình trạng xử lý
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <input
                                    type="text"
                                    className='cong-van-add-input'
                                    value="Đã xử lý"
                                    onChange={(e) => setTinhTrangXuLy(e.target.value)}
                                    required
                                    disabled
                                />
                            </div>
                            <div className='cong-van-add-item'>
                                <label>
                                    Ngày tạo
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <input 
                                    type="date" 
                                    className='datepicker' 
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
                            <div className='cong-van-add-item'>
                                <label>
                                    Người tạo
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <input
                                    type="text"
                                    className='cong-van-add-input'
                                    onChange={(e) => setNguoiTao(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='cong-van-add-item'>
                                <label>
                                    Loại công văn
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <input
                                    type="text"
                                    className='cong-van-add-input'
                                    onChange={(e) => setLoaiCongVan(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='cong-van-di-add-item'>
                                <label>
                                    Ngày hoàn tất
                                </label>
                                <input 
                                    type="date" 
                                    className='datepicker' 
                                    onKeyDown={(e) => {
                                        e.preventDefault();
                                    }}
                                    onChange={(e) => setNgayHoanTat(e.target.value)}
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
                    <div className="cong-van-add-item-reason">
                        <label>
                            Lý do
                        </label>
                        <input
                            type="text"
                            // value="3969"
                            className='cong-van-add-input-reason'
                            onChange={(e) => setLyDo(e.target.value)}
                        />
                    </div>
                    <div className="cong-van-add-item-content">
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
                    <div className="cong-van-add-item-file">
                        <label>
                            Tệp đính kèm
                        </label>
                        <input
                            type="file"
                            accept="*"
                            // style={{ display: 'none' }}
                            id="contained-button-file"
                            className="cong-van-add-input-file"
                            onChange={(event)=>{setFileDinhKem(event.target.files[0])}}
                        />
                    </div>
                    <div className='cong-van-add-footer'>
                        <button className='cong-van-add-button'>Thêm</button>
                    </div>
                </div>
            </form>
        </div>
    ) : "";
}