import { useState, useEffect } from "react";
import { 
    getComments as getCommentsApi, 
    createComment as createCommentApi, 
    deleteComment as deleteCommentApi, 
    updateComment as updateCommentApi
} from "../../dummyCommentsData"; 
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import "./comments.css";
import * as backend_config from "../../config/backend"



const Comments = ({cong_van_id, token, is_active}) => {
    // const [backendComments, setBackendComments] = useState([]);
    // const [activeComment, setActiveComment] = useState(null);
    // const rootComments = backendComments.filter(
    //     (backendComments) => backendComments.parentId === null
    // );

    const [rootComments, serRootComments] = useState([]);

    // const getReplies = commentId => {
    //     return backendComments
    //         .filter(backendComment => backendComment.parentId === commentId)
    //         .sort(
    //             (a, b) => 
    //                 new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    //         );
    // };
    // console.log('backendComments', backendComments);
    const addComment = (text) => {
        const body = JSON.stringify({
            noi_dung: text,
        })
        backend_config.makeRequest("POST", backend_config.TRAO_DOI_POST_CREATE.replace("{id}", cong_van_id), token, body)
        .then((response) => {
            if (response.ok){
                response.json().then((response_json) => {
                    // addPhongBanSuccessNotify(response_json);
                    refreshFunc()
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

    // const updateComment = (text, commentId) => {
    //     updateCommentApi(text).then(() => {
    //         const updatedBackendComments = backendComments.map((backendComment) => {
    //             if (backendComment.id === commentId) {
    //                 return { ...backendComment, body: text};
    //             }
    //             return backendComment;
    //         });
    //         setBackendComments(updatedBackendComments);
    //         setActiveComment(null);
    //     })
    // }

    // const deleteComment = (commentId) => {
    //     if (window.confirm('Bạn có chắc chắn muốn xóa trao đổi này không?')) {
    //         deleteCommentApi(commentId).then(() => {
    //             const updatedBackendComments = backendComments.filter(
    //                 (backendComment) => backendComment.id !== commentId
    //             );
    //             setBackendComments(updatedBackendComments);
    //         });
    //     }
    // }

    const refreshFunc = () => {
        backend_config.makeRequest("GET", backend_config.TRAO_DOI_GET_LIST.replace('{id}', cong_van_id), token)
            .then((data) => data.json())
            .then((data) => serRootComments(data))
    }

    useEffect(()=> {
        refreshFunc();
    }, [])
    return (
        <div className="comments">
            {is_active && <div className="comment-form-title">Nhập nội dung</div>}
            {is_active && <CommentForm submitLabel="Gửi" handleSubmit={addComment}/>}
            <div className="comments-container">
                {rootComments.length === 0 && 
                    <div style={{textAlign: 'center'}}>
                        Chưa có trao đổi nào!    
                    </div>}
                {rootComments.map((rootComment) => (
                    <Comment 
                        comment={rootComment} 
                    />
                    // <Comment 
                    //     key={rootComment.id} 
                    //     comment={rootComment} 
                    //     replies={getReplies(rootComment.id)}
                    //     currentUserId={currentUserId}
                    //     deleteComment={deleteComment}
                    //     activeComment={activeComment}
                    //     setActiveComment={setActiveComment}
                    //     addComment={addComment}
                    //     updateComment={updateComment}
                    // />
                ))}
            </div>
        </div>
    );
};

export default Comments;