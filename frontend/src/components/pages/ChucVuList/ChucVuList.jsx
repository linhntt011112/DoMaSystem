import React, { useState, useEffect } from "react";
import './ChucVuList.css';
import { Edit } from '@mui/icons-material';
import EditChucVu from "../../popup/EditChucVu/EditChucVu";
import { DeletePopup } from "../../popup/Dialog/DeletePopup";
import {Button} from "@mui/material";
import {Add, DeleteOutline} from "@material-ui/icons";
import {DataGrid} from "@mui/x-data-grid";
import AddChucVu from "../../popup/AddChucVu/AddChucVu";
import { ToastContainer} from 'react-toastify';
import * as backend_config from '../../../config/backend'

export default function ChucVuList(props) {
    const {token} = props;

    const [mark, setMark] = useState(null);
    const [editButtonPopup, setEditButtonPopup] = useState(false);
    const [buttonDeletePopup, setButtonDeletePopup] = useState(false);
    const [addButtonPopup, setAddButtonPopup] = useState(false);
    const [tableData, setTableData] = useState(null);

    const refreshTable = () => {
        backend_config.makeRequest("GET", backend_config.STATIC_TABLE_GET_RESET_CACHE.replace('{static_table_name}', 'chuc_vu'), token);
        backend_config.makeRequest("GET", backend_config.STATIC_TABLE_GET_LIST.replace('{static_table_name}', 'chuc_vu'), token)
          .then((data) => data.json())
          .then((data) => {setTableData(data)})
    }

    useEffect(() => {
        refreshTable();
    }, []);

    const columns = [
        {field: 'id', headerName: 'Mã chức vụ', width: 130},
        {field: 'name', headerName: 'Chức vụ', flex: 1},
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params)=>{
                return(
                    <>
                        <Edit className='chuc-vu-list-EditIcon' onClick={() => {setMark(params.row.id); setEditButtonPopup(true)}}></Edit>
                        <EditChucVu 
                            trigger={editButtonPopup} setTrigger={setEditButtonPopup} 
                            token={token} 
                            chuc_vu={params.row} 
                            mark={mark}
                            refreshFunc={refreshTable}>
                        </EditChucVu>

                        <DeleteOutline className='chuc-vu-list-Delete' onClick={()=>{setMark(params.row.id); setButtonDeletePopup(true)}}/>
                        <DeletePopup 
                            trigger={buttonDeletePopup} setTrigger={setButtonDeletePopup} 
                            token={token} 
                            url={backend_config.STATIC_TABLE_DELETE_BY_ID.replace('{id}', params.row.id).replace('{static_table_name}', 'chuc_vu')}
                            mark={mark} 
                            id={params.row.id} 
                            message={"Bạn có chắc muốn xóa dữ liệu này không?"}
                            refreshFunc={refreshTable}
                        >
                        </DeletePopup>
                    </>
                )
            }
        }
    ];

    return (
        <div className='chuc-vu-List'>
            <main>
                <div className='chuc-vu-ListTop'>
                    <h1 className='chuc-vu-ListTitle'>Danh sách chức vụ</h1>
                    <Button
                        className='chuc-vu-add-button'
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
                <div style={{ height: 'calc(100vh - 180px)' }}>
                    <DataGrid
                        rows={tableData}
                        disableSelectionOnClick
                        columns={columns}
                        pageSize={8}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                    />
                </div>
            </main>
            <AddChucVu trigger={addButtonPopup} setTrigger={setAddButtonPopup}
                token={token} refreshFunc={refreshTable}>
            </AddChucVu>
            <ToastContainer className="chuc-vu-notify"/>
        </div>
    )
}