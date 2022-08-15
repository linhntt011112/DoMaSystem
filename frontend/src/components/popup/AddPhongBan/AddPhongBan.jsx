import React from "react";
import './AddPhongBan.css';
import { toast } from 'react-toastify';
import { Close } from '@material-ui/icons';
import * as backend_config from '../../../config/backend'

export default function AddPhongBan(props) {
    const {token, refreshFunc} = props;
    const [ten_phong_ban, setTenPhongBan] = React.useState(null);

    const addPhongBanSuccessNotify = (response_json) => {
        toast.success(<div>Thêm dữ liệu thành công!</div>, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: true
        })
    }

    const submitAddPhongBan = () => {
        const body = JSON.stringify({
            name: ten_phong_ban,
        })
        console.log(body);

        backend_config.makeRequest("POST", 
            backend_config.STATIC_TABLE_POST_CREATE.replace('{static_table_name}', 'phong_ban'), 
            token,
            body
        )
        .then((response) => {
            if (response.ok){
                response.json().then((response_json) => {
                    addPhongBanSuccessNotify(response_json);
                    props.setTrigger(false);
                    refreshFunc();
                    setTenPhongBan(null);
                })
            }
            else {
                response.text().then((text) => {
                    let error = JSON.parse(text).detail;
                    if (error.includes("Duplicate")) {
                        toast.error(<div>Đã có chức vụ này!</div>, {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: false
                        })
                    }
                    else{
                        switch (error) {
                            // case "Duplicate ten_tai_khoan!": 
                            //     addUserNotifyDuplicateUsername();
                            //     return;
                            default:
                                alert(text);
                                return;
                        }
                    }
                })
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        submitAddPhongBan();
    }

    return (props.trigger) ? (
        <div className="popup-main">
            <form className="add-phong-ban-popup-inner" onSubmit={handleSubmit}>
                <Close className="close-btn" onClick={() => props.setTrigger(false)}/>
                <div className='add-phong-ban'>
                    <h5 className='modal-title'>Thêm mới phòng ban</h5>
                    <div className='modal-body'>
                        <div className='phong-ban-AddItem'>
                            <label>
                                Tên phòng ban
                                <span className='text-danger' style={{color: 'red'}}>  *</span>
                            </label>
                            <input
                                type="text"
                                className='phong-ban-AddInput'
                                required
                                onChange={(e) => setTenPhongBan(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='modal-footer'>
                        <button className='phong-ban-AddButtonSubmit' type='submit'>Lưu</button>
                    </div>
                </div>
            </form>
        </div>
    ) : "";
}