import React, {useState, useEffect} from "react";
import './congVanDiChiTiet.css';
import { ArrowBack } from '@material-ui/icons';
import { useHistory, useParams } from "react-router-dom";
import { ErrorOutlineRounded, Create, ContentPaste, AttachFile, People } from '@mui/icons-material';
import Comments from "../../comments/Comments";
import EditCongVanDi from "../../popup/EditCongVanDi/EditCongVanDi";
import * as backend_config from "../../../config/backend"

export default function CongVanDiChiTiet(props) {
    const token = props.token;
    let history = useHistory();
    const [buttonPopup, setButtonPopup] = useState(false);

    const { cvdiId } = useParams();

    const [cvdiData, setCvdiData] = useState("");

    useEffect(() => {
        backend_config.makeRequest("GET", backend_config.CONG_VAN_DI_GET_BY_ID.replace('{id}', cvdiId), token)
            .then((data) => data.json())
            .then((data) => setCvdiData(data.cong_van_di_current_version))
    }, []);

    return (
        <div className="PageChiTietCongVanDi">
            <main>
                <div className="congVanDiTitleContainer">
                    <ArrowBack className='congVanDiTitleContainerIcon' onClick={() => history.goBack()} ></ArrowBack>
                    <h1 className='congVanDiTitle'>Thông tin chi tiết</h1>
                    <button className='congVanDiEdit' onClick={() => setButtonPopup(true)}>Chỉnh sửa</button>
                    <EditCongVanDi trigger={buttonPopup} setTrigger={setButtonPopup} token={token} cvdiData={cvdiData}></EditCongVanDi>
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
                                <div className="columnChildren1Info">{cvdiData.id}</div>
                            </div>
                            <div style={{display: 'flex'}}>
                                <div className="columnChildren1Title">Tên công văn:</div>
                                <div className="columnChildren1Info">{cvdiData.ten_cong_van}</div>
                            </div>
                            <div style={{display: 'flex'}}>
                                <div className="columnChildren1Title">Nơi nhận:</div>
                                <div className="columnChildren1Info">{cvdiData.phong_ban_nhan?.name}</div>
                            </div>
                            <div style={{display: 'flex'}}>
                                <div className="columnChildren1Title">Người nhận:</div>
                                <div className="columnChildren1Info">{cvdiData.nguoi_xu_ly?.ho_ten}</div>
                            </div>
                            <div style={{display: 'flex'}}>
                                <div className="columnChildren1Title">Bộ phận phát hành:</div>
                                <div className="columnChildren1Info">{cvdiData.phong_ban_phat_hanh?.name}</div>
                            </div>
                            <div style={{display: 'flex'}}>
                                <div className="columnChildren1Title">Người ký:</div>
                                <div className="columnChildren1Info">{cvdiData.nguoi_ky?.ho_ten}</div>
                            </div>
                            <div style={{display: 'flex'}}>
                                <div className="columnChildren1Title">Ngày ký:</div>
                                <div className="columnChildren1Info">{cvdiData.ngay_ky?.split('T')[0]}</div>
                            </div>
                        </div>
                        <div className="columnChildren2">
                            <div style={{display: 'flex'}}>
                                <div className="columnChildren2Title">Ngày hiệu lực:</div>
                                <div className="columnChildren2Info">{cvdiData.ngay_hieu_luc?.split('T')[0]}</div>
                            </div>
                            <div style={{display: 'flex'}}>
                                <div className="columnChildren2Title">Ngày hết hiệu lực:</div>
                                <div className="columnChildren2Info">{cvdiData.ngay_het_hieu_luc?.split('T')[0]}</div>
                            </div>
                            <div style={{display: 'flex'}}>
                                <div className="columnChildren2Title">Số lượng văn bản:</div>
                                <div className="columnChildren2Info">{cvdiData.so_luong_van_ban}</div>
                            </div>
                            <div style={{display: 'flex'}}>
                                <div className="columnChildren2Title">Mức độ ưu tiên:</div>
                                <div className="columnChildren2Info">{cvdiData.muc_do_uu_tien?.name}</div>
                            </div>
                            <div style={{display: 'flex'}}>
                                <div className="columnChildren2Title">Ngày phát hành:</div>
                                <div className="columnChildren2Info">{cvdiData.ngay_phat_hanh?.split('T')[0]}</div>
                            </div>
                            <div style={{display: 'flex'}}>
                                <div className="columnChildren2Title">Loại công văn:</div>
                                <div className="columnChildren2Info">{cvdiData.loai_cong_van?.name}</div>
                            </div>
                        </div>
                    </div>
                    <div className="thongTinChungColumn2">
                        <div style={{display:'flex'}}>
                            <div className="column2Title">Người xử lý:</div>
                            <div className="column2Info">{cvdiData.nguoi_xu_ly?.ho_ten}</div>
                        </div>
                        <div style={{display:'flex'}}>
                            <div className="column2Title">Người theo dõi:</div>
                            <div className="column2Info">{cvdiData.nguoi_theo_doi?.ho_ten}</div>
                        </div>
                        <div style={{display:'flex'}}>
                            <div className="column2Title">Tình trạng xử lý:</div>
                            <div className="column2Info">{cvdiData.tinh_trang_xu_ly?.name}</div>
                        </div>
                        <div style={{display:'flex'}}>
                            <div className="column2Title">Người tạo:</div>
                            <div className="column2Info">{cvdiData.nguoi_tao?.ho_ten}</div>
                        </div>
                        <div style={{display:'flex'}}>
                            <div className="column2Title">Ngày tạo:</div>
                            <div className="column2Info">{cvdiData.ngay_tao?.split('T')[0]}</div>
                        </div>
                        <div style={{display:'flex'}}>
                            <div className="column2Title">Người duyệt:</div>
                            <div className="column2Info">{cvdiData.nguoi_duyet?.ho_ten}</div>
                        </div>
                        <div style={{display:'flex'}}>
                            <div className="column2Title">Ngày duyệt:</div>
                            <div className="column2Info">{cvdiData.ngay_duyet?.split('T')[0]}</div>
                        </div>
                    </div>
                </div> 
                <div className="trichDanContainer">
                    <div className="trichDanTitle">
                        <Create style={{margin: '2px 5px 0 0'}}/> 
                        <h5>Lý do</h5>
                    </div>
                    <div className="trichDanInfo">{cvdiData.ly_do}</div>
                    <div className="trichDanTitle">
                        <ContentPaste style={{margin: '2px 5px 0 0'}}/> 
                        <h5>Nội dung</h5>
                    </div>
                    <div className="trichDanInfo" dangerouslySetInnerHTML={{ __html: cvdiData.noi_dung }}>
                    </div>
                    <div className="trichDanTitle">
                        <AttachFile style={{margin: '2px 5px 0 0'}}/> 
                        <h5>Tệp đính kèm</h5>
                    </div>
                    <div className="trichDanInfo">
                        <a href=""></a>
                    </div>
                </div>
                <div className="commentsContainer">
                    <div className="commentsTitle">
                        <People style={{margin: '2px 5px 0 0'}}/> 
                        <h5>Trao đổi</h5>
                    </div>
                    <Comments currentUserId="1"/>
                </div>
            </main>
        </div>
    )
}