import "./comment.css";
import CommentForm from "./CommentForm";

const Comment = ({
    comment, 
    // replies, 
    // currentUserId, 
    // deleteComment, 
    // addComment,
    // updateComment,
    // activeComment, 
    // setActiveComment,
    // parentId = null,
}) => {
    const fiveMinutes = 300000;
    const timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes;
    const canReply = false
            // Boolean(currentUserId);
    const canEdit = false
            // currentUserId === comment.userId && !timePassed;
    const canDelete = false
        // currentUserId === comment.userId && replies.length === 0 && !timePassed;
    // const createdAt = new Date(comment.createdAt).toLocaleDateString();
    const isReplying = false
        // activeComment && 
        // activeComment.type === 'replying' && 
        // activeComment.id === comment.id;
    const isEditing = false
        // activeComment && 
        // activeComment.type === 'editing' && 
        // activeComment.id === comment.id;
    // const replyId = parentId ? parentId : comment.id;
    return (
        <div key={comment.id} className="comment">
            <div className="comment-image-container">
                <img className="comment-image" src="https://www.w3schools.com/howto/img_avatar2.png" alt=""/>
            </div>
            <div className="comment-right-part">
                <div className="comment-content">
                    <div className="comment-author">{comment.nguoi_tao.ho_ten}</div>
                    <div className="comment-date">{comment.create_at.split('T')[0]}</div>
                </div>
                {!isEditing && <div className="comment-text">{comment.noi_dung}</div>}
                {/* {isEditing && (
                    <CommentForm 
                        submitLabel="Cập nhật" 
                        hasCancelButton 
                        initialText={comment.body} 
                        handleSubmit={(text) => updateComment(text, comment.id)} 
                        handleCancel={() => setActiveComment(null)}
                    />
                )}
                <div className="comment-actions">
                    {canReply && (
                        <div 
                            className="comment-action" 
                            onClick={() => 
                                setActiveComment({id: comment.id, type: "replying"})
                            }
                        >
                          Trả lời
                        </div>)}
                    {canEdit && (
                        <div 
                            className="comment-action"
                            onClick={() => 
                                setActiveComment({id: comment.id, type: "editing"})
                            }
                        >
                          Chỉnh sửa
                        </div>)}
                    {canDelete && (
                        <div 
                            className="comment-action" 
                            onClick={() => deleteComment(comment.id)}
                        >
                          Xóa
                        </div>)}
                </div>
                {isReplying && (
                    <CommentForm 
                        submitLabel="Trả lời" 
                        handleSubmit={(text) => addComment(text, replyId)}
                    />
                )} */}
                {/* {replies.length > 0 && (
                    <div className="replies">
                        {replies.map(reply => (
                            <Comment 
                                comment={reply} 
                                key={reply.id} 
                                replies={[]}
                                currentUserId={currentUserId}
                                deleteComment={deleteComment}
                                addComment={addComment}
                                updateComment={updateComment}
                                activeComment={activeComment}
                                setActiveComment={setActiveComment}
                                parentId={comment.id}
                            />
                        ))}
                    </div>
                )} */}
            </div>
        </div>
    );
};

export default Comment;