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

export default function EditCongVanDi(props) {
    let today = new Date(),
    today_month = today.getMonth() + 1,
    today_date = today.getFullYear() + '-' + (today_month < 10 ? '0' + today_month : today_month) + '-' + (today.getDate() < 10 ? '0' + today.getDate() : today.getDate());

    const {token, cong_van_versionData, refreshFunc} = props;
    // console.log(token)
    const [loai_cong_van_table, setLoaiCongVanTable] = React.useState([]);
    const [phong_ban_table, setPhongBanTable] = React.useState([]);
    const [muc_do_uu_tien_table, setMucDoUuTienTable] = React.useState([]);   

    const [usersList, setUsersList] = useState([]);
    const [usersData, setUsersData] = useState([]);
    const [usersData_PhongBan, setUsersData_PhongBan] = useState([]);
    const [usersData_NoiNhan, setUsersData_NoiNhan] = useState([]);

    const [ten_cong_van, setTenCongVan] = React.useState(cong_van_versionData.ten_cong_van);
    const [noi_nhan, setNoiNhan] = React.useState(cong_van_versionData.id_phong_ban_nhan);
    const [nguoi_ky, setNguoiKy] = React.useState(cong_van_versionData.id_nguoi_ky);
    // const [ngay_ky, setNgayKy] = React.useState(null);
    const [bo_phan_phat_hanh, setBoPhanPhatHanh] = React.useState(cong_van_versionData.id_phong_ban_phat_hanh);
    const [loai_cong_van, setLoaiCongVan] = React.useState(cong_van_versionData.id_loai_cong_van);
    const [nguoi_theo_doi, setNguoiTheoDoi] = React.useState(cong_van_versionData.id_nguoi_theo_doi);
    
    const [so_luong_van_ban, setSoLuongVanBan] = React.useState(cong_van_versionData.so_luong_van_ban);
    // const [muc_do_bao_mat, setMucDoBaoMat] = React.useState(null);
    const [muc_do_uu_tien, setMucDoUuTien] = React.useState(cong_van_versionData.id_muc_do_uu_tien);
    // const [ngay_phat_hanh, setNgayPhatHanh] = React.useState(null);
    const [nguoi_xu_ly, setNguoiXuLy] = React.useState(cong_van_versionData.id_nguoi_xu_ly);
    console.log(cong_van_versionData)

    const [ly_do, setLyDo] = React.useState(cong_van_versionData.ly_do);

    const [file_dinh_kem, setFileDinhKem] = React.useState(null);

    const [editorState, setEditorState] = React.useState(
        () => EditorState.createWithContent(stateFromHTML(cong_van_versionData.noi_dung)),
      );

    const handleChangeNoiNhan = (event) => {
        const value = event.target.value;
        setNoiNhan(event.target.value);
        if (value in usersData) setUsersData_NoiNhan(usersData[value])
        else setUsersData_NoiNhan([]);
    }

    const handleChangeNguoiKy = (event) => {
        setNguoiKy(event.target.value);
    }

    const handleChangeBoPhanPhatHanh = (event) => {
        const value = event.target.value;
        setBoPhanPhatHanh(event.target.value);
        // console.log(value, usersData[value])
        if (value in usersData) setUsersData_PhongBan(usersData[value])
        else setUsersData_PhongBan([]);
    }

    const handleChangeLoaiCongVan = (event) => {
        setLoaiCongVan(event.target.value);
    }

    const handleChangeNguoiTheoDoi = (event) => {
        setNguoiTheoDoi(event.target.value);
    }

    // const handleChangeNguoiTao = (event) => {
    //     setNguoiTao(event.target.value);
    // }

    // const handleChangeNguoiDuyet = (event) => {
    //     setNguoiDuyet(event.target.value);
    // }


    const handleChangeMucDoUuTien = (event) => {
        setMucDoUuTien(event.target.value);
    }

    const handleChangeNguoiXuLy = (event) => {
        setNguoiXuLy(event.target.value);
    }


    const fetchOneStaticTableData = (name, setData) => {
        return backend_config.makeRequest("GET", backend_config.STATIC_TABLE_GET_LIST.replace('{static_table_name}', name), token)
        .then((response) => response.json())
        .then((data) => {
            setData(data);
            // console.log(data);
        })
    }

    const fetchLoaiCongVanTable = () =>{
        backend_config.makeRequest("GET", backend_config.LOAI_CONG_VAN_GET_LIST, token)
          .then((data) => data.json())
          .then((data) => {setLoaiCongVanTable(data)})
    }

    const fetchUsersTableData = () => {
        backend_config.makeRequest("GET", backend_config.USER_GET_LIST_API, token)
          .then((data) => data.json())
          .then((data) => {
            //   console.log(data)
        
                var usersData_ = {}
                var phongBanId ;
                for (let i = 0; i < data.length; i++) {
                    // console.log(data[i]["phong_ban"])
                    phongBanId = data[i]["phong_ban"]["id"];
                    if (!(phongBanId in usersData_)) usersData_[phongBanId] = []
                    usersData_[phongBanId].push(data[i])
                }
                // console.log(usersData_)
                setUsersData(usersData_);
                setUsersList(data);

                setUsersData_PhongBan(usersData_[cong_van_versionData.nguoi_ky.phong_ban.id])
                setUsersData_NoiNhan(usersData_[cong_van_versionData.nguoi_xu_ly.phong_ban.id])
                setNguoiXuLy(cong_van_versionData.id_nguoi_xu_ly);
                setNguoiKy(cong_van_versionData.id_nguoi_ky)
                // console.log(usersData_)
            })
    }

    useEffect(() => {
        fetchOneStaticTableData('phong_ban', setPhongBanTable);
        fetchOneStaticTableData('muc_do_uu_tien', setMucDoUuTienTable);
        // fetchOneStaticTableData('tinh_trang_xu_ly', setTinhTrangXuLyTable);
        fetchLoaiCongVanTable();
        fetchUsersTableData();


    }, [])

    const updateCongVanSuccessNotify = (response_json) => {
        toast.success(<div>Chỉnh sửa công văn đi thành công!</div>, {
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
            backend_config.CONG_VAN_POST_UPDATE_TEP_DINH_KEM.replace("{id}", id),
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
            // id: so_cong_van,
            ten_cong_van: ten_cong_van,
            id_phong_ban_nhan: noi_nhan,
            id_nguoi_ky: nguoi_ky,
            // ngay_ky: ngay_ky,
            id_phong_ban_phat_hanh: bo_phan_phat_hanh,
            id_loai_cong_van: loai_cong_van,
            id_nguoi_theo_doi: nguoi_theo_doi,
            so_luong_van_ban: so_luong_van_ban,
            id_muc_do_uu_tien: muc_do_uu_tien,
            id_nguoi_xu_ly: nguoi_xu_ly,
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
            backend_config.CONG_VAN_PUT_UPDATE.replace("{id}", cong_van_versionData.cong_van_id), 
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
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <input
                                    type="text"
                                    value={ten_cong_van}
                                    className='cong-van-di-update-input'
                                    onChange={(e) => setTenCongVan(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="cong-van-di-update-item">
                                <label>
                                    Nơi nhận
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <Box sx={{ width: 265 }}>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            onChange={handleChangeNoiNhan}
                                            value={noi_nhan}
                                            style={{
                                                height: '36px'
                                            }}
                                            required
                                        >
                                            {phong_ban_table.map((item) => {
                                                
                                                    return (<MenuItem value={item.id}>{item.name}</MenuItem> )
                                            })}
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
                            <div className='cong-van-di-update-item'>
                                <label>
                                    Người nhận và xử lý
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <Box className='cong-van-di-update-select'>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={nguoi_xu_ly}
                                            onChange={handleChangeNguoiXuLy}
                                            // defaultValue={3}
                                            style={{
                                                height: '36px'
                                            }}
                                            //required
                                        >
                                            {usersData_NoiNhan.map((item) => { 
                                                return (<MenuItem value={item.id}>{item.ho_ten}</MenuItem> )
                                            })}
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
                            <div className='cong-van-di-update-item'>
                                <label>
                                    Bộ phận phát hành
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <Box sx={{ width: 265 }}>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={bo_phan_phat_hanh}
                                            onChange={handleChangeBoPhanPhatHanh}
                                            style={{
                                                height: '36px'
                                            }}
                                            required
                                        >
                                            {phong_ban_table.map((item) => {
                                                
                                                    return (<MenuItem value={item.id}>{item.name}</MenuItem> )
                                            })}
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
                            <div className='cong-van-di-update-item'>
                                <label>
                                    Người duyệt và ký
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <Box className='cong-van-di-update-select'>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={nguoi_ky}
                                            onChange={handleChangeNguoiKy}
                                            style={{
                                                height: '36px'
                                            }}
                                            required
                                        >
                                            {usersData_PhongBan.map((item) => {
                                                    
                                                return (<MenuItem value={item.id}>{item.ho_ten}</MenuItem> )
                                            })}
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
                        </div>
                        <div className="cong-van-di-update-body-column-2">
                            <div className='cong-van-di-update-item'>
                                <label>
                                    Loại công văn
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <Box className='cong-van-di-update-select'>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={loai_cong_van}
                                            onChange={handleChangeLoaiCongVan}
                                            // defaultValue={3}
                                            style={{
                                                height: '36px'
                                            }}
                                            required
                                        >
                                            {loai_cong_van_table.map((item) => {
                                                    
                                                return (<MenuItem value={item.id}>{item.name}</MenuItem> )
                                            })}
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
                           
                            <div className='cong-van-di-update-item'>
                                <label>
                                    Mức độ ưu tiên
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <Box className='cong-van-di-update-select'>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={muc_do_uu_tien}
                                            onChange={handleChangeMucDoUuTien}
                                            // defaultValue={3}
                                            style={{
                                                height: '36px'
                                            }}
                                            //required
                                        >
                                            {muc_do_uu_tien_table.map((item) => {
                                                return (<MenuItem value={item.id}>{item.name}</MenuItem> )
                                            })}
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
                            <div className="cong-van-di-update-item" style={{display: 'none'}}>
                                <label>
                                    Số lượng văn bản
                                </label>
                                <input
                                    type="number"
                                    defaultValue={so_luong_van_ban}
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                          event.preventDefault();
                                        }
                                    }}
                                    className='cong-van-di-update-input'
                                    onChange={(e) => setSoLuongVanBan(e.target.value)}
                                    required
                                />
                            </div>
                            
                            <div className='cong-van-di-update-item'>
                                <label>
                                    Người theo dõi
                                </label>
                                <Box className='cong-van-di-update-select'>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={nguoi_theo_doi}
                                            onChange={handleChangeNguoiTheoDoi}
                                            // defaultValue={3}
                                            style={{
                                                height: '36px'
                                            }}
                                        >
                                            {usersList.map((item) => {
                                                        
                                                return (<MenuItem value={item.id}>{item.ho_ten}</MenuItem> )
                                            })}
                                        </Select>
                                    </FormControl>
                                </Box>
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
                        <h5>{file_dinh_kem == null && cong_van_versionData.tep_dinh_kem?.name}</h5>
                    </div>
                    <div className='cong-van-di-update-footer'>
                        <button className='cong-van-di-update-button'>Thêm</button>
                    </div>
                </div>
            </form>
        </div>
    ) : "";
}