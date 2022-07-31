import React, {useState, useEffect} from "react";
import './congVanDiVersion.css';
import { ArrowBack } from '@material-ui/icons';
import { useHistory, useParams } from "react-router-dom";
import { ErrorOutlineRounded, Create, ContentPaste, AttachFile, People } from '@mui/icons-material';
import {Box, FormControl, MenuItem, Select} from "@mui/material";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Comments from "../../comments/Comments";
import EditCongVanDi from "../../popup/EditCongVanDi/EditCongVanDi";
import * as backend_config from "../../../config/backend"

import { useUserInfo } from "../../../context/TokenContext";

export default function CongVanDiVersion(props) {
    const token = props.token;
    // const {user} = useUserInfo();
    // console.log(user)
    let history = useHistory();
    // const [buttonPopup, setButtonPopup] = useState(false);

    let { cong_vanId } = useParams();
    if ("cong_vanId" in props) cong_vanId = props.cong_vanId;
    
    const [cong_van, setCong_van] = useState();
    const [allVersions, setAllVersions] =  useState([]);
    const [cong_van_versionData, setCong_van_versionData] = useState("");
    // const [downloadTep_dinh_kemUrl, setDownloadTep_dinh_kemUrl] = useState("");

    const refreshFunc = (version_id) => {
        backend_config.makeRequest("GET", backend_config.CONG_VAN_VERSION_GET_BY_ID.replace('{cong_van_id}', cong_vanId).replace('{version_id}', version_id), token)
            .then((data) => data.json())
            .then((data) => setCong_van_versionData(data))
    }


    const downloadTep_dinh_kem = (downloadTep_dinh_kemUrl) =>{
        // console.log(cong_van_versionData);
        return backend_config.makeRequest("GET", backend_config.COMMON_GET_DOWNLOAD_TOKEN, token)
        .then((response) => response.json())
        .then((download_token) => {
            window.open(downloadTep_dinh_kemUrl.replace("{download_token}", download_token));
        })
    }



    useEffect(() => {
        backend_config.makeRequest("GET", backend_config.CONG_VAN_VERSION_GET_LIST.replace('{cong_van_id}', cong_vanId), token)
            .then((data) => data.json())
            .then((data) => {
                // console.log(data)
                setCong_van(data)
                setAllVersions(data.cong_van_versions);
                refreshFunc(data.cong_van_current_version_id);
                // console.log(data.cong_van_current_version_id)
            }
                )
        
    }, []);

    return (
        <div className="PageChiTietCongVan">
            <main>
                <div className="congVanDiTitleContainer">
                    <ArrowBack className='congVanDiTitleContainerIcon' onClick={() => history.push("/cong-van-di/" + cong_vanId)} ></ArrowBack>
                    <h1 className='congVanDiTitle'>Thông tin chi tiết</h1>
                    <div>
                        <div style={{ width: '200px', display: 'flex', flexDirection: 'column' }}>
                            <span className="dropdown-title">Phiên bản</span>
                            <Select
                                labelId="cong_van_version"
                                id="id"
                                style={{
                                    height: '36px',
                                    position: 'relative',
                                    color: '#333',
                                    cursor: 'default',
                                    margin: '10px 0 20px 20px',
                                }}
                                value={cong_van?.cong_van_current_version_id}
                                onChange={(event) => {refreshFunc(event.target.value)}}
                            >
                                {allVersions.map((item) => {      
                                    if (item.id === cong_van?.cong_van_current_version_id)    
                                        return (<MenuItem value={item.id}> Phiên bản hiện tại</MenuItem>)
                                    else return (<MenuItem value={item.id}>{item.thoi_gian_cap_nhat}</MenuItem> )
                                })}
                            </Select>
                        </div>
                    </div>
                </div>
                <div className="thongTinChungContainer">
                    <div className="thongTinChungColumn1">
                        <div className="column1Title">
                            <ErrorOutlineRounded style={{margin: '2px 5px 0 0'}}/> 
                            <h5>Thông tin chung</h5>
                        </div>
                        <div className="columnChildren1">
                            <div style={{display: 'flex'}}>
                                <div className="columnChildren1Title">Số công văn:</div>
                                <div className="columnChildren1Info">{cong_van_versionData.id}</div>
                            </div>
                            <div style={{display: 'flex'}}>
                                <div className="columnChildren1Title">Tên công văn:</div>
                                <div className="columnChildren1Info">{cong_van_versionData.ten_cong_van}</div>
                            </div>
                            <div style={{display: 'flex'}}>
                                <div className="columnChildren1Title">Nơi nhận:</div>
                                <div className="columnChildren1Info">{cong_van_versionData.phong_ban_nhan?.name}</div>
                            </div>
                            <div style={{display: 'flex'}}>
                                <div className="columnChildren1Title">Người nhận và xử lý:</div>
                                <div className="columnChildren1Info">{cong_van_versionData.nguoi_xu_ly?.ho_ten}</div>
                            </div>
                            <div style={{display: 'flex'}}>
                                <div className="columnChildren1Title">Ngày hoàn tất:</div>
                                <div className="columnChildren1Info">{cong_van_versionData.ngay_hoan_tat?.split('T')[0]}</div>
                            </div>
                        </div>
                        <div className="columnChildren2">
                            <div style={{display: 'flex'}}>
                                <div className="columnChildren2Title">Mức độ ưu tiên:</div>
                                <div className="columnChildren2Info">{cong_van_versionData.muc_do_uu_tien?.name}</div>
                            </div>
                            <div style={{display: 'flex'}}>
                                <div className="columnChildren2Title">Loại công văn:</div>
                                <div className="columnChildren2Info">{cong_van_versionData.loai_cong_van?.name}</div>
                            </div>
                            <div style={{display: 'flex'}}>
                                <div className="columnChildren2Title">Bộ phận phát hành:</div>
                                <div className="columnChildren2Info">{cong_van_versionData.phong_ban_phat_hanh?.name}</div>
                            </div>
                            <div style={{display: 'flex'}}>
                                <div className="columnChildren2Title">Người duyệt và ký:</div>
                                <div className="columnChildren2Info">{cong_van_versionData.nguoi_ky?.ho_ten}</div>
                            </div>
                            <div style={{display: 'flex'}}>
                                <div className="columnChildren2Title">Ngày ký:</div>
                                <div className="columnChildren2Info">{cong_van_versionData.ngay_ky?.split('T')[0]}</div>
                            </div>
                        </div>
                    </div>
                    <div className="thongTinChungColumn2">
                        {/* <div style={{display:'flex'}}>
                            <div className="column2Title">Người xử lý:</div>
                            <div className="column2Info">{cong_van_versionData.nguoi_xu_ly?.ho_ten}</div>
                        </div> */}
                        <div style={{display:'flex'}}>
                            <div className="column2Title">Người theo dõi:</div>
                            <div className="column2Info">{cong_van_versionData.nguoi_theo_doi?.ho_ten}</div>
                        </div>
                        <div style={{display:'flex'}}>
                            <div className="column2Title">Tình trạng xử lý:</div>
                            <div className="column2Info">{cong_van_versionData.tinh_trang_xu_ly?.name}</div>
                        </div>
                        <div style={{display:'flex'}}>
                            <div className="column2Title">Người tạo:</div>
                            <div className="column2Info">{cong_van_versionData.nguoi_tao?.ho_ten}</div>
                        </div>
                        <div style={{display:'flex'}}>
                            <div className="column2Title">Ngày tạo:</div>
                            <div className="column2Info">{cong_van_versionData.ngay_tao?.split('T')[0]}</div>
                        </div>
                    </div>
                </div> 
                <div className="trichDanContainer">
                    <div className="trichDanTitle">
                        <Create style={{margin: '2px 5px 0 0'}}/> 
                        <h5>Lý do</h5>
                    </div>
                    <div className="trichDanInfo">{cong_van_versionData.ly_do}</div>
                    <div className="trichDanTitle">
                        <ContentPaste style={{margin: '2px 5px 0 0'}}/> 
                        <h5>Nội dung</h5>
                    </div>
                    <div className="trichDanInfo" dangerouslySetInnerHTML={{ __html: cong_van_versionData.noi_dung }}>
                    </div>
                    <div className="trichDanTitle">
                        <AttachFile style={{margin: '2px 5px 0 0'}}/> 
                        <h5>Tệp đính kèm: </h5>
                        {cong_van_versionData !== "" && cong_van_versionData.id_tep_dinh_kem !== null &&
                        <div style={{display: 'flex'}}>
                            <h5 style={{marginLeft: "5px"}}>{cong_van_versionData.tep_dinh_kem.name}</h5>
                            <FileDownloadIcon style={{cursor: 'pointer', "background-color": "#086cae", color: "white", marginLeft: "10px"}}
                            onClick={() => downloadTep_dinh_kem(backend_config.CONG_VAN_VERSION_DOWNLOAD_TEP_DINH_KEM.replace(
                                "{cong_van_version_id}", cong_van_versionData.id))}>
                            </FileDownloadIcon>
                        </div>
                        }
                    </div>
                    <div className="trichDanInfo">
                        <a href=""></a>
                    </div>
                </div>
                {/* <div className="commentsContainer">
                    <div className="commentsTitle">
                        <People style={{margin: '2px 5px 0 0'}}/> 
                        <h5>Trao đổi</h5>
                    </div>
                    <Comments token={token} cong_van_id={cong_vanId} is_active={cong_van_versionData.id_tinh_trang_xu_ly === 3? false: true}/>
                </div> */}
            </main>
        </div>
    )
}


