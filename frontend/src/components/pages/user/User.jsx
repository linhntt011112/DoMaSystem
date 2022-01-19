import React from 'react'
import './user.css';
import { Publish } from '@material-ui/icons';

export default function User() {
    return (
        <div className='user'>
            <div className='userTitleContainer'>
                <h1 className='userTitle'>Thông tin chi tiết</h1>
                <button className='profileEdit' href="#popup1">Edit</button>
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
                            <span className='userShowUserDateOfJoined'><b>Ngay vao lam: </b>19/01/2022</span>
                        </div>

                    </div>
                    <div className='userShowBottom'>
                        <div className='row userShowInfo'>
                            <div className="column1">
                                <div className='title'>Tên tài khoản: </div>
                                <div className='title'>Dien thoai: </div>

                                <div className='title'>Email: </div>
                                <div className='title'>Gioi tinh: </div>
                            </div>
                            <div className="column2">
                                <div className='userShowInfoTitle'>bnt1001</div>
                                <div className='userShowInfoTitle'>+1 123 456</div>
                                <div className='userShowInfoTitle'>btn1001@gmail.com</div>
                                <div className='userShowInfoTitle'>Nu</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='userShow'>
                    <div className='card-title'>
                        Thong tin ca nhan
                    </div>
                    <div className='userShowBottom'>
                        <div className='row userShowInfo'>
                            <div className="column1">
                                <div className='title'>Ngay sinh: </div>
                                <div className='title'>Dia chi: </div>
                                <div className='title'>CMND: </div>
                                <div className='title'>Ngay cap: </div>
                                <div className='title'>Noi cap: </div>
                                <div className='title'>Que quan: </div>
                                <div className='title'>Email: </div>

                            </div>
                            <div className="column2">
                                <div className='userShowInfoTitle'>19/01/1897</div>
                                <div className='userShowInfoTitle'>New York | USA</div>
                                <div className='userShowInfoTitle'>35467897895</div>
                                <div className='userShowInfoTitle'>19/01/1897</div>
                                <div className='userShowInfoTitle'>New York | USA</div>
                                <div className='userShowInfoTitle'>New York | USA</div>
                                <div className='userShowInfoTitle'>btn1001@gmail.com</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <span className='userUpdateTitle'>Thong tin cong viec</span>
            <div className='userShow'>
                <div className='row userShowInfo'>
                    <div className="row userShowJobColumn1">
                        <div className='userShowJobColumn11'>
                            <div className='title'>Loai nhan vien: </div>
                            <div className='title'>Phong ban: </div>
                            <div className='title'>Chuc vu: </div>
                            <div className='title'>TK ngan hang: </div>
                            <div className='title'>Ngan hang: </div>

                        </div>
                        <div className="userShowJobColumn12">
                            <div className='userShowInfoTitle'>Chinh thuc</div>
                            <div className='userShowInfoTitle'>Giam doc</div>
                            <div className='userShowInfoTitle'>Giam doc</div>
                            <div className='userShowInfoTitle'>19011897</div>
                            <div className='userShowInfoTitle'>New York Bank</div>
                        </div>
                    </div>
                    <div className="row userShowJobColumn1">
                        <div className='userShowJobColumn11'>
                            <div className='title'>Hoc van: </div>
                            <div className='title'>Bang cap: </div>
                            <div className='title'>Ngoai ngu: </div>
                            <div className='title'>Dan toc: </div>
                            <div className='title'>Ton giao: </div>
                        </div>
                        <div className="userShowJobColumn12">
                            <div className='userShowInfoTitle'>Dai hoc</div>
                            <div className='userShowInfoTitle'>Ky su</div>
                            <div className='userShowInfoTitle'>Tieng Nhat</div>
                            <div className='userShowInfoTitle'>Kinh</div>
                            <div className='userShowInfoTitle'>Khong</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='userUpdate'>
                <span className='userUpdateTitle'>Edit</span>
                <form className='userUpdateForm'>
                    <div className='userUpdateLeft'>
                        <div className='userUpdateItem'>
                            <label>Username</label>
                            <input
                                type="text"
                                placeholder="annabeck99"
                                className='userUpdateInput'
                            />
                        </div>
                        <div className='userUpdateItem'>
                            <label>Full name</label>
                            <input
                                type="text"
                                placeholder="Anna Becker"
                                className='userUpdateInput'
                            />
                        </div>
                        <div className='userUpdateItem'>
                            <label>Email</label>
                            <input
                                type="text"
                                placeholder="annabeck99@gmail.com"
                                className='userUpdateInput'
                            />
                        </div>
                        <div className='userUpdateItem'>
                            <label>Phone</label>
                            <input
                                type="text"
                                placeholder="+1 123 456"
                                className='userUpdateInput'
                            />
                        </div>
                        <div className='userUpdateItem'>
                            <label>Address</label>
                            <input
                                type="text"
                                placeholder="New York | USA"
                                className='userUpdateInput'
                            />
                        </div>
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
                        <button className='userUpdateButton'>Update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
