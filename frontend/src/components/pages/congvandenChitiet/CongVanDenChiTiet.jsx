import React, {useState} from "react";
import "./congvandenchitiet.css";
import { ArrowBack } from "@material-ui/icons";
import { ErrorOutlineRounded, Create, ContentPaste, AttachFile, People } from '@mui/icons-material';
import { useHistory } from "react-router-dom";
import Comments from "../../comments/Comments";
import EditCongVanDen from "../../popup/EditCongVanDen/EditCongVanDen";

export default function CongVanDenChiTiet() {
    let history = useHistory();
    const [buttonPopup, setButtonPopup] = useState(false);

    return (
        <div className="page-chi-tiet-cong-van-den">
            <main>
                <div className="cong-van-den-title-container">
                    <ArrowBack className="cong-van-den-title-container-icon" onClick={() => history.goBack()}></ArrowBack>                
                    <h1 className='cong-van-di-title'>Thông tin chi tiết</h1>
                    <button className='cong-van-di-edit' onClick={() => setButtonPopup(true)}>Chỉnh sửa</button>
                </div>
                <div className="thong-tin-chung-container">
                    <div className="thong-tin-chung-column-1">
                        <div className="column-1-title">
                            <ErrorOutlineRounded style={{margin: '2px 5px 0 0'}}/> 
                            <h5>Thong tin chung</h5>
                        </div>
                        <div className="column-children-1">
                            <div style={{display: 'flex'}}>
                                <div className="column-children-1-title">So cong van:</div>
                                <div className="column-children-1-info">3969</div>
                            </div>
                            <div style={{display: 'flex'}}>
                                <div className="column-children-1-title">Ten cong van:</div>
                                <div className="column-children-1-info">Hướng dẫn thực hiện CT GD Phổ thông cấp tiểu học</div>
                            </div>
                            <div style={{display: 'flex'}}>
                                <div className="column-children-1-title">Noi nhan:</div>
                                <div className="column-children-1-info">Phong HR</div>
                            </div>
                            <div style={{display: 'flex'}}>
                                <div className="column-children-1-title">Nguoi ky:</div>
                                <div className="column-children-1-info">Nguyen Thi Thuy Linh</div>
                            </div>
                            <div style={{display: 'flex'}}>
                                <div className="column-children-1-title">Ngay ky:</div>
                                <div className="column-children-1-info">14/03/2022</div>
                            </div>
                            <div style={{display: 'flex'}}>
                                <div className="column-children-1-title">Bo phan phat hanh:</div>
                                <div className="column-children-1-info">Phong Giam doc</div>
                            </div>
                        </div>
                        <div className="column-children-2">
                            <div style={{display: 'flex'}}>
                                <div className="column-children-2-title">Ngay hieu luc:</div>
                                <div className="column-children-2-info">14/03/2022</div>
                            </div>
                            <div style={{display: 'flex'}}>
                                <div className="column-children-2-title">Ngay het hieu luc:</div>
                                <div className="column-children-2-info">15/03/3030</div>
                            </div>
                            <div style={{display: 'flex'}}>
                                <div className="column-children-2-title">So luong van ban:</div>
                                <div className="column-children-2-info">02</div>
                            </div>
                            <div style={{display: 'flex'}}>
                                <div className="column-children-2-title">Muc do bao mat:</div>
                                <div className="column-children-2-info">Cao</div>
                            </div>
                            <div style={{display: 'flex'}}>
                                <div className="column-children-2-title">Muc do khan cap:</div>
                                <div className="column-children-2-info">Trung binh</div>
                            </div>
                            <div style={{display: 'flex'}}>
                                <div className="column-children-2-title">Ngay phat hanh:</div>
                                <div className="column-children-2-info">14/03/3033</div>
                            </div>
                        </div>
                    </div>
                    <div className="thong-tin-chung-column-2">
                        <div style={{display:'flex'}}>
                            <div className="column-2-title">Loai cong van:</div>
                            <div className="column-2-info">Trung binh</div>
                        </div>
                        <div style={{display:'flex'}}>
                            <div className="column-2-title">Nguoi xu ly:</div>
                            <div className="column-2-info">Nguyen Thi Thuy Linh</div>
                        </div>
                        <div style={{display:'flex'}}>
                            <div className="column-2-title">Nguoi theo doi:</div>
                            <div className="column-2-info">Nguyen Thi Thuy Linh</div>
                        </div>
                        <div style={{display:'flex'}}>
                            <div className="column-2-title">Tinh trang xu ly:</div>
                            <div className="column-2-info">Nguyen Thi Thuy Linh</div>
                        </div>
                        <div style={{display:'flex'}}>
                            <div className="column-2-title">Người tạo:</div>
                            <div className="column-2-info">Nguyen Thi Thuy Linh</div>
                        </div>
                        <div style={{display:'flex'}}>
                            <div className="column-2-title">Ngày tạo:</div>
                            <div className="column-2-info">15/03/2022</div>
                        </div>
                        <div style={{display:'flex'}}>
                            <div className="column-2-title">Người duyệt:</div>
                            <div className="column-2-info">Nguyễn Thị Thùy Linh</div>
                        </div>
                        <div style={{display:'flex'}}>
                            <div className="column-2-title">Ngày duyệt:</div>
                            <div className="column-2-info">15/03/2022</div>
                        </div>
                    </div>
                </div> 
                <div className="trich-dan-container">
                    <div className="trich-dan-title">
                        <Create style={{margin: '2px 5px 0 0'}}/> 
                        <h5>Ly Do</h5>
                    </div>
                    <div className="trich-dan-info">Để có cơ sở góp phần đảm bảo quyền lợi cho khách hàng, giúp khách hàng soạn thảo được các văn bản pháp lý, các công văn chính xác theo quy định của pháp luật, có đầy đủ căn cứ pháp lý liên quan đến vụ việc của mình, công ty luật Minh Khuê cung cấp một số mẫu công văn thông dụng để khách hàng tham khảo và sử dụng khi cần thiết.</div>
                    <div className="trich-dan-title">
                        <ContentPaste style={{margin: '2px 5px 0 0'}}/> 
                        <h5>Noi dung</h5>
                    </div>
                    <div className="trich-dan-info">
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
                    <div className="trich-dan-title">
                        <AttachFile style={{margin: '2px 5px 0 0'}}/> 
                        <h5>Tep dinh kem</h5>
                    </div>
                    <div className="trich-dan-info">
                        <a href="">https://luatminhkhue.vn/mau-mot-so-cong-van-thong-dung-hien-hanh---cach-huong-dan-viet-cong-van.aspx</a>
                    </div>
                </div>
                <div className="comments-container">
                    <div className="comments-title">
                        <People style={{margin: '2px 5px 0 0'}}/> 
                        <h5>Trao doi</h5>
                    </div>
                    <Comments currentUserId="1"/>
                </div>
            </main>
            <EditCongVanDen trigger={buttonPopup} setTrigger={setButtonPopup}></EditCongVanDen>
        </div>
    )
}