
const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("Email").value.trim();
    const matKhau = document.getElementById("MatKhau").value;

    if (!email || !matKhau) {
        showMessage("Vui lòng nhập email và mật khẩu.", "error");
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        showMessage("Email không hợp lệ.", "error");
        return;
    }

    showMessage(
        "Chưa kết nối máy chủ xác thực tài khoản.",
        "error"
    );
});

function showMessage(text, type) {
    message.textContent = text;
    message.className = "message " + type;
    message.hidden = false;
}
