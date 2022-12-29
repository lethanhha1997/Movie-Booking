import { LAY_DS_CUM_RAP } from "../../type/movie-type/RapTypes";

const initialState = {
    mangCumRap: [
    ]

}

export const quanLyRapReducer = (state = initialState, action) => {
    switch (action.type) {
        case LAY_DS_CUM_RAP:
            state.mangCumRap = action.mangCumRap
            return { ...state }
        default:
            return state
    }
}
