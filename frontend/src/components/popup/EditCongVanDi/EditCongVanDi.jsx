import React, { useEffect, useState } from "react";
import { Close } from '@material-ui/icons';
import "./editCongVanDi.css";
import {Box, FormControl, MenuItem, Select} from "@mui/material";
import BasicDatePicker from "../BasicDatePicker/BasicDatePicker";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Button from '@material-ui/core/Button';
import * as backend_config from "../../../config/backend"

export default function EditCongVanDi(props) {

    const {token, refreshFunc} = props;
    const [phong_ban_table, setPhongBanTable] = React.useState([]);

    const [so_cong_van, setSoCongVan] = React.useState(null);
    const [ten_cong_van, setTenCongVan] = React.useState(null);
    const [noi_nhan, setNoiNhan] = React.useState(null);
    const [nguoi_ky, setNguoiKy] = React.useState(null);
    const [ngay_ky, setNgayKy] = React.useState(null);
    const [bo_phan_phat_hanh, setBoPhanPhatHanh] = React.useState(null);
    const [loai_cong_van, setLoaiCongVan] = React.useState(null);
    const [nguoi_theo_doi, setNguoiTheoDoi] = React.useState(null);
    const [nguoi_tao, setNguoiTao] = React.useState(null);
    const [nguoi_duyet, setNguoiDuyet] = React.useState(null);
    const [ngay_hieu_luc, setNgayHieuLuc] = React.useState(null);
    const [ngay_het_hieu_luc, setNgayHetHieuLuc] = React.useState(null);
    const [so_luong_van_ban, setSoLuongVanBan] = React.useState(null);
    const [muc_do_bao_mat, setMucDoBaoMat] = React.useState(null);
    const [muc_do_khan_cap, setMucDoKhanCap] = React.useState(null);
    const [ngay_phat_hanh, setNgayPhatHanh] = React.useState(null);
    const [nguoi_xu_ly, setNguoiXuLy] = React.useState(null);
    const [tinh_trang_xu_ly, setTinhTrangXuLy] = React.useState(null);
    const [ngay_tao, setNgayTao] = React.useState(null);
    const [ngay_duyet, setNgayDuyet] = React.useState(null);
    const [ly_do, setLyDo] = React.useState(null);

    const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
    );

    const handleChangeNoiNhan = (event) => {
        setNoiNhan(event.target.value);
    }

    const fetchOneStaticTableData = (name, setData) => {
        return backend_config.makeRequest("GET", backend_config.STATIC_TABLE_GET_LIST.replace('{static_table_name}', name), token)
        .then((response) => response.json())
        .then((data) => {
            setData(data);
            // console.log(data);
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

    useEffect(() => {
        console.log(editorState);
      }, [editorState]);
    
    return (props.trigger) ? (
        <div className="popup-main">
            <form className="popup-inner" onSubmit={handleSubmit}>
                <Close className="close-btn" onClick={() => props.setTrigger(false)}/>
                <div className="cong-van-di-update">
                    <div className="cong-van-di-update-header">
                        <span className="cong-van-di-update-title">Chỉnh sửa công văn đi</span>
                    </div>
                    <div className="cong-van-di-update-body">
                        <div className="cong-van-di-update-body-column-1">
                            <div className="cong-van-di-update-item">
                                <label>
                                    Số công văn
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <input
                                        type="text"
                                        defaultValue="3969"
                                        className='cong-van-di-update-input'
                                        // disabled
                                        required
                                    />
                            </div>
                            <div className="cong-van-di-update-item">
                                <label>
                                    Tên công văn
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <input
                                        type="text"
                                        defaultValue="3969"
                                        className='cong-van-di-update-input'
                                        // disabled
                                        required
                                    />
                            </div>
                            <div className="cong-van-di-update-item">
                                <label>
                                    Nơi nhận
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <Box sx={{ width: 267 }}>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            onChange={handleChangeNoiNhan}
                                            style={{
                                                height: '36px'
                                            }}
                                            required
                                            defaultValue="1"
                                        >
                                            {phong_ban_table.map((item) => {
                                                
                                                    return (<MenuItem value={item.id}>{item.name}</MenuItem> )
                                            })}
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
                            <div className='cong-van-di-update-item'>
                                <label>
                                    Người ký
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <Box className='cong-van-di-update-select'>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            defaultValue={2}
                                            // onChange={handleChangeLoaiPhongBan}
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
                            <div className='cong-van-di-update-item'>
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
                                    defaultValue="2022-06-02"
                                    required
                                    style={{
                                        width: '253px',
                                        fontSize: '16px',
                                        paddingLeft: '10.5px'
                                    }}
                                />
                            </div>
                            <div className='cong-van-di-update-item'>
                                <label>
                                    Bộ phận phát hành
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <Box className='cong-van-di-update-select'>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            // onChange={handleChangeLoaiPhongBan}
                                            defaultValue={3}
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
                            <div className='cong-van-di-update-item'>
                                <label>
                                    Loại công văn
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
                            <div className='cong-van-di-update-item'>
                                <label>
                                    Người theo dõi
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
                            <div className='cong-van-di-update-item'>
                                <label>
                                    Người tạo
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
                                    Người duyệt
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
                        </div>
                        <div className="cong-van-di-update-body-column-2">
                            <div className='cong-van-di-update-item'>
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
                                        width: '253px',
                                        fontSize: '16px',
                                        paddingLeft: '10.5px'
                                    }}
                                />
                            </div>
                            <div className='cong-van-di-update-item'>
                                <label>
                                    Ngày hết hiệu lực
                                </label>
                                <input 
                                    type="date" 
                                    className='datepicker' 
                                    onKeyDown={(e) => {
                                        e.preventDefault();
                                    }}
                                    // onChange={(e) => setNgayHetHieuLuc(e.target.value)}
                                    style={{
                                        width: '253px',
                                        fontSize: '16px',
                                        paddingLeft: '10.5px'
                                    }}
                                />
                            </div>
                            <div className="cong-van-di-update-item">
                                <label>
                                    Số lượng văn bản
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
                                </label>
                                <input
                                    type="number"
                                    defaultValue="3969"
                                    className='cong-van-di-update-input'
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                          event.preventDefault();
                                        }
                                    }}
                                    required
                                />
                            </div>
                            <div className='cong-van-di-update-item'>
                                <label>
                                    Mức độ bảo mật
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
                            <div className='cong-van-di-update-item'>
                                <label>
                                    Mức độ khẩn cấp
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
                            <div className='cong-van-di-update-item'>
                                <label>
                                    Ngày phát hành
                                    <span className='text-danger' style={{color: 'red'}}> *</span>
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
                                        width: '253px',
                                        fontSize: '16px',
                                        paddingLeft: '10.5px'
                                    }}
                                />
                            </div>
                            <div className='cong-van-di-update-item'>
                                <label>
                                    Người xử lý
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
                            <div className='cong-van-di-update-item'>
                                <label>
                                    Tình trạng xử lý
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
                            <div className='cong-van-di-update-item'>
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
                                    defaultValue="2022-06-02"
                                    required
                                    style={{
                                        width: '253px',
                                        fontSize: '16px',
                                        paddingLeft: '10.5px'
                                    }}
                                    disabled
                                />
                            </div>
                            <div className='cong-van-di-update-item'>
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
                                    // onChange={(e) => setNgayDuyet(e.target.value)}
                                    style={{
                                        width: '253px',
                                        fontSize: '16px',
                                        paddingLeft: '10.5px'
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="cong-van-di-update-item-reason">
                        <label>
                            Lý do
                        </label>
                        <input
                            type="text"
                            value="3969"
                            className='cong-van-di-update-input-reason'
                            disabled
                        />
                    </div>
                    <div className="cong-van-di-update-item-content">Nội dung
                        <span className='text-danger' style={{color: 'red'}}> *</span>
                    </div>
                    <div style={{ border: "1px solid black", padding: '2px', minHeight: '400px' }}>
                        <Editor
                            editorState={editorState}
                            onEditorStateChange={setEditorState}
                        />
                    </div>
                    <div className="cong-van-di-edit-item-file">
                        <label>
                            Tệp đính kèm
                        </label>
                        <input
                            type="file"
                            accept="*"
                            // style={{ display: 'none' }}
                            id="contained-button-file"
                            className="cong-van-di-edit-input-file"
                        />
                    </div>
                    <div className='cong-van-di-update-footer'>
                        <button className='cong-van-di-update-button'>Cập nhật</button>
                    </div>
                </div>
            </form>
        </div>
    ) : "";
}