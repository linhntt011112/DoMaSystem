import React, {useState, useEffect} from 'react'
import './myprofile.css';
import EditMyProfile from "../../popup/EditMyProfile/EditMyProfile";
import { useHistory, useParams } from "react-router-dom";
import * as backend_config from "../../../config/backend"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function MyProfile(props) {
    const token = props.token;
    const [buttonPopup, setButtonPopup] = useState(false);

    const [userData, setUserData] = useState("");

    const refreshFunc = () =>{
        backend_config.makeRequest("GET", backend_config.USER_GET_CURRENT_API, token)
          .then((data) => data.json())
          .then((data) => setUserData(data))
    }

    useEffect(() => {
        refreshFunc();
    }, [])

    return  (
        <div className='my-profile'>
            <main>
                <div className='my-profile-TitleContainer'>
                    <h1 className='my-profile-Title'>Thông tin cá nhân</h1>   
                    {userData !== "" &&
                        <div>
                            <button className='my-profile-Edit' onClick={() => setButtonPopup(true)}>Chỉnh sửa</button>
                                <EditMyProfile trigger={buttonPopup} setTrigger={setButtonPopup} userData={userData} token={token} refreshFunc={refreshFunc}>
                                </EditMyProfile>
                        </div>   
                    }
                </div>
                <div className='my-profile-Container'>
                    <div className='my-profile-Show'>
                        <div className='my-profile-ShowTop'>
                            <img
                                src='https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg'
                                alt=''
                                className='my-profile-ShowImg'
                            />
                            <div className='my-profile-ShowTopTitle'>
                                <span className='my-profile-ShowUsername'>
                                    {userData.ho_ten}
                                </span>
                                <span className='my-profile-ShowUserCode'><b>Mã nhân viên: </b>
                                    {userData.ma_nguoi_dung}
                                </span>
                                <span className='my-profile-ShowUserDateOfJoined'><b>Ngày vào làm: </b>
                                    {userData.ngay_vao_lam}
                                </span>
                            </div>
                        </div>
                        <div className='my-profile-ShowBottom'>
                            <div className='row my-profile-ShowInfo'>
                                <div className="my-profile-column1">
                                    <div className='my-profile-title'>Tên tài khoản: </div>
                                    <div className='my-profile-title'>Điện thoại: </div>
                                    <div className='my-profile-title'>Email: </div>
                                    <div className='my-profile-title'>Phân quyền: </div>
                                </div>
                                <div className="my-profile-column2">
                                    <div className='my-profile-ShowInfoTitle'>
                                        {userData.ten_tai_khoan}
                                    </div>
                                    <div className='my-profile-ShowInfoTitle'>
                                        {userData.dien_thoai}
                                    </div>
                                    <div className='my-profile-ShowInfoTitle'>
                                        {userData.email}
                                    </div>
                                    <div className='my-profile-ShowInfoTitle'>
                                        {userData.phan_quyen === "admin" ? 'Admin' : 'Nhân Viên'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='my-profile-Show'>
                        <div className='my-profile-card-title'>
                            Thông tin cá nhân
                        </div>
                        <div className='my-profile-ShowBottom'>
                            <div className='row my-profile-ShowInfo'>
                                <div className="my-profile-column1">
                                    <div className='my-profile-title'>Giới tính: </div>
                                    <div className='my-profile-title'>Ngày sinh: </div>
                                    <div className='my-profile-title'>Địa chỉ: </div>
                                    <div className='my-profile-title'>CCCD: </div>
                                    <div className='my-profile-title'>Ngày cấp: </div>
                                    <div className='my-profile-title'>Nơi cấp: </div>
                                    <div className='my-profile-title'>Quê quán: </div>
                                </div>
                                <div className="my-profile-column2">
                                    <div className='my-profile-ShowInfoTitle'>
                                        {userData.gioi_tinh === "Nam" ? 'Nam' : 'Nữ'}
                                    </div>
                                    <div className='my-profile-ShowInfoTitle'>
                                        {userData.ngay_sinh}
                                    </div>
                                    <div className='my-profile-ShowInfoTitle'>
                                        {userData.dia_chi}
                                    </div>
                                    <div className='my-profile-ShowInfoTitle'>
                                        {userData.cccd}
                                    </div>
                                    <div className='my-profile-ShowInfoTitle'>
                                        {userData.ngay_cap}
                                    </div>
                                    <div className='my-profile-ShowInfoTitle'>
                                        {userData.noi_cap}
                                    </div>
                                    <div className='my-profile-ShowInfoTitle'>
                                        {userData.que_quan}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='my-profile-JobTitle'>
                    <h4>Thông tin công việc</h4>
                </div>
                <div className='my-profile-Show'>
                    <div className='row my-profile-ShowInfo'>
                        <div className="row my-profile-ShowJobColumn1">
                            <div className='my-profile-ShowJobColumn11'>
                                <div className='my-profile-title'>Phòng ban: </div>
                                <div className='my-profile-title'>Chức vụ: </div>
                                <div className='my-profile-title'>TK ngân hàng: </div>
                                <div className='my-profile-title'>Ngân hàng: </div>

                            </div>
                            <div className="my-profile-ShowJobColumn12">
                                <div className='my-profile-ShowInfoTitle'>
                                    {userData.phong_ban?.name}
                                </div>
                                <div className='my-profile-ShowInfoTitle'>
                                    {userData.chuc_vu?.name}
                                </div>
                                <div className='my-profile-ShowInfoTitle'>
                                    {userData.tk_ngan_hang}
                                </div>
                                <div className='my-profile-ShowInfoTitle'>
                                    {userData.ngan_hang}
                                </div>
                            </div>
                        </div>
                        <div className="row my-profile-ShowJobColumn1">
                            <div className='my-profile-ShowJobColumn11'>
                                <div className='my-profile-title'>Học vấn: </div>
                                <div className='my-profile-title'>Dân tộc: </div>
                                <div className='my-profile-title'>Quốc tịch: </div>
                                <div className='my-profile-title'>Tôn giáo: </div>
                            </div>
                            <div className="my-profile-ShowJobColumn12">
                                <div className='my-profile-ShowInfoTitle'>
                                    {userData.hoc_van?.name}
                                </div>
                                <div className='my-profile-ShowInfoTitle'>
                                    {userData.dan_toc?.name}
                                </div>
                                <div className='my-profile-ShowInfoTitle'>
                                    {userData.quoc_tich?.name}
                                </div>
                                <div className='my-profile-ShowInfoTitle'>
                                    {userData.ton_giao?.name}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <ToastContainer />
        </div>
        
    )
}
