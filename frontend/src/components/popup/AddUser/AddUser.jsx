import React from 'react'
import "./addUser.css";
import {Col, Container, Row} from "react-bootstrap";
import {Checkbox, FormControlLabel, Box, FormControl, Select, MenuItem} from "@mui/material";
import BasicDatePicker from "../DatePicker/DatePicker";

export default function AddUser() {
    const [loaiChucVu, setLoaiChucVu] = React.useState('');
    const [loaiPhongBan, setLoaiPhongBan] = React.useState('');
    const [loaiHocVan, setLoaiHocVan] = React.useState('');
    const [loaiDanToc, setLoaiDanToc] = React.useState('');
    const [loaiQuocTich, setLoaiQuocTich] = React.useState('');
    const [loaiTonGiao, setLoaiTonGiao] = React.useState('');

    const handleChangeLoaiChucVu = (event) => {
        setLoaiChucVu(event.target.value);
    };

    const handleChangeLoaiPhongBan = (event) => {
        setLoaiPhongBan(event.target.value);
    }

    const handleChangeLoaiHocVan = (event) => {
        setLoaiHocVan(event.target.value);
    }

    const handleChangeLoaiDanToc = (event) => {
        setLoaiDanToc(event.target.value);
    }

    const handleChangeLoaiQuocTich = (event) => {
        setLoaiQuocTich(event.target.value);
    }

    const handleChangeLoaiTonGiao = (event) => {
        setLoaiTonGiao(event.target.value);
    }

    return (
        <div>
            <h5 className='modal-title'>Thêm mới nhân viên</h5>
            <Container className='modal-body'>
                <h6 style={{fontSize: '20px', paddingTop: '20px'}}>Thông tin cá nhân</h6>
                <Row style={{display: 'flex', flex: 'wrap', marginLeft: '15px', marginRight: '15px'}}>
                    <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                        <div className='userAddItem'>
                            <label>
                                Họ và tên
                                <span className='text-danger' style={{color: 'red'}}>  *</span>
                            </label>
                            <input
                                type="text"
                                className='userAddInput'
                            />
                        </div>
                    </Col>
                    <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                        <div className='userAddItem'>
                            <label>
                                Tên tài khoản
                                <span className='text-danger' style={{color: 'red'}}>  *</span>
                            </label>
                            <input
                                type="text"
                                className='userAddInput'
                            />
                        </div>
                    </Col>
                    <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                        <div className='userAddItem'>
                            <label>
                                Giới tính
                            </label>
                            <FormControlLabel control={<Checkbox />} label="Nữ" />
                        </div>
                    </Col>
                    <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                        <div className='userAddItem'>
                            <label>
                                Phân quyền
                            </label>
                            <FormControlLabel control={<Checkbox />} label="Admin" />
                        </div>
                    </Col>
                </Row>
                <Row style={{display: 'flex', flex: 'wrap', marginLeft: '15px', marginRight: '15px'}}>
                    <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                        <div className='userAddItem'>
                            <label>
                                Điện thoại
                            </label>
                            <input
                                type="text"
                                className='userAddInput'
                            />
                        </div>
                    </Col>
                    <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                        <div className='userAddItem'>
                            <label>
                                Email
                            </label>
                            <input
                                type="text"
                                className='userAddInput'
                            />
                        </div>
                    </Col>
                    <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                        <div className='userAddItem'>
                            <label>
                                Ngày sinh
                            </label>
                            <BasicDatePicker />
                        </div>
                    </Col>
                </Row>
                <Row style={{display: 'flex', flex: 'wrap', marginLeft: '15px', marginRight: '15px'}}>
                    <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                        <div className='userAddItem'>
                            <label>
                                CMND
                                <span className='text-danger' style={{color: 'red'}}>  *</span>
                            </label>
                            <input
                                type="text"
                                className='userAddInput'
                            />
                        </div>
                    </Col>
                    <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                        <div className='userAddItem'>
                            <label>
                                Ngày cấp
                            </label>
                            <BasicDatePicker />
                        </div>
                    </Col>
                    <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                        <div className='userAddItem'>
                            <label>
                                Nơi cấp
                            </label>
                            <input
                                type="text"
                                className='userAddInput'
                            />
                        </div>
                    </Col>
                </Row>
                <Row style={{display: 'flex', flex: 'wrap', marginLeft: '15px', marginRight: '15px'}}>
                    <div className='userAddItem' style={{padding: '15px 0px 0px 15px'}}>
                        <label>
                            Địa chỉ
                        </label>
                        <input
                            type="text"
                            className='userAddInput'
                            style={{width: '830px'}}
                        />
                    </div>
                </Row>
                <Row style={{display: 'flex', flex: 'wrap', marginLeft: '15px', marginRight: '15px'}}>
                    <div className='userAddItem' style={{padding: '15px 0px 0px 15px'}}>
                        <label>
                            Quê quán
                        </label>
                        <input
                            type="text"
                            className='userAddInput'
                            style={{width: '830px'}}
                        />
                    </div>
                </Row>
                <h6 style={{fontSize: '20px', paddingTop: '20px'}}>Thông tin công việc</h6>
                <Row style={{display: 'flex', flex: 'wrap', marginLeft: '15px', marginRight: '15px'}}>
                    <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                        <div className='userAddItem'>
                            <label>
                                Ngày vào làm
                            </label>
                            <BasicDatePicker />
                        </div>
                    </Col>
                    <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                        <div className='userAddItem'>
                            <label>
                                Phòng ban
                            </label>
                            <Box sx={{ minWidth: 259 }}>
                                <FormControl fullWidth>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={loaiPhongBan}
                                        onChange={handleChangeLoaiPhongBan}
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
                        <div className='userAddItem'>
                            <label>
                                Chức vụ
                                <span className='text-danger' style={{color: 'red'}}>  *</span>
                            </label>
                            <Box sx={{ minWidth: 259 }}>
                                <FormControl fullWidth>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={loaiChucVu}
                                        onChange={handleChangeLoaiChucVu}
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
                        <div className='userAddItem'>
                            <label>
                                Tài khoản ngân hàng
                            </label>
                            <input
                                type="text"
                                className='userAddInput'
                            />
                        </div>
                    </Col>
                    <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                        <div className='userAddItem'>
                            <label>
                                Ngân hàng
                            </label>
                            <input
                                type="text"
                                className='userAddInput'
                            />
                        </div>
                    </Col>
                    <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                        <div className='userAddItem'>
                            <label>
                                Học vấn
                            </label>
                            <Box sx={{ minWidth: 252 }}>
                                <FormControl fullWidth>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={loaiHocVan}
                                        onChange={handleChangeLoaiHocVan}
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
                        <div className='userAddItem'>
                            <label>
                                Dân tộc
                            </label>
                            <Box sx={{ minWidth: 259 }}>
                                <FormControl fullWidth>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={loaiDanToc}
                                        onChange={handleChangeLoaiDanToc}
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
                        <div className='userAddItem'>
                            <label>
                                Quốc tịch
                            </label>
                            <Box sx={{ minWidth: 259 }}>
                                <FormControl fullWidth>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={loaiQuocTich}
                                        onChange={handleChangeLoaiQuocTich}
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
                        <div className='userAddItem'>
                            <label>
                                Tôn giáo
                            </label>
                            <Box sx={{ minWidth: 259 }}>
                                <FormControl fullWidth>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={loaiTonGiao}
                                        onChange={handleChangeLoaiTonGiao}
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
            <div className='modal-footer'>
                <button className='userAddButtonSubmit' type='submit'>Thêm</button>
            </div>
        </div>
    )
};
