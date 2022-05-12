import React, { useState } from "react";
import "./commentForm.css";
import Button from '@material-ui/core/Button';

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
                <Button className="comment-form-button" variant="contained" color="primary" component="span" disabled={isTextareaDisabled} onClick={onSubmit}>
                    {submitLabel}
                </Button>
                <input
                    type="file"
                    accept="*"
                    style={{ display: 'none' }}
                    id="contained-button-file"
                />
                <label htmlFor="contained-button-file">
                    <Button className="comment-form-button" variant="contained" color="primary" component="span">
                        Đính kèm
                    </Button>
                </label>
                {hasCancelButton && (
                    <Button 
                        type="button" 
                        className="comment-form-button comment-form-cancel-button" 
                        onClick={handleCancel}
                    >
                      Hủy
                    </Button>
                )}
            </div>
        </form>
    );
};

export default CommentForm;