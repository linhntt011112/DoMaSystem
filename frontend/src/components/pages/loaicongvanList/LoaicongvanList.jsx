import React,  { useState, useEffect, useContext } from "react";
import './LoaicongvanList.css'
import {Add, DeleteOutline} from "@material-ui/icons";
import {Button} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import Popup from "../../popup/Popup/Popup";
import AddLoaiCongVan from "../../popup/AddLoaiCongVan/AddLoaiCongVan";
import DetailLoaiCongVan from "../../popup/DetailLoaiCongVan/DetailLoaiCongVan";
import { UserContext } from "../../../context/UserContext";
import {loaicongvanRows} from "../../../dummyLoaiCongVanData";
import { Visibility, Edit } from '@mui/icons-material';
import EditLoaiCongVan from "../../popup/EditLoaiCongVan/EditLoaiCongVan";
import { ToastContainer} from 'react-toastify';
import { DeletePopup } from '../../popup/Dialog/DeletePopup';

import * as backend_config from '../../../config/backend'

export default function LoaicongvanList(props) {
    const {token} = props;
    
    const [addButtonPopup, setAddButtonPopup] = useState(false);
    const [detailButtonPopup, setDetailButtonPopup] = useState(false);
    const [editButtonPopup, setEditButtonPopup] = useState(false);
    const [buttonDeletePopup, setButtonDeletePopup] = useState(false);
    const [mark, setMark] = useState(null);

    const refreshTable = () => {
        backend_config.makeRequest("GET", backend_config.LOAI_CONG_VAN_GET_LIST, token)
          .then((data) => data.json())
          .then((data) => {setTableData(data)})
    }
    

    const handleDelete = (id)=>{
        setData(data.filter(item=>item.id !== id));
    };

    const columns = [
        { field: 'id', headerName: 'Mã loại công văn', width: 130},
        { field: 'name', headerName: 'Tên loại công văn', flex: 1 },
        {
            field: 'trang_thai',
            headerName: 'Trạng thái',
            width: 150,
        },
        {
            field: 'nguoi_cap_nhat',
            headerName: 'Người cập nhật',
            flex: 1,
            valueGetter: (params) => params.row?.nguoi_cap_nhat?.ho_ten,
        },
        {
            field: 'thoi_gian_cap_nhat',
            headerName: 'Ngày cập nhật',
            width: 200,
        },
        {
            field:"action",
            headerName: "Action",
            width: 150,
            renderCell: (params)=>{
                return(
                    <>
                        <Visibility className='loai-cong-van-list-View' onClick={() => setDetailButtonPopup(true)}></Visibility>
                        <Edit className='loai-cong-van-list-EditIcon' onClick={() => setEditButtonPopup(true)}></Edit>
                        <DeleteOutline className='loai-cong-van-list-Delete' onClick={()=>{setMark(params.row.id); setButtonDeletePopup(true)}}/>
                        <DeletePopup 
                            trigger={buttonDeletePopup} setTrigger={setButtonDeletePopup} 
                            token={token} 
                            mark={mark} 
                            id={params.row.id} 
                            message={"Bạn có chắc muốn xóa loại công văn này không?"}
                            // url={backend_config.USER_DELETE_BY_ID.replace("{user_id}", params.row.id)}
                            refreshFunc={refreshTable}
                        >
                        </DeletePopup>
                    </>
                )
            }
        }
    ];

    const [data, setData] = useState(loaicongvanRows);

    useEffect(() => {
        const requestOptions = {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          };
        fetch("", requestOptions)
          .then((data) => data.json())
          .then((data) => setData(data))
    }, [])

    return (
        <div className='loai-cong-van-List'>
            <main>
                <div className='loai-cong-van-ListTop'>
                    <h1 className='loai-cong-van-ListTitle'>Danh sách loại công văn</h1>
                    <Button
                        className='loai-cong-van-add-button'
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
                        onClick={() => setAddButtonPopup(true)}
                    >
                        Thêm mới
                    </Button>
                </div>
                <div style={{ height: 'calc(100vh - 110px)' }}>
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
            <AddLoaiCongVan trigger={addButtonPopup} setTrigger={setAddButtonPopup}>
            </AddLoaiCongVan>
            <DetailLoaiCongVan trigger={detailButtonPopup} setTrigger={setDetailButtonPopup}>
            </DetailLoaiCongVan>
            <EditLoaiCongVan trigger={editButtonPopup} setTrigger={setEditButtonPopup}></EditLoaiCongVan>
            <ToastContainer className="loai-cong-van-notify"/>
        </div>
    )
}