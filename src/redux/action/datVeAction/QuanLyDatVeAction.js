import { datVeService } from "../../../service";
import { CHANGE_TAB, LAY_CHI_TIET_PHONG_VE } from "../../type/datVe-type/DatVeType";
import 'react-toastify/dist/ReactToastify.css';
import { disPlayLoadingAction, hidenLoadingAction } from "../loadingAction/loading";


export const quanLyDatVeAction = (maLichChieu) => {
    return (dispatch) => {
        dispatch(disPlayLoadingAction);
        let promise = datVeService.layChiTietPhongVe(maLichChieu);
        promise.then((res) => {
            let action = {
                type: LAY_CHI_TIET_PHONG_VE,
                chiTietPhongVe: res.data.content
            };
            dispatch(action);
            dispatch(hidenLoadingAction);
        });
        promise.catch((err) => {
            console.log(err)
        });
    };
};
export const datVeAction = (thongTinDatVe) => {
    return (dispatch) => {
        dispatch(disPlayLoadingAction);
        let promise = datVeService.datVe(thongTinDatVe);
        promise.then((res) => {
            let action = {
                type: CHANGE_TAB,
                number: '2',
            };
            dispatch(action);
            dispatch(hidenLoadingAction);
        });
        promise.catch((err) => {
            console.log(err);
        });
    };
}

