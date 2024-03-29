import React, {useState, useEffect} from "react";
import './SLTcongVanChiTiet.css';
import { ArrowBack } from '@material-ui/icons';
import { useHistory, useParams } from "react-router-dom";
import { ErrorOutlineRounded, Create, ContentPaste, AttachFile, People } from '@mui/icons-material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Comments from "../../comments/Comments";
import EditCongVan from "../../popup/SLTEditCongVan/EditCongVan";
import { ToastContainer, toast } from 'react-toastify';
import * as backend_config from "../../../config/backend"

import { useUserInfo } from "../../../context/TokenContext";

export default function SLTcongVanChiTiet(props) {
    const token = props.token;
    const {user} = useUserInfo();
    // console.log(user)
    let history = useHistory();
    const [buttonPopup, setButtonPopup] = useState(false);

    let { cong_vanId } = useParams();
    if ("cong_vanId" in props) cong_vanId = props.cong_vanId;
    

    const [cong_van_luu_truData, setcong_van_luu_truData] = useState("");
    // const [downloadTep_dinh_kemUrl, setDownloadTep_dinh_kemUrl] = useState("");

    const refreshFunc = () => {
        backend_config.makeRequest("GET", backend_config.CONG_VAN_LUU_TRU_GET_BY_ID.replace('{id}', cong_vanId), token)
            .then((data) => data.json())
            .then((data) => setcong_van_luu_truData(data))
    }


    const downloadTep_dinh_kem = (downloadTep_dinh_kemUrl) =>{
        // console.log(cong_van_luu_truData);
        return backend_config.makeRequest("GET", backend_config.COMMON_GET_DOWNLOAD_TOKEN, token)
        .then((response) => response.json())
        .then((download_token) => {
            window.open(downloadTep_dinh_kemUrl.replace("{download_token}", download_token));
        })
    }


    const duyet = () => {
        backend_config.makeRequest("PUT", backend_config.CONG_VAN_PUT_DUYET.replace("{id}", cong_van_luu_truData.cong_van_id), token)
        .then((response) => {
            if (response.ok){
                response.json().then((response_json) => {
                    // addPhongBanSuccessNotify(response_json);
                    history.push('/cong-van-di/cho_xu_ly')
                })
            }
            else {
                response.text().then((text) => {
                    let error = JSON.parse(text).detail;
                    switch (error) {
                        default:
                            alert(text);
                            return;
                    }
                })
            }
        })
    }

    const xu_ly = () => {
        backend_config.makeRequest("PUT", backend_config.CONG_VAN_PUT_XU_LY.replace("{id}", cong_van_luu_truData.cong_van_id), token)
        .then((response) => {
            if (response.ok){
                response.json().then((response_json) => {
                    // addPhongBanSuccessNotify(response_json);
                    history.push('/cong-van-den/da_hoan_tat')
                })
            }
            else {
                response.text().then((text) => {
                    let error = JSON.parse(text).detail;
                    switch (error) {
                        default:
                            alert(text);
                            return;
                    }
                })
            }
        })
    }


    useEffect(() => {
        refreshFunc()
    }, []);

    return (
        <div className="Page-SLT-ChiTietCongVan">
            <main>
                <div className="SLT-congVan-TitleContainer">
                    <ArrowBack className='SLT-congVan-TitleContainerIcon' onClick={() => history.goBack()} ></ArrowBack>
                    <h1 className='SLT-congVan-Title'>Thông tin chi tiết</h1>
                    <div>
                        <button className='congVanDiEdit' onClick={() => setButtonPopup(true)}>Chỉnh sửa</button>
                        {cong_van_luu_truData !== "" && <EditCongVan trigger={buttonPopup} setTrigger={setButtonPopup} token={token} cong_van_luu_truData={cong_van_luu_truData} refreshFunc={refreshFunc}></EditCongVan>}
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
                                <div className="columnChildren1Info">{cong_van_luu_truData.id}</div>
                            </div>
                            <div style={{display: 'flex'}}>
                                <div className="columnChildren1Title">Tên công văn:</div>
                                <div className="columnChildren1Info">{cong_van_luu_truData.ten_cong_van}</div>
                            </div>
                            <div style={{display: 'flex'}}>
                                <div className="columnChildren1Title">Nơi nhận:</div>
                                <div className="columnChildren1Info">{cong_van_luu_truData.phong_ban_nhan}</div>
                            </div>
                            <div style={{display: 'flex'}}>
                                <div className="columnChildren1Title">Người nhận và xử lý:</div>
                                <div className="columnChildren1Info">{cong_van_luu_truData.nguoi_xu_ly}</div>
                            </div>
                            <div style={{display: 'flex'}}>
                                <div className="columnChildren1Title">Ngày hoàn tất:</div>
                                <div className="columnChildren1Info">{cong_van_luu_truData.ngay_hoan_tat?.split('T')[0]}</div>
                            </div>
                        </div>
                        <div className="columnChildren2">
                            <div style={{display: 'flex'}}>
                                <div className="columnChildren2Title">Mức độ ưu tiên:</div>
                                <div className="columnChildren2Info">{cong_van_luu_truData.muc_do_uu_tien}</div>
                            </div>
                            <div style={{display: 'flex'}}>
                                <div className="columnChildren2Title">Loại công văn:</div>
                                <div className="columnChildren2Info">{cong_van_luu_truData.loai_cong_van}</div>
                            </div>
                            <div style={{display: 'flex'}}>
                                <div className="columnChildren2Title">Bộ phận phát hành:</div>
                                <div className="columnChildren2Info">{cong_van_luu_truData.phong_ban_phat_hanh}</div>
                            </div>
                            <div style={{display: 'flex'}}>
                                <div className="columnChildren2Title">Người duyệt và ký:</div>
                                <div className="columnChildren2Info">{cong_van_luu_truData.nguoi_ky}</div>
                            </div>
                            <div style={{display: 'flex'}}>
                                <div className="columnChildren2Title">Ngày ký:</div>
                                <div className="columnChildren2Info">{cong_van_luu_truData.ngay_ky?.split('T')[0]}</div>
                            </div>
                        </div>
                    </div>
                    <div className="thongTinChungColumn2">
                        {/* <div style={{display:'flex'}}>
                            <div className="column2Title">Người xử lý:</div>
                            <div className="column2Info">{cong_van_luu_truData.nguoi_xu_ly?.ho_ten}</div>
                        </div> */}
                        <div style={{display:'flex'}}>
                            <div className="column2Title">Tình trạng xử lý:</div>
                            <div className="column2Info">Đã xử lý</div>
                        </div>
                        <div style={{display:'flex'}}>
                            <div className="column2Title">Người tạo:</div>
                            <div className="column2Info">{cong_van_luu_truData.nguoi_tao}</div>
                        </div>
                        <div style={{display:'flex'}}>
                            <div className="column2Title">Ngày tạo:</div>
                            <div className="column2Info">{cong_van_luu_truData.ngay_tao?.split('T')[0]}</div>
                        </div>
                    </div>
                </div> 
                <div className="trichDanContainer">
                    <div className="trichDanTitle">
                        <Create style={{margin: '2px 5px 0 0'}}/> 
                        <h5>Lý do</h5>
                    </div>
                    <div className="trichDanInfo">{cong_van_luu_truData.ly_do}</div>
                    <div className="trichDanTitle">
                        <ContentPaste style={{margin: '2px 5px 0 0'}}/> 
                        <h5>Nội dung</h5>
                    </div>
                    <div className="trichDanInfo" dangerouslySetInnerHTML={{ __html: cong_van_luu_truData.noi_dung }}>
                    </div>
                    <div className="trichDanTitle">
                        <AttachFile style={{margin: '2px 5px 0 0'}}/> 
                        <h5>Tệp đính kèm: </h5>
                        {cong_van_luu_truData !== "" && cong_van_luu_truData.id_tep_dinh_kem !== null &&
                        <div style={{display: 'flex'}}>
                            <h5 style={{marginLeft: "5px"}}>{cong_van_luu_truData.tep_dinh_kem.name}</h5>
                            <FileDownloadIcon style={{cursor: 'pointer', "background-color": "#086cae", color: "white", marginLeft: "10px"}}
                            onClick={() => downloadTep_dinh_kem(backend_config.CONG_VAN_LUU_TRU_DOWNLOAD_TEP_DINH_KEM.replace(
                                "{cong_van_id}", cong_van_luu_truData.id))}>
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
                    <Comments token={token} cong_van_id={cong_vanId} is_active={cong_van_luu_truData.id_tinh_trang_xu_ly === 3? false: true}/>
                </div> */}
            </main>
            <ToastContainer className="cong-van-di-notify" />
        </div>
    )
}


