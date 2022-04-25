import React, { useState, useEffect, useContext } from 'react'
import "./userList.css";
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline, Add } from '@material-ui/icons';
import { Link } from "react-router-dom";
import AddUserPopup from "../../popup/AddUserPopup/AddUserPopup";
import { Button } from '@mui/material';
import * as backend_config from "../../../config/backend"

export default function UserList(props) {
    const token = props.token;

    const [buttonPopup, setButtonPopup] = useState(false);

    const handleDelete = (id)=>{
        setTableData(tableData.filter(item=>item.ma_nguoi_dung !== id));
    };

    const columns = [
        { field: 'ma_nguoi_dung', headerName: 'ID', width: 100 },
        { field: 'ho_ten', headerName: 'Họ và tên', flex: 1, renderCell: (params)=>{
            return (
                <div className="userListUser">
                    <img className='userListImg' src={params.row.avatar} alt=''/>
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
            width: 150,
            renderCell: (params)=>{
                return(
                    <>
                        <Link to={"/dashboard/user/"+params.row.ma_nguoi_dung} params={{id: params.row.ma_nguoi_dung}}>
                            <button className='userListEdit'>Chi tiết</button>
                        </Link>       
                        <DeleteOutline className='userListDelete' onClick={()=>handleDelete(params.row.ma_nguoi_dung)}/>
                    </>
                    
                )
            }
        }
    ];

    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        backend_config.makeRequest("GET", backend_config.USER_GET_LIST_API, token)
          .then((data) => data.json())
          .then((data) => setTableData(data))
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
                <div style={{ height: 'calc(100vh - 170px)' }}>
                    <DataGrid
                        getRowId={(r) => r.ma_nguoi_dung}
                        rows={tableData}
                        disableSelectionOnClick
                        columns={columns}
                        pageSize={8}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                    />
                </div>
            </main>
            <AddUserPopup trigger={buttonPopup} setTrigger={setButtonPopup}>
            </AddUserPopup>
        </div>
    )
}
