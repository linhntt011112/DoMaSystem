import React, {useState, useEffect, useRef} from 'react'
import './editmyprofile.css'
import {Row, Col, Container} from "react-bootstrap";
import {Box, FormControl, MenuItem, Select} from "@mui/material";
import { useParams } from "react-router-dom";
import { Close } from '@material-ui/icons';
import * as backend_config from "../../../config/backend"
import OutsideAlerter from '../Common/OutsideClick';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import IconButton from '@material-ui/core/IconButton';

export default function EditMyProfile(props) {
    const [image, setImage] = useState("https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg");
    const {userData, token} = props

    const [phan_quyen, setPhanQuyen] = React.useState(userData.phan_quyen === "admin" ? true : false);
    const [chuc_vu, setChucVu] = React.useState(userData.chuc_vu?.name);
    const [phong_ban, setPhongBan] = React.useState(userData.phong_ban?.name);
    const [chuc_vu_table, setChucVuTable] = React.useState([]);
    const [phong_ban_table, setPhongBanTable] = React.useState([]);

    const handleChangePhongBan = (event) => {
        setPhongBan(event.target.value);
    }

    const handleChangeChucVu = (event) => {
        setChucVu(event.target.value);
    };

    const fetchOneStaticTableData = (name, setData) => {
        return backend_config.makeRequest("GET", backend_config.STATIC_TABLE_GET_LIST.replace('{static_table_name}', name), token)
        .then((response) => response.json())
        .then((data) => {
            setData(data);
        })

    }


    useEffect(() => {
        fetchOneStaticTableData('chuc_vu', setChucVuTable);
        fetchOneStaticTableData('phong_ban', setPhongBanTable);
    }, []);

    const onImageChange = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImage(reader.result);
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        submitEditUser();
        props.setTrigger(false);
    }

    const submitEditUser = async() => {
        let form = new FormData();
        form.append("phan_quyen", phan_quyen === true ? "admin" : "user");
        form.append("phong_ban", phong_ban);
        form.append("chuc_vu", chuc_vu);
    }

    return (props.trigger) ? (
        <div className="popup-main">
                <form className="edit-my-profile-popup-inner" onSubmit={handleSubmit}>
                    <Close className="close-btn" onClick={() => props.setTrigger(false)}/>
                    <div className='edit-my-profile-Update'>
                        <div className='edit-my-profile-Header'>
                            <span className='edit-my-profile-Title'>Cập nhật thông tin</span>
                        </div>
                        <div className='edit-my-profile-Right'>
                            <div className='edit-my-profile-Upload'>
                                <img
                                    className='edit-my-profile-Img'
                                    src={image}
                                    alt=''
                                />
                                <input 
                                    type="file" 
                                    accept="image/*"
                                    onChange={onImageChange}
                                    id="icon-button-file"
                                    style={{ display: 'none' }}
                                />
                                <label htmlFor="icon-button-file">
                                    <IconButton color="primary" aria-label="upload picture"
                                    component="span">
                                    <PhotoCamera />
                                    </IconButton>
                                </label>
                            </div>
                        </div>
                        <Container className='modal-body'>
                            <h6 style={{fontSize: '20px', paddingTop: '20px'}}>Thông tin cá nhân</h6>
                            <Row style={{display: 'flex', flex: 'wrap', marginLeft: '15px', marginRight: '15px'}}>
                                <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                                    <div className='edit-my-profile-Item'>
                                        <label>
                                            Họ và tên
                                            <span className='text-danger' style={{color: 'red'}}>  *</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={userData.ho_ten}
                                            className='edit-my-profile-Input'
                                            disabled
                                        />
                                    </div>
                                </Col>
                                <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                                    <div className='edit-my-profile-Item'>
                                        <label>
                                            Tên tài khoản
                                            <span className='edit-my-profile-text-danger' style={{color: 'red'}}>  *</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={userData.ten_tai_khoan}
                                            className='edit-my-profile-Input'
                                            disabled
                                        />
                                    </div>
                                </Col>
                                <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                                    <div className='edit-my-profile-Item'>
                                        <label>
                                            Giới tính
                                        </label>
                                        <input
                                            type="text"
                                            value={userData.gioi_tinh === "Nam" ? 'Nam' : 'Nữ'}
                                            className='edit-my-profile-Input'
                                            disabled
                                        />
                                    </div>
                                </Col>
                                <Col xs lg="2" style={{padding: '15px 15px 0 15px'}}>
                                    <div className='edit-my-profile-Item'>
                                        <label>
                                            Phân quyền
                                        </label>
                                        <div style={{margin: '10px 10px 10px 0'}}>
                                            <input type="checkbox" id='admin' className='admin' defaultChecked={userData.phan_quyen === "admin"} onChange={(e) => setPhanQuyen(e.target.checked)} />
                                            <label for="admin">Admin</label>
                                        </div>   
                                    </div>
                                </Col>
                            </Row>
                            <Row style={{display: 'flex', flex: 'wrap', marginLeft: '15px', marginRight: '15px'}}>
                                <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                                    <div className='edit-my-profile-Item'>
                                        <label>
                                            Điện thoại
                                        </label>
                                        <input
                                            type="text"
                                            className='edit-my-profile-Input'
                                            value={userData.dien_thoai}
                                            disabled
                                        />
                                    </div>
                                </Col>
                                <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                                    <div className='edit-my-profile-Item'>
                                        <label>
                                            Email
                                        </label>
                                        <input
                                            type="text"
                                            value={userData.email}
                                            className='edit-my-profile-Input'
                                            disabled
                                        />
                                    </div>
                                </Col>
                                <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                                    <div className='edit-my-profile-Item'>
                                        <label>
                                            Ngày sinh
                                        </label>
                                        <input
                                            type="text"
                                            value={userData.ngay_sinh}
                                            className='edit-my-profile-Input'
                                            disabled
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <Row style={{display: 'flex', flex: 'wrap', marginLeft: '15px', marginRight: '15px'}}>
                                <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                                    <div className='edit-my-profile-Item'>
                                        <label>
                                            CCCD
                                            <span className='text-danger' style={{color: 'red'}}>  *</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={userData.cccd}
                                            className='edit-my-profile-Input'
                                            disabled
                                        />
                                    </div>
                                </Col>
                                <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                                    <div className='edit-my-profile-Item'>
                                        <label>
                                            Ngày cấp
                                        </label>
                                        <input
                                            type="text"
                                            value={userData.ngay_cap}
                                            className='edit-my-profile-Input'
                                            disabled
                                        />
                                    </div>
                                </Col>
                                <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                                    <div className='edit-my-profile-Item'>
                                        <label>
                                            Nơi cấp
                                        </label>
                                        <input
                                            type="text"
                                            value={userData.noi_cap}
                                            className='edit-my-profile-Input'
                                            disabled
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <h6 style={{fontSize: '20px', paddingTop: '20px'}}>Thông tin công việc</h6>
                            <Row style={{display: 'flex', flex: 'wrap', marginLeft: '15px', marginRight: '15px'}}>
                                <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                                    <div className='edit-my-profile-Item'>
                                        <label>
                                            Ngày vào làm
                                        </label>
                                        <input
                                            type="text"
                                            value={userData.ngay_vao_lam}
                                            className='edit-my-profile-Input'
                                            disabled
                                        />
                                    </div>
                                </Col>
                                <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                                    <div className='edit-my-profile-Item'>
                                        <label>
                                            Phòng ban
                                        </label>
                                        <Box sx={{ minWidth: 260 }}>
                                            <FormControl fullWidth>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    onChange={handleChangePhongBan}
                                                    defaultValue={userData.phong_ban?.id}
                                                    style={{height: '36px'}}
                                                >
                                                    {phong_ban_table.map((item) => {
                                                        
                                                        return (<MenuItem value={item.id}>{item.name}</MenuItem> )
                                                    })}
                                                </Select>
                                            </FormControl>
                                        </Box>
                                    </div>
                                </Col>
                                <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                                    <div className='userUpdateItem'>
                                        <label>
                                            Chức vụ
                                        </label>
                                        <Box sx={{ minWidth: 260 }}>
                                            <FormControl fullWidth>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    onChange={handleChangeChucVu}
                                                    defaultValue={userData.chuc_vu?.id}
                                                    style={{height: '36px'}}
                                                >
                                                    {chuc_vu_table.map((item) => {
                                                            
                                                        return (<MenuItem value={item.id}>{item.name}</MenuItem> )
                                                    })}
                                                </Select>
                                            </FormControl>
                                        </Box>
                                    </div>
                                </Col>
                            </Row>
                            <Row style={{display: 'flex', flex: 'wrap', marginLeft: '15px', marginRight: '15px'}}>
                                <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                                    <div className='edit-my-profile-Item'>
                                        <label>
                                            Tài khoản ngân hàng
                                        </label>
                                        <input
                                            type="text"
                                            value={userData.tk_ngan_hang}
                                            className='edit-my-profile-Input'
                                            disabled
                                        />
                                    </div>
                                </Col>
                                <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                                    <div className='edit-my-profile-Item'>
                                        <label>
                                            Ngân hàng
                                        </label>
                                        <input
                                            type="text"
                                            value={userData.ngan_hang}
                                            className='edit-my-profile-Input'
                                            disabled
                                        />
                                    </div>
                                </Col>
                                <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                                    <div className='edit-my-profile-Item'>
                                        <label>
                                            Học vấn
                                        </label>
                                        <input
                                            type="text"
                                            value={userData.hoc_van?.name}
                                            className='edit-my-profile-Input'
                                            disabled
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <Row style={{display: 'flex', flex: 'wrap', marginLeft: '15px', marginRight: '15px'}}>
                                <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                                    <div className='edit-my-profile-Item'>
                                        <label>
                                            Dân tộc
                                        </label>
                                        <input
                                            type="text"
                                            value={userData.dan_toc?.name}
                                            className='edit-my-profile-Input'
                                            disabled
                                        />
                                    </div>
                                </Col>
                                <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                                    <div className='edit-my-profile-Item'>
                                        <label>
                                            Quốc tịch
                                        </label>
                                        <input
                                            type="text"
                                            value={userData.quoc_tich?.name}
                                            className='edit-my-profile-Input'
                                            disabled
                                        />
                                    </div>
                                </Col>
                                <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                                    <div className='edit-my-profile-Item'>
                                        <label>
                                            Tôn giáo
                                        </label>
                                        <input
                                            type="text"
                                            value={userData.ton_giao?.name}
                                            className='edit-my-profile-Input'
                                            disabled
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                        <div className='edit-my-profile-Footer'>
                            <button className='edit-my-profile-Button'>Cập nhật</button>
                        </div>
                    </div>
                </form>
        </div>
    ) : "";
}