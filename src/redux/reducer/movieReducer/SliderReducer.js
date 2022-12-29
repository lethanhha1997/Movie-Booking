import { CLOSE_VIDEO, OPEN_VIDEO } from "../../type/movie-type/SliderType";

const initialState = {
    open: false,
    linkYouTube: ''
};

export const slideReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_VIDEO:
            return { open: action.payload.open, linkYouTube: action.payload.linkYouTube };
        case CLOSE_VIDEO:
            return { open: action.payload.open, linkYouTube: "" };

        default:
            return state;
    }
};