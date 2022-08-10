import React, { useState, useEffect } from 'react'
import "./addUserPopup.css";
import {Col, Container, Row} from "react-bootstrap";
import {Checkbox, FormControlLabel, Box, FormControl, Select, MenuItem} from "@mui/material";
import { Close } from '@material-ui/icons';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import * as backend_config from "../../../config/backend"
import OutsideAlerter from '../Common/OutsideClick';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { width } from '@mui/system';
import moment from "moment";

export default function AddUserPopup(props) {
    const {token, refreshFunc} = props;

    const [chuc_vu_table, setChucVuTable] = React.useState([]);
    const [phong_ban_table, setPhongBanTable] = React.useState([]);
    const [hoc_van_table, setHocVanTable] = React.useState([]);
    const [dan_toc_table, setDanTocTable] = React.useState([]);
    const [quoc_tich_table, setQuocTichTable] = React.useState([]);
    const [ton_giao_table, setTonGiaoTable] = React.useState([]);

    const [chuc_vu, setChucVu] = React.useState(null);
    const [phong_ban, setPhongBan] = React.useState(null);
    const [hoc_van, setHocVan] = React.useState(null);
    const [dan_toc, setDanToc] = React.useState(null);
    const [quoc_tich, setQuocTich] = React.useState(null);
    const [ton_giao, setTonGiao] = React.useState(null);
    const [ho_va_ten, setHoVaTen] = useState(null);
    const [ten_tai_khoan, setTenTaiKhoan] = useState(null);
    const [gioi_tinh, setGioiTinh] = useState(false);
    const [phan_quyen, setPhanQuyen] = useState(false);
    const [dien_thoai, setDienThoai] = useState(null);
    const [email, setEmail] = useState(null);
    const [cccd, setCCCD] = useState(null);
    const [ngay_cap, setNgayCap] = useState(null);
    const [ngay_sinh, setNgaySinh] = useState(null);
    const [noi_cap, setNoiCap] = useState(null);
    const [dia_chi, setDiaChi] = useState(null);
    const [que_quan, setQueQuan] = useState(null);
    const [ngay_vao_lam, setNgayVaoLam] = useState(null);
    const [tk_ngan_hang, setTKNganHang] = useState(null);
    const [ngan_hang, setNganHang] = useState(null);

    const handleChangeHoVaTen = (event) => {
        setHoVaTen(event.target.value)
    }

    const handleChangeChucVu = (event) => {
        setChucVu(event.target.value);
    };

    const handleChangePhongBan = (event) => {
        setPhongBan(event.target.value);
    }

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
    }, [])

    const addUserNotify = (response_json) => {
        toast.success(<div>Thêm người dùng thành công! <br /> Mật khẩu là: {response_json.plain_password}</div>, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: false,
            closeOnClick: false,
        })
    }

    const addUserNotifyDuplicateUsername = (response_json) => {
        toast.error("Tên tài khoản bị trùng", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: true
        })
    }

    const addUserNotifyHoVaTen = (response_json) => {
        toast.error("Họ và tên không hợp lệ", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: true
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (ho_va_ten.trim() !== "") submitAddUser();
        else addUserNotifyHoVaTen();
    }

    const submitAddUser = () => {
        const body = JSON.stringify({
            ho_ten: ho_va_ten,
            ten_tai_khoan: ten_tai_khoan,
            ngay_sinh: ngay_sinh,
            dia_chi: dia_chi,
            ngay_vao_lam: ngay_vao_lam,
            dien_thoai: dien_thoai,
            email: email,
            phan_quyen: phan_quyen === true ? "admin" : "user",
            gioi_tinh: gioi_tinh === true ? "Nu" : "Nam",
            cccd: cccd,
            ngay_cap: ngay_cap,
            noi_cap: noi_cap,
            que_quan: que_quan,
            tk_ngan_hang: tk_ngan_hang,
            ngan_hang: ngan_hang,
            id_phong_ban: phong_ban,
            id_chuc_vu: chuc_vu,
            id_hoc_van: hoc_van,
            id_dan_toc: dan_toc,
            id_quoc_tich: quoc_tich,
            id_ton_giao: ton_giao
        });
        console.log(body);

        backend_config.makeRequest("POST", 
            backend_config.USER_POST_CREATE, 
            token,
            body
        )
        .then((response) => {
            console.log(body);
            if (response.ok){
                console.log(body);
                response.json().then((response_json) => {
                    console.log(response_json);
                    addUserNotify(response_json);
                    props.setTrigger(false);
                    refreshFunc();
                    setPhanQuyen(false);
                    setGioiTinh(false);
                    setPhongBan(null);
                    setChucVu(null);
                    setHocVan(null);
                    setDanToc(null);
                    setQuocTich(null);
                    setTonGiao(null);
                    setEmail(null)
                })
            }
            else {
                response.text().then((text) => {
                    let error = JSON.parse(text).detail;
                    switch (error) {
                        case "Duplicate ten_tai_khoan!": 
                            addUserNotifyDuplicateUsername();
                            return;
                        default:
                            alert(text);
                            return;
                    }
                })
            }
        })

        // props.setTrigger(false);
    }

    const handleClosePopUp = () => {
        props.setTrigger(false)
        setPhanQuyen(false);
        setGioiTinh(false);
        setPhongBan(null);
        setChucVu(null);
        setHocVan(null);
        setDanToc(null);
        setQuocTich(null);
        setTonGiao(null);
    }
   
    return (props.trigger) ? (
        <div className="popup-main">
                <form className="add-user-popup-inner" onSubmit={handleSubmit}>
                    <Close className="close-btn" onClick={handleClosePopUp}/>
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
                                        onChange={handleChangeHoVaTen}
                                        required
                                        pattern='^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$'
                                    />
                                    <span className='errorMessage'>Họ và tên không hợp lệ</span>
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
                                        <span className='text-danger' style={{color: 'red'}}>  *</span>
                                    </label>
                                    <FormControlLabel control={<Checkbox checked={gioi_tinh} onChange={(e) => setGioiTinh(e.target.checked)}/>} label="Nữ" required/>
                                </div>
                            </Col>
                            <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                                <div className='userAddItem'>
                                    <label>
                                        Phân quyền
                                        <span className='text-danger' style={{color: 'red'}}>  *</span>
                                    </label>
                                    <FormControlLabel control={<Checkbox checked={phan_quyen} onChange={(e) => setPhanQuyen(e.target.checked)}/>} label="Admin" required/>
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
                                        <span className='text-danger' style={{color: 'red'}}>  *</span>
                                    </label>
                                    <input 
                                        type="date" 
                                        className='datepicker' 
                                        onKeyDown={(e) => {
                                            e.preventDefault();
                                        }}
                                        onChange={(e) => setNgaySinh(e.target.value)}
                                        max="2004-12-31"
                                        required
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row style={{display: 'flex', flex: 'wrap', marginLeft: '15px', marginRight: '15px'}}>
                            <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                                <div className='userAddItem'>
                                    <label>
                                        CCCD
                                        <span className='text-danger' style={{color: 'red'}}>  *</span>
                                    </label>
                                    <input
                                        onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
                                        className='userAddInput'
                                        onChange={(e) => setCCCD(e.target.value)}
                                        maxlength="12"
                                        required
                                    />
                                </div>
                            </Col>
                            <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                                <div className='userAddItem'>
                                    <label>
                                        Ngày cấp
                                        <span className='text-danger' style={{color: 'red'}}>  *</span>
                                    </label>
                                    <input 
                                        type="date" 
                                        className='datepicker' 
                                        onKeyDown={(e) => {
                                            e.preventDefault();
                                        }}
                                        onChange={(e) => setNgayCap(e.target.value)}
                                        required
                                    />
                                </div>
                            </Col>
                            <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                                <div className='userAddItem'>
                                    <label>
                                        Nơi cấp
                                        <span className='text-danger' style={{color: 'red'}}>  *</span>
                                    </label>
                                    <input
                                        type="text"
                                        className='userAddInput'
                                        onChange={(e) => setNoiCap(e.target.value)}
                                        required
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
                                    style={{width: '826px'}}
                                    onChange={(e) => setDiaChi(e.target.value)}
                                />
                            </div>
                        </Row>
                        <Row style={{display: 'flex', flex: 'wrap', marginLeft: '15px', marginRight: '15px'}}>
                            <div className='userAddItem' style={{padding: '15px 0px 0px 15px'}}>
                                <label>
                                    Quê quán
                                    <span className='text-danger' style={{color: 'red'}}>  *</span>
                                </label>
                                <input
                                    type="text"
                                    className='userAddInput'
                                    style={{width: '826px'}}
                                    onChange={(e) => setQueQuan(e.target.value)}
                                    required
                                />
                            </div>
                        </Row>
                        <h6 style={{fontSize: '20px', paddingTop: '20px'}}>Thông tin công việc</h6>
                        <Row style={{display: 'flex', flex: 'wrap', marginLeft: '15px', marginRight: '15px'}}>
                            <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                                <div className='userAddItem'>
                                    <label>
                                        Ngày vào làm
                                        <span className='text-danger' style={{color: 'red'}}>  *</span>
                                    </label>
                                    <input 
                                        type="date" 
                                        className='datepicker' 
                                        onKeyDown={(e) => {
                                            e.preventDefault();
                                        }}
                                        onChange={(e) => setNgayVaoLam(e.target.value)}
                                        required
                                    />
                                </div>
                            </Col>
                            <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                                <div className='userAddItem'>
                                    <label>
                                        Phòng ban
                                        <span className='text-danger' style={{color: 'red'}}>  *</span>
                                    </label>
                                    <Box sx={{ width: 261 }}>
                                        <FormControl fullWidth>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={phong_ban}
                                                onChange={handleChangePhongBan}
                                                style={{
                                                    height: '35px'
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
                            </Col>
                            <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                                <div className='userAddItem'>
                                    <label>
                                        Chức vụ
                                        <span className='text-danger' style={{color: 'red'}}>  *</span>
                                    </label>
                                    <Box sx={{ width: 261 }}>
                                        <FormControl fullWidth>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={chuc_vu}
                                                onChange={handleChangeChucVu}
                                                style={{height: '35px'}}
                                                required
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
                                    <Box sx={{ width: 261 }}>
                                        <FormControl fullWidth>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={hoc_van}
                                                onChange={handleChangeHocVan}
                                                style={{height: '35px'}}
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
                                <div className='userAddItem'>
                                    <label>
                                        Dân tộc
                                    </label>
                                    <Box sx={{ width: 261 }}>
                                        <FormControl fullWidth>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={dan_toc}
                                                onChange={handleChangeDanToc}
                                                style={{height: '35px'}}
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
                                <div className='userAddItem'>
                                    <label>
                                        Quốc tịch
                                    </label>
                                    <Box sx={{ width: 261 }}>
                                        <FormControl fullWidth>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={quoc_tich}
                                                onChange={handleChangeQuocTich}
                                                style={{height: '35px'}}
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
                                <div className='userAddItem'>
                                    <label>
                                        Tôn giáo
                                    </label>
                                    <Box sx={{ width: 261 }}>
                                        <FormControl fullWidth>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={ton_giao}
                                                onChange={handleChangeTonGiao}
                                                style={{
                                                    height: '35px',
                                                    whiteSpace: 'nowrap'
                                                }}
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
                    <div className='modal-footer'>
                        <button className='userAddButtonSubmit' >Thêm</button>
                    </div>
                </form>
            
        </div>
    ) : "";
};
