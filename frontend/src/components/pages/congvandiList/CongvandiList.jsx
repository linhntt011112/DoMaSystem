import React, { useState } from "react";
import {Add, DeleteOutline} from "@material-ui/icons";
import {Button} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import './CongvandiList.css';
import {congvandiRows} from "../../../dummyCongVanDiData";
import { Link } from "react-router-dom";

export default function CongvandiList() {

    const handleDelete = (id)=>{
        setData(data.filter(item=>item.id !== id));
    };

    const columns = [
        {field: 'so_cong_van_di', headerName: 'Số công văn đi', width: 100},
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
                        <DeleteOutline className='congVanDiListDelete' onClick={()=>handleDelete(params.row.id)}/>
                    </>

                )
            }
        }
    ];

    const [data, setData] = useState(congvandiRows);

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