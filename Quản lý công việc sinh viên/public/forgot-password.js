const form = document.getElementById("forgotPasswordForm");
const message = document.getElementById("message");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("Email").value.trim();

    if (!email) {
        message.textContent = "Vui lòng nhập email.";
        return;
    }

    message.textContent =
        "Giao diện đã nhận email. Chức năng gửi email đặt lại mật khẩu chưa được kết nối máy chủ.";
});
