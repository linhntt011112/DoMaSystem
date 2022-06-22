import React, { useEffect, useState } from "react";
import { Close } from '@material-ui/icons';
import "./editCongVanDi.css";
import {Box, FormControl, MenuItem, Select} from "@mui/material";
import BasicDatePicker from "../BasicDatePicker/BasicDatePicker";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Button from '@material-ui/core/Button';
import * as backend_config from "../../../config/backend"
import draftToHtml from 'draftjs-to-html';

export default function EditCongVanDi(props) {
    const {cvdiData, token, refreshFunc} = props;
    const [phong_ban_table, setPhongBanTable] = React.useState([]);
    const [muc_do_uu_tien_table, setMucDoUuTienTable] = React.useState([]);   
    const [tinh_trang_xu_ly_table, setTinhTrangXuLyTable] = React.useState([]); 
    const [loai_cong_van_table, setLoaiCongVanTable] = React.useState([]);
    const [usersData, setUsersData] = useState([]);
    const [usersData_PhongBan, setUsersData_PhongBan] = useState([]);
    const [usersData_NoiNhan, setUsersData_NoiNhan] = useState([]);
    const [usersList, setUsersList] = useState([]);

    const [so_cong_van, setSoCongVan] = React.useState(cvdiData.id);
    const [ten_cong_van, setTenCongVan] = React.useState(cvdiData.ten_cong_van);
    const [noi_nhan, setNoiNhan] = React.useState(cvdiData.phong_ban_nhan?.id);
    const [nguoi_ky, setNguoiKy] = React.useState(cvdiData.nguoi_ky?.id);
    const [ngay_ky, setNgayKy] = React.useState(cvdiData.ngay_ky);
    const [bo_phan_phat_hanh, setBoPhanPhatHanh] = React.useState(cvdiData.bo_phan_phat_hanh?.id);
    const [loai_cong_van, setLoaiCongVan] = React.useState(cvdiData.loai_cong_van?.id);
    const [nguoi_theo_doi, setNguoiTheoDoi] = React.useState(cvdiData.nguoi_theo_doi?.id);
    const [nguoi_tao, setNguoiTao] = React.useState(null);
    const [nguoi_duyet, setNguoiDuyet] = React.useState(cvdiData.nguoi_duyet?.id);
    const [ngay_hieu_luc, setNgayHieuLuc] = React.useState(cvdiData.ngay_hieu_luc);
    const [ngay_het_hieu_luc, setNgayHetHieuLuc] = React.useState(cvdiData.ngay_het_hieu_luc);
    const [so_luong_van_ban, setSoLuongVanBan] = React.useState(cvdiData.so_luong_van_ban);
    const [muc_do_uu_tien, setMucDoUuTien] = React.useState(cvdiData.muc_do_uu_tien?.id);
    const [ngay_phat_hanh, setNgayPhatHanh] = React.useState(cvdiData.ngay_phat_hanh);
    const [nguoi_xu_ly, setNguoiXuLy] = React.useState(cvdiData.nguoi_xu_ly?.id);
    const [tinh_trang_xu_ly, setTinhTrangXuLy] = React.useState(cvdiData.tinh_trang_xu_ly?.id);
    const [ngay_tao, setNgayTao] = React.useState(null);
    const [ngay_duyet, setNgayDuyet] = React.useState(cvdiData.ngay_duyet?.id);
    const [ly_do, setLyDo] = React.useState(cvdiData.ly_do);

    const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
    );

    const handleChangeNoiNhan = (event) => {
        const value = event.target.value;
        setNoiNhan(event.target.value);
        if (value in usersData) setUsersData_NoiNhan(usersData[value])
        else setUsersData_NoiNhan([]);
    }

    const handleChangeBoPhanPhatHanh = (event) => {
        const value = event.target.value;
        setBoPhanPhatHanh(event.target.value);
        if (value in usersData) setUsersData_PhongBan(usersData[value])
        else setUsersData_PhongBan([]);
    }

    const handleChangeNguoiKy = (event) => {
        setNguoiKy(event.target.value);
    }

    const handleChangeLoaiCongVan = (event) => {
        setLoaiCongVan(event.target.value);
    }

    const handleChangeNguoiTheoDoi = (event) => {
        setNguoiTheoDoi(event.target.value);
    }

    const handleChangeNguoiDuyet = (event) => {
        setNguoiDuyet(event.target.value);
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

    useEffect(() => {
        fetchOneStaticTableData('phong_ban', setPhongBanTable);
        fetchOneStaticTableData('muc_do_uu_tien', setMucDoUuTienTable);
        fetchOneStaticTableData('tinh_trang_xu_ly', setTinhTrangXuLyTable);
        fetchCurrentUser();
        fetchLoaiCongVanTable();
        fetchUsersTableData();
    }, [])

    const EditCongVanDi = () => {
        const body = JSON.stringify({
            // id: so_cong_van,
            ten_cong_van: ten_cong_van,
            id_phong_ban_nhan: noi_nhan,
            id_nguoi_ky: nguoi_ky,
            ngay_ky: ngay_ky,
            id_phong_ban_phat_hanh: bo_phan_phat_hanh,
            id_loai_cong_van: loai_cong_van,
            id_nguoi_theo_doi: nguoi_theo_doi,
            id_nguoi_tao: nguoi_tao,
            id_nguoi_duyet: nguoi_duyet,
            ngay_hieu_luc: ngay_hieu_luc,
            ngay_het_hieu_luc: ngay_het_hieu_luc,
            so_luong_van_ban: so_luong_van_ban,
            id_muc_do_uu_tien: muc_do_uu_tien,
            ngay_phat_hanh: ngay_phat_hanh,
            id_nguoi_xu_ly: nguoi_xu_ly,
            id_tinh_trang_xu_ly: tinh_trang_xu_ly,
            ngay_tao: ngay_tao,
            ngay_duyet: ngay_duyet,
            ly_do: ly_do,
            noi_dung: draftToHtml(convertToRaw(editorState.getCurrentContent())),
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        EditCongVanDi();
        props.setTrigger(false);
    }

    // useEffect(() => {
    //     console.log(editorState);
    //   }, [editorState]);
    
    return (props.trigger) ? (
        <div className="popup-main">
            <form className="popup-inner" onSubmit={handleSubmit}>
                <Close className="close-btn" onClick={() => props.setTrigger(false)}/>
                <div className="cong-van-di-update">
                    <div className="cong-van-di-update-header">
                        <span className="cong-van-di-update-title">Chỉnh sửa công văn đi</span>
                    </div>
                    <div className="cong-van-di-update-body">
                        <div className="cong-van-di-update-body-column-1">
                            <div className="cong-van-di-update-item">
                                <label>
                                    Số công văn
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <input
                                        type="text"
                                        defaultValue={cvdiData.id}
                                        className='cong-van-di-update-input'
                                        disabled
                                        required
                                    />
                            </div>
                            <div className="cong-van-di-update-item">
                                <label>
                                    Tên công văn
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <input
                                        type="text"
                                        defaultValue={cvdiData.ten_cong_van}
                                        className='cong-van-di-update-input'
                                        // disabled
                                        required
                                        onChange={(e) => setTenCongVan(e.target.value)}
                                    />
                            </div>
                            <div className="cong-van-di-update-item">
                                <label>
                                    Nơi nhận
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <Box sx={{ width: 267 }}>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            onChange={handleChangeNoiNhan}
                                            style={{
                                                height: '36px'
                                            }}
                                            required
                                            defaultValue={cvdiData.phong_ban_nhan?.id}
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
                                    Người nhận
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <Box className='cong-van-di-update-select'>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            onChange={handleChangeNguoiXuLy}
                                            defaultValue={cvdiData.nguoi_xu_ly?.id}
                                            style={{
                                                height: '36px'
                                            }}
                                            required
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
                                <Box className='cong-van-di-update-select'>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            onChange={handleChangeBoPhanPhatHanh}
                                            defaultValue={3}
                                            style={{
                                                height: '36px'
                                            }}
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
                                    Người ký
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <Box className='cong-van-di-update-select'>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            defaultValue={cvdiData.nguoi_ky?.id}
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
                            <div className='cong-van-di-update-item'>
                                <label>
                                    Ngày ký
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <input 
                                    type="date" 
                                    className='datepicker' 
                                    onKeyDown={(e) => {
                                        e.preventDefault();
                                    }}
                                    onChange={(e) => setNgayKy(e.target.value)}
                                    defaultValue={cvdiData.ngay_ky}
                                    required
                                    style={{
                                        width: '253px',
                                        fontSize: '16px',
                                        paddingLeft: '10.5px'
                                    }}
                                />
                            </div>
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
                                            // value={loaiPhongBan}
                                            onChange={handleChangeLoaiCongVan}
                                            defaultValue={cvdiData.loai_cong_van?.id}
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
                                    Người tạo
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <input
                                    type="text"
                                    value={cvdiData.nguoi_tao?.ho_ten}
                                    className='cong-van-di-update-input'
                                    disabled
                                />
                            </div>
                            <div className='cong-van-di-update-item'>
                                <label>
                                    Người duyệt
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <Box className='cong-van-di-update-select'>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            // value={loaiPhongBan}
                                            onChange={handleChangeNguoiDuyet}
                                            defaultValue={cvdiData.nguoi_duyet?.id}
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
                        <div className="cong-van-di-update-body-column-2">
                            <div className='cong-van-di-update-item'>
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
                                    required
                                    style={{
                                        width: '253px',
                                        fontSize: '16px',
                                        paddingLeft: '10.5px'
                                    }}
                                />
                            </div>
                            <div className='cong-van-di-update-item'>
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
                                        width: '253px',
                                        fontSize: '16px',
                                        paddingLeft: '10.5px'
                                    }}
                                />
                            </div>
                            <div className='cong-van-di-update-item'>
                                <label>
                                    Người nhận
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <Box className='cong-van-di-update-select'>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            // value={loaiPhongBan}
                                            onChange={handleChangeNguoiXuLy}
                                            defaultValue={3}
                                            style={{
                                                height: '36px'
                                            }}
                                            required
                                        >
                                            {usersData_NoiNhan.map((item) => { 
                                                return (<MenuItem value={item.id}>{item.ho_ten}</MenuItem> )
                                            })}
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
                            <div className="cong-van-di-update-item">
                                <label>
                                    Số lượng văn bản
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <input
                                    type="number"
                                    defaultValue="3969"
                                    className='cong-van-di-update-input'
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                          event.preventDefault();
                                        }
                                    }}
                                    onChange={(e) => setSoLuongVanBan(e.target.value)}
                                    required
                                />
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
                                            // value={loaiPhongBan}
                                            // onChange={handleChangeLoaiPhongBan}
                                            defaultValue={3}
                                            style={{
                                                height: '36px'
                                            }}
                                            required
                                        >
                                            <MenuItem value={1}>Phong Giam doc1</MenuItem>
                                            <MenuItem value={2}>Phong Giam doc2</MenuItem>
                                            <MenuItem value={3}>Phong Giam doc3</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
                            <div className='cong-van-di-update-item'>
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
                                    // onChange={(e) => setNgayPhatHanh(e.target.value)}
                                    required
                                    style={{
                                        width: '253px',
                                        fontSize: '16px',
                                        paddingLeft: '10.5px'
                                    }}
                                />
                            </div>
                            <div className='cong-van-di-update-item'>
                                <label>
                                    Tình trạng xử lý
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <Box className='cong-van-di-update-select'>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            // value={loaiPhongBan}
                                            onChange={handleChangeTinhTrangXuLy}
                                            defaultValue={3}
                                            style={{
                                                height: '36px'
                                            }}
                                            required
                                        >
                                            <MenuItem value={1}>Phong Giam doc1</MenuItem>
                                            <MenuItem value={2}>Phong Giam doc2</MenuItem>
                                            <MenuItem value={3}>Phong Giam doc3</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
                            <div className='cong-van-di-update-item'>
                                <label>
                                    Người theo dõi
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <Box className='cong-van-di-update-select'>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            // value={loaiPhongBan}
                                            onChange={handleChangeNguoiTheoDoi}
                                            defaultValue={3}
                                            style={{
                                                height: '36px'
                                            }}
                                        >
                                            <MenuItem value={1}>Phong Giam doc1</MenuItem>
                                            <MenuItem value={2}>Phong Giam doc2</MenuItem>
                                            <MenuItem value={3}>Phong Giam doc3</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
                            <div className='cong-van-di-update-item'>
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
                                    // onChange={(e) => setNgayTao(e.target.value)}
                                    defaultValue="2022-06-02"
                                    required
                                    style={{
                                        width: '253px',
                                        fontSize: '16px',
                                        paddingLeft: '10.5px'
                                    }}
                                    disabled
                                />
                            </div>
                            <div className='cong-van-di-update-item'>
                                <label>
                                    Ngày duyệt
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <input 
                                    type="date" 
                                    className='datepicker' 
                                    onKeyDown={(e) => {
                                        e.preventDefault();
                                    }}
                                    onChange={(e) => setNgayDuyet(e.target.value)}
                                    style={{
                                        width: '253px',
                                        fontSize: '16px',
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
                            value="3969"
                            className='cong-van-di-update-input-reason'
                            // disabled
                            onChange={(e) => setLyDo(e.target.value)}
                        />
                    </div>
                    <div className="cong-van-di-update-item-content">Nội dung
                        <span className='text-danger' style={{color: 'red'}}> *</span>
                    </div>
                    <div style={{ border: "1px solid black", padding: '2px', minHeight: '400px' }}>
                        <Editor
                            editorState={editorState}
                            onEditorStateChange={setEditorState}
                        />
                    </div>
                    <div className="cong-van-di-edit-item-file">
                        <label>
                            Tệp đính kèm
                        </label>
                        <input
                            type="file"
                            accept="*"
                            // style={{ display: 'none' }}
                            id="contained-button-file"
                            className="cong-van-di-edit-input-file"
                        />
                    </div>
                    <div className='cong-van-di-update-footer'>
                        <button className='cong-van-di-update-button'>Cập nhật</button>
                    </div>
                </div>
            </form>
        </div>
    ) : "";
}