import { useState } from "react";
import "./commentForm.css";
import { Send } from '@mui/icons-material';

const CommentForm = ({
    handleSubmit, 
    submitLabel, 
    hasCancelButton = false, 
    initialText = "", 
    handleCancel,
}) => {
    const [text, setText] = useState(initialText);
    const isTextareaDisabled = text.length === 0;
    const onSubmit = event => {
        event.preventDefault();
        handleSubmit(text);
        setText("");
    }
    return (
        <form>
            <textarea 
                className="comment-form-textarea"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <div className="comment-form-buttons">
                <button className="comment-form-button" disabled={isTextareaDisabled} onClick={onSubmit}>{submitLabel}</button>
                <button type="button" className="comment-form-button">Dinh kem</button>
                {hasCancelButton && (
                    <button 
                        type="button" 
                        className="comment-form-button comment-form-cancel-button" 
                        onClick={handleCancel}
                    >
                      Cancel
                    </button>
                )}
            </div>
        </form>
    );
};

export default CommentForm;