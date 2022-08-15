import React from "react";
import './EditChucVu.css';
import { Close } from '@material-ui/icons';
import * as backend_config from '../../../config/backend';
import { toast } from 'react-toastify';

export default function EditChucVu(props) {
    const {chuc_vu, token, refreshFunc } = props;
    const [ten_chuc_vu, setTenChucVu] = React.useState(chuc_vu?.name);

    const editChucVuSuccessNotify = (response_json) => {
        toast.success(<div>Lưu dữ liệu thành công!</div>, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: true
        })
    }

    const submitEditChucVu = () => {
        const body = JSON.stringify({
            id: chuc_vu?.id,
            name: ten_chuc_vu,
        })
        backend_config.makeRequest("PUT", 
            backend_config.STATIC_TABLE_PUT_UPDATE.replace('{static_table_name}', 'chuc_vu'), 
            token,
            body
        )
        .then((response) => {
            if (response.ok){
                response.json().then((response_json) => {
                    refreshFunc();
                    props.setTrigger(false);
                    editChucVuSuccessNotify();
                })
            }
            else {
                response.text().then((text) => {
                    let error = JSON.parse(text).detail;
                    switch (error) {
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
        submitEditChucVu();
        // props.setTrigger(false);
        // editLoaiCongVanSuccessNotify();
    }

    return props.trigger && props.mark === chuc_vu?.id ?(
        <div className="popup-main">
            <form className="edit-chuc-vu-popup-inner" onSubmit={handleSubmit}>
                <Close className="close-btn" onClick={() => props.setTrigger(false)}/>
                <div className='edit-chuc-vu'>
                    <h5 className='modal-title'>Chỉnh sửa thông tin chức vụ</h5>
                    <div className='modal-body'>
                        <div className='chuc-vu-edit-Item'>
                            <label>
                                Chức vụ
                                <span className='text-danger' style={{color: 'red'}}>  *</span>
                            </label>
                            <input
                                type="text"
                                className='chuc-vu-edit-Input'
                                required
                                defaultValue={chuc_vu?.name}
                                onChange={(e) => setTenChucVu(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='modal-footer'>
                        <button className='chuc-vu-edit-ButtonSubmit' type='submit'>Lưu</button>
                    </div>
                </div>
            </form>
        </div>
    ) : ""
}