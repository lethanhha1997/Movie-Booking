import { CHANGE_TAB, CHANGE_TAB_ACTIVE, DAT_VE, DAT_VE_THANH_CONG, LAY_CHI_TIET_PHONG_VE } from "../../type/datVe-type/DatVeType";

const initialState = {
    chiTietPhongVe: {

    },
    danhSachGheDangDat: [

    ],
    tabActive: '1',
};

export const quanLyDatVeReducer = (state = initialState, action) => {
    switch (action.type) {
        case LAY_CHI_TIET_PHONG_VE:
            state.chiTietPhongVe = action.chiTietPhongVe;
            return { ...state };
        case DAT_VE:
            let danhSachGheCapNhat = [...state.danhSachGheDangDat];
            let index = danhSachGheCapNhat.findIndex(gheDangDat => gheDangDat.maGhe === action.gheDangChon.maGhe);
            if (index !== -1) {
                danhSachGheCapNhat.splice(index, 1);
            }
            else {
                danhSachGheCapNhat.push(action.gheDangChon);
            }
            return { ...state, danhSachGheDangDat: danhSachGheCapNhat };
        case DAT_VE_THANH_CONG:
            state.tabActive = '1';
            state.danhSachGheDangDat = [];
            return { ...state };
        case CHANGE_TAB:
            state.tabActive = action.number;
            return { ...state };

        case CHANGE_TAB_ACTIVE:
            state.tabActive = action.number;
            return { ...state };

        default:
            return { ...state };
    }
};
