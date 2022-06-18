import React, { useState, useEffect } from "react";
import {Add, DeleteOutline} from "@material-ui/icons";
import {Button} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import './congvandenlist.css';
import {congvandenRows} from "../../../dummyCongVanDenData";
import { Link } from "react-router-dom";
import AddCongVanDen from "../../popup/AddCongVanDen/AddCongVanDen";
import Dropdown from "../../dropdown/dropdown";
import { loaicongvanRows } from "../../../dummyLoaiCongVanData";
import { muc_do_khan_cap_Rows } from "../../../dummyMucDoKhanCapData";
import { muc_do_bao_mat_Rows } from "../../../dummyMucDoBaoMatData";
import { tinh_trang_xu_ly_Rows } from "../../../dummyTinhTrangXuLyData";
import { DeletePopup } from '../../popup/Dialog/DeletePopup';
import {Box, FormControl, MenuItem, Select} from "@mui/material";
import * as backend_config from '../../../config/backend'

export default function CongVanDenList(props) {
    const token = props.token;
    const [buttonPopup, setButtonPopup] = useState(false);
    const [value_loaicongvan, setValue_LoaiCongVan] = useState(null);
    const [value_mucdokhancap, setValue_MucDoKhanCap] = useState(null);
    const [value_mucdobaomat, setValue_MucDoBaoMat] = useState(null);
    const [value_tinhtrangxuly, setValue_TinhTrangXuLy] = useState(null);
    const [buttonDeletePopup, setButtonDeletePopup] = useState(false);
    const [mark, setMark] = useState(null);

    const [loai_cong_van_table, setLoaiCongVanTable] = React.useState([]);
    const [muc_do_uu_tien_table, setMucDoUuTienTable] = React.useState([]);   
    const [tinh_trang_xu_ly_table, setTinhTrangXuLyTable] = React.useState([]);

    const handleChangeLoaiCongVan = (event) => {
        setValue_LoaiCongVan(event.target.value);
    }

    const handleChangeMucDoUuTien = (event) => {
        setValue_MucDoKhanCap(event.target.value);
    }

    const handleChangeTinhTrangXuLy = (event) => {
        setValue_TinhTrangXuLy(event.target.value);
    }

    const refreshTable = () => {
        // backend_config.makeRequest("GET", backend_config.LOAI_CONG_VAN_GET_LIST, token)
        //   .then((data) => data.json())
        //   .then((data) => {setTableData(data)})
    }

    const handleDelete = (id)=>{
        setData(data.filter(item=>item.id !== id));
    };

    const columns = [
        {field: 'so_cong_van', headerName: 'Số công văn', width: 110},
        {field: 'ten_cong_van', headerName: 'Tên công văn', flex: 1},
        {
            field: 'nguoi_nhan',
            headerName: 'Người nhận',
            width: 150,
        },
        {
            field: 'ngay_nhan',
            headerName: 'Ngày nhận',
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
                        <Link to={"/dashboard/cong-van-den/"+params.row.so_cong_van} params={{id: params.row.so_cong_van}}>
                            <button className='congVanDenListEdit'>Chi tiết</button>
                        </Link>
                        <DeleteOutline className='congVanDenListDelete' onClick={()=>{setMark(params.row.id); setButtonDeletePopup(true)}}/>
                        <DeletePopup 
                            className='cong-van-den-delete-popup'
                            trigger={buttonDeletePopup} setTrigger={setButtonDeletePopup} 
                            token={token} 
                            // url={backend_config.LOAI_CONG_VAN_DELETE_BY_ID.replace('{id}', params.row.id)}
                            mark={mark} 
                            id={params.row.id} 
                            message={"Bạn có chắc muốn xóa công văn này không?"}
                            // url={backend_config.USER_DELETE_BY_ID.replace("{user_id}", params.row.id)}
                            refreshFunc={refreshTable}
                        >
                        </DeletePopup>
                    </>

                )
            }
        }
    ];

    const [data, setData] = useState(congvandenRows);
    const fetchLoaiCongVanTable = () =>{
        backend_config.makeRequest("GET", backend_config.LOAI_CONG_VAN_GET_LIST, token)
          .then((data) => data.json())
          .then((data) => {setLoaiCongVanTable(data)})
    }

    const fetchOneStaticTableData = (name, setData) => {
        return backend_config.makeRequest("GET", backend_config.STATIC_TABLE_GET_LIST.replace('{static_table_name}', name), token)
        .then((response) => response.json())
        .then((data) => {
            setData(data);
            // console.log(data);
        })
    }

    useEffect(() => {
        fetchLoaiCongVanTable();
        fetchOneStaticTableData('muc_do_uu_tien', setMucDoUuTienTable);
        fetchOneStaticTableData('tinh_trang_xu_ly', setTinhTrangXuLyTable);
        refreshTable();
    }, [])

    return (
        <div className='congVanDenList'>
            <main>
                <h1 className='cong-van-di-ListTitle'>Danh sách công văn đến</h1>
                <div className="dowpdown-filter">
                    <div style={{ width: 200, display: 'flex', flexDirection: 'column' }}>
                        <span className="dropdown-title">Loại công văn</span>
                        <Select
                            labelId="loai_cong_van"
                            id="id"
                            style={{
                                height: '36px',
                                position: 'relative',
                                color: '#333',
                                cursor: 'default',
                                margin: '10px 0 20px 20px',
                            }}
                            onChange={handleChangeLoaiCongVan}
                        >
                            {loai_cong_van_table.map((item) => {
                                                    
                                return (<MenuItem value={item.id}>{item.name}</MenuItem> )
                            })}
                        </Select>
                    </div>
                    <div style={{ width: 200, display: 'flex', flexDirection: 'column' }}>
                        <span className="dropdown-title">Mức độ ưu tiên</span>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            onChange={handleChangeMucDoUuTien}
                            style={{
                                height: '36px',
                                position: 'relative',
                                color: '#333',
                                cursor: 'default',
                                margin: '10px 0 20px 20px',
                            }}
                        >
                            {muc_do_uu_tien_table.map((item) => {
                                return (<MenuItem value={item.id}>{item.name}</MenuItem> )
                            })}
                        </Select>
                    </div>
                    <div style={{ width: 200, display: 'flex', flexDirection: 'column' }}>
                        <span className="dropdown-title">Tình trạng xử lý</span>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            onChange={handleChangeTinhTrangXuLy}
                            // defaultValue={1}
                            style={{
                                height: '36px',
                                position: 'relative',
                                color: '#333',
                                cursor: 'default',
                                margin: '10px 0 20px 20px',
                            }}
                            //required
                            // disabled
                        >
                            {tinh_trang_xu_ly_table.map((item) => {
                                    
                                return (<MenuItem value={item.id} >{item.name}</MenuItem> )
                            })}
                        </Select>
                    </div>
                    <button className="dropdown-button">Lọc</button>
                </div>
                
                <div style={{ height: 'calc(100vh - 200px)' }}>
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
            <AddCongVanDen trigger={buttonPopup} setTrigger={setButtonPopup}>
            </AddCongVanDen>
        </div>
    )
}