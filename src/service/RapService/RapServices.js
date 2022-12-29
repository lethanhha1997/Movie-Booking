// import axios from 'axios'
// import { TOKEN, URL_API } from '../util/setting';
import { http } from "../../util/config";

export default class RapServices {
    layThongTinHeThongRap = () => {
        return http.get('/api/QuanLyRap/LayThongTinHeThongRap') ; 
    }
    layThongTinCumRapTheoHeThong = (maHeThongRap) => {
        return http.get(`/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`)
    }
    layThongTinLichChieuHeThongRap = ( maNhom) => {
        return http.get(`/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${maNhom}`) ; 
    }
    // layThongTinLichChieuHeThongRap = (maHeThongRap , maNhom) => {
    //     return http.get(`/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${maHeThongRap}&maNhom=${maNhom}`) ; 
    // }
    layThongTinLichChieuPhim = (maPhim) => {
        return http.get(`/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`) ; 
    }

}

export const rapService = new RapServices();