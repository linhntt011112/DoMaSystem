import React, {useState} from "react";
import './congVanDiChiTiet.css';
import { ArrowBack } from '@material-ui/icons';
import { useHistory } from "react-router-dom";
import { ErrorOutlineRounded, Create, ContentPaste, AttachFile, People } from '@mui/icons-material';
import Comments from "../../comments/Comments";
import EditCongVanDi from "../../popup/EditCongVanDi/EditCongVanDi";

export default function CongVanDiChiTiet() {
    let history = useHistory();
    const [buttonPopup, setButtonPopup] = useState(false);

    return (
        <div className="PageChiTietCongVanDi">
            <main>
                <div className="congVanDiTitleContainer">
                    <ArrowBack className='congVanDiTitleContainerIcon' onClick={() => history.goBack()} ></ArrowBack>
                    <h1 className='congVanDiTitle'>Thông tin chi tiết</h1>
                    <button className='congVanDiEdit' onClick={() => setButtonPopup(true)}>Chỉnh sửa</button>
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
                                <div className="columnChildren1Info">3969</div>
                            </div>
                            <div style={{display: 'flex'}}>
                                <div className="columnChildren1Title">Tên công văn:</div>
                                <div className="columnChildren1Info">Hướng dẫn thực hiện CT GD Phổ thông cấp tiểu học</div>
                            </div>
                            <div style={{display: 'flex'}}>
                                <div className="columnChildren1Title">Nơi nhận:</div>
                                <div className="columnChildren1Info">Phong HR</div>
                            </div>
                            <div style={{display: 'flex'}}>
                                <div className="columnChildren1Title">Người ký:</div>
                                <div className="columnChildren1Info">Nguyen Thi Thuy Linh</div>
                            </div>
                            <div style={{display: 'flex'}}>
                                <div className="columnChildren1Title">Ngày ký:</div>
                                <div className="columnChildren1Info">14/03/2022</div>
                            </div>
                            <div style={{display: 'flex'}}>
                                <div className="columnChildren1Title">Bộ phận phát hành:</div>
                                <div className="columnChildren1Info">Phong Giam doc</div>
                            </div>
                        </div>
                        <div className="columnChildren2">
                            <div style={{display: 'flex'}}>
                                <div className="columnChildren2Title">Ngày hiệu lực:</div>
                                <div className="columnChildren2Info">14/03/2022</div>
                            </div>
                            <div style={{display: 'flex'}}>
                                <div className="columnChildren2Title">Ngày hết hiệu lực:</div>
                                <div className="columnChildren2Info">15/03/3030</div>
                            </div>
                            <div style={{display: 'flex'}}>
                                <div className="columnChildren2Title">Số lượng văn bản:</div>
                                <div className="columnChildren2Info">02</div>
                            </div>
                            <div style={{display: 'flex'}}>
                                <div className="columnChildren2Title">Mức độ bảo mật:</div>
                                <div className="columnChildren2Info">Cao</div>
                            </div>
                            <div style={{display: 'flex'}}>
                                <div className="columnChildren2Title">Mức độ khẩn cấp:</div>
                                <div className="columnChildren2Info">Trung binh</div>
                            </div>
                            <div style={{display: 'flex'}}>
                                <div className="columnChildren2Title">Ngày phát hành:</div>
                                <div className="columnChildren2Info">14/03/3033</div>
                            </div>
                        </div>
                    </div>
                    <div className="thongTinChungColumn2">
                        <div style={{display:'flex'}}>
                            <div className="column2Title">Loại công văn:</div>
                            <div className="column2Info">Trung binh</div>
                        </div>
                        <div style={{display:'flex'}}>
                            <div className="column2Title">Người xử lý:</div>
                            <div className="column2Info">Nguyen Thi Thuy Linh</div>
                        </div>
                        <div style={{display:'flex'}}>
                            <div className="column2Title">Người theo dõi:</div>
                            <div className="column2Info">Nguyen Thi Thuy Linh</div>
                        </div>
                        <div style={{display:'flex'}}>
                            <div className="column2Title">Tình trạng xử lý:</div>
                            <div className="column2Info">Nguyen Thi Thuy Linh</div>
                        </div>
                        <div style={{display:'flex'}}>
                            <div className="column2Title">Người tạo:</div>
                            <div className="column2Info">Nguyen Thi Thuy Linh</div>
                        </div>
                        <div style={{display:'flex'}}>
                            <div className="column2Title">Ngày tạo:</div>
                            <div className="column2Info">15/03/2022</div>
                        </div>
                        <div style={{display:'flex'}}>
                            <div className="column2Title">Người duyệt:</div>
                            <div className="column2Info">Nguyễn Thị Thùy Linh</div>
                        </div>
                        <div style={{display:'flex'}}>
                            <div className="column2Title">Ngày duyệt:</div>
                            <div className="column2Info">15/03/2022</div>
                        </div>
                    </div>
                </div> 
                <div className="trichDanContainer">
                    <div className="trichDanTitle">
                        <Create style={{margin: '2px 5px 0 0'}}/> 
                        <h5>Lý do</h5>
                    </div>
                    <div className="trichDanInfo">Để có cơ sở góp phần đảm bảo quyền lợi cho khách hàng, giúp khách hàng soạn thảo được các văn bản pháp lý, các công văn chính xác theo quy định của pháp luật, có đầy đủ căn cứ pháp lý liên quan đến vụ việc của mình, công ty luật Minh Khuê cung cấp một số mẫu công văn thông dụng để khách hàng tham khảo và sử dụng khi cần thiết.</div>
                    <div className="trichDanTitle">
                        <ContentPaste style={{margin: '2px 5px 0 0'}}/> 
                        <h5>Nội dung</h5>
                    </div>
                    <div className="trichDanInfo">
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <p><strong>TỔ CHỨC/ĐƠN VỊ/CƠ QUAN</strong></p>
                                        <p>&mdash;&mdash;&mdash;&mdash;&mdash;</p>
                                        <p>Số: &hellip;&hellip;&hellip;./CV-&hellip;.</p>
                                        <p>V/v: &hellip;&hellip;&hellip;&hellip;&hellip;(1)&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;.</p>
                                    </td>
                                    <td>
                                        <p><strong>CỘNG H&Ograve;A X&Atilde; HỘI CHỦ NGHĨA VIỆT NAM</strong></p>
                                        <p><strong><u>Độc lập - Tự do - Hạnh ph&uacute;c</u></strong></p>
                                        <p><em>Địa danh, ng&agrave;y &hellip;. th&aacute;ng &hellip;&hellip;.. năm &hellip;&hellip;</em>.</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <p><strong>K&iacute;nh gửi:</strong>&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;</p>
                        <p>&ndash; Về nội dung:</p>
                        <p>+ Cần n&ecirc;u r&otilde; nội dung kiến nghị vấn đề g&igrave;;</p>
                        <p>+ Nguy&ecirc;n nh&acirc;n hoặc l&yacute; do gửi c&ocirc;ng văn;</p>
                        <p>+ Đề nghị thời hạn trả lời c&ocirc;ng văn (ph&uacute;c đ&aacute;p).</p>
                        <p>&ndash; Kết th&uacute;c c&ocirc;ng văn: Mong qu&yacute; cơ quan &hellip; ; hoặc &ocirc;ng, b&agrave; &hellip;&hellip; sớm trả lời cho ch&uacute;ng t&ocirc;i được biết.</p>
                        <p>Xin ch&acirc;n th&agrave;nh cảm ơn!</p>
                        <p>&nbsp;</p>
                        <p>Địa chỉ: Số &hellip;&hellip;&hellip; đường&hellip;.., huyện/quận/th&agrave;nh phố:&hellip;&hellip;., tỉnh/th&agrave;nh phố trực thuộc trung ương ...</p>
                        <p>Điện thoại: &hellip;.&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;.&hellip;&hellip;., Fax: &hellip;&hellip;.&hellip;&hellip;</p>
                        <p>Email: &hellip;&hellip;&hellip;&hellip;..&hellip;&hellip;&hellip;&hellip;.; Website: &hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;.</p>
                    </div>
                    <div className="trichDanTitle">
                        <AttachFile style={{margin: '2px 5px 0 0'}}/> 
                        <h5>Tệp đính kèm</h5>
                    </div>
                    <div className="trichDanInfo">
                        <a href="https://luatminhkhue.vn/mau-mot-so-cong-van-thong-dung-hien-hanh---cach-huong-dan-viet-cong-van.aspx">https://luatminhkhue.vn/mau-mot-so-cong-van-thong-dung-hien-hanh---cach-huong-dan-viet-cong-van.aspx</a>
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
            <EditCongVanDi trigger={buttonPopup} setTrigger={setButtonPopup}></EditCongVanDi>
        </div>
    )
}