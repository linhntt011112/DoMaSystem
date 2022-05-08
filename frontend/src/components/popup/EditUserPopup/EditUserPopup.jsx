import React, {useState, useEffect} from 'react'
import './editUserPopup.css'
import {Row, Col, Container} from "react-bootstrap";
import {Box, FormControl, MenuItem, Select} from "@mui/material";
import { useParams } from "react-router-dom";
import { Close } from '@material-ui/icons';
import * as backend_config from "../../../config/backend"

export default function EditUserPopup(props) {
    const {userData} = props

    const [phan_quyen, setPhanQuyen] = React.useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        submitEditUser();
        setPhanQuyen(false);
        props.setTrigger(false);
    }

    const submitEditUser = async() => {
        // let form = new FormData();
        // form.append("phan_quyen", phan_quyen);
        console.log(phan_quyen);
    }

    return (props.trigger) ? (
        <div className="popup-main">
            <form className="popup-inner" onSubmit={handleSubmit}>
                <Close className="close-btn" onClick={() => props.setTrigger(false)}/>
                <div className='userUpdate'>
                    <div className='userUpdateHeader'>
                        <span className='userUpdateTitle'>Cập nhật thông tin</span>
                    </div>
                    <div className='userUpdateRight'>
                        <div className='userUpdateUpload'>
                            <img
                                className='userUpdateImg'
                                src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg"
                                alt=''
                            />
                        </div>
                    </div>
                    <Container className='modal-body'>
                        <h6 style={{fontSize: '20px', paddingTop: '20px'}}>Thông tin cá nhân</h6>
                        <Row style={{display: 'flex', flex: 'wrap', marginLeft: '15px', marginRight: '15px'}}>
                            <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                                <div className='userUpdateItem'>
                                    <label>
                                        Họ và tên
                                        <span className='text-danger' style={{color: 'red'}}>  *</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={userData.ho_ten}
                                        className='userUpdateInput'
                                        disabled
                                    />
                                </div>
                            </Col>
                            <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                                <div className='userUpdateItem'>
                                    <label>
                                        Tên tài khoản
                                        <span className='text-danger' style={{color: 'red'}}>  *</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={userData.ten_tai_khoan}
                                        className='userUpdateInput'
                                        disabled
                                    />
                                </div>
                            </Col>
                            <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                                <div className='userUpdateItem'>
                                    <label>
                                        Giới tính
                                    </label>
                                    <input
                                        type="text"
                                        value={userData.gioi_tinh ? 'Nam' : 'Nu'}
                                        className='userUpdateInput'
                                        disabled
                                    />
                                </div>
                            </Col>
                            <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                                <div className='userUpdateItem'>
                                    <label>
                                        Phân quyền
                                    </label>
                                    <div style={{margin: '10px 10px 10px 0'}}>
                                        <input type="checkbox" id='admin' name='admin' value={userData.phan_quyen} onChange={(e) => setPhanQuyen(e.target.checked)} />
                                        <label for="admin">Admin</label>
                                    </div>   
                                </div>
                            </Col>
                        </Row>
                        <Row style={{display: 'flex', flex: 'wrap', marginLeft: '15px', marginRight: '15px'}}>
                            <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                                <div className='userUpdateItem'>
                                    <label>
                                        Điện thoại
                                    </label>
                                    <input
                                        type="text"
                                        className='userUpdateInput'
                                        value={userData.dien_thoai}
                                        disabled
                                    />
                                </div>
                            </Col>
                            <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                                <div className='userUpdateItem'>
                                    <label>
                                        Email
                                    </label>
                                    <input
                                        type="text"
                                        value={userData.email}
                                        className='userUpdateInput'
                                        disabled
                                    />
                                </div>
                            </Col>
                            <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                                <div className='userUpdateItem'>
                                    <label>
                                        Ngày sinh
                                    </label>
                                    <input
                                        type="text"
                                        value={userData.ngay_sinh}
                                        className='userUpdateInput'
                                        disabled
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row style={{display: 'flex', flex: 'wrap', marginLeft: '15px', marginRight: '15px'}}>
                            <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                                <div className='userUpdateItem'>
                                    <label>
                                        CCCD
                                        <span className='text-danger' style={{color: 'red'}}>  *</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={userData.cccd}
                                        className='userUpdateInput'
                                        disabled
                                    />
                                </div>
                            </Col>
                            <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                                <div className='userUpdateItem'>
                                    <label>
                                        Ngày cấp
                                    </label>
                                    <input
                                        type="text"
                                        value={userData.ngay_cap}
                                        className='userUpdateInput'
                                        disabled
                                    />
                                </div>
                            </Col>
                            <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                                <div className='userUpdateItem'>
                                    <label>
                                        Nơi cấp
                                    </label>
                                    <input
                                        type="text"
                                        value={userData.noi_cap}
                                        className='userUpdateInput'
                                        disabled
                                    />
                                </div>
                            </Col>
                        </Row>
                        <h6 style={{fontSize: '20px', paddingTop: '20px'}}>Thông tin công việc</h6>
                        <Row style={{display: 'flex', flex: 'wrap', marginLeft: '15px', marginRight: '15px'}}>
                            <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                                <div className='userUpdateItem'>
                                    <label>
                                        Ngày vào làm
                                    </label>
                                    <input
                                        type="text"
                                        value={userData.ngay_vao_lam}
                                        className='userUpdateInput'
                                        disabled
                                    />
                                </div>
                            </Col>
                            <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                                <div className='userUpdateItem'>
                                    <label>
                                        Phòng ban
                                    </label>
                                    <Box sx={{ minWidth: 260 }}>
                                        <FormControl fullWidth>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                // value={loaiPhongBan}
                                                // onChange={handleChangeLoaiPhongBan}
                                                defaultValue={3}
                                                style={{height: '36px'}}
                                            >
                                                <MenuItem value={1}>Phong Giam doc1</MenuItem>
                                                <MenuItem value={2}>Phong Giam doc2</MenuItem>
                                                <MenuItem value={3}>Phong Giam doc3</MenuItem>
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
                                                // value={loaiChucVu}
                                                // onChange={handleChangeLoaiChucVu}
                                                defaultValue={3}
                                                style={{height: '36px'}}
                                            >
                                                <MenuItem value={1}>Giam doc1</MenuItem>
                                                <MenuItem value={2}>Giam doc2</MenuItem>
                                                <MenuItem value={3}>Giam doc3</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </div>
                            </Col>
                        </Row>
                        <Row style={{display: 'flex', flex: 'wrap', marginLeft: '15px', marginRight: '15px'}}>
                            <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                                <div className='userUpdateItem'>
                                    <label>
                                        Tài khoản ngân hàng
                                    </label>
                                    <input
                                        type="text"
                                        value={userData.tk_ngan_hang}
                                        className='userAddInput'
                                        disabled
                                    />
                                </div>
                            </Col>
                            <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                                <div className='userUpdateItem'>
                                    <label>
                                        Ngân hàng
                                    </label>
                                    <input
                                        type="text"
                                        value={userData.ngan_hang}
                                        className='userUpdateInput'
                                        disabled
                                    />
                                </div>
                            </Col>
                            <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                                <div className='userUpdateItem'>
                                    <label>
                                        Học vấn
                                    </label>
                                    <input
                                        type="text"
                                        value={userData.hoc_van}
                                        className='userUpdateInput'
                                        disabled
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row style={{display: 'flex', flex: 'wrap', marginLeft: '15px', marginRight: '15px'}}>
                            <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                                <div className='userUpdateItem'>
                                    <label>
                                        Dân tộc
                                    </label>
                                    <input
                                        type="text"
                                        value={userData.dan_toc}
                                        className='userUpdateInput'
                                        disabled
                                    />
                                </div>
                            </Col>
                            <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                                <div className='userUpdateItem'>
                                    <label>
                                        Quốc tịch
                                    </label>
                                    <input
                                        type="text"
                                        value={userData.quoc_tich}
                                        className='userUpdateInput'
                                        disabled
                                    />
                                </div>
                            </Col>
                            <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                                <div className='userUpdateItem'>
                                    <label>
                                        Tôn giáo
                                    </label>
                                    <input
                                        type="text"
                                        value={userData.ton_giao}
                                        className='userUpdateInput'
                                        disabled
                                    />
                                </div>
                            </Col>
                        </Row>
                    </Container>
                    <div className='userUpdateFooter'>
                        <button className='userUpdateButton'>Cập nhật</button>
                    </div>
                </div>
            </form>
        </div>
    ) : "";
}