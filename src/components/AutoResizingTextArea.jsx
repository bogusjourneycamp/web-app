import React, { useEffect } from "react";

const MIN_STORY_HEIGHT = 400;

const AutoResizingTextArea = ({ onChangeText, id, ...otherProps }) => {
    // Initial auto sizing
    useEffect(() => {
        const textInput = document.getElementById("txt-story-text");

        const height = textInput.scrollHeight + 6;
        const newHeight = height > MIN_STORY_HEIGHT ? height : MIN_STORY_HEIGHT;

        textInput.setAttribute("style", `height: ${newHeight}px;`);
    }, []);

    return (
        <textarea
            {...otherProps}
            id={id}
            rows={1}
            onChange={(e) => {
                onChangeText(e.target.value);

                const height = e.target.scrollHeight + 6;
                const newHeight = height > MIN_STORY_HEIGHT ? height : MIN_STORY_HEIGHT;

                // Resize height of text
                e.target.setAttribute("style", "height: auto;");
                e.target.setAttribute("style", `height: ${newHeight}px;`);
            }}
        />
    );
};

export default AutoResizingTextArea;
