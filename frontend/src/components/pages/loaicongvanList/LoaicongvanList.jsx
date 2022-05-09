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

export default function LoaicongvanList() {
    const [token,] = useContext(UserContext);
    
    const [addButtonPopup, setAddButtonPopup] = useState(false);
    const [detailButtonPopup, setDetailButtonPopup] = useState(false);
    const [editButtonPopup, setEditButtonPopup] = useState(false);

    const handleDelete = (id)=>{
        setData(data.filter(item=>item.id !== id));
    };

    const columns = [
        { field: 'id', headerName: 'Mã loại', width: 100},
        { field: 'loai_cong_van', headerName: 'Loại công văn', flex: 1 },
        {
            field: 'trang_thai',
            headerName: 'Trạng thái',
            width: 150,
        },
        {
            field: 'nguoi_cap_nhat',
            headerName: 'Người cập nhật',
            flex: 1,
        },
        {
            field: 'update_date',
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
                        <Visibility className='userListView' onClick={() => setDetailButtonPopup(true)}></Visibility>
                        <Edit className='userListEditIcon' onClick={() => setEditButtonPopup(true)}></Edit>
                        <DeleteOutline className='userListDelete' onClick={()=>handleDelete(params.row.id)}/>
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
        <div className='loaicongvanList'>
            <main>
                <div className='userListTop'>
                    <Button
                        className='userAddCongVan'
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
        </div>
    )
}