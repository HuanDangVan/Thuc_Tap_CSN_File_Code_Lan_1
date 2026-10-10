
const registerForm = document.getElementById("registerForm");
const message = document.getElementById("message");

registerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const hoTen = document.getElementById("HoTen").value.trim();
    const email = document.getElementById("Email").value.trim();
    const matKhau = document.getElementById("MatKhau").value;
    const xacNhan = document.getElementById("XacNhan").value;

    if (!hoTen || !email || !matKhau || !xacNhan) {
        showMessage("Vui lòng nhập đầy đủ thông tin.", "error");
        return;
    }

    if (hoTen.length > 100) {
        showMessage("Họ tên tối đa 100 ký tự.", "error");
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        showMessage("Email không hợp lệ.", "error");
        return;
    }

    if (matKhau.length < 8) {
        showMessage("Mật khẩu phải có ít nhất 8 ký tự.", "error");
        return;
    }

    if (matKhau !== xacNhan) {
        showMessage("Mật khẩu xác nhận không khớp.", "error");
        return;
    }

    showMessage(
        "Thông tin hợp lệ nhưng chưa kết nối máy chủ đăng ký.",
        "error"
    );
});

function showMessage(text, type) {
    message.textContent = text;
    message.className = "message " + type;
    message.hidden = false;
}
