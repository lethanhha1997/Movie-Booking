// import {  GP_ID } from "../../util/setting";
import { http } from '../../util/config';

export default class DatVeService {
    layChiTietPhongVe = (maLichChieu) => {
        return http.get(`/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`)
    };
    datVe = (thongTinDatVe) =>{
        return http.post(`/api/QuanLyDatVe/DatVe`,thongTinDatVe)
    }
}
