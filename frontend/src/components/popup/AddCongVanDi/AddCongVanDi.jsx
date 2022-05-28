import React, { useEffect, useState } from "react";
import { Close } from '@material-ui/icons';
import "./addCongVanDi.css";
import BasicDatePicker from "../BasicDatePicker/BasicDatePicker";
import {Box, FormControl, MenuItem, Select} from "@mui/material";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import Button from '@material-ui/core/Button';
import * as backend_config from "../../../config/backend"
import { format } from 'date-fns'

export default function AddCongVanDi(props) {
    let today = new Date(),
    today_month = today.getMonth() + 1,
    today_date = today.getFullYear() + '-' + (today_month < 10 ? '0' + today_month : today_month) + '-' + today.getDate();

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
    const [ngay_tao, setNgayTao] = React.useState(today_date);
    const [ngay_duyet, setNgayDuyet] = React.useState(null);
    const [ly_do, setLyDo] = React.useState(null);
    const [editorState, setEditorState] = React.useState(
        () => EditorState.createEmpty(),
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

    // const handleChangeNoiDung = () => {
    //     setEditorState(editorState)
    //     console.log(editorState);
    // }

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

    const addCongVanDi = () => {
        const body = JSON.stringify({
            so_cong_van: so_cong_van,
            ten_cong_van: ten_cong_van,
            id_phong_ban_nhan: noi_nhan,
            id_nguoi_ky: nguoi_ky,
            ngay_ky: ngay_ky,
            id_phong_ban_phat_hanh: bo_phan_phat_hanh,
            loai_cong_van: loai_cong_van,
            nguoi_theo_doi: nguoi_theo_doi,
            nguoi_tao: nguoi_tao,
            nguoi_duyet: nguoi_duyet,
            ngay_hieu_luc: ngay_hieu_luc,
            ngay_het_hieu_luc: ngay_het_hieu_luc,
            so_luong_van_ban: so_luong_van_ban,
            muc_do_bao_mat: muc_do_bao_mat,
            muc_do_khan_cap: muc_do_khan_cap,
            ngay_phat_hanh: ngay_phat_hanh,
            nguoi_xu_ly: nguoi_xu_ly,
            tinh_trang_xu_ly: tinh_trang_xu_ly,
            ngay_tao: ngay_tao,
            ngay_duyet: ngay_duyet,
            ly_do: ly_do,
            noi_dung: editorState.getCurrentContent().getPlainText(),
        })
        console.log(body);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addCongVanDi();
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
                                    required
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
                                    required
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
                                            required
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
                                        width: '244px',
                                        fontSize: '15px',
                                        paddingLeft: '10.5px'
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
                                            required
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
                                            // defaultValue={3}
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
                            <div className='cong-van-di-add-item'>
                                <label>
                                    Người theo dõi
                                </label>
                                <Box className='cong-van-di-add-select'>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            onChange={handleChangeNguoiTheoDoi}
                                            // defaultValue={3}
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
                                            // defaultValue={3}
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
                                        width: '244px',
                                        fontSize: '15px',
                                        paddingLeft: '10.5px'
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
                                    style={{
                                        width: '244px',
                                        fontSize: '15px',
                                        paddingLeft: '10.5px'
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
                                    // value="3969"
                                    className='cong-van-di-add-input'
                                    onChange={(e) => setSoLuongVanBan(e.target.value)}
                                    required
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
                                            // defaultValue={3}
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
                                            // defaultValue={3}
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
                            <div className='cong-van-di-add-item'>
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
                                    onChange={(e) => setNgayPhatHanh(e.target.value)}
                                    required
                                    style={{
                                        width: '244px',
                                        fontSize: '15px',
                                        paddingLeft: '10.5px'
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
                                            // defaultValue={3}
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
                                            // defaultValue={3}
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
                                    value={today_date}
                                    required
                                    style={{
                                        width: '244px',
                                        fontSize: '15px',
                                        paddingLeft: '10.5px'
                                    }}
                                    disabled
                                />
                            </div>
                            <div className='cong-van-di-add-item'>
                                <label>
                                    Ngày duyệt
                                </label>
                                <input 
                                    type="date" 
                                    className='datepicker' 
                                    onKeyDown={(e) => {
                                        e.preventDefault();
                                    }}
                                    onChange={(e) => setNgayDuyet(e.target.value)}
                                    style={{
                                        width: '244px',
                                        fontSize: '15px',
                                        paddingLeft: '10.5px'
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
                            // value="3969"
                            className='cong-van-di-add-input-reason'
                            onChange={(e) => setLyDo(e.target.value)}
                        />
                    </div>
                    <div className="cong-van-di-add-item-content">
                        Nội dung
                        <span className='text-danger' style={{color: 'red'}}> *</span>
                    </div>
                    <div style={{ border: "1px solid black", padding: '2px', minHeight: '400px' }} >
                        <Editor
                            editorState={editorState}
                            onEditorStateChange={setEditorState}
                            required
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