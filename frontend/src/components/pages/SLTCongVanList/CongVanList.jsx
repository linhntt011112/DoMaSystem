import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {Add, DeleteOutline} from "@material-ui/icons";
import {Button} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import './CongVanList.css';
import { Link } from "react-router-dom";
import SLTAddCongVan from "../../popup/SLTAddCongVan/SLTAddCongVan";
import Dropdown from "../../dropdown/dropdown";
import { loaicongvanRows } from "../../../dummyLoaiCongVanData";
import { muc_do_khan_cap_Rows } from "../../../dummyMucDoKhanCapData";
import { tinh_trang_xu_ly_Rows } from "../../../dummyTinhTrangXuLyData";
import { ToastContainer, toast } from 'react-toastify';
import { DeletePopup } from '../../popup/Dialog/DeletePopup';
import {Box, FormControl, MenuItem, Select} from "@mui/material";

import * as backend_config from '../../../config/backend'

export default function CongVanList(props) {
    const {token} = props;
    const history = useHistory();

    const [tableData, setTableData] = useState([]);
    const [buttonPopup, setButtonPopup] = useState(false);
    const [value_loaicongvan, setValue_LoaiCongVan] = useState(null);
    const [value_mucdouutien, setValue_MucDoUuTien] = useState(null);
    const [value_tinhtrangxuly, setValue_TinhTrangXuLy] = useState(null);
    const [buttonDeletePopup, setButtonDeletePopup] = useState(false);
    const [mark, setMark] = useState(null);

    const [loai_cong_van_table, setLoaiCongVanTable] = React.useState([]);
    const [muc_do_uu_tien_table, setMucDoUuTienTable] = React.useState([]);   

    const handleChangeLoaiCongVan = (event) => {
        setValue_LoaiCongVan(event.target.value);
    }

    const handleChangeMucDoUuTien = (event) => {
        setValue_MucDoUuTien(event.target.value);
    }

    const handleChangeTinhTrangXuLy = (event) => {
        setValue_TinhTrangXuLy(event.target.value);
    }


    const refreshTable = () => {
        backend_config.makeRequest("GET", backend_config.CONG_VAN_LUU_TRU_GET_LIST, token)
          .then((data) => data.json())
          .then((data) => {
            setTableData(data)
        })
    }

    // const handleDelete = (id)=>{
    //     setData(data.filter(item=>item.id !== id));
    // };

    const columns = [
        {field: 'id', headerName: 'Số công văn', width: 115},
        {field: 'ten_cong_van', headerName: 'Tên công văn', flex: 1.5,
            // valueGetter: (params) => {
            //     return params.row.cong_van_di_current_version.ten_cong_van
            // }
        },
        {
            field: 'nguoi_ky',
            headerName: 'Người ký',
            width: 150,
            // valueGetter: (params) => {
            //     return params.row.cong_van_di_current_version.nguoi_ky?.ho_ten
            // }
        },
        {
            field: 'ngay_ky',
            headerName: 'Ngày ký',
            width: 150,
            valueGetter: (params) => {
                return params.row.ngay_ky?.split('T')[0]
            }
        },
        {
            field: 'phong_ban_phat_hanh',
            headerName: 'Bộ phận phát hành',
            width: 150,
            // valueGetter: (params) => {
            //     return params.row.cong_van_di_current_version.phong_ban_phat_hanh?.name
            // }
        },
        {
            field: 'create_at',
            headerName: 'Ngày tạo',
            width: 150,
            valueGetter: (params) => {
                return params.row.create_at.split('T')[0];
            }
        },
        {
            field: 'ly_do',
            headerName: 'Lý do',
            flex: 1,
            // valueGetter: (params) => {
            //     return params.row.cong_van_di_current_version.ly_do
            // }
        },
        {
            field:"action",
            headerName: "Action",
            width: 120,
            renderCell: (params)=>{
                return(
                    <>
                        <Link to={"/management/so-luu-tru/" + params.row.id} params={{id: params.row.id}}>
                            <button className='congVanDiListEdit'>Chi tiết</button>
                        </Link>
                        <DeleteOutline className='congVanDiListDelete' onClick={()=>{setMark(params.row.id); setButtonDeletePopup(true)}}/>
                        <DeletePopup 
                            className='cong-van-di-delete-popup'
                            trigger={buttonDeletePopup} setTrigger={setButtonDeletePopup} 
                            token={token} 
                            url={backend_config.CONG_VAN_LUU_TRU_DELETE.replace('{id}', params.row.id)}
                            mark={mark} 
                            id={params.row.id} 
                            message={"Bạn có chắc muốn xóa công văn này không?"}
                            refreshFunc={refreshTable}
                        >
                        </DeletePopup>
                    </>

                )
            }
        }
    ];

    const fetchLoaiCongVanTable = () =>{
        backend_config.makeRequest("GET", backend_config.LOAI_CONG_VAN_GET_LIST, token)
          .then((data) => data.json())
          .then((data) => {setLoaiCongVanTable(data)})
    }

    const fetchOneStaticTableData = (name, setData) => {
        return backend_config.makeRequest("GET", backend_config.STATIC_TABLE_GET_LIST.replace('{static_table_name}', name), token)
        .then((response) => response.json())
        .then((data) => {
            setData(data);
            // console.log(data);
        })
    }

    // const [data, setData] = useState(congvandiRows);
    useEffect(() => {
        fetchLoaiCongVanTable();
        fetchOneStaticTableData('muc_do_uu_tien', setMucDoUuTienTable);
        refreshTable();
    }, [])

    const handleFilter = (e) => {
        e.preventDefault();
        history.push("/dashboard")
    }

    return (
        <div className='cong-van-List'>
            <main>
                <h1 className='cong-van-ListTitle'>Sổ lưu trữ công văn</h1>
                <div className='cong-van-ListTop'>
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
                <div style={{ height: 'calc(90vh - 110px)' }}>
                    <DataGrid
                        getRowId={(r) => r.id}
                        rows={tableData}
                        disableSelectionOnClick
                        columns={columns}
                        pageSize={8}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                    />
                </div>
            </main>
            <SLTAddCongVan trigger={buttonPopup} setTrigger={setButtonPopup} token={token} refreshFunc={refreshTable}>
            </SLTAddCongVan>
            <ToastContainer className="cong-van-di-notify" />
        </div>
    )
}