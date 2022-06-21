import React, { useEffect, useState } from "react";
import { Close } from '@material-ui/icons';
import "./addCongVanDi.css";
import {Box, FormControl, MenuItem, Select} from "@mui/material";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import Button from '@material-ui/core/Button';
import * as backend_config from "../../../config/backend"
import draftToHtml from 'draftjs-to-html';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddCongVanDi(props) {
    let today = new Date(),
    today_month = today.getMonth() + 1,
    today_date = today.getFullYear() + '-' + (today_month < 10 ? '0' + today_month : today_month) + '-' + (today.getDate() < 10 ? '0' + today.getDate() : today.getDate());

    const {token, refreshFunc} = props;
    // console.log(token)
    const [loai_cong_van_table, setLoaiCongVanTable] = React.useState([]);
    const [phong_ban_table, setPhongBanTable] = React.useState([]);
    const [muc_do_uu_tien_table, setMucDoUuTienTable] = React.useState([]);   
    const [tinh_trang_xu_ly_table, setTinhTrangXuLyTable] = React.useState([]); 

    const [usersList, setUsersList] = useState([]);
    const [usersData, setUsersData] = useState([]);
    const [usersData_PhongBan, setUsersData_PhongBan] = useState([]);
    const [usersData_NoiNhan, setUsersData_NoiNhan] = useState([]);

    const [so_cong_van, setSoCongVan] = React.useState(null);
    const [ten_cong_van, setTenCongVan] = React.useState(null);
    const [noi_nhan, setNoiNhan] = React.useState(null);
    const [nguoi_ky, setNguoiKy] = React.useState(null);
    const [ngay_ky, setNgayKy] = React.useState(null);
    const [bo_phan_phat_hanh, setBoPhanPhatHanh] = React.useState(null);
    const [loai_cong_van, setLoaiCongVan] = React.useState(null);
    const [nguoi_theo_doi, setNguoiTheoDoi] = React.useState(null);
    const [nguoi_tao, setNguoiTao] = React.useState({ho_ten: null});
    const [nguoi_duyet, setNguoiDuyet] = React.useState(null);
    const [ngay_hieu_luc, setNgayHieuLuc] = React.useState(null);
    const [ngay_het_hieu_luc, setNgayHetHieuLuc] = React.useState(null);
    const [so_luong_van_ban, setSoLuongVanBan] = React.useState(null);
    const [muc_do_bao_mat, setMucDoBaoMat] = React.useState(null);
    const [muc_do_uu_tien, setMucDoUuTien] = React.useState(null);
    const [ngay_phat_hanh, setNgayPhatHanh] = React.useState(null);
    const [nguoi_xu_ly, setNguoiXuLy] = React.useState(null);
    const [tinh_trang_xu_ly, setTinhTrangXuLy] = React.useState(null);
    const [ngay_tao, setNgayTao] = React.useState(today_date);
    const [ngay_duyet, setNgayDuyet] = React.useState(null);
    const [ly_do, setLyDo] = React.useState(null);
    const [file_dinh_kem, setFileDinhKem] = React.useState(null);
    const [editorState, setEditorState] = React.useState(
        () => EditorState.createEmpty(),
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

    const handleChangeNguoiDuyet = (event) => {
        setNguoiDuyet(event.target.value);
    }


    const handleChangeMucDoUuTien = (event) => {
        setMucDoUuTien(event.target.value);
    }

    const handleChangeNguoiXuLy = (event) => {
        setNguoiXuLy(event.target.value);
    }

    const handleChangeTinhTrangXuLy = (event) => {
        setTinhTrangXuLy(event.target.value);
    }

    const fetchOneStaticTableData = (name, setData) => {
        return backend_config.makeRequest("GET", backend_config.STATIC_TABLE_GET_LIST.replace('{static_table_name}', name), token)
        .then((response) => response.json())
        .then((data) => {
            setData(data);
            // console.log(data);
        })
    }

    const fetchCurrentUser = () =>{
        backend_config.makeRequest("GET", backend_config.USER_GET_CURRENT_API, token)
          .then((data) => data.json())
          .then((data) => {setNguoiTao(data)})
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
            })
    }

    useEffect(() => {
        fetchOneStaticTableData('phong_ban', setPhongBanTable);
        fetchOneStaticTableData('muc_do_uu_tien', setMucDoUuTienTable);
        fetchOneStaticTableData('tinh_trang_xu_ly', setTinhTrangXuLyTable);
        fetchCurrentUser();
        fetchLoaiCongVanTable();
        fetchUsersTableData();
    }, [])

    const addCongVanDiSuccessNotify = (response_json) => {
        toast.success(<div>Tạo mới công văn đi thành công!</div>, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: true
        })
    }

    const updateTepDinhKem = (id) => {
        let formData = new FormData();

        formData.append('cong_van_di_id', id);
        if (file_dinh_kem !== null) formData.append('tep_dinh_kem_input', file_dinh_kem, file_dinh_kem.name);

        const body = formData;

        backend_config.makeRequest("POST",
            backend_config.CONG_VAN_DI_POST_UPDATE_TEP_DINH_KEM,
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
                console.log(text);
                return false;
            })
        }})
    }

    const addCongVanDi = () => {
        const body = {
            // id: so_cong_van,
            ten_cong_van: ten_cong_van,
            id_phong_ban_nhan: noi_nhan,
            id_nguoi_ky: nguoi_ky,
            // ngay_ky: ngay_ky,
            id_phong_ban_phat_hanh: bo_phan_phat_hanh,
            id_loai_cong_van: loai_cong_van,
            id_nguoi_theo_doi: nguoi_theo_doi,
            id_nguoi_tao: nguoi_tao?.id,
            id_nguoi_duyet: nguoi_duyet,
            ngay_hieu_luc: ngay_hieu_luc,
            ngay_het_hieu_luc: ngay_het_hieu_luc,
            so_luong_van_ban: so_luong_van_ban,
            // id_muc_do_bao_mat: muc_do_bao_mat,
            id_muc_do_uu_tien: muc_do_uu_tien,
            ngay_phat_hanh: ngay_phat_hanh,
            id_nguoi_xu_ly: nguoi_xu_ly,
            id_tinh_trang_xu_ly: tinh_trang_xu_ly,
            ngay_tao: ngay_tao,
            // ngay_duyet: ngay_duyet,
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

        backend_config.makeRequest("POST", 
            backend_config.CONG_VAN_DI_POST_CREATE, 
            token,
            new_body,
        )
        .then((response) => {
            if (response.ok){
                response.json().then((response_json) => {
                    // setTrigger(false);
                    // refreshFunc();
                    console.log(response_json);
                    if (updateTepDinhKem(response_json.id) === false) ;
                    props.setTrigger(false);
                    addCongVanDiSuccessNotify();
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
        addCongVanDi();
        // props.setTrigger(false);
    }

    return (props.trigger) ? (
        <div className="popup-main">
            <form className="popup-inner" onSubmit={handleSubmit}>
                <Close className="close-btn" onClick={() => props.setTrigger(false)}/>
                <div className="cong-van-di-add">
                    <div className="cong-van-di-add-header">
                        <span className="cong-van-di-add-title">Thêm mới công văn đi</span>
                    </div>
                    <div className="cong-van-di-add-body">
                        <div className="cong-van-di-add-body-column-1">
                            <div className="cong-van-di-add-item">
                                <label>
                                    Tên công văn
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <input
                                    type="text"
                                    className='cong-van-di-add-input'
                                    onChange={(e) => setTenCongVan(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="cong-van-di-add-item">
                                <label>
                                    Nơi nhận
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <Box sx={{ width: 258 }}>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            onChange={handleChangeNoiNhan}
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
                            <div className='cong-van-di-add-item'>
                                <label>
                                    Người nhận
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <Box className='cong-van-di-add-select'>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
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
                            <div className='cong-van-di-add-item'>
                                <label>
                                    Bộ phận phát hành
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <Box sx={{ width: 258 }}>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
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
                            <div className='cong-van-di-add-item'>
                                <label>
                                    Người ký
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <Box className='cong-van-di-add-select'>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
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
                            <div className='cong-van-di-add-item'>
                                <label>
                                    Ngày ký
                                    {/* <span className='text-danger' style={{color: 'red'}}> *</span> */}
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
                            <div className='cong-van-di-add-item'>
                                <label>
                                    Loại công văn
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <Box className='cong-van-di-add-select'>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            onChange={handleChangeLoaiCongVan}
                                            // defaultValue={3}
                                            style={{
                                                height: '36px'
                                            }}
                                            //required
                                        >
                                            {loai_cong_van_table.map((item) => {
                                                    
                                                return (<MenuItem value={item.id}>{item.name}</MenuItem> )
                                            })}
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
                            <div className='cong-van-di-add-item'>
                                <label>
                                    Người tạo
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <Box className='cong-van-di-add-select'>
                                    <FormControl fullWidth>
                                        <select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            // onChange={handleChangeNguoiTao}
                                            // defaultValue={3}
                                            style={{
                                                height: '36px'
                                            }}
                                            disabled
                                        >
                                            <option >{nguoi_tao?.ho_ten}</option>
                                            {/* {nguoi_tao?.ho_ten} */}
                                            {/* {phong_ban_table.map((item) => {
                                                    
                                                return (<MenuItem value={item.id}>{item.name}</MenuItem> )
                                            })} */}

                                        </select>
                                    </FormControl>
                                </Box>
                            </div>
                            <div className='cong-van-di-add-item'>
                                <label>
                                    Người duyệt
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <Box className='cong-van-di-add-select'>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            onChange={handleChangeNguoiDuyet}
                                            // defaultValue={3}
                                            style={{
                                                height: '36px'
                                            }}
                                            required
                                        >
                                            {usersList.map((item) => {
                                                    
                                                return (<MenuItem value={item.id}>{item.ho_ten}</MenuItem> )
                                            })}
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
                        </div>
                        <div className="cong-van-di-add-body-column-2">
                            <div className="cong-van-di-add-item">
                                <label>
                                    Ngày hiệu lực
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <input 
                                    type="date" 
                                    className='datepicker' 
                                    onKeyDown={(e) => {
                                        e.preventDefault();
                                    }}
                                    onChange={(e) => setNgayHieuLuc(e.target.value)}
                                    //required
                                    style={{
                                        width: '244px',
                                        fontSize: '15px',
                                        paddingLeft: '10.5px'
                                    }}
                                />
                            </div>
                            <div className='cong-van-di-add-item'>
                                <label>
                                    Ngày hết hiệu lực
                                </label>
                                <input 
                                    type="date" 
                                    className='datepicker' 
                                    onKeyDown={(e) => {
                                        e.preventDefault();
                                    }}
                                    onChange={(e) => setNgayHetHieuLuc(e.target.value)}
                                    style={{
                                        width: '244px',
                                        fontSize: '15px',
                                        paddingLeft: '10.5px'
                                    }}
                                />
                            </div>
                            <div className='cong-van-di-add-item'>
                                <label>
                                    Mức độ ưu tiên
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <Box className='cong-van-di-add-select'>
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
                                                return (<MenuItem value={item.id}>{item.name}</MenuItem> )
                                            })}
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
                            <div className='cong-van-di-add-item'>
                                <label>
                                    Ngày phát hành
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <input 
                                    type="date" 
                                    className='datepicker' 
                                    onKeyDown={(e) => {
                                        e.preventDefault();
                                    }}
                                    onChange={(e) => setNgayPhatHanh(e.target.value)}
                                    //required
                                    style={{
                                        width: '244px',
                                        fontSize: '15px',
                                        paddingLeft: '10.5px'
                                    }}
                                />
                            </div>
                            <div className="cong-van-di-add-item">
                                <label>
                                    Số lượng văn bản
                                </label>
                                <input
                                    type="number"
                                    // value="3969"
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                          event.preventDefault();
                                        }
                                    }}
                                    className='cong-van-di-add-input'
                                    onChange={(e) => setSoLuongVanBan(e.target.value)}
                                    // required
                                />
                            </div>
                            <div className='cong-van-di-add-item'>
                                <label>
                                    Tình trạng xử lý
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <Box className='cong-van-di-add-select'>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            onChange={handleChangeTinhTrangXuLy}
                                            // defaultValue={1}
                                            style={{
                                                height: '36px'
                                            }}
                                            //required
                                            // disabled
                                        >
                                            {tinh_trang_xu_ly_table.map((item) => {
                                                    
                                                return (<MenuItem value={item.id} >{item.name}</MenuItem> )
                                            })}
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
                            <div className='cong-van-di-add-item'>
                                <label>
                                    Người theo dõi
                                </label>
                                <Box className='cong-van-di-add-select'>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
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
                            <div className='cong-van-di-add-item'>
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
                                    value={today_date}
                                    //required
                                    style={{
                                        width: '244px',
                                        fontSize: '15px',
                                        paddingLeft: '10.5px'
                                    }}
                                    disabled
                                />
                            </div>
                            <div className='cong-van-di-add-item'>
                                <label>
                                    Ngày duyệt
                                </label>
                                <input 
                                    type="date" 
                                    className='datepicker' 
                                    onKeyDown={(e) => {
                                        e.preventDefault();
                                    }}
                                    onChange={(e) => setNgayDuyet(e.target.value)}
                                    style={{
                                        width: '244px',
                                        fontSize: '15px',
                                        paddingLeft: '10.5px'
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="cong-van-di-add-item-reason">
                        <label>
                            Lý do
                        </label>
                        <input
                            type="text"
                            // value="3969"
                            className='cong-van-di-add-input-reason'
                            onChange={(e) => setLyDo(e.target.value)}
                        />
                    </div>
                    <div className="cong-van-di-add-item-content">
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
                    <div className="cong-van-di-add-item-file">
                        <label>
                            Tệp đính kèm
                        </label>
                        <input
                            type="file"
                            accept="*"
                            // style={{ display: 'none' }}
                            id="contained-button-file"
                            className="cong-van-di-add-input-file"
                            onChange={(event)=>{setFileDinhKem(event.target.files[0])}}
                        />
                    </div>
                    <div className='cong-van-di-add-footer'>
                        <button className='cong-van-di-add-button'>Thêm</button>
                    </div>
                </div>
            </form>
        </div>
    ) : "";
}