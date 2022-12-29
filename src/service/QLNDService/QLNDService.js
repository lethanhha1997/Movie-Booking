import { http } from '../../util/config';

export default class QLNDService {
    dangNhapAdmin = (values) => {
        return http.post('/api/QuanLyNguoiDung/DangNhap', values);
    };
    layDSLoaiND = () => {
        return http.get('/api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung');
    };
    layDSND = (groupID) => {
        return http.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${groupID}`);
    };
    timKiemND = (taiKhoan) => {
        return http.get(`/api/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP01&tuKhoa=${taiKhoan}`);
    };
    layInfoND = (taiKhoan) => {
        return http.post(`/api/QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${taiKhoan}`);
    };
    themND = (nguoiDungMoi) => {
        return http.post('/api/QuanLyNguoiDung/ThemNguoiDung', nguoiDungMoi);
    };
    xoaND = (taiKhoan) => {
        return http.delete(`/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`);
    };
    adminCapNhatThongTinND = (nguoiDungCapNhat) => {
        return http.post('/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung', nguoiDungCapNhat);
    };


    dangNhap = (thongTinDangNhap) => {
        return http.post(`/api/QuanLyNguoiDung/DangNhap`, thongTinDangNhap);
    };
    dangKy = (thongTinDangKy) => {
        return http.post(`api/QuanLyNguoiDung/DangKy`, thongTinDangKy);
    };
    layTTNguoiDung = (taiKhoan) => {
        return http.post(`/api/QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${taiKhoan}`) ; 
    }
    capNhatUser = (thongTinCapNhat) => {
        return http.put(`/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, thongTinCapNhat);
    };
    layTTTaiKhoan = () => {
        return http.post(`/api/QuanLyNguoiDung/ThongTinTaiKhoan`);
    };
    capNhatThongTinNguoiDung = (nguoiDungUpdate) => {
        return http.post('/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung' , nguoiDungUpdate) ;
    }
}
