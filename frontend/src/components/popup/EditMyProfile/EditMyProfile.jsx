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
import DatePicker from "react-datepicker";

export default function EditMyProfile(props) {
    const [image, setImage] = useState("https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg");
    const {userData, token} = props

    const [chuc_vu_table, setChucVuTable] = React.useState([]);
    const [phong_ban_table, setPhongBanTable] = React.useState([]);
    const [hoc_van_table, setHocVanTable] = React.useState([]);
    const [dan_toc_table, setDanTocTable] = React.useState([]);
    const [quoc_tich_table, setQuocTichTable] = React.useState([]);
    const [ton_giao_table, setTonGiaoTable] = React.useState([]);

    const [phan_quyen, setPhanQuyen] = React.useState(userData.phan_quyen === "admin" ? true : false);
    const [chuc_vu, setChucVu] = React.useState(userData.chuc_vu?.name);
    const [phong_ban, setPhongBan] = React.useState(userData.phong_ban?.name);
    const [ngay_sinh, setNgaySinh] = useState(userData.ngay_sinh);
    const [ho_va_ten, setHoVaTen] = useState(userData.ho_ten);
    const [ten_tai_khoan, setTenTaiKhoan] = useState(userData.ten_tai_khoan);
    const [gioi_tinh, setGioiTinh] = useState(userData.gioi_tinh === "Nu" ? true : false);
    const [dien_thoai, setDienThoai] = useState(userData.dien_thoai);
    const [email, setEmail] = useState(userData.email);
    const [cccd, setCCCD] = useState(userData.cccd);
    const [ngay_cap, setNgayCap] = useState(userData.ngay_cap);
    const [noi_cap, setNoiCap] = useState(userData.noi_cap);
    const [dia_chi, setDiaChi] = useState(userData.dia_chi);
    const [que_quan, setQueQuan] = useState(userData.que_quan);
    const [ngay_vao_lam, setNgayVaoLam] = useState(userData.ngay_vao_lam);
    const [tk_ngan_hang, setTKNganHang] = useState(userData.tk_ngan_hang);
    const [ngan_hang, setNganHang] = useState(userData.ngan_hang);
    const [hoc_van, setHocVan] = React.useState(userData.hoc_van?.id);
    const [dan_toc, setDanToc] = React.useState(userData.dan_toc?.name);
    const [quoc_tich, setQuocTich] = React.useState(userData.quoc_tich?.name);
    const [ton_giao, setTonGiao] = React.useState(userData.ton_giao?.name);

    const handleChangePhongBan = (event) => {
        setPhongBan(event.target.value);
    }

    const handleChangeChucVu = (event) => {
        setChucVu(event.target.value);
    };

    const handleChangeHocVan = (event) => {
        setHocVan(event.target.value);
    }

    const handleChangeDanToc = (event) => {
        setDanToc(event.target.value);
    }

    const handleChangeQuocTich = (event) => {
        setQuocTich(event.target.value);
    }

    const handleChangeTonGiao = (event) => {
        setTonGiao(event.target.value);
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
        submitEditMyProfile();
        props.setTrigger(false);
    }

    const submitEditMyProfile = async() => {
        let form = new FormData();
        console.log(ten_tai_khoan);
        console.log(gioi_tinh);
        console.log(ngay_cap);
        console.log(hoc_van);
        console.log(dien_thoai);
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
                                    <IconButton 
                                        color="primary" 
                                        aria-label="upload picture"
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
                                            defaultValue={userData.ho_ten}
                                            className='edit-my-profile-Input'
                                            required
                                            pattern='^[a-zA-Z]{1,}(?: [a-zA-Z]+){0,5}$'
                                            disabled
                                            onChange={(e) => setHoVaTen(e.target.value)}
                                        />
                                    </div>
                                </Col>
                                <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                                    <div className='edit-my-profile-Item'>
                                        <label>
                                            Tên tài khoản
                                            <span className='text-danger' style={{color: 'red'}}>  *</span>
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue={userData.ten_tai_khoan}
                                            className='edit-my-profile-Input'
                                            required
                                            pattern='^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$'
                                            onChange={(e) => setTenTaiKhoan(e.target.value)}
                                        />
                                        <span className='edit-my-profile-errorMessage'>Tên người dùng không hợp lệ</span>
                                    </div>
                                </Col>
                                <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                                    <div className='edit-my-profile-Item'>
                                        <label>
                                            Giới tính
                                        </label>
                                        <div style={{margin: '10px 10px 10px 0'}}>
                                            <input type="checkbox" id='gioi_tinh' className='gioi_tinh' defaultChecked={userData.gioi_tinh === "Nu"} onChange={(e) => setGioiTinh(e.target.checked)}/>
                                            <label for="admin">Nữ</label>
                                        </div>   
                                    </div>
                                </Col>
                                <Col xs lg="2" style={{padding: '15px 15px 0 15px'}}>
                                    <div className='edit-my-profile-Item'>
                                        <label>
                                            Phân quyền
                                            <span className='edit-my-profile-text-danger' style={{color: 'red'}}>  *</span>
                                        </label>
                                        <div style={{margin: '10px 10px 10px 0'}}>
                                            <input type="checkbox" id='admin' className='admin' defaultChecked={userData.phan_quyen === "admin"} onChange={(e) => setPhanQuyen(e.target.checked)} disabled/>
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
                                            onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
                                            className='edit-my-profile-Input'
                                            defaultValue={userData.dien_thoai}
                                            onChange={(e) => setDienThoai(e.target.value)}
                                        />
                                    </div>
                                </Col>
                                <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                                    <div className='edit-my-profile-Item'>
                                        <label>
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            defaultValue={userData.email}
                                            className='edit-my-profile-Input'
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </Col>
                                <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                                    <div className='edit-my-profile-Item'>
                                        <label>
                                            Ngày sinh
                                        </label>
                                        <input 
                                            type="date" 
                                            className='datepicker' 
                                            onKeyDown={(e) => {
                                                e.preventDefault();
                                            }}
                                            defaultValue={userData.ngay_sinh}
                                            onChange={(e) => setNgaySinh(e.target.value)}
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
                                            defaultValue={userData.cccd}
                                            className='edit-my-profile-Input'
                                            required
                                            onChange={(e) => setCCCD(e.target.value)}
                                            onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
                                        />
                                    </div>
                                </Col>
                                <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                                    <div className='edit-my-profile-Item'>
                                        <label>
                                            Ngày cấp
                                        </label>
                                        <input 
                                            type="date" 
                                            className='datepicker' 
                                            onKeyDown={(e) => {
                                                e.preventDefault();
                                            }}
                                            defaultValue={userData.ngay_cap}
                                            onChange={(e) => setNgayCap(e.target.value)}
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
                                            defaultValue={userData.noi_cap}
                                            className='edit-my-profile-Input'
                                            onChange={(e) => setNoiCap(e.target.value)}
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <Row style={{display: 'flex', flex: 'wrap', marginLeft: '15px', marginRight: '15px'}}>
                                <div className='edit-my-profile-Item' style={{padding: '15px 0px 0px 15px'}}>
                                    <label>
                                        Địa chỉ
                                    </label>
                                    <input
                                        type="text"
                                        className='edit-my-profile-Input'
                                        style={{width: '830px'}}
                                        onChange={(e) => setDiaChi(e.target.value)}
                                        defaultValue={userData.dia_chi}
                                    />
                                </div>
                            </Row>
                            <Row style={{display: 'flex', flex: 'wrap', marginLeft: '15px', marginRight: '15px'}}>
                                <div className='edit-my-profile-Item' style={{padding: '15px 0px 0px 15px'}}>
                                    <label>
                                        Quê quán
                                    </label>
                                    <input
                                        type="text"
                                        className='edit-my-profile-Input'
                                        style={{width: '830px'}}
                                        onChange={(e) => setQueQuan(e.target.value)}
                                        defaultValue={userData.que_quan}
                                    />
                                </div>
                            </Row>
                            <h6 style={{fontSize: '20px', paddingTop: '20px'}}>Thông tin công việc</h6>
                            <Row style={{display: 'flex', flex: 'wrap', marginLeft: '15px', marginRight: '15px'}}>
                                <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                                    <div className='edit-my-profile-Item'>
                                        <label>
                                            Ngày vào làm
                                        </label>
                                        <input 
                                            type="date" 
                                            className='datepicker' 
                                            onKeyDown={(e) => {
                                                e.preventDefault();
                                            }}
                                            defaultValue={userData.ngay_vao_lam}
                                            onChange={(e) => setNgayVaoLam(e.target.value)}
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
                                                    disabled
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
                                                    disabled
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
                                            defaultValue={userData.tk_ngan_hang}
                                            className='edit-my-profile-Input'
                                            onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
                                            onChange={(e) => setTKNganHang(e.target.value)}
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
                                            defaultValue={userData.ngan_hang}
                                            className='edit-my-profile-Input'
                                            onChange={(e) => setNganHang(e.target.value)}
                                        />
                                    </div>
                                </Col>
                                <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                                    <div className='edit-my-profile-Item'>
                                        <label>
                                            Học vấn
                                        </label>
                                        <Box sx={{ minWidth: 260 }}>
                                            <FormControl fullWidth>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    onChange={handleChangeHocVan}
                                                    defaultValue={userData.hoc_van?.id}
                                                    style={{height: '36px'}}
                                                >
                                                    {hoc_van_table.map((item) => {
                                                            
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
                                            Dân tộc
                                        </label>
                                        <Box sx={{ minWidth: 260 }}>
                                            <FormControl fullWidth>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    onChange={handleChangeDanToc}
                                                    defaultValue={userData.dan_toc?.id}
                                                    style={{height: '36px'}}
                                                >
                                                    {dan_toc_table.map((item) => {
                                                            
                                                        return (<MenuItem value={item.id}>{item.name}</MenuItem> )
                                                    })}
                                                </Select>
                                            </FormControl>
                                        </Box>
                                    </div>
                                </Col>
                                <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                                    <div className='edit-my-profile-Item'>
                                        <label>
                                            Quốc tịch
                                        </label>
                                        <Box sx={{ minWidth: 260 }}>
                                            <FormControl fullWidth>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    onChange={handleChangeQuocTich}
                                                    defaultValue={userData.quoc_tich?.id}
                                                    style={{height: '36px'}}
                                                >
                                                    {quoc_tich_table.map((item) => {
                                                            
                                                        return (<MenuItem value={item.id}>{item.name}</MenuItem> )
                                                    })}
                                                </Select>
                                            </FormControl>
                                        </Box>
                                    </div>
                                </Col>
                                <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                                    <div className='edit-my-profile-Item'>
                                        <label>
                                            Tôn giáo
                                        </label>
                                        <Box sx={{ minWidth: 260 }}>
                                            <FormControl fullWidth>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    onChange={handleChangeTonGiao}
                                                    defaultValue={userData.ton_giao?.id}
                                                    style={{height: '36px'}}
                                                >
                                                    {ton_giao_table.map((item) => {
                                                            
                                                        return (<MenuItem value={item.id}>{item.name}</MenuItem> )
                                                    })}
                                                </Select>
                                            </FormControl>
                                        </Box>
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