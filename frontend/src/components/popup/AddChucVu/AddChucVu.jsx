import React from "react";
import './AddChucVu.css';
import { toast } from 'react-toastify';
import { Close } from '@material-ui/icons';
import * as backend_config from '../../../config/backend'

export default function AddChucVu(props) {
    const {token, refreshFunc} = props;
    const [ten_chuc_vu, setTenChucVu] = React.useState(null);

    const addChucVuSuccessNotify = (response_json) => {
        toast.success(<div>Thêm dữ liệu thành công!</div>, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: true
        })
    }

    const submitAddChucVu = () => {
        const body = JSON.stringify({
            name: ten_chuc_vu,
        })
        console.log(body);

        backend_config.makeRequest("POST", 
            backend_config.STATIC_TABLE_POST_CREATE.replace('{static_table_name}', 'chuc_vu'), 
            token,
            body
        )
        .then((response) => {
            if (response.ok){
                response.json().then((response_json) => {
                    addChucVuSuccessNotify(response_json);
                    props.setTrigger(false);
                    refreshFunc();
                    setTenChucVu(null);
                })
            }
            else {
                response.text().then((text) => {
                    let error = JSON.parse(text).detail;
                    switch (error) {
                        // case "Duplicate ten_tai_khoan!": 
                        //     addUserNotifyDuplicateUsername();
                        //     return;
                        default:
                            alert(text);
                            return;
                    }
                })
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        submitAddChucVu();
    }

    return (props.trigger) ? (
        <div className="popup-main">
            <form className="add-chuc-vu-popup-inner" onSubmit={handleSubmit}>
                <Close className="close-btn" onClick={() => props.setTrigger(false)}/>
                <div className='add-chuc-vu'>
                    <h5 className='modal-title'>Thêm mới chức vụ</h5>
                    <div className='modal-body'>
                        <div className='chuc-vu-AddItem'>
                            <label>
                                Chức vụ
                                <span className='text-danger' style={{color: 'red'}}>  *</span>
                            </label>
                            <input
                                type="text"
                                className='chuc-vu-AddInput'
                                required
                                onChange={(e) => setTenChucVu(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='modal-footer'>
                        <button className='chuc-vu-AddButtonSubmit' type='submit'>Lưu</button>
                    </div>
                </div>
            </form>
        </div>
    ) : "";
}