import React, {useState} from "react";
import './LoaicongvanList.css'
import {loaicongvanRows} from "../../../dummyLoaiCongVanData";
import {Link} from "react-router-dom";
import {Add, DeleteOutline} from "@material-ui/icons";
import {Button} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import Popup from "../../popup/Popup/Popup";
import AddLoaiCongVan from "../../popup/AddLoaiCongVan/AddLoaiCongVan";

export default function LoaicongvanList() {
    const [data, setData] = useState(loaicongvanRows);
    const [buttonPopup, setButtonPopup] = useState(false);

    const handleDelete = (id)=>{
        setData(data.filter(item=>item.id !== id));
    };

    const columns = [
        { field: 'maloai', headerName: 'Mã loại', width: 100},
        { field: 'loaicongvan', headerName: 'Loại công văn', flex: 1 },
        {
            field: 'trangthai',
            headerName: 'Trạng thái',
            width: 150,
        },
        {
            field: 'nguoicapnhat',
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
                        {/*<Link to={"/dashboard/user/"+params.row.id}>*/}
                            <button className='userListEdit'>Chi tiết</button>
                        {/*</Link>*/}
                        <DeleteOutline className='userListDelete' onClick={()=>handleDelete(params.row.id)}/>
                    </>

                )
            }
        }
    ];

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
                        onClick={() => setButtonPopup(true)}
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
            <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                <AddLoaiCongVan />
            </Popup>
        </div>
    )
}