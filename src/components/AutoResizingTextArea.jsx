import React, { useEffect } from "react";

const AutoResizingTextArea = ({ onChangeText, id, ...otherProps }) => {
    // Initial auto sizing
    useEffect(() => {
        const textInput = document.getElementById(id);

        textInput.setAttribute("style", `height: ${textInput.scrollHeight}px;`);
    }, []);

    return (
        <textarea
            {...otherProps}
            id={id}
            rows={1}
            onChange={(e) => {
                onChangeText(e.target.value);

                // Resize height of text
                e.target.setAttribute("style", "height: auto;");
                e.target.setAttribute(
                    "style",
                    `height: ${e.target.scrollHeight}px;`
                );
            }}
        />
    );
};

export default AutoResizingTextArea;
