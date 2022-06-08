import React, { useEffect, useState } from "react";
import { Close } from '@material-ui/icons';
import "./editcongvanden.css";
import {Box, FormControl, MenuItem, Select} from "@mui/material";
import BasicDatePicker from "../BasicDatePicker/BasicDatePicker";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Button from '@material-ui/core/Button';

export default function EditCongVanDen(props) {
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        // submitAddUser();
        props.setTrigger(false);
    }

    useEffect(() => {
        console.log(editorState);
      }, [editorState]);

      return (props.trigger) ? (
        <div className="popup-main">
            <form className="popup-inner" onSubmit={handleSubmit}>
                <Close className="close-btn" onClick={() => props.setTrigger(false)}/>
                <div className="cong-van-den-update">
                    <div className="cong-van-den-update-header">
                        <span className="cong-van-den-update-title">Chỉnh sửa công văn đến</span>
                    </div>
                    <div className="cong-van-den-update-body">
                        <div className="cong-van-den-update-body-column-1">
                            <div className="cong-van-den-update-item">
                                <label>
                                    Số công văn
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <input
                                        type="text"
                                        value="3969"
                                        className='cong-van-den-update-input'
                                        // disabled
                                    />
                            </div>
                            <div className="cong-van-den-update-item">
                                <label>
                                    Tên công văn
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <input
                                        type="text"
                                        value="3969"
                                        className='cong-van-den-update-input'
                                        // disabled
                                    />
                            </div>
                            <div className='cong-van-den-update-item'>
                                <label>
                                    Người nhận
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <Box className='cong-van-den-update-select'>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            // value={loaiPhongBan}
                                            // onChange={handleChangeLoaiPhongBan}
                                            defaultValue={3}
                                            style={{
                                                height: '36px'
                                            }}
                                            required
                                        >
                                            <MenuItem value={1}>Phong Giam doc1</MenuItem>
                                            <MenuItem value={2}>Phong Giam doc2</MenuItem>
                                            <MenuItem value={3}>Phong Giam doc3</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
                            <div className='cong-van-den-update-item'>
                                <label>
                                    Ngày nhận
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <input 
                                    type="date" 
                                    className='datepicker' 
                                    onKeyDown={(e) => {
                                        e.preventDefault();
                                    }}
                                    // onChange={(e) => setNgayKy(e.target.value)}
                                    defaultValue="2022-06-02"
                                    required
                                    style={{
                                        width: '253px',
                                        fontSize: '16px',
                                        paddingLeft: '10.5px'
                                    }}
                                />
                            </div>
                            <div className='cong-van-den-update-item'>
                                <label>
                                    Bộ phận phát hành
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <Box className='cong-van-den-update-select'>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            // value={loaiPhongBan}
                                            // onChange={handleChangeLoaiPhongBan}
                                            defaultValue={3}
                                            style={{
                                                height: '36px'
                                            }}
                                            required
                                        >
                                            <MenuItem value={1}>Phong Giam doc1</MenuItem>
                                            <MenuItem value={2}>Phong Giam doc2</MenuItem>
                                            <MenuItem value={3}>Phong Giam doc3</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
                            <div className='cong-van-den-update-item'>
                                <label>
                                    Loại công văn
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <Box className='cong-van-den-update-select'>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            // value={loaiPhongBan}
                                            // onChange={handleChangeLoaiPhongBan}
                                            defaultValue={3}
                                            style={{
                                                height: '36px'
                                            }}
                                            required
                                        >
                                            <MenuItem value={1}>Phong Giam doc1</MenuItem>
                                            <MenuItem value={2}>Phong Giam doc2</MenuItem>
                                            <MenuItem value={3}>Phong Giam doc3</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
                            <div className='cong-van-den-update-item'>
                                <label>
                                    Người theo dõi
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <Box className='cong-van-den-update-select'>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            // value={loaiPhongBan}
                                            // onChange={handleChangeLoaiPhongBan}
                                            defaultValue={3}
                                            style={{
                                                height: '36px'
                                            }}
                                            required
                                        >
                                            <MenuItem value={1}>Phong Giam doc1</MenuItem>
                                            <MenuItem value={2}>Phong Giam doc2</MenuItem>
                                            <MenuItem value={3}>Phong Giam doc3</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
                            <div className='cong-van-den-update-item'>
                                <label>
                                    Người tạo
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <input
                                    type="text"
                                    value="3969"
                                    className='cong-van-den-update-input'
                                    disabled
                                />
                            </div>
                            <div className='cong-van-den-update-item'>
                                <label>
                                    Người duyệt
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <Box className='cong-van-den-update-select'>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            // value={loaiPhongBan}
                                            // onChange={handleChangeLoaiPhongBan}
                                            defaultValue={3}
                                            style={{
                                                height: '36px'
                                            }}
                                            required
                                        >
                                            <MenuItem value={1}>Phong Giam doc1</MenuItem>
                                            <MenuItem value={2}>Phong Giam doc2</MenuItem>
                                            <MenuItem value={3}>Phong Giam doc3</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
                            <div className='cong-van-den-update-item'>
                                <label>
                                    Ngày duyệt
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <input 
                                    type="date" 
                                    className='datepicker' 
                                    onKeyDown={(e) => {
                                        e.preventDefault();
                                    }}
                                    // onChange={(e) => setNgayHieuLuc(e.target.value)}
                                    required
                                    style={{
                                        width: '244px',
                                        fontSize: '16px',
                                        paddingLeft: '10.5px'
                                    }}
                                />
                            </div>
                        </div>
                        <div className="cong-van-den-update-body-column-2">
                            <div className='cong-van-den-update-item'>
                                <label>
                                    Ngày hiệu lực
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <input 
                                    type="date" 
                                    className='datepicker' 
                                    onKeyDown={(e) => {
                                        e.preventDefault();
                                    }}
                                    // onChange={(e) => setNgayHieuLuc(e.target.value)}
                                    required
                                    style={{
                                        width: '244px',
                                        fontSize: '16px',
                                        paddingLeft: '10.5px'
                                    }}
                                />
                            </div>
                            <div className='cong-van-den-update-item'>
                                <label>
                                    Ngày hết hiệu lực
                                </label>
                                <input 
                                    type="date" 
                                    className='datepicker' 
                                    onKeyDown={(e) => {
                                        e.preventDefault();
                                    }}
                                    // onChange={(e) => setNgayHieuLuc(e.target.value)}
                                    required
                                    style={{
                                        width: '244px',
                                        fontSize: '16px',
                                        paddingLeft: '10.5px'
                                    }}
                                />
                            </div>
                            <div className="cong-van-den-update-item">
                                <label>
                                    Số lượng văn bản
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <input
                                        type="number"
                                        value="3969"
                                        className='cong-van-den-update-input'
                                        onKeyPress={(event) => {
                                            if (!/[0-9]/.test(event.key)) {
                                              event.preventDefault();
                                            }
                                        }}
                                        // disabled
                                />
                            </div>
                            <div className='cong-van-den-update-item'>
                                <label>
                                    Mức độ bảo mật
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <Box className='cong-van-den-update-select'>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            // value={loaiPhongBan}
                                            // onChange={handleChangeLoaiPhongBan}
                                            defaultValue={3}
                                            style={{
                                                height: '36px'
                                            }}
                                            required
                                        >
                                            <MenuItem value={1}>Phong Giam doc1</MenuItem>
                                            <MenuItem value={2}>Phong Giam doc2</MenuItem>
                                            <MenuItem value={3}>Phong Giam doc3</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
                            <div className='cong-van-den-update-item'>
                                <label>
                                    Mức độ khẩn cấp
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <Box className='cong-van-den-update-select'>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            // value={loaiPhongBan}
                                            // onChange={handleChangeLoaiPhongBan}
                                            defaultValue={3}
                                            style={{
                                                height: '36px'
                                            }}
                                            required
                                        >
                                            <MenuItem value={1}>Phong Giam doc1</MenuItem>
                                            <MenuItem value={2}>Phong Giam doc2</MenuItem>
                                            <MenuItem value={3}>Phong Giam doc3</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
                            <div className='cong-van-den-update-item'>
                                <label>
                                    Ngày phát hành
                                </label>
                                <input 
                                    type="date" 
                                    className='datepicker' 
                                    onKeyDown={(e) => {
                                        e.preventDefault();
                                    }}
                                    // onChange={(e) => setNgayPhatHanh(e.target.value)}
                                    required
                                    style={{
                                        width: '244px',
                                        fontSize: '16px',
                                        paddingLeft: '10.5px'
                                    }}
                                />
                            </div>
                            <div className='cong-van-den-update-item'>
                                <label>
                                    Người xử lý
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <Box className='cong-van-den-update-select'>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            // value={loaiPhongBan}
                                            // onChange={handleChangeLoaiPhongBan}
                                            defaultValue={3}
                                            style={{
                                                height: '36px'
                                            }}
                                            required
                                        >
                                            <MenuItem value={1}>Phong Giam doc1</MenuItem>
                                            <MenuItem value={2}>Phong Giam doc2</MenuItem>
                                            <MenuItem value={3}>Phong Giam doc3</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
                            <div className='cong-van-den-update-item'>
                                <label>
                                    Tình trạng xử lý
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <Box className='cong-van-den-update-select'>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            // value={loaiPhongBan}
                                            // onChange={handleChangeLoaiPhongBan}
                                            defaultValue={3}
                                            style={{
                                                height: '36px'
                                            }}
                                            required
                                        >
                                            <MenuItem value={1}>Phong Giam doc1</MenuItem>
                                            <MenuItem value={2}>Phong Giam doc2</MenuItem>
                                            <MenuItem value={3}>Phong Giam doc3</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
                            <div className='cong-van-den-update-item'>
                                <label>
                                    Ngày tạo
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <input 
                                    type="date" 
                                    className='datepicker' 
                                    onKeyDown={(e) => {
                                        e.preventDefault();
                                    }}
                                    // onChange={(e) => setNgayTao(e.target.value)}
                                    // value={today_date}
                                    required
                                    style={{
                                        width: '244px',
                                        fontSize: '16px',
                                        paddingLeft: '10.5px'
                                    }}
                                    disabled
                                />
                            </div>
                        </div>
                    </div>
                    <div className="cong-van-den-update-item-reason">
                        <label>
                            Lý do
                        </label>
                        <input
                            type="text"
                            value="3969"
                            className='cong-van-den-update-input-reason'
                            // disabled
                        />
                    </div>
                    <div className="cong-van-den-update-item-content">Nội dung</div>
                    <div style={{ border: "1px solid black", padding: '2px', minHeight: '400px' }}>
                        <Editor
                            editorState={editorState}
                            onEditorStateChange={setEditorState}
                        />
                    </div>
                    <input
                        type="file"
                        accept="*"
                        style={{ display: 'none' }}
                        id="contained-button-file"
                    />
                    <label htmlFor="contained-button-file">
                        <Button className="cong-van-den-update-button" variant="contained" color="primary" component="span">
                            Tep dinh kem
                        </Button>
                    </label>
                    <div className='cong-van-den-update-footer'>
                        <button className='cong-van-den-update-button'>Cập nhật</button>
                    </div>
                </div>
            </form>
        </div>
    ) : "";
}