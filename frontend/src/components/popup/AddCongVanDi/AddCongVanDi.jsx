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
    const [noi_dung, setNoiDung] = React.useState(null);
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );

    const handleChangeNoiNhan = (event) => {
        setNoiNhan(event.target.value);
    }

    const handleChangeNguoiKy = (event) => {
        setNguoiKy(event.target.value);
    }

    const handleChangeBoPhanPhatHanh = (event) => {
        setBoPhanPhatHanh(event.target.value);
    }

    const handleChangeLoaiCongVan = (event) => {
        setLoaiCongVan(event.target.value);
    }

    const handleChangeNguoiTheoDoi = (event) => {
        setNguoiTheoDoi(event.target.value);
    }

    const handleChangeNguoiDuyet = (event) => {
        setNguoiDuyet(event.target.value);
    }

    const handleChangeMucDoBaoMat = (event) => {
        setMucDoBaoMat(event.target.value);
    }

    const handleChangeMucDoKhanCap = (event) => {
        setMucDoKhanCap(event.target.value);
    }

    const handleChangeNguoiXuLy = (event) => {
        setNguoiXuLy(event.target.value);
    }

    const handleChangeTinhTrangXuLy = (event) => {
        setTinhTrangXuLy(event.target.value);
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
                                    onChange={(e) => setSoCongVan(e.target.value)}
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
                                    onChange={(e) => setTenCongVan(e.target.value)}
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
                                            onChange={handleChangeNoiNhan}
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
                                            onChange={handleChangeNguoiKy}
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
                                    onChange={(e) => setNgayKy(e.target.value)}
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
                                            onChange={handleChangeBoPhanPhatHanh}
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
                                            onChange={handleChangeLoaiCongVan}
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
                                            onChange={handleChangeNguoiTheoDoi}
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
                                            onChange={handleChangeNguoiDuyet}
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
                                    onChange={(e) => setNgayHieuLuc(e.target.value)}
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
                                    onChange={(e) => setNgayHetHieuLuc(e.target.value)}
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
                                    onChange={(e) => setSoLuongVanBan(e.target.value)}
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
                                            onChange={handleChangeMucDoBaoMat}
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
                                            onChange={handleChangeMucDoKhanCap}
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
                                    onChange={(e) => setNgayPhatHanh(e.target.value)}
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
                                            onChange={handleChangeNguoiXuLy}
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
                                            onChange={handleChangeTinhTrangXuLy}
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
                                    onChange={(e) => setNgayTao(e.target.value)}
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
                                    onChange={(e) => setNgayDuyet(e.target.value)}
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
                            onChange={(e) => setLyDo(e.target.value)}
                        />
                    </div>
                    <div className="cong-van-di-add-item-content">
                        Nội dung
                        <span className='text-danger' style={{color: 'red'}}> *</span>
                    </div>
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