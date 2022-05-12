import React, { useState, useEffect } from 'react'
import "./addUserPopup.css";
import {Col, Container, Row} from "react-bootstrap";
import {Checkbox, FormControlLabel, Box, FormControl, Select, MenuItem} from "@mui/material";
import { Close } from '@material-ui/icons';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

import * as backend_config from "../../../config/backend"

export default function AddUserPopup(props) {
    const {token} = props;

    const [chuc_vu_table, setChucVuTable] = React.useState([]);
    const [phong_ban_table, setPhongBanTable] = React.useState([]);
    const [hoc_van_table, setHocVanTable] = React.useState([]);
    const [dan_toc_table, setDanTocTable] = React.useState([]);
    const [quoc_tich_table, setQuocTichTable] = React.useState([]);
    const [ton_giao_table, setTonGiaoTable] = React.useState([]);

    const [chuc_vu, setLoaiChucVu] = React.useState('');
    const [phong_ban, setLoaiPhongBan] = React.useState('');
    const [hoc_van, setLoaiHocVan] = React.useState('');
    const [dan_toc, setLoaiDanToc] = React.useState('');
    const [quoc_tich, setLoaiQuocTich] = React.useState('');
    const [ton_giao, setLoaiTonGiao] = React.useState('');
    const [ho_va_ten, setHoVaTen] = useState("");
    const [ten_tai_khoan, setTenTaiKhoan] = useState("");
    const [gioi_tinh, setGioiTinh] = useState(false);
    const [phan_quyen, setPhanQuyen] = useState(false);
    const [dien_thoai, setDienThoai] = useState("");
    const [email, setEmail] = useState("");
    const [cccd, setCCCD] = useState("");
    const [ngay_cap, setNgayCap] = useState(null);
    const [ngay_sinh, setNgaySinh] = useState(null);
    const [noi_cap, setNoiCap] = useState("");
    const [dia_chi, setDiaChi] = useState("");
    const [que_quan, setQueQuan] = useState("");
    const [ngay_vao_lam, setNgayVaoLam] = useState(null);
    const [tk_ngan_hang, setTKNganHang] = useState("");
    const [ngan_hang, setNganHang] = useState("");

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
        fetchOneStaticTableData('hoc_van', setHocVanTable);
        fetchOneStaticTableData('dan_toc', setDanTocTable);
        fetchOneStaticTableData('quoc_tich', setQuocTichTable);
        fetchOneStaticTableData('ton_giao', setTonGiaoTable);
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault();
        submitAddUser();
        setNgaySinh(null);
        setPhanQuyen(false);
        setGioiTinh(false);
        setNgayVaoLam(null);
        setNgayCap(null);
        props.setTrigger(false);
    }

    const submitAddUser = async() => {
        let form = new FormData();
        form.append("ho_va_ten", ho_va_ten);
        form.append("ten_tai_khoan", ten_tai_khoan);
        form.append("gioi_tinh", gioi_tinh === true ? "Nu" : "Nam");
        form.append("phan_quyen", phan_quyen === true ? "admin" : "user");
        form.append("dien_thoai", dien_thoai);
        form.append("email", email);
        form.append("ngay_sinh", ngay_sinh);
        form.append("cccd", cccd);
        form.append("ngay_cap", ngay_cap);
        form.append("noi_cap", noi_cap);
        form.append("dia_chi", dia_chi);
        form.append("que_quan", que_quan);
        form.append("ngay_vao_lam", ngay_vao_lam);
        form.append("phong_ban", phong_ban);
        form.append("chuc_vu", chuc_vu);
        form.append("tk_ngan_hang", tk_ngan_hang);
        form.append("ngan_hang", ngan_hang);
        form.append("hoc_van", hoc_van);
        form.append("dan_toc", dan_toc);
        form.append("quoc_tich", quoc_tich);
        form.append("ton_giao", ton_giao);
    }
   
    return (props.trigger) ? (
        <div className="popup-main">
            <form className="popup-inner" onSubmit={handleSubmit}>
                <Close className="close-btn" onClick={() => props.setTrigger(false)}/>
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
                                    onChange={(e) => setHoVaTen(e.target.value)}
                                    required
                                    pattern='^[a-zA-Z]{1,}(?: [a-zA-Z]+){0,5}$'
                                />
                                <span className='errorMessage'>Chứa ít nhất 4 kí tự</span>
                            </div>
                        </Col>
                        <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                            <div className='userAddItem'>
                                <label>
                                    Tên tài khoản
                                    <span className='text-danger' style={{color: 'red'}}>  *</span>
                                </label>
                                <input
                                    name='ten_tai_khoan'
                                    type="text"
                                    className='userAddInput'
                                    onChange={(e) => setTenTaiKhoan(e.target.value)}
                                    required
                                    pattern='^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$'
                                />
                                <span className='errorMessage'>Tên người dùng không hợp lệ</span>
                            </div>
                        </Col>
                        <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                            <div className='userAddItem'>
                                <label>
                                    Giới tính
                                </label>
                                <FormControlLabel control={<Checkbox checked={gioi_tinh} onChange={(e) => setGioiTinh(e.target.checked)}/>} label="Nữ" />
                            </div>
                        </Col>
                        <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                            <div className='userAddItem'>
                                <label>
                                    Phân quyền
                                </label>
                                <FormControlLabel control={<Checkbox checked={phan_quyen} onChange={(e) => setPhanQuyen(e.target.checked)}/>} label="Admin" />
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
                                    type="number"
                                    className='userAddInput'
                                    onChange={(e) => setDienThoai(e.target.value)}
                                />
                            </div>
                        </Col>
                        <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                            <div className='userAddItem'>
                                <label>
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className='userAddInput'
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </Col>
                        <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                            <div className='userAddItem'>
                                <label>
                                    Ngày sinh
                                </label>
                                <DatePicker 
                                    className='datepicker'
                                    selected={ngay_sinh} 
                                    onChange={(date) => setNgaySinh(date)}
                                    dateFormat='dd/MM/yyyy'
                                    isClearable
                                    yearDropdownItemNumber={100}
                                    scrollableYearDropdown={true}
                                    showYearDropdown
                                    onKeyDown={(e) => {
                                        e.preventDefault();
                                     }}
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row style={{display: 'flex', flex: 'wrap', marginLeft: '15px', marginRight: '15px'}}>
                        <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                            <div className='userAddItem'>
                                <label>
                                    CCCD
                                </label>
                                <input
                                    onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
                                    className='userAddInput'
                                    onChange={(e) => setCCCD(e.target.value)}
                                />
                            </div>
                        </Col>
                        <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                            <div className='userAddItem'>
                                <label>
                                    Ngày cấp
                                </label>
                                <DatePicker 
                                    className='datepicker'
                                    selected={ngay_cap} 
                                    onChange={(date) => setNgayCap(date)}
                                    dateFormat='dd/MM/yyyy'
                                    isClearable
                                    showYearDropdown
                                    scrollableMonthYearDropdown
                                />
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
                                    onChange={(e) => setNoiCap(e.target.value)}
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
                                onChange={(e) => setDiaChi(e.target.value)}
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
                                onChange={(e) => setQueQuan(e.target.value)}
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
                                <DatePicker 
                                    className='datepicker'
                                    selected={ngay_vao_lam} 
                                    onChange={(date) => setNgayVaoLam(date)}
                                    dateFormat='dd/MM/yyyy'
                                    isClearable
                                    showYearDropdown
                                    scrollableMonthYearDropdown
                                />
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
                                            value={phong_ban}
                                            onChange={handleChangeLoaiPhongBan}
                                            style={{height: '35px'}}
                                        >
                                            {phong_ban_table.map((item) => {
                                                
                                                    return (<MenuItem value={item.name}>{item.name}</MenuItem> )
                                            })}
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
                        </Col>
                        <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                            <div className='userAddItem'>
                                <label>
                                    Chức vụ
                                </label>
                                <Box sx={{ minWidth: 259 }}>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={chuc_vu}
                                            onChange={handleChangeLoaiChucVu}
                                            style={{height: '35px'}}
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
                                    onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
                                    className='userAddInput'
                                    onChange={(e) => setTKNganHang(e.target.value)}
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
                                    onChange={(e) => setNganHang(e.target.value)}
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
                                            value={hoc_van}
                                            onChange={handleChangeLoaiHocVan}
                                            style={{height: '35px'}}
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
                                            value={dan_toc}
                                            onChange={handleChangeLoaiDanToc}
                                            style={{height: '35px'}}
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
                                            value={quoc_tich}
                                            onChange={handleChangeLoaiQuocTich}
                                            style={{height: '35px'}}
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
                                            value={ton_giao}
                                            onChange={handleChangeLoaiTonGiao}
                                            style={{height: '35px'}}
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
                    <button className='userAddButtonSubmit'>Thêm</button>
                </div>
            </form>
        </div>
    ) : "";
};
