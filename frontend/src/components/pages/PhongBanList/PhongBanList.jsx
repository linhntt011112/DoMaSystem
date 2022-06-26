import React, { useState } from "react";
import './PhongBanList.css';
import { Edit } from '@mui/icons-material';
import EditPhongBan from "../../popup/EditPhongBan/EditPhongBan";
import { DeletePopup } from "../../popup/Dialog/DeletePopup";
import {Button} from "@mui/material";
import {Add, DeleteOutline} from "@material-ui/icons";
import {DataGrid} from "@mui/x-data-grid";
import AddPhongBan from "../../popup/AddPhongBan/AddPhongBan";
import { ToastContainer} from 'react-toastify';

export default function PhongBanList(props) {
    const {token} = props;

    const [mark, setMark] = useState(null);
    const [editButtonPopup, setEditButtonPopup] = useState(false);
    const [buttonDeletePopup, setButtonDeletePopup] = useState(false);
    const [addButtonPopup, setAddButtonPopup] = useState(false);
    const [tableData, setTableData] = useState(null);

    const refreshTable = () => {
        // backend_config.makeRequest("GET", backend_config.LOAI_CONG_VAN_GET_LIST, token)
        //   .then((data) => data.json())
        //   .then((data) => {setTableData(data)})
    }

    const columns = [
        {field: 'id', headerName: 'Mã phòng ban', width: 130},
        {field: 'name', headerName: 'Tên phòng ban', flex: 1},
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params)=>{
                return(
                    <>
                        <Edit className='phong-ban-list-EditIcon' onClick={() => {setMark(params.row.id); setEditButtonPopup(true)}}></Edit>
                        <EditPhongBan 
                            trigger={editButtonPopup} setTrigger={setEditButtonPopup} 
                            token={token} 
                            phong_ban={params.row} 
                            mark={mark}
                            refreshFunc={refreshTable}>
                        </EditPhongBan>

                        <DeleteOutline className='phong-ban-list-Delete' onClick={()=>{setMark(params.row.id); setButtonDeletePopup(true)}}/>
                        <DeletePopup 
                            trigger={buttonDeletePopup} setTrigger={setButtonDeletePopup} 
                            token={token} 
                            // url={backend_config.LOAI_CONG_VAN_DELETE_BY_ID.replace('{id}', params.row.id)}
                            mark={mark} 
                            id={params.row.id} 
                            message={"Bạn có chắc muốn xóa phòng ban này không?"}
                            refreshFunc={refreshTable}
                        >
                        </DeletePopup>
                    </>
                )
            }
        }
    ];

    return (
        <div className='phong-ban-List'>
            <main>
                <div className='phong-ban-ListTop'>
                    <h1 className='phong-ban-ListTitle'>Danh sách phòng ban</h1>
                    <Button
                        className='phong-ban-add-button'
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
                        rows={tableData}
                        disableSelectionOnClick
                        columns={columns}
                        pageSize={8}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                    />
                </div>
            </main>
            <AddPhongBan trigger={addButtonPopup} setTrigger={setAddButtonPopup}
                token={token} refreshFunc={refreshTable}>
            </AddPhongBan>
            <ToastContainer className="phong-ban-notify"/>
        </div>
    )
}