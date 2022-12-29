
import { rapService } from "../../../service";
import { LAY_CHI_TIET_PHIM, LAY_DS_CUM_RAP } from "../../type/movie-type/RapTypes";
import { disPlayLoadingAction, hidenLoadingAction } from "../loadingAction/loading";

export const layDsRapAction = (maNhom) => {
    return (dispatch) => {
        dispatch(disPlayLoadingAction);
        let promise = rapService?.layThongTinLichChieuHeThongRap(maNhom);
        promise.then((res) => {
            let action = {
                type: LAY_DS_CUM_RAP,
                mangCumRap: res.data.content
            };
            dispatch(action);
            dispatch(hidenLoadingAction);
        });
        promise.catch((err) => {
            console.log(err);
        });
    };
};
export const layChiTietPhim = (maPhim) => {
    return (dispatch) => {
        dispatch(disPlayLoadingAction);
        let promise = rapService?.layThongTinLichChieuPhim(maPhim);
        promise.then((res) => {
            let action = {
                type: LAY_CHI_TIET_PHIM,
                phimDetail: res.data.content
            };
            dispatch(action);
            dispatch(hidenLoadingAction);
        });
        promise.catch((err) => {
            console.log(err);
        });
    };
};