import React, {useState, useEffect} from 'react'
import './myprofile.css';
import EditMyProfile from "../../popup/EditMyProfile/EditMyProfile";
import { useHistory, useParams } from "react-router-dom";
import * as backend_config from "../../../config/backend"

export default function MyProfile(props) {
    const token = props.token;
    const [buttonPopup, setButtonPopup] = useState(false);

    // const { userId } = useParams();

    const [userData, setUserData] = useState("");

    // useEffect(() => {
    //     backend_config.makeRequest("GET", backend_config.USER_GET_BY_ID_API.replace('{id}', userId), token)
    //       .then((data) => data.json())
    //       .then((data) => setUserData(data))
    // }, [])

    return (
        <div className='my-profile'>
            <main>
                <div className='my-profile-TitleContainer'>
                    <h1 className='my-profile-Title'>Thông tin cá nhân</h1>   
                    <div>
                        <button className='my-profile-Edit' onClick={() => setButtonPopup(true)}>Chỉnh sửa</button>
                            <EditMyProfile trigger={buttonPopup} setTrigger={setButtonPopup} userData={userData} token={token}>
                            </EditMyProfile>
                        </div>     
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
                                    Nguyễn Văn A
                                </span>
                                <span className='my-profile-ShowUserCode'><b>Mã nhân viên: </b>
                                    1001
                                </span>
                                <span className='my-profile-ShowUserDateOfJoined'><b>Ngày vào làm: </b>
                                    13/05/2022
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
                                        nta
                                    </div>
                                    <div className='my-profile-ShowInfoTitle'>
                                        0919301681
                                    </div>
                                    <div className='my-profile-ShowInfoTitle'>
                                        nta@gmail.com
                                    </div>
                                    <div className='my-profile-ShowInfoTitle'>
                                        Admin
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
                                        Nữ
                                    </div>
                                    <div className='my-profile-ShowInfoTitle'>
                                        01/11/1999
                                    </div>
                                    <div className='my-profile-ShowInfoTitle'>
                                        Số 7 Tạ Quang Bửu
                                    </div>
                                    <div className='my-profile-ShowInfoTitle'>
                                        0123456789
                                    </div>
                                    <div className='my-profile-ShowInfoTitle'>
                                        17/06/2018
                                    </div>
                                    <div className='my-profile-ShowInfoTitle'>
                                        Hà Nam
                                    </div>
                                    <div className='my-profile-ShowInfoTitle'>
                                        à Nam
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
                                    Phòng kế toán
                                </div>
                                <div className='my-profile-ShowInfoTitle'>
                                    Giám đốc
                                </div>
                                <div className='my-profile-ShowInfoTitle'>
                                    132346790
                                </div>
                                <div className='my-profile-ShowInfoTitle'>
                                    Vietcombank
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
                                    Địa học
                                </div>
                                <div className='my-profile-ShowInfoTitle'>
                                    Kinh
                                </div>
                                <div className='my-profile-ShowInfoTitle'>
                                    Việt Nam
                                </div>
                                <div className='my-profile-ShowInfoTitle'>
                                    Không
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            
        </div>
    )
}
