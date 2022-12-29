import {  GP_ID } from "../../util/setting";
import { http } from '../../util/config';

export default class PhimServices {
    layDanhSachPhim = (group_id) => {
        if(group_id) return http.get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=${group_id}`)
        else return http.get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=${GP_ID}`)
    };
    layDanhSachBanner = () => {
        return http.get('/api/QuanLyPhim/LayDanhSachBanner') ; 
    } ; 
    layDSPhimTheoNgay = (maNhom , ngayBatDau , ngayKetThuc) => {
        return http.get(`/api/QuanLyPhim/LayDanhSachPhimTheoNgay?maNhom=${maNhom}&soTrang=1&soPhanTuTrenTrang=10&tuNgay=${ngayBatDau}&denNgay=${ngayKetThuc}`)
    }
    layChiTietPhim = (maPhim) => {
        return http.get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`) ; 
    }
    xoaPhim = (maPhim) => {
        return http.delete(`/api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`) ; 
    }
    themPhimUploadhinh = (formData) => {
        return http.post('/api/QuanLyPhim/ThemPhimUploadHinh' , formData) ; 
    }
    getDetailAdmin = (maPhim) => {
        return http.get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`) ; 
    }
    capNhatPhimAdmin = (newFormData) => {
        return http.post(`/api/QuanLyPhim/CapNhatPhimUpload`,newFormData) ; 
    }

}

export const phimService = new PhimServices();