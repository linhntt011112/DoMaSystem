import React, { useState } from "react";
import {Add, DeleteOutline} from "@material-ui/icons";
import {Button} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import './CongvandiList.css';

export default function CongvandiList() {
    const [data, setData] = useState([]);

    const handleDelete = (id)=>{
        setData(data.filter(item=>item.id !== id));
    };

    const columns = [
        {field: 'so_cong_van', headerName: 'So cong van', width: 100},
        {field: 'noi_nhan', headerName: 'Noi nhan', flex: 1},
        {
            field: 'nguoi_ky',
            headerName: 'Nguoi ky',
            width: 150,
        },
        {
            field: 'ngay_ky',
            headerName: 'Ngay ky',
            width: 150,
        },
        {
            field: 'bo_phan_phat_hanh',
            headerName: 'Bo phan phat hanh',
            width: 200,
        },
        {
            field: 'ngay_cap_nhat',
            headerName: 'Ngày cập nhật',
            width: 200,
        },
        {
            field: 'trich_yeu_noi_dung',
            headerName: 'Trich yeu noi dung',
            flex: 1,
        },
        {
            field:"action",
            headerName: "Action",
            width: 150,
            renderCell: (params)=>{
                return(
                    <>
                       
                        <button className='congVanListEdit'>Chi tiết</button>
                        <DeleteOutline className='congVanListDelete' onClick={()=>handleDelete(params.row.id)}/>
                    </>

                )
            }
        }
    ]

    return (
        <div className='congVanDiList'>
            <main>
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
        </div>
    )
}