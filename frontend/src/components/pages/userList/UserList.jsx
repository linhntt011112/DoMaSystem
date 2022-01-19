import React, { useState } from 'react'
import "./userList.css";
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline, Add } from '@material-ui/icons';
import { userRows } from '../../../dummyData';
import { Link } from "react-router-dom";
import AddUser from "../../popup/AddUser/AddUser";
import Button from '@mui/material/Button';
import {Col, Container, Row} from "react-bootstrap";

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
                    <Button
                        className='userAddButton'
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
                        Add Employee
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
            <AddUser trigger={buttonPopup} setTrigger={setButtonPopup}>
                <h5 className='modal-title'>Add Employee</h5>
                <Container className='modal-body'>
                    <Row style={{display: 'flex', flex: 'wrap', marginLeft: '15px', marginRight: '15px'}}>
                        <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                            <div className='userAddItem'>
                                <label>
                                    Ten tai khoan
                                    <span className='text-danger' style={{color: 'red'}}>  *</span>
                                </label>
                                <input
                                    type="text"
                                    className='userAddInput'
                                />
                            </div>
                        </Col>
                        <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                            <div className='userAddItem'>
                                <label>
                                    Username
                                    <span className='text-danger' style={{color: 'red'}}>  *</span>
                                </label>
                                <input
                                    type="text"
                                    className='userAddInput'
                                />
                            </div>
                        </Col>
                        <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                            <div className='userAddItem'>
                                <label>
                                    Username
                                    <span className='text-danger' style={{color: 'red'}}>  *</span>
                                </label>
                                <input
                                    type="text"
                                    className='userAddInput'
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row style={{display: 'flex', flex: 'wrap', marginLeft: '15px', marginRight: '15px'}}>
                        <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                            <div className='userAddItem'>
                                <label>
                                    Username
                                    <span className='text-danger' style={{color: 'red'}}>  *</span>
                                </label>
                                <input
                                    type="text"
                                    className='userAddInput'
                                />
                            </div>
                        </Col>
                        <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                            <div className='userAddItem'>
                                <label>
                                    Username
                                    <span className='text-danger' style={{color: 'red'}}>  *</span>
                                </label>
                                <input
                                    type="text"
                                    className='userAddInput'
                                />
                            </div>
                        </Col>
                        <Col sm={4} style={{padding: '15px 15px 0 15px'}}>
                            <div className='userAddItem'>
                                <label>
                                    Username
                                    <span className='text-danger' style={{color: 'red'}}>  *</span>
                                </label>
                                <input
                                    type="text"
                                    className='userAddInput'
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row style={{display: 'flex', flex: 'wrap', marginLeft: '15px', marginRight: '15px'}}>
                        <Col sm={6} style={{padding: '15px 15px 0 15px'}}>
                            <div className='userAddItem'>
                                <label>
                                    Username
                                    <span className='text-danger' style={{color: 'red'}}>  *</span>
                                </label>
                                <input
                                    type="text"
                                    className='userAddInput'
                                />
                            </div>
                        </Col>
                        <Col sm={6} style={{padding: '15px 15px 0 15px'}}>
                            <div className='userAddItem'>
                                <label>
                                    Username
                                    <span className='text-danger' style={{color: 'red'}}>  *</span>
                                </label>
                                <input
                                    type="text"
                                    className='userAddInput'
                                />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </AddUser>
        </div>

    )
}
