import { useRef, useState } from "react";
import JoditEditor from 'jodit-react';

const TextEditor = ({value, onChange}) => {
    const editor = useRef(null);

    const config = {
        width: '100%',
        height: '380px',
        buttons: ['bold', 'italic', 'underline', 'link'], 
        toolbarSticky: false,
    };

    return (
        <div style={{ width: '100%', color: 'black' }}>
            <JoditEditor
                ref={editor}
                value={value}
                config={config}
                onBlur={onChange}
            />
        </div>
    );
}

export default TextEditor;