
function dangXuat() {
    // Xoa du lieu ho so demo
    localStorage.removeItem("qlcvsv_profile_demo");

    // Xoa session phia trinh duyet neu co
    sessionStorage.clear();

    // Quay ve trang dang nhap
    window.location.replace("login.html");
}

dangXuat();
