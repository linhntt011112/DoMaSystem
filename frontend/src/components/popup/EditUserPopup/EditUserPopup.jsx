import React, {useState, useEffect, useContext} from 'react'
import './editUserPopup.css'
import {Row, Col, Container} from "react-bootstrap";
import {Box, FormControl, MenuItem, Select} from "@mui/material";
import { UserContext } from "../../../context/UserContext";
import { useParams } from "react-router-dom";
import { Close } from '@material-ui/icons';

export default function EditUserPopup(props) {
    const [token,] = useContext(UserContext);

    const { userId } = useParams();

    const [userData, setUserData] = useState("");

    const [phan_quyen, setPhanQuyen] = React.useState('');

    const handleChangePhanQuyen = (event) => {
        setPhanQuyen(event.target.value);
    };

    useEffect(() => {
        const requestOptions = {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          };
        fetch(`http://127.0.0.1:3009/users/id/${userId}`, requestOptions)
          .then((data) => data.json())
          .then((data) => setUserData(data))
    }, [])

    return (props.trigger) ? (
        <div className="popup-main">
            <form className="popup-inner">
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
                                        <input type="checkbox" id='admin' name='admin' value='admin' defaultChecked={userData.phan_quyen} onClick={handleChangePhanQuyen}/>
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