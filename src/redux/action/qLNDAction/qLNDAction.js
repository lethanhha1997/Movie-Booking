import { history } from "../../../App";
import { qLNDService } from "../../../service";
import { CAP_NHAT_USER, DANG_KY, DANG_NHAP, LAY_TT_TAI_KHOAN } from "../../type/nguoiDung-type/NDType";
import { toast } from "react-toastify";
import { ADMIN_GET_USERDETAIL, ADMIN_LOGIN } from "../../type/admin-type/admin.type";
import { ACCESS_TOKEN, ADMIN_ACC, GET_LIST_USER_ADMIN } from "../../../util/setting";
import { disPlayLoadingAction, hidenLoadingAction } from "../loadingAction/loading";

const notifyAdmin = () =>
    toast.error("Yêu cầu tài khoản Admin !", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

export const adminDangNhapAction = (values, resetForm) => {
    return (dispatch) => {
        let promise = qLNDService.dangNhapAdmin(values);
        promise
            .then((res) => {
                dispatch(disPlayLoadingAction);

                let loaiND = res.data.content.maLoaiNguoiDung;
                if (loaiND === "KhachHang") {
                    notifyAdmin();
                    resetForm();
                } else {
                    // console.log('push to admin !') ;
                    let action = {
                        type: ADMIN_LOGIN,
                        data: res.data.content,
                    };
                    dispatch(action);

                    localStorage.setItem(ACCESS_TOKEN, res.data.content.accessToken);
                    let basicInfo = {};
                    basicInfo = {
                        ...basicInfo,
                        email: res.data.content.email,
                        hoTen: res.data.content.hoTen,
                        maLoaiNguoiDung: res.data.content.maLoaiNguoiDung,
                        soDT: res.data.content.soDT,
                        taiKhoan: res.data.content.taiKhoan,
                    };
                    localStorage.setItem(ADMIN_ACC, JSON.stringify(basicInfo));
                    history.push("/admin");
                    dispatch(hidenLoadingAction);
                }
            })
            .catch((err) => console.log(err));
    };
};

const notifyDN = (err) => toast(err, {
    position: toast.POSITION.TOP_RIGHT
});
const notifyDK = (err) => toast(err, {
    position: toast.POSITION.TOP_RIGHT
});
const notifyCNhat = () => toast('Thành Công'
);

export const dangNhapAction = (thongTinDangNhap) => {
    return (dispatch) => {

        let promise = qLNDService.dangNhap(thongTinDangNhap);
        promise.then((res) => {
            let action = {
                type: DANG_NHAP,
                thongTinDangNhap: res.data.content
            };
            dispatch(action);

            history.push("/home");
        });
        promise.catch((err) => {
            dispatch(hidenLoadingAction);
            notifyDN(err.response.data.content);
        });
    };
};
export const dangKyAction = (thongTinDangKy) => {
    return (dispatch) => {
        let promise = qLNDService.dangKy(thongTinDangKy);
        promise.then((res) => {
            let action = {
                type: DANG_KY,
                thongTinDangKy: res.data.content
            };
            dispatch(action);
            history.push('/login');
        });
        promise.catch((err) => {
            notifyDK(err.response.data.content);
        });
    };
};

export const capNhatAction = (thongTinCapNhat) => {
    return (dispatch) => {
        let promise = qLNDService.capNhatUser(thongTinCapNhat);
        promise.then((res) => {
            let action = {
                type: CAP_NHAT_USER,
                thongTinCapNhat: res.data.content
            };
            dispatch(action);
            notifyCNhat();
        });
        promise.catch((err) => {
            console.log(err);
        });
    };
};

export const layThongTinNguoiDungAction = () => {
    return (dispatch) => {
        dispatch(disPlayLoadingAction);
        let promise = qLNDService.layTTTaiKhoan();
        promise.then((res) => {
            let action = {
                type: LAY_TT_TAI_KHOAN,
                thongTinNguoiDung: res.data.content
            };
            dispatch(action);
            dispatch(hidenLoadingAction);
        });
        promise.catch((err) => {
            console.log(err);
        });
    };
};

export const layDSNDAdmin = (groupID) => {
    return dispatcher => {
        let promise = qLNDService.layDSND(groupID);
        promise.then(res => {
            console.log(res);
            let action = {
                type: GET_LIST_USER_ADMIN,
                payload: res.data.content
            };
            dispatcher(action);
        }).catch(err => console.log(err));
    };
};

export const themNDActionAdmin = (nguoiDung, handleCancel) => {
    return dispatcher => {
        let promise = qLNDService.themND(nguoiDung);
        promise.then(res => {
            // console.log(res) ; 
            history.push('/admin/user-admin');
            handleCancel();
            // console.log('Thêm người dùng thành công !') ; 
            alert('Thêm người dùng thành công !');
        }).catch(err => {
            alert(err.response.data.content);
        });
    };
};

export const xoaNDAction = (taiKhoan, groupID) => {
    return dispatcher => {
        let promise = qLNDService.xoaND(taiKhoan);
        promise.then(res => {
            let action = layDSNDAdmin(groupID);
            dispatcher(action);
            // history.push('/admin/user-admin') ; 
            // alert('Xóa người dùng thành công !') ;
        }).catch(err => {
            console.log(err);
            alert(err.response.data.content);
        });
    };
};


export const layTTNguoiDungAdmin = (taiKhoan, setLoading) => {
    return dispatcher => {
        console.log('taikhoan', taiKhoan);
        let promise = qLNDService.layTTNguoiDung(taiKhoan);
        promise.then(res => {
            console.log(res);
            setLoading(true);
            const action = {
                type: ADMIN_GET_USERDETAIL,
                payload: res.data.content
            };
            dispatcher(action);
        }).catch(err => {
            if (err?.code === 'ECONNABORTED') history.push('/admin/error-econnaborted');
            else alert('Lỗi chưa xác định ! Vui lòng thử lại sau');

        });
    };
};

export const capNhatUserAdmin = (nguoiDungUpdate, taiKhoan, notify) => {
    return dispatcher => {
        let promise = qLNDService.capNhatThongTinNguoiDung(nguoiDungUpdate);
        promise.then(res => {
            // console.log(res) ;
            history.push(`/admin/update-user/${taiKhoan}`);
            notify();
            // alert('Cập nhật thành công !') ; 
        }).catch(err => {
            if (err?.code === 'ECONNABORTED') history.push('/admin/error-econnaborted');
            else alert('Lỗi chưa xác định ! Vui lòng thử lại sau');
        });
    };
};