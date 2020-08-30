import React, { useEffect } from "react";
import styled from "styled-components";

const TextArea = styled.textarea`
    line-height: normal;
`;

const DEFAULT_MIN_HEIGHT = 400;

const AutoResizingTextArea = ({
    minHeight = DEFAULT_MIN_HEIGHT,
    onChangeText,
    id,
    ...otherProps
}) => {
    const resizeTextArea = (textInput) => {
        textInput.setAttribute("style", "height: auto;");

        const height = textInput.scrollHeight + 3;

        if (minHeight > 0) {
            const newHeight = height > DEFAULT_MIN_HEIGHT ? height : DEFAULT_MIN_HEIGHT;

            textInput.setAttribute("style", `height: ${newHeight}px;`);
        } else {
            textInput.setAttribute("style", `height: ${height}px;`);
        }
    };
    // Initial auto sizing
    useEffect(() => {
        const textInput = document.getElementById(id);

        resizeTextArea(textInput);
    }, []);

    return (
        <TextArea
            {...otherProps}
            id={id}
            rows={1}
            onChange={(e) => {
                onChangeText(e.target.value);

                resizeTextArea(e.target);
            }}
        />
    );
};

export default AutoResizingTextArea;
