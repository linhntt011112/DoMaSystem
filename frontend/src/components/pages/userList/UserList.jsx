import React, { useState, useEffect, useContext } from 'react'
import "./userList.css";
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline, Add } from '@material-ui/icons';
import { Link } from "react-router-dom";
import AddUserPopup from "../../popup/AddUserPopup/AddUserPopup";
import { Button } from '@mui/material';
import * as backend_config from "../../../config/backend"
import { DeletePopup } from '../../popup/Dialog/DeletePopup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UserList(props) {
    const token = props.token;

    const [buttonPopup, setButtonPopup] = useState(false);
    const [mark, setMark] = useState(null);
    const [buttonDeletePopup, setButtonDeletePopup] = useState(false);

    const handleDelete = (id)=>{
        backend_config.makeRequest("DELETE", 
            backend_config.USER_DELETE_BY_ID.replace("{user_id}", id), 
            token,
        )
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'ho_ten', headerName: 'Họ và tên', flex: 1, renderCell: (params)=>{
            return (
                <div className="userListUser">
                    {params.row.ho_ten}
                </div>
            )
        } },
        { field: 'ten_tai_khoan', headerName: 'Tên tài khoản', width: 160 },
        {
          field: 'ngay_sinh',
          headerName: 'Ngày sinh',
          width: 150,
        },
        {
            field: 'dia_chi',
            headerName: 'Địa chỉ',
            flex: 1,
        },
        {
            field: 'ngay_cap_nhat',
            headerName: 'Ngày cập nhật',
            width: 200,
        },
        {
            field:"action",
            headerName: "Action",
            flex: 1,
            renderCell: (params)=>{
                return(
                    <>
                        <Link to={"/management/user/"+params.row.id} params={{id: params.row.id}}>
                            <button className='userListEdit'>Chi tiết</button>
                        </Link>       
                        <DeleteOutline className='userListDelete' onClick={()=>{setMark(params.row.id); setButtonDeletePopup(true)}}/>
                        <DeletePopup 
                            trigger={buttonDeletePopup} setTrigger={setButtonDeletePopup} 
                            token={token} 
                            mark={mark} 
                            id={params.row.id} 
                            message={"Bạn có chắc muốn xóa người dùng này không?"}
                            url={backend_config.USER_DELETE_BY_ID.replace("{user_id}", params.row.id)}
                            refreshFunc={refreshTable}
                        >
                        </DeletePopup>
                    </>
                    
                )
            }
        }
    ];

    const [tableData, setTableData] = useState([]);

    const refreshTable = () => {
        backend_config.makeRequest("GET", backend_config.USER_GET_LIST_FULL_API, token)
          .then((data) => data.json())
          .then((data) => {setTableData(data)})
    }

    useEffect(() => {
        refreshTable();
    }, [])
      
    return (
        <div className='userList'>
            <main>
                <div className='userListTop'>
                    <h1 className='userListTitle'>Danh sách nhân viên</h1>
                    <Button
                        className='userAddButton'
                        style={{
                            margin: '10px 10px 10px auto',
                            display: 'flex',
                            border: '1px solid #ff9b44',
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
                <div style={{ height: 'calc(100vh - 180px)' }}>
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
            <AddUserPopup 
                trigger={buttonPopup} setTrigger={setButtonPopup} 
                token={token} refreshFunc={refreshTable}
            >
            </AddUserPopup>
            <ToastContainer className="add-user-notify" />
        </div>
    )
}
