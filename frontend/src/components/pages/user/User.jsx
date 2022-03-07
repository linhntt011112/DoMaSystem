import React, {useState, useEffect, useContext} from 'react'
import './user.css';
import Popup from "../../popup/Popup/Popup";
import EditUserPopup from "../../popup/EditUserPopup/EditUserPopup";
import { useHistory, useParams } from "react-router-dom";
import { ArrowBack } from '@material-ui/icons';
import { UserContext } from "../../../context/UserContext";

export default function User() {
    const [token,] = useContext(UserContext);
    const [buttonPopup, setButtonPopup] = useState(false);
    let history = useHistory();

    const { userId } = useParams();

    const [userData, setUserData] = useState("");

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

    return (
        
        <div className='user'>
            <main>
                <div className='userTitleContainer'>
                    <ArrowBack className='userTitleContainerIcon' onClick={() => history.goBack()} ></ArrowBack>
                    <h1 className='userTitle'>Thông tin chi tiết</h1>
                    <button className='profileEdit' onClick={() => setButtonPopup(true)}>Chỉnh sửa</button>
                </div>
                <div className='userContainer'>
                    <div className='userShow'>
                        <div className='userShowTop'>
                            <img
                                src='https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg'
                                alt=''
                                className='userShowImg'
                            />
                            <div className='userShowTopTitle'>
                                <span className='userShowUsername'>{userData.ho_ten}</span>
                                <span className='userShowUserCode'><b>Mã nhân viên: </b>{userData.ma_nguoi_dung}</span>
                                <span className='userShowUserDateOfJoined'><b>Ngày vào làm: </b>{userData.ngay_vao_lam}</span>
                            </div>
                        </div>
                        <div className='userShowBottom'>
                            <div className='row userShowInfo'>
                                <div className="column1">
                                    <div className='title'>Tên tài khoản: </div>
                                    <div className='title'>Điện thoại: </div>
                                    <div className='title'>Email: </div>
                                    <div className='title'>Phân quyền: </div>
                                </div>
                                <div className="column2">
                                    <div className='userShowInfoTitle'>{userData.ten_tai_khoan}</div>
                                    <div className='userShowInfoTitle'>{userData.dien_thoai}</div>
                                    <div className='userShowInfoTitle'>{userData.email}</div>
                                    <div className='userShowInfoTitle'>{userData.phan_quyen ? 'Admin' : 'Nhan Vien'}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='userShow'>
                        <div className='card-title'>
                            Thông tin cá nhân
                        </div>
                        <div className='userShowBottom'>
                            <div className='row userShowInfo'>
                                <div className="column1">
                                    <div className='title'>Giới tính: </div>
                                    <div className='title'>Ngày sinh: </div>
                                    <div className='title'>Địa chỉ: </div>
                                    <div className='title'>CCCD: </div>
                                    <div className='title'>Ngày cấp: </div>
                                    <div className='title'>Nơi cấp: </div>
                                    <div className='title'>Quê quán: </div>
                                </div>
                                <div className="column2">
                                    <div className='userShowInfoTitle'>{userData.gioi_tinh ? 'Nam' : 'Nu'}</div>
                                    <div className='userShowInfoTitle'>{userData.ngay_sinh}</div>
                                    <div className='userShowInfoTitle'>{userData.dia_chi}</div>
                                    <div className='userShowInfoTitle'>{userData.cccd}</div>
                                    <div className='userShowInfoTitle'>{userData.ngay_cap}</div>
                                    <div className='userShowInfoTitle'>{userData.noi_cap}</div>
                                    <div className='userShowInfoTitle'>{userData.que_quan}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='userJobTitle'>
                    <h4>Thông tin công việc</h4>
                </div>
                <div className='userShow'>
                    <div className='row userShowInfo'>
                        <div className="row userShowJobColumn1">
                            <div className='userShowJobColumn11'>
                                <div className='title'>Phòng ban: </div>
                                <div className='title'>Chức vụ: </div>
                                <div className='title'>TK ngân hàng: </div>
                                <div className='title'>Ngân hàng: </div>

                            </div>
                            <div className="userShowJobColumn12">
                                <div className='userShowInfoTitle'>{userData.phong_ban}</div>
                                <div className='userShowInfoTitle'>{userData.chuc_vu}</div>
                                <div className='userShowInfoTitle'>{userData.tk_ngan_hang}</div>
                                <div className='userShowInfoTitle'>{userData.ngan_hang}</div>
                            </div>
                        </div>
                        <div className="row userShowJobColumn1">
                            <div className='userShowJobColumn11'>
                                <div className='title'>Học vấn: </div>
                                <div className='title'>Dân tộc: </div>
                                <div className='title'>Quốc tịch: </div>
                                <div className='title'>Tôn giáo: </div>
                            </div>
                            <div className="userShowJobColumn12">
                                <div className='userShowInfoTitle'>{userData.hoc_van}</div>
                                <div className='userShowInfoTitle'>{userData.dan_toc}</div>
                                <div className='userShowInfoTitle'>{userData.quoc_tich}</div>
                                <div className='userShowInfoTitle'>{userData.ton_giao}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <EditUserPopup trigger={buttonPopup} setTrigger={setButtonPopup}>
            </EditUserPopup>
        </div>
    )
}
