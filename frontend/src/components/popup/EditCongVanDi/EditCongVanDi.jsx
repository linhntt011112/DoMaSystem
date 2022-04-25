import React, { useEffect, useState } from "react";
import { Close } from '@material-ui/icons';
import "./editCongVanDi.css";
import {Box, FormControl, MenuItem, Select} from "@mui/material";
import BasicDatePicker from "../BasicDatePicker/BasicDatePicker";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Button from '@material-ui/core/Button';

export default function EditCongVanDi(props) {
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
                <div className="cong-van-di-update">
                    <div className="cong-van-di-update-header">
                        <span className="cong-van-di-update-title">Chinh sua cong van di</span>
                    </div>
                    <div className="cong-van-di-update-body">
                        <div className="cong-van-di-update-body-column-1">
                            <div className="cong-van-di-update-item">
                                <label>
                                    So cong van
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <input
                                        type="text"
                                        value="3969"
                                        className='cong-van-di-update-input'
                                        disabled
                                    />
                            </div>
                            <div className="cong-van-di-update-item">
                                <label>
                                    Ten cong van
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <input
                                        type="text"
                                        value="3969"
                                        className='cong-van-di-update-input'
                                        disabled
                                    />
                            </div>
                            <div className="cong-van-di-update-item">
                                <label>
                                    Noi nhan
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <input
                                        type="text"
                                        value="3969"
                                        className='cong-van-di-update-input'
                                        disabled
                                    />
                            </div>
                            <div className='cong-van-di-update-item'>
                                <label>
                                    Nguoi ky
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <Box className='cong-van-di-update-select'>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            // value={loaiPhongBan}
                                            // onChange={handleChangeLoaiPhongBan}
                                            defaultValue={3}
                                        >
                                            <MenuItem value={1}>Phong Giam doc1</MenuItem>
                                            <MenuItem value={2}>Phong Giam doc2</MenuItem>
                                            <MenuItem value={3}>Phong Giam doc3</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
                            <div className='cong-van-di-update-item'>
                                <label>
                                    Ngay ky
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <BasicDatePicker />
                            </div>
                            <div className='cong-van-di-update-item'>
                                <label>
                                    Bo phan phat hanh
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <Box className='cong-van-di-update-select'>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            // value={loaiPhongBan}
                                            // onChange={handleChangeLoaiPhongBan}
                                            defaultValue={3}
                                        >
                                            <MenuItem value={1}>Phong Giam doc1</MenuItem>
                                            <MenuItem value={2}>Phong Giam doc2</MenuItem>
                                            <MenuItem value={3}>Phong Giam doc3</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
                            <div className='cong-van-di-update-item'>
                                <label>
                                    Loai cong van
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <Box className='cong-van-di-update-select'>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            // value={loaiPhongBan}
                                            // onChange={handleChangeLoaiPhongBan}
                                            defaultValue={3}
                                        >
                                            <MenuItem value={1}>Phong Giam doc1</MenuItem>
                                            <MenuItem value={2}>Phong Giam doc2</MenuItem>
                                            <MenuItem value={3}>Phong Giam doc3</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
                            <div className='cong-van-di-update-item'>
                                <label>
                                    Nguoi theo doi
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <Box className='cong-van-di-update-select'>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            // value={loaiPhongBan}
                                            // onChange={handleChangeLoaiPhongBan}
                                            defaultValue={3}
                                        >
                                            <MenuItem value={1}>Phong Giam doc1</MenuItem>
                                            <MenuItem value={2}>Phong Giam doc2</MenuItem>
                                            <MenuItem value={3}>Phong Giam doc3</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
                            <div className='cong-van-di-update-item'>
                                <label>
                                    Nguoi tao
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <input
                                    type="text"
                                    value="3969"
                                    className='cong-van-di-update-input'
                                    disabled
                                />
                            </div>
                            <div className='cong-van-di-update-item'>
                                <label>
                                    Nguoi duyet
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <Box className='cong-van-di-update-select'>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            // value={loaiPhongBan}
                                            // onChange={handleChangeLoaiPhongBan}
                                            defaultValue={3}
                                        >
                                            <MenuItem value={1}>Phong Giam doc1</MenuItem>
                                            <MenuItem value={2}>Phong Giam doc2</MenuItem>
                                            <MenuItem value={3}>Phong Giam doc3</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
                        </div>
                        <div className="cong-van-di-update-body-column-2">
                            <div className='cong-van-di-update-item'>
                                <label>
                                    Ngay hieu luc
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <BasicDatePicker />
                            </div>
                            <div className='cong-van-di-update-item'>
                                <label>
                                    Ngay het hieu luc
                                </label>
                                <BasicDatePicker />
                            </div>
                            <div className="cong-van-di-update-item">
                                <label>
                                    So luong van ban
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <input
                                        type="text"
                                        value="3969"
                                        className='cong-van-di-update-input'
                                        disabled
                                />
                            </div>
                            <div className='cong-van-di-update-item'>
                                <label>
                                    Muc do bao mat
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <Box className='cong-van-di-update-select'>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            // value={loaiPhongBan}
                                            // onChange={handleChangeLoaiPhongBan}
                                            defaultValue={3}
                                        >
                                            <MenuItem value={1}>Phong Giam doc1</MenuItem>
                                            <MenuItem value={2}>Phong Giam doc2</MenuItem>
                                            <MenuItem value={3}>Phong Giam doc3</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
                            <div className='cong-van-di-update-item'>
                                <label>
                                    Muc do khan cap
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <Box className='cong-van-di-update-select'>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            // value={loaiPhongBan}
                                            // onChange={handleChangeLoaiPhongBan}
                                            defaultValue={3}
                                        >
                                            <MenuItem value={1}>Phong Giam doc1</MenuItem>
                                            <MenuItem value={2}>Phong Giam doc2</MenuItem>
                                            <MenuItem value={3}>Phong Giam doc3</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
                            <div className='cong-van-di-update-item'>
                                <label>
                                    Ngay phat hanh
                                </label>
                                <BasicDatePicker />
                            </div>
                            <div className='cong-van-di-update-item'>
                                <label>
                                    Nguoi xu ly
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <Box className='cong-van-di-update-select'>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            // value={loaiPhongBan}
                                            // onChange={handleChangeLoaiPhongBan}
                                            defaultValue={3}
                                        >
                                            <MenuItem value={1}>Phong Giam doc1</MenuItem>
                                            <MenuItem value={2}>Phong Giam doc2</MenuItem>
                                            <MenuItem value={3}>Phong Giam doc3</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
                            <div className='cong-van-di-update-item'>
                                <label>
                                    Tinh trang xu ly
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <Box className='cong-van-di-update-select'>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            // value={loaiPhongBan}
                                            // onChange={handleChangeLoaiPhongBan}
                                            defaultValue={3}
                                        >
                                            <MenuItem value={1}>Phong Giam doc1</MenuItem>
                                            <MenuItem value={2}>Phong Giam doc2</MenuItem>
                                            <MenuItem value={3}>Phong Giam doc3</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
                            <div className='cong-van-di-update-item'>
                                <label>
                                    Ngay tao
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <BasicDatePicker />
                            </div>
                            <div className='cong-van-di-update-item'>
                                <label>
                                    Ngay duyet
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <BasicDatePicker />
                            </div>
                        </div>
                    </div>
                    <div className="cong-van-di-update-item-reason">
                        <label>
                            Ly Do
                        </label>
                        <input
                            type="text"
                            value="3969"
                            className='cong-van-di-update-input-reason'
                            disabled
                        />
                    </div>
                    <div className="cong-van-di-update-item-content">Noi dung</div>
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
                        <Button className="cong-van-di-update-button" variant="contained" color="primary" component="span">
                            Tep dinh kem
                        </Button>
                    </label>
                    <div className='cong-van-di-update-footer'>
                        <button className='cong-van-di-update-button'>Cập nhật</button>
                    </div>
                </div>
            </form>
        </div>
    ) : "";
}