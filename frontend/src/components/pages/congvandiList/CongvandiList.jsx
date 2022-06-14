import React, { useState } from "react";
import {Add, DeleteOutline} from "@material-ui/icons";
import {Button} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import './CongvandiList.css';
import {congvandiRows} from "../../../dummyCongVanDiData";
import { Link } from "react-router-dom";
import AddCongVanDi from "../../popup/AddCongVanDi/AddCongVanDi";
import Dropdown from "../../dropdown/dropdown";
import { loaicongvanRows } from "../../../dummyLoaiCongVanData";
import { muc_do_khan_cap_Rows } from "../../../dummyMucDoKhanCapData";
import { muc_do_bao_mat_Rows } from "../../../dummyMucDoBaoMatData";
import { tinh_trang_xu_ly_Rows } from "../../../dummyTinhTrangXuLyData";
import { ToastContainer, toast } from 'react-toastify';
import { DeletePopup } from '../../popup/Dialog/DeletePopup';

import * as backend_config from '../../../config/backend'

export default function CongvandiList(props) {
    const {token} = props;
    const [buttonPopup, setButtonPopup] = useState(false);
    const [value_loaicongvan, setValue_LoaiCongVan] = useState(null);
    const [value_mucdokhancap, setValue_MucDoKhanCap] = useState(null);
    const [value_mucdobaomat, setValue_MucDoBaoMat] = useState(null);
    const [value_tinhtrangxuly, setValue_TinhTrangXuLy] = useState(null);
    const [buttonDeletePopup, setButtonDeletePopup] = useState(false);
    const [mark, setMark] = useState(null);

    const refreshTable = () => {
        // backend_config.makeRequest("GET", backend_config.LOAI_CONG_VAN_GET_LIST, token)
        //   .then((data) => data.json())
        //   .then((data) => {setTableData(data)})
    }

    const handleDelete = (id)=>{
        setData(data.filter(item=>item.id !== id));
    };

    const columns = [
        {field: 'so_cong_van_di', headerName: 'Số công văn', width: 115},
        {field: 'ten_cong_van_di', headerName: 'Tên công văn đi', flex: 1},
        {
            field: 'nguoi_ky',
            headerName: 'Người ký',
            width: 150,
        },
        {
            field: 'ngay_ky',
            headerName: 'Ngày ký',
            width: 150,
        },
        {
            field: 'bo_phan_phat_hanh',
            headerName: 'Bộ phận phát hành',
            width: 200,
        },
        {
            field: 'ngay_cap_nhat',
            headerName: 'Ngày cập nhật',
            width: 200,
        },
        {
            field: 'trich_yeu_noi_dung',
            headerName: 'Trích yếu nội dung',
            flex: 1,
        },
        {
            field:"action",
            headerName: "Action",
            width: 150,
            renderCell: (params)=>{
                return(
                    <>
                        <Link to={"/dashboard/cong-van-di/"+params.row.so_cong_van_di} params={{id: params.row.so_cong_van_di}}>
                            <button className='congVanDiListEdit'>Chi tiết</button>
                        </Link>
                        <DeleteOutline className='congVanDiListDelete' onClick={()=>{setMark(params.row.id); setButtonDeletePopup(true)}}/>
                        <DeletePopup 
                            className='cong-van-di-delete-popup'
                            trigger={buttonDeletePopup} setTrigger={setButtonDeletePopup} 
                            token={token} 
                            // url={backend_config.LOAI_CONG_VAN_DELETE_BY_ID.replace('{id}', params.row.id)}
                            mark={mark} 
                            id={params.row.id} 
                            message={"Bạn có chắc muốn xóa công văn này không?"}
                            // url={backend_config.USER_DELETE_BY_ID.replace("{user_id}", params.row.id)}
                            refreshFunc={refreshTable}
                        >
                        </DeletePopup>
                    </>

                )
            }
        }
    ];

    const [data, setData] = useState(congvandiRows);

    return (
        <div className='congVanDiList'>
            <main>
                <h1 className='cong-van-di-ListTitle'>Danh sách công văn đi</h1>
                <div className='congVanDiListTop'>
                    <Button
                        className='buttonAddCongVan'
                        style={{
                            margin: '10px 10px 10px auto',
                            display: 'flex',
                            border: '1px solid #ff9b44',
                            padding: '5px',
                            backgroundColor: '#ff9b44',
                            borderRadius: '50px',
                            cursor: 'pointer',
                            color: 'white',
                            fontSize: '16px',
                            textTransform: 'inherit',
                        }}
                        startIcon={<Add/>}
                        onClick={() => setButtonPopup(true)}
                    >
                        Thêm mới
                    </Button>
                </div>
                <div className="dowpdown-filter">
                    <div style={{ width: 200 }}>
                        <span className="dropdown-title">Loại công văn</span>
                        <Dropdown 
                        datas={loaicongvanRows} 
                        prompt='Chọn loại công văn ...'
                        id='id'
                        label='loai_cong_van'
                        value={value_loaicongvan}
                        onChange={val => setValue_LoaiCongVan(val)}/>
                    </div>
                    <div style={{ width: 200 }}>
                        <span className="dropdown-title">Mức độ ưu tiên</span>
                        <Dropdown 
                        datas={muc_do_khan_cap_Rows} 
                        prompt='Chọn mức độ ưu tiên ...'
                        id='id'
                        label='muc_do_khan_cap'
                        value={value_mucdokhancap}
                        onChange={val => setValue_MucDoKhanCap(val)}/>
                    </div>
                    <div style={{ width: 200 }}>
                        <span className="dropdown-title">Tình trạng xử lý</span>
                        <Dropdown 
                        datas={tinh_trang_xu_ly_Rows} 
                        prompt='Chọn tình trạng xử lý ...'
                        id='id'
                        label='tinh_trang_xu_ly'
                        value={value_tinhtrangxuly}
                        onChange={val => setValue_TinhTrangXuLy(val)}/>
                    </div>
                    <button className="dropdown-button">Lọc</button>
                </div>
                
                <div style={{ height: 'calc(90vh - 200px)' }}>
                    <DataGrid
                        rows={data}
                        disableSelectionOnClick
                        columns={columns}
                        pageSize={8}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                    />
                </div>
            </main>
            <AddCongVanDi trigger={buttonPopup} setTrigger={setButtonPopup} token={token}>
            </AddCongVanDi>
            <ToastContainer className="cong-van-di-notify" />
        </div>
    )
}