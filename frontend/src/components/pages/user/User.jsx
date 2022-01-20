import React, {useState} from 'react'
import './user.css';
import Popup from "../../popup/Popup/Popup";
import EditUser from "../../popup/EditUser/EditUser";
import { useHistory } from "react-router-dom";
import { ArrowBack } from '@material-ui/icons';

export default function User() {
    const [buttonPopup, setButtonPopup] = useState(false);
    let history = useHistory();

    return (
        <div className='user'>
            <main>
                <div className='userTitleContainer'>
                    <ArrowBack className='userTitleContainerIcon' onClick={() => history.goBack()} ></ArrowBack>
                    <h1 className='userTitle'>Thông tin chi tiết</h1>
                    <button className='profileEdit' onClick={() => setButtonPopup(true)}>Edit</button>
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
                                <span className='userShowUsername'>Nguyen Thi B</span>
                                <span className='userShowUserCode'><b>Mã nhân viên: </b>1001</span>
                                <span className='userShowUserDateOfJoined'><b>Ngày vào làm: </b>19/01/2022</span>
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
                                    <div className='userShowInfoTitle'>bnt1001</div>
                                    <div className='userShowInfoTitle'>+1 123 456</div>
                                    <div className='userShowInfoTitle'>btn1001@gmail.com</div>
                                    <div className='userShowInfoTitle'>Nhân viên</div>
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
                                    <div className='title'>CMND: </div>
                                    <div className='title'>Ngày cấp: </div>
                                    <div className='title'>Nơi cấp: </div>
                                    <div className='title'>Quê quán: </div>
                                </div>
                                <div className="column2">
                                    <div className='userShowInfoTitle'>Nu</div>
                                    <div className='userShowInfoTitle'>19/01/1897</div>
                                    <div className='userShowInfoTitle'>New York | USA</div>
                                    <div className='userShowInfoTitle'>35467897895</div>
                                    <div className='userShowInfoTitle'>19/01/1897</div>
                                    <div className='userShowInfoTitle'>New York | USA</div>
                                    <div className='userShowInfoTitle'>New York | USA</div>
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
                                <div className='userShowInfoTitle'>Giam doc</div>
                                <div className='userShowInfoTitle'>Giam doc</div>
                                <div className='userShowInfoTitle'>19011897</div>
                                <div className='userShowInfoTitle'>New York Bank</div>
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
                                <div className='userShowInfoTitle'>Dai hoc</div>
                                <div className='userShowInfoTitle'>Kinh</div>
                                <div className='userShowInfoTitle'>Việt Nam</div>
                                <div className='userShowInfoTitle'>Khong</div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                <EditUser />
            </Popup>
        </div>
    )
}
