import styled from "styled-components";
import Button from "./Button";
import ColorPalette from "../utils/colors";

const StoryButton = styled(Button)`
    border: 3px solid ${ColorPalette.CoffeeBean};
    border-radius: 100px;
    background-color: rgba(255, 255, 255, 0.5);
    font-size: 18px;
    font-weight: 100;
    height: auto;
    line-height: 30px;
    margin: 10px 0;
    padding: 10px 20px;
    text-align: left;
    transition: background-color 200ms;

    min-width: 100px;

    :hover {
        background-color: rgba(255, 255, 255, 1);
    }

    :focus {
        outline: none;
    }
`;

export default StoryButton;
