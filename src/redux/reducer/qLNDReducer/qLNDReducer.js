import { history } from "../../../App";
import { CAP_NHAT_USER, DANG_KY, DANG_NHAP, DANG_XUAT, LAY_TT_TAI_KHOAN } from "../../type/nguoiDung-type/NDType";
import { ACCESS_TOKEN, ADMIN_ACC, GET_LIST_USER_ADMIN, USER_LOGIN } from "../../../util/setting"
import { ADMIN_GET_USERDETAIL, ADMIN_LOGIN } from "../../type/admin-type/admin.type";

let user = {};
if (localStorage.getItem(USER_LOGIN)) {
    user = JSON.parse(localStorage.getItem(USER_LOGIN));
}
let admin = {} ;
if (localStorage.getItem(ADMIN_ACC)) {
    admin = JSON.parse(localStorage.getItem(ADMIN_ACC))
}
const initialState = {
    userLogin: user,
    userRegister: {},
    thongTinNguoiDung: {
    },
    adminLogin : admin  ,
    dsndAdmin : [],
    userDetailAdmin : {} 
};

export const quanLyNguoiDungReducer = (state = initialState, action) => {
    switch (action.type) {
        case DANG_NHAP:
            localStorage.setItem(USER_LOGIN, JSON.stringify(action.thongTinDangNhap));
            localStorage.setItem(ACCESS_TOKEN, action.thongTinDangNhap.accessToken);
            state.userLogin = action.thongTinDangNhap;
            return { ...state };
        case DANG_XUAT:
            localStorage.clear();
            history.push('/');
            return { ...state };
        case CAP_NHAT_USER:
            state.userLogin = action.thongTinCapNhat
            localStorage.removeItem(USER_LOGIN)
            localStorage.setItem(USER_LOGIN, JSON.stringify(action.thongTinCapNhat));
            return {...state}
        case DANG_KY:
            state.userRegister = action.thongTinDangKy;
            return { ...state };
        case LAY_TT_TAI_KHOAN:
            state.thongTinNguoiDung = action.thongTinNguoiDung
            return { ...state }
        case ADMIN_LOGIN : 
        console.log("Admin login !") ; 
        console.log(action.data) ; 
            state.adminLogin = {...action.data}
            console.log(state.adminLogin) ; 

            // return {...state} ;
            // state.thongTinNguoiDung = action.thongTinNguoiDung;
            console.log('thongtin', state.thongTinNguoiDung);
            return { ...state };
        case GET_LIST_USER_ADMIN : 
            state.dsndAdmin = [...action.payload]
            return {...state}
        case ADMIN_GET_USERDETAIL : 
            state.userDetailAdmin = {...action.payload} ; 
            return {...state} ;     
            default:
            return state;
    }
};
