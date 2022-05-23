import React, { useEffect, useState } from "react";
import { Close } from '@material-ui/icons';
import "./addCongVanDi.css";
import BasicDatePicker from "../BasicDatePicker/BasicDatePicker";
import {Box, FormControl, MenuItem, Select} from "@mui/material";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import Button from '@material-ui/core/Button';
import * as backend_config from "../../../config/backend"

export default function AddCongVanDi(props) {
    const {token, refreshFunc} = props;
    const [phong_ban_table, setPhongBanTable] = React.useState([]);

    const [phong_ban, setPhongBan] = React.useState(null);
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );

    const handleChangePhongBan = (event) => {
        setPhongBan(event.target.value);
    }

    const fetchOneStaticTableData = (name, setData) => {
        return backend_config.makeRequest("GET", backend_config.STATIC_TABLE_GET_LIST.replace('{static_table_name}', name), token)
        .then((response) => response.json())
        .then((data) => {
            setData(data);
            console.log(data);
        })
    }

    useEffect(() => {
        fetchOneStaticTableData('phong_ban', setPhongBanTable);
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        // submitAddUser();
        props.setTrigger(false);
    }

    return (props.trigger) ? (
        <div className="popup-main">
            <form className="popup-inner" onSubmit={handleSubmit}>
                <Close className="close-btn" onClick={() => props.setTrigger(false)}/>
                <div className="cong-van-di-add">
                    <div className="cong-van-di-add-header">
                        <span className="cong-van-di-add-title">Thêm mới công văn đi</span>
                    </div>
                    <div className="cong-van-di-add-body">
                        <div className="cong-van-di-add-body-column-1">
                            <div className="cong-van-di-add-item">
                                <label>
                                    Số công văn
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <input
                                    type="text"
                                    className='cong-van-di-add-input'
                                />
                            </div>
                            <div className="cong-van-di-add-item">
                                <label>
                                    Tên công văn
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <input
                                    type="text"
                                    className='cong-van-di-add-input'
                                />
                            </div>
                            <div className="cong-van-di-add-item">
                                <label>
                                    Nơi nhận
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <Box sx={{ width: 258 }}>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={phong_ban}
                                            onChange={handleChangePhongBan}
                                            style={{
                                                height: '36px'
                                            }}
                                        >
                                            {phong_ban_table.map((item) => {
                                                
                                                    return (<MenuItem value={item.id}>{item.name}</MenuItem> )
                                            })}
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
                            <div className='cong-van-di-add-item'>
                                <label>
                                    Người ký
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <Box className='cong-van-di-add-select'>
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
                                        >
                                            <MenuItem value={1}>Phong Giam doc1</MenuItem>
                                            <MenuItem value={2}>Phong Giam doc2</MenuItem>
                                            <MenuItem value={3}>Phong Giam doc3</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
                            <div className='cong-van-di-add-item'>
                                <label>
                                    Ngày ký
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <input 
                                    type="date" 
                                    className='datepicker' 
                                    onKeyDown={(e) => {
                                        e.preventDefault();
                                    }}
                                    // onChange={(e) => setNgayKy(e.target.value)}
                                    required
                                    style={{
                                        width: '253px',
                                    }}
                                />
                            </div>
                            <div className='cong-van-di-add-item'>
                                <label>
                                    Bộ phận phát hành
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <Box sx={{ width: 258 }}>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={phong_ban}
                                            onChange={handleChangePhongBan}
                                            style={{
                                                height: '36px'
                                            }}
                                        >
                                            {phong_ban_table.map((item) => {
                                                
                                                    return (<MenuItem value={item.id}>{item.name}</MenuItem> )
                                            })}
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
                            <div className='cong-van-di-add-item'>
                                <label>
                                    Loại công văn
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <Box className='cong-van-di-add-select'>
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
                                        >
                                            <MenuItem value={1}>Phong Giam doc1</MenuItem>
                                            <MenuItem value={2}>Phong Giam doc2</MenuItem>
                                            <MenuItem value={3}>Phong Giam doc3</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
                            <div className='cong-van-di-add-item'>
                                <label>
                                    Người theo dõi
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <Box className='cong-van-di-add-select'>
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
                                        >
                                            <MenuItem value={1}>Phong Giam doc1</MenuItem>
                                            <MenuItem value={2}>Phong Giam doc2</MenuItem>
                                            <MenuItem value={3}>Phong Giam doc3</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
                            <div className='cong-van-di-add-item'>
                                <label>
                                    Người tạo
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <input
                                    type="text"
                                    value="3969"
                                    className='cong-van-di-add-input'
                                    disabled
                                />
                            </div>
                            <div className='cong-van-di-add-item'>
                                <label>
                                    Người duyệt
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <Box className='cong-van-di-add-select'>
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
                                        >
                                            <MenuItem value={1}>Phong Giam doc1</MenuItem>
                                            <MenuItem value={2}>Phong Giam doc2</MenuItem>
                                            <MenuItem value={3}>Phong Giam doc3</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
                        </div>
                        <div className="cong-van-di-add-body-column-2">
                            <div className="cong-van-di-add-item">
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
                                    // onChange={(e) => setNgayKy(e.target.value)}
                                    required
                                    style={{
                                        width: '253px',
                                    }}
                                />
                            </div>
                            <div className='cong-van-di-add-item'>
                                <label>
                                    Ngày hết hiệu lực
                                </label>
                                <input 
                                    type="date" 
                                    className='datepicker' 
                                    onKeyDown={(e) => {
                                        e.preventDefault();
                                    }}
                                    // onChange={(e) => setNgayKy(e.target.value)}
                                    required
                                    style={{
                                        width: '253px',
                                    }}
                                />
                            </div>
                            <div className="cong-van-di-add-item">
                                <label>
                                    Số lượng văn bản
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <input
                                    type="text"
                                    value="3969"
                                    className='cong-van-di-add-input'
                                />
                            </div>
                            <div className='cong-van-di-add-item'>
                                <label>
                                    Mức độ bảo mật
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <Box className='cong-van-di-add-select'>
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
                                        >
                                            <MenuItem value={1}>Phong Giam doc1</MenuItem>
                                            <MenuItem value={2}>Phong Giam doc2</MenuItem>
                                            <MenuItem value={3}>Phong Giam doc3</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
                            <div className='cong-van-di-add-item'>
                                <label>
                                    Mức độ khẩn cấp
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <Box className='cong-van-di-add-select'>
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
                                        >
                                            <MenuItem value={1}>Phong Giam doc1</MenuItem>
                                            <MenuItem value={2}>Phong Giam doc2</MenuItem>
                                            <MenuItem value={3}>Phong Giam doc3</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
                            <div className='cong-van-di-add-item'>
                                <label>
                                    Ngày phát hành
                                </label>
                                <input 
                                    type="date" 
                                    className='datepicker' 
                                    onKeyDown={(e) => {
                                        e.preventDefault();
                                    }}
                                    // onChange={(e) => setNgayKy(e.target.value)}
                                    required
                                    style={{
                                        width: '253px',
                                    }}
                                />
                            </div>
                            <div className='cong-van-di-add-item'>
                                <label>
                                    Người xử lý
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <Box className='cong-van-di-add-select'>
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
                                        >
                                            <MenuItem value={1}>Phong Giam doc1</MenuItem>
                                            <MenuItem value={2}>Phong Giam doc2</MenuItem>
                                            <MenuItem value={3}>Phong Giam doc3</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
                            <div className='cong-van-di-add-item'>
                                <label>
                                    Tình trạng xử lý
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <Box className='cong-van-di-add-select'>
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
                                        >
                                            <MenuItem value={1}>Phong Giam doc1</MenuItem>
                                            <MenuItem value={2}>Phong Giam doc2</MenuItem>
                                            <MenuItem value={3}>Phong Giam doc3</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
                            <div className='cong-van-di-add-item'>
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
                                    // onChange={(e) => setNgayKy(e.target.value)}
                                    required
                                    style={{
                                        width: '253px',
                                    }}
                                    disabled
                                />
                            </div>
                            <div className='cong-van-di-add-item'>
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
                                    // onChange={(e) => setNgayKy(e.target.value)}
                                    required
                                    style={{
                                        width: '253px',
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="cong-van-di-add-item-reason">
                        <label>
                            Lý do
                        </label>
                        <input
                            type="text"
                            value="3969"
                            className='cong-van-di-add-input-reason'
                        />
                    </div>
                    <div className="cong-van-di-add-item-content">Nội dung</div>
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
                            Tệp đính kèm
                        </Button>
                    </label>
                    <div className='cong-van-di-add-footer'>
                        <button className='cong-van-di-add-button'>Thêm</button>
                    </div>
                </div>
            </form>
        </div>
    ) : "";
}