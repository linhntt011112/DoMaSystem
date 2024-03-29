import React, { useEffect, useState } from "react";
import './EditEventPopup.css';
import { Close } from "@material-ui/icons";
import { toast } from 'react-toastify';
import { DeletePopup } from '../../popup/Dialog/DeletePopup';
import * as backend_config from '../../../config/backend'

export default function EditEventPopup (props) {
    const {eventUser, token, refreshFunc} = props;
    const [eventName, setEventName] = useState(eventUser?.name);
    const [start_time, setStartTime] = useState(eventUser?.start_time.split("T")[0]);
    const [end_time, setEndTime] = useState(eventUser?.end_time.split("T")[0]);

    const [deletePopupButton, setDeletePopupButton] = useState(false);

    // let ngay_bat_dau_month = eventUser?.slotStart.getMonth() + 1,
    // ngay_bat_dau = eventUser?.slotStart.getFullYear() + '-' + (ngay_bat_dau_month < 10 ? '0' + ngay_bat_dau_month : ngay_bat_dau_month) + '-' + (eventUser?.slotStart.getDate() < 10 ? '0' + eventUser?.slotStart.getDate() : eventUser?.slotStart.getDate()),
    // ngay_ket_thuc_month = eventUser?.slotEnd.getMonth() + 1,
    // ngay_ket_thuc = eventUser?.slotEnd.getFullYear() + '-' + (ngay_ket_thuc_month < 10 ? '0' + ngay_ket_thuc_month : ngay_ket_thuc_month) + '-' + (eventUser?.slotEnd.getDate() < 10 ? '0' + eventUser?.slotEnd.getDate() : eventUser?.slotEnd.getDate());

const handleEdit = (e) => {
    let body = {
        name: eventName,
        start_time: start_time,
        end_time: end_time
    }

    body = JSON.stringify(body)
    // console.log(body)
    
    backend_config.makeRequest("PUT",
        backend_config.LICH_PUT_UPDATE.replace("{id}", eventUser?.id),
        token,
        body
    )
    .then((response) => {
        if (response.ok) {
            toast.success('Lưu thông tin thành công!', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: true
            })
            props.setTrigger(false);
            refreshFunc();
            return true;
        }
    else {
        response.text().then((text) => {
            toast.error(<div>Không thể sửa sự kiện!</div>, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: false
            })
            e.preventDefault();
            // console.log(text);
            return false;
        })
    }})
}
  

  useEffect(() => {
    setEventName(eventUser?.name)
    setStartTime(eventUser?.start_time.split("T")[0])
    setEndTime(eventUser?.end_time.split("T")[0])
  }, [eventUser])

  return (props.trigger && eventUser) ? (
    <div className="popup-main">
      <div className="edit-event-popup-inner" >
          <Close className="close-btn" onClick={() => props.setTrigger(false)}/>
          <div className="edit-event">
              <h5 className="edit-event-title">Chỉnh sửa sự kiện</h5>
              <div className="edit-event-body">
                  <div className="edit-event-item">
                      <label>
                          Tên sự kiện
                          <span className='text-danger' style={{color: 'red'}}>  *</span>
                      </label>
                      <input
                          type="text"
                          className='edit-event-input'
                          required
                          onChange={(e) => setEventName(e.target.value)}
                          value={eventName}
                      />
                  </div>
                  <div className="edit-event-item">
                      <label>
                          Ngày bắt đầu
                          <span className='text-danger' style={{color: 'red'}}>  *</span>
                      </label>
                      <input
                          type="date"
                          className='datepicker'
                          onKeyDown={(e) => {
                              e.preventDefault();
                          }}
                          style={{
                              width: '263px',
                              fontSize: '15px',
                              paddingLeft: '10.5px'
                          }}
                          required
                          onChange={(e) => setStartTime(e.target.value)}
                          value={start_time}
                      />
                  </div>
                  <div className="edit-event-item">
                      <label>
                          Ngày kết thúc
                          <span className='text-danger' style={{color: 'red'}}>  *</span>
                      </label>
                      <input
                          type="date"
                          className='datepicker'
                          onKeyDown={(e) => {
                              e.preventDefault();
                          }}
                          style={{
                              width: '263px',
                              fontSize: '15px',
                              paddingLeft: '10.5px'
                          }}
                          required
                          onChange={(e) => setEndTime(e.target.value)}
                          defaultValue={end_time}
                            value={end_time}
                      />
                  </div>
              </div>
              <div className='modal-footer'>
                  <button className='add-event-button-submit' type='submit' onClick={handleEdit}>Lưu</button>
                  <button className='delete-event-button-submit' type="button" onClick={() => setDeletePopupButton(true)}>Xóa sự kiện</button>
                  <DeletePopup 
                            className='cong-van-di-delete-popup'
                            trigger={deletePopupButton} setTrigger={setDeletePopupButton} 
                            token={token} 
                            url={backend_config.LICH_DELETE.replace('{id}', eventUser?.id)}
                            mark={eventUser?.id} 
                            id={eventUser?.id} 
                            message={"Bạn có chắc muốn xóa sự kiện này không?"}
                            refreshFunc={() => {props.setTrigger(false); refreshFunc()}}
                    >
                    </DeletePopup>
              </div>
          </div>
      </div>
        </div>
  ) : "";
}