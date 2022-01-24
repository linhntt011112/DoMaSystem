import React, { useState } from 'react'
import "./userList.css";
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline, Add } from '@material-ui/icons';
import { userRows } from '../../../dummyUsersData';
import { Link } from "react-router-dom";
import Popup from "../../popup/Popup/Popup";
import { Button } from '@mui/material';
import AddUser from "../../popup/AddUser/AddUser";

export default function UserList() {
    const [data, setData] = useState(userRows);
    const [buttonPopup, setButtonPopup] = useState(false);

    const handleDelete = (id)=>{
        setData(data.filter(item=>item.id !== id));
    };
    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'fullname', headerName: 'Họ và tên', flex: 1, renderCell: (params)=>{
            return (
                <div className="userListUser">
                    <img className='userListImg' src={params.row.avatar} alt=''/>
                    {params.row.fullname}
                </div>
            )
        } },
        { field: 'username', headerName: 'Tên tài khoản', width: 160 },
        {
          field: 'dob',
          headerName: 'Ngày sinh',
          width: 150,
        },
        {
            field: 'address',
            headerName: 'Địa chỉ',
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
                        <Link to={"/dashboard/user/"+params.row.id}>
                            <button className='userListEdit'>Chi tiết</button>
                        </Link>       
                        <DeleteOutline className='userListDelete' onClick={()=>handleDelete(params.row.id)}/>
                    </>
                    
                )
            }
        }
      ];
      
    return (
        <div className='userList'>
            <main>
                <div className='userListTop'>
                    <h2 className='userListTitle'>Danh sách nhân viên</h2>
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
                <AddUser />
            </Popup>
        </div>
    )
}
