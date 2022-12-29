import { http } from "../../util/config";

export default class AdminTLC {
    layTTHeTHongRapAdmin = () => {
        return http.get('/api/QuanLyRap/LayThongTinHeThongRap') ; 
    }
    layTTCumRapTheoHeThongAdmin = (maHeThongRap) => {
        return http.get(`/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`) ; 
    }
    taoLichChieu = (lichChieu) => {
        return http.post('/api/QuanLyDatVe/TaoLichChieu' , lichChieu) ; 
    }
}
