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

const Comments = ({commentsUrl, currentUserId}) => {
    const [backendComments, setBackendComments] = useState([]);
    const [activeComment, setActiveComment] = useState(null);
    const rootComments = backendComments.filter(
        (backendComments) => backendComments.parentId === null
    );
    const getReplies = commentId => {
        return backendComments
            .filter(backendComment => backendComment.parentId === commentId)
            .sort(
                (a, b) => 
                    new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            );
    };
    // console.log('backendComments', backendComments);
    const addComment = (text, parentId) => {
        console.log('addComment', text, parentId);
        createCommentApi(text, parentId).then(comment => {
            setBackendComments([comment, ...backendComments]);
            setActiveComment(null);
        })
    }

    const updateComment = (text, commentId) => {
        updateCommentApi(text).then(() => {
            const updatedBackendComments = backendComments.map((backendComment) => {
                if (backendComment.id === commentId) {
                    return { ...backendComment, body: text};
                }
                return backendComment;
            });
            setBackendComments(updatedBackendComments);
            setActiveComment(null);
        })
    }

    const deleteComment = (commentId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa trao đổi này không?')) {
            deleteCommentApi(commentId).then(() => {
                const updatedBackendComments = backendComments.filter(
                    (backendComment) => backendComment.id !== commentId
                );
                setBackendComments(updatedBackendComments);
            });
        }
    }

    useEffect(()=> {
        getCommentsApi().then(data => {
            setBackendComments(data);
        });
    }, [])
    return (
        <div className="comments">
            <div className="comment-form-title">Nhập nội dung</div>
            <CommentForm submitLabel="Gửi" handleSubmit={addComment}/>
            <div className="comments-container">
                {rootComments.map((rootComment) => (
                    <Comment 
                        key={rootComment.id} 
                        comment={rootComment} 
                        replies={getReplies(rootComment.id)}
                        currentUserId={currentUserId}
                        deleteComment={deleteComment}
                        activeComment={activeComment}
                        setActiveComment={setActiveComment}
                        addComment={addComment}
                        updateComment={updateComment}
                    />
                ))}
            </div>
        </div>
    );
};

export default Comments;