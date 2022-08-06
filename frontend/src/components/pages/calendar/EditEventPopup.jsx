import React, { useState } from "react";
import './EditEventPopup.css';
import { Close } from "@material-ui/icons";

export default function EditEventPopup (props) {
    const {eventUser, token, refreshFunc } = props;
    const [name, setName] = useState(eventUser?.name);
    const [start, setStart] = useState(eventUser?.start_time);
    const [end, setEnd] = useState(eventUser?.start_time);

    // let ngay_bat_dau_month = eventUser?.slotStart.getMonth() + 1,
    // ngay_bat_dau = eventUser?.slotStart.getFullYear() + '-' + (ngay_bat_dau_month < 10 ? '0' + ngay_bat_dau_month : ngay_bat_dau_month) + '-' + (eventUser?.slotStart.getDate() < 10 ? '0' + eventUser?.slotStart.getDate() : eventUser?.slotStart.getDate()),
    // ngay_ket_thuc_month = eventUser?.slotEnd.getMonth() + 1,
    // ngay_ket_thuc = eventUser?.slotEnd.getFullYear() + '-' + (ngay_ket_thuc_month < 10 ? '0' + ngay_ket_thuc_month : ngay_ket_thuc_month) + '-' + (eventUser?.slotEnd.getDate() < 10 ? '0' + eventUser?.slotEnd.getDate() : eventUser?.slotEnd.getDate());

  const handleSubmit = (e) => {
    e.preventDefault();
    // updateCongVan();
    // props.setTrigger(false);
  }
  
  const handleClose = (e) => {
    e.preventDefault();
    props.setTrigger(false);
    // setEditorState(() => EditorState.createEmpty())
  }

  return (props.trigger) ? (
    <div className="popup-main">
      <form className="edit-event-popup-inner" onSubmit={handleSubmit}>
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
                          onChange={(e) => setName(e.target.value)}
                          defaultValue={eventUser?.title}
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
                          onChange={(e) => setStart(e.target.value)}
                          defaultValue={eventUser?.start_time}
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
                          onChange={(e) => setEnd(e.target.value)}
                          defaultValue={eventUser?.start_time}
                      />
                  </div>
              </div>
              <div className='modal-footer'>
                  <button className='add-event-button-submit' type='submit'>Lưu</button>
                  <button className='delete-event-button-submit' type="button">Xóa sự kiện</button>
              </div>
          </div>
      </form>
        </div>
  ) : "";
}