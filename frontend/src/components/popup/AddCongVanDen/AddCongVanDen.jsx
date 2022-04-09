import React, { useEffect, useState } from "react";
import { Close } from '@material-ui/icons';
import "./addcongvanden.css";
import BasicDatePicker from "../DatePicker/DatePicker";
import {Box, FormControl, MenuItem, Select} from "@mui/material";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import Button from '@material-ui/core/Button';

export default function AddCongVanDen(props) {
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        // submitAddUser();
        props.setTrigger(false);
    }

    return (props.trigger) ? (
        <div className="popup-main">
            <form className="popup-inner" onSubmit={handleSubmit}>
                <Close className="close-btn" onClick={() => props.setTrigger(false)}/>
                <div className="cong-van-den-add">
                    <div className="cong-van-den-add-header">
                        <span className="cong-van-den-add-title">Them moi cong van den</span>
                    </div>
                    <div className="cong-van-den-add-body">
                        <div className="cong-van-den-add-body-column-1">
                            <div className="cong-van-den-add-item">
                                <label>
                                    So cong van
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <input
                                    type="text"
                                    className='cong-van-den-add-input'
                                />
                            </div>
                            <div className="cong-van-den-add-item">
                                <label>
                                    Ten cong van
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <input
                                    type="text"
                                    value="3969"
                                    className='cong-van-den-add-input'
                                    disabled
                                />
                            </div>
                            <div className='cong-van-den-add-item'>
                                <label>
                                    Nguoi nhan
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <Box className='cong-van-den-add-select'>
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
                            <div className='cong-van-den-add-item'>
                                <label>
                                    Ngay nhan
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <BasicDatePicker />
                            </div>
                            <div className='cong-van-den-add-item'>
                                <label>
                                    Bo phan phat hanh
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <Box className='cong-van-den-add-select'>
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
                            <div className='cong-van-den-add-item'>
                                <label>
                                    Loai cong van
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <Box className='cong-van-den-add-select'>
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
                            <div className='cong-van-den-add-item'>
                                <label>
                                    Nguoi theo doi
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <Box className='cong-van-den-add-select'>
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
                            <div className='cong-van-den-add-item'>
                                <label>
                                    Nguoi tao
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <input
                                    type="text"
                                    value="3969"
                                    className='cong-van-den-add-input'
                                    disabled
                                />
                            </div>
                            <div className='cong-van-den-add-item'>
                                <label>
                                    Nguoi duyet
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <Box className='cong-van-den-add-select'>
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
                        <div className="cong-van-den-add-body-column-2">
                            <div className="cong-van-den-add-item">
                                <label>
                                    Ngay hieu luc
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <BasicDatePicker />
                            </div>
                            <div className='cong-van-den-add-item'>
                                <label>
                                    Ngay het hieu luc
                                </label>
                                <BasicDatePicker />
                            </div>
                            <div className="cong-van-den-add-item">
                                <label>
                                    So luong van ban
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <input
                                        type="text"
                                        value="3969"
                                        className='cong-van-den-add-input'
                                        disabled
                                />
                            </div>
                            <div className='cong-van-den-add-item'>
                                <label>
                                    Muc do bao mat
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <Box className='cong-van-den-add-select'>
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
                            <div className='cong-van-den-add-item'>
                                <label>
                                    Muc do khan cap
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <Box className='cong-van-den-add-select'>
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
                            <div className='cong-van-den-add-item'>
                                <label>
                                    Ngay phat hanh
                                </label>
                                <BasicDatePicker />
                            </div>
                            <div className='cong-van-den-add-item'>
                                <label>
                                    Nguoi xu ly
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <Box className='cong-van-den-add-select'>
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
                            <div className='cong-van-den-add-item'>
                                <label>
                                    Tinh trang xu ly
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <Box className='cong-van-den-add-select'>
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
                            <div className='cong-van-den-add-item'>
                                <label>
                                    Ngay tao
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <BasicDatePicker />
                            </div>
                            <div className='cong-van-den-add-item'>
                                <label>
                                    Ngay duyet
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <BasicDatePicker />
                            </div>
                        </div>
                    </div>
                    <div className="cong-van-den-add-item-reason">
                        <label>
                            Ly Do
                        </label>
                        <input
                            type="text"
                            value="3969"
                            className='cong-van-den-add-input-reason'
                            disabled
                        />
                    </div>
                    <div className="cong-van-den-add-item-content">Noi dung</div>
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
                        <Button className="cong-van-di-add-button" variant="contained" color="primary" component="span">
                            Tep dinh kem
                        </Button>
                    </label>
                    <div className='cong-van-den-add-footer'>
                        <button className='cong-van-di-add-button'>Luu</button>
                    </div>
                </div>
            </form>
        </div>
    ) : "";
}