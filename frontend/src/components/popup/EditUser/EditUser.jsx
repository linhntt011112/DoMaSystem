import React from 'react'
import { Publish } from "@material-ui/icons";
import './editUser.css'
import {Row, Col, Container} from "react-bootstrap";
import {Box, Checkbox, FormControl, FormControlLabel, MenuItem, Select} from "@mui/material";
import BasicDatePicker from "../DatePicker/DatePicker";

export default function EditUser() {
    return (
        <div>
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
                        <label htmlFor='file'>
                            <Publish className='userUpdateIcon'/>
                        </label>
                        <input type="file" id="file" style={{display: "none"}}/>
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
                                    placeholder='Nguyen Thi B'
                                    className='userUpdateInput'
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
                                    placeholder='bnt1001'
                                    className='userUpdateInput'
                                />
                            </div>
                        </Col>
                        <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                            <div className='userUpdateItem'>
                                <label>
                                    Giới tính
                                </label>
                                <FormControlLabel control={<Checkbox defaultChecked/>} label="Nữ" />
                            </div>
                        </Col>
                        <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                            <div className='userUpdateItem'>
                                <label>
                                    Phân quyền
                                </label>
                                <FormControlLabel control={<Checkbox />} label="Admin" />
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
                                    placeholder='+1 123 456'
                                    className='userUpdateInput'
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
                                    placeholder='btn1001@gmail.com'
                                    className='userUpdateInput'
                                />
                            </div>
                        </Col>
                        <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                            <div className='userUpdateItem'>
                                <label>
                                    Ngày sinh
                                </label>
                                <BasicDatePicker />
                            </div>
                        </Col>
                    </Row>
                    <Row style={{display: 'flex', flex: 'wrap', marginLeft: '15px', marginRight: '15px'}}>
                        <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                            <div className='userUpdateItem'>
                                <label>
                                    CMND
                                    <span className='text-danger' style={{color: 'red'}}>  *</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder='265123221221'
                                    className='userUpdateInput'
                                />
                            </div>
                        </Col>
                        <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                            <div className='userUpdateItem'>
                                <label>
                                    Ngày cấp
                                </label>
                                <BasicDatePicker />
                            </div>
                        </Col>
                        <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                            <div className='userUpdateItem'>
                                <label>
                                    Nơi cấp
                                </label>
                                <input
                                    type="text"
                                    placeholder='Ha Nam'
                                    className='userUpdateInput'
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
                                <BasicDatePicker />
                            </div>
                        </Col>
                        <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                            <div className='userUpdateItem'>
                                <label>
                                    Phòng ban
                                </label>
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            // value={loaiPhongBan}
                                            // onChange={handleChangeLoaiPhongBan}
                                            defaultValue={3}
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
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            // value={loaiChucVu}
                                            // onChange={handleChangeLoaiChucVu}
                                            defaultValue={3}
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
                                    placeholder='2121212121'
                                    className='userAddInput'
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
                                    placeholder='Vietcombank'
                                    className='userUpdateInput'
                                />
                            </div>
                        </Col>
                        <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                            <div className='userUpdateItem'>
                                <label>
                                    Học vấn
                                </label>
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            // value={loaiHocVan}
                                            // onChange={handleChangeLoaiHocVan}
                                            defaultValue={3}
                                        >
                                            <MenuItem value={1}>Dai hoc</MenuItem>
                                            <MenuItem value={2}>Tieng Anh</MenuItem>
                                            <MenuItem value={3}>Tieng Phap</MenuItem>
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
                                    Dân tộc
                                </label>
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            // value={loaiDanToc}
                                            // onChange={handleChangeLoaiDanToc}
                                            defaultValue={3}
                                        >
                                            <MenuItem value={1}>Kinh</MenuItem>
                                            <MenuItem value={2}>Tieng Anh</MenuItem>
                                            <MenuItem value={3}>Tieng Phap</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
                        </Col>
                        <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                            <div className='userUpdateItem'>
                                <label>
                                    Quốc tịch
                                </label>
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            // value={loaiQuocTich}
                                            // onChange={handleChangeLoaiQuocTich}
                                            defaultValue={3}
                                        >
                                            <MenuItem value={1}>Viet Nam</MenuItem>
                                            <MenuItem value={2}>Tieng Anh</MenuItem>
                                            <MenuItem value={3}>Tieng Phap</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
                        </Col>
                        <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                            <div className='userUpdateItem'>
                                <label>
                                    Tôn giáo
                                </label>
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            // value={loaiTonGiao}
                                            // onChange={handleChangeLoaiTonGiao}
                                            defaultValue={3}
                                        >
                                            <MenuItem value={1}>Khong</MenuItem>
                                            <MenuItem value={2}>Tieng Anh</MenuItem>
                                            <MenuItem value={3}>Tieng Phap</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <div className='userUpdateFooter'>
                    <button className='userUpdateButton'>Cập nhật</button>
                </div>
            </div>
        </div>
    )
}