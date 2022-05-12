import React, { useState } from "react";
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

export default function CongVanDenList() {
    const [buttonPopup, setButtonPopup] = useState(false);
    const [value_loaicongvan, setValue_LoaiCongVan] = useState(null);
    const [value_mucdokhancap, setValue_MucDoKhanCap] = useState(null);
    const [value_mucdobaomat, setValue_MucDoBaoMat] = useState(null);
    const [value_tinhtrangxuly, setValue_TinhTrangXuLy] = useState(null);

    const handleDelete = (id)=>{
        setData(data.filter(item=>item.id !== id));
    };

    const columns = [
        {field: 'so_cong_van', headerName: 'Số công văn', width: 110},
        {field: 'ten_cong_van', headerName: 'Tên công văn', flex: 1},
        {
            field: 'nguoi_nhan',
            headerName: 'Người nhan',
            width: 150,
        },
        {
            field: 'ngay_nhan',
            headerName: 'Ngày nhan',
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
                        <DeleteOutline className='congVanDenListDelete' onClick={()=>handleDelete(params.row.id)}/>
                    </>

                )
            }
        }
    ];

    const [data, setData] = useState(congvandenRows);

    return (
        <div className='congVanDenList'>
            <main>
                <div className='congVanDenListTop'>
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
                        onClick={() => setButtonPopup(true)}
                    >
                        Thêm mới
                    </Button>
                </div>
                <div className="dowpdown-filter">
                    <div style={{ width: 200 }}>
                        <span className="dropdown-title">Loại công văn</span>
                        <Dropdown 
                        datas={loaicongvanRows} 
                        prompt='Chọn loại công văn ...'
                        id='id'
                        label='loai_cong_van'
                        value={value_loaicongvan}
                        onChange={val => setValue_LoaiCongVan(val)}/>
                    </div>
                    <div style={{ width: 200 }}>
                        <span className="dropdown-title">Mức độ khẩn cấp</span>
                        <Dropdown 
                        datas={muc_do_khan_cap_Rows} 
                        prompt='Chọn mức độ khẩn cấp ...'
                        id='id'
                        label='muc_do_khan_cap'
                        value={value_mucdokhancap}
                        onChange={val => setValue_MucDoKhanCap(val)}/>
                    </div>
                    <div style={{ width: 200 }}>
                        <span className="dropdown-title">Mức độ bảo mật</span>
                        <Dropdown 
                        datas={muc_do_bao_mat_Rows} 
                        prompt='Chọn mức độ bảo mật ...'
                        id='id'
                        label='muc_do_bao_mat'
                        value={value_mucdobaomat}
                        onChange={val => setValue_MucDoBaoMat(val)}/>
                    </div>
                    <div style={{ width: 200 }}>
                        <span className="dropdown-title">Tình trạng xử lý</span>
                        <Dropdown 
                        datas={tinh_trang_xu_ly_Rows} 
                        prompt='Chọn tình trạng xử lý ...'
                        id='id'
                        label='tinh_trang_xu_ly'
                        value={value_tinhtrangxuly}
                        onChange={val => setValue_TinhTrangXuLy(val)}/>
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