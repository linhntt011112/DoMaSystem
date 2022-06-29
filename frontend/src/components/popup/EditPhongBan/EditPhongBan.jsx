import React from "react";
import './EditPhongBan.css';
import { Close } from '@material-ui/icons';
import * as backend_config from '../../../config/backend';
import { toast } from 'react-toastify';

export default function EditPhongBan(props) {
    const {phong_ban, token, refreshFunc } = props;
    const [ten_phong_ban, setTenPhongBan] = React.useState(phong_ban?.name);

    const editPhongBanSuccessNotify = (response_json) => {
        toast.success(<div>Lưu dữ liệu thành công!</div>, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: true
        })
    }

    const submitEditPhongBan = () => {
        const body = JSON.stringify({
            id: phong_ban?.id,
            name: ten_phong_ban,
        })
        backend_config.makeRequest("PUT", 
            backend_config.STATIC_TABLE_PUT_UPDATE.replace('{static_table_name}', 'phong_ban'), 
            token,
            body
        )
        .then((response) => {
            if (response.ok){
                response.json().then((response_json) => {
                    props.setTrigger(false);
                    refreshFunc();
                    editPhongBanSuccessNotify();
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
        submitEditPhongBan();
        // props.setTrigger(false);
        // editLoaiCongVanSuccessNotify();
    }

    return props.trigger && props.mark === phong_ban?.id ?(
        <div className="popup-main">
            <form className="edit-phong-ban-popup-inner" onSubmit={handleSubmit}>
                <Close className="close-btn" onClick={() => props.setTrigger(false)}/>
                <div className='edit-phong-ban'>
                    <h5 className='modal-title'>Chỉnh sửa thông tin phòng ban</h5>
                    <div className='modal-body'>
                        <div className='phong-ban-edit-Item'>
                            <label>
                                Tên phòng ban
                                <span className='text-danger' style={{color: 'red'}}>  *</span>
                            </label>
                            <input
                                type="text"
                                className='phong-ban-edit-Input'
                                required
                                defaultValue={phong_ban?.name}
                                onChange={(e) => setTenPhongBan(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='modal-footer'>
                        <button className='phong-ban-edit-ButtonSubmit' type='submit'>Lưu</button>
                    </div>
                </div>
            </form>
        </div>
    ) : ""
}