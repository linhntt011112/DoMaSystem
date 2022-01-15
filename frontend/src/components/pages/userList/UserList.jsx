import React, { useState } from 'react'
import "./userList.css";
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from '@material-ui/icons';
import { userRows } from '../../../dummyData';
import { Link } from "react-router-dom";

export default function UserList() {
    const [data, setData] = useState(userRows);

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
                            <button className='userListEdit'>Edit</button>
                        </Link>    
                        <DeleteOutline className='userListDelete' onClick={()=>handleDelete(params.row.id)}/>
                    </>
                    
                )
            }
        }
      ];
      
    return (
        <div className='userList'>
            <DataGrid
                rows={data}
                disableSelectionOnClick
                columns={columns}
                pageSize={8}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
        </div>
    )
}
