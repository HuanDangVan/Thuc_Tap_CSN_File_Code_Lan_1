
const profileForm = document.getElementById("profileForm");
const message = document.getElementById("profileMessage");

const hoTenInput = document.getElementById("HoTen");
const emailInput = document.getElementById("Email");
const ngaySinhInput = document.getElementById("NgaySinh");
const gioiTinhInput = document.getElementById("GioiTinh");
const soDienThoaiInput = document.getElementById("SoDienThoai");

const displayName = document.getElementById("displayName");
const displayEmail = document.getElementById("displayEmail");
const avatar = document.getElementById("profileAvatar");

const STORAGE_KEY = "qlcvsv_profile_demo";

const defaultProfile = {
    HoTen: "",
    Email: "",
    NgaySinh: "",
    GioiTinh: "",
    SoDienThoai: ""
};

let originalProfile = { ...defaultProfile };

function getToday() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

ngaySinhInput.max = getToday();

function showMessage(text, type) {
    message.textContent = text;
    message.className = "alert " + type;
    message.hidden = false;
}

function clearMessage() {
    message.textContent = "";
    message.className = "alert";
    message.hidden = true;
}

function getFormData() {
    return {
        HoTen: hoTenInput.value.trim(),
        Email: emailInput.value.trim(),
        NgaySinh: ngaySinhInput.value,
        GioiTinh: gioiTinhInput.value,
        SoDienThoai: soDienThoaiInput.value.trim()
    };
}

function fillForm(data) {
    hoTenInput.value = data.HoTen || "";
    emailInput.value = data.Email || "";
    ngaySinhInput.value = data.NgaySinh || "";
    gioiTinhInput.value = data.GioiTinh || "";
    soDienThoaiInput.value = data.SoDienThoai || "";

    updateSummary();
}

function updateSummary() {
    const hoTen = hoTenInput.value.trim();

    displayName.textContent = hoTen || "Sinh viên";
    displayEmail.textContent =
        emailInput.value.trim() || "Chưa có email";

    avatar.textContent = hoTen
        ? Array.from(hoTen)[0].toLocaleUpperCase("vi-VN")
        : "S";
}

function isValidDate(value) {
    if (!value) return true;

    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        return false;
    }

    const [year, month, day] = value.split("-").map(Number);
    const date = new Date(year, month - 1, day);

    return date.getFullYear() === year
        && date.getMonth() === month - 1
        && date.getDate() === day
        && value <= getToday();
}

function validateProfile(data) {
    if (!data.HoTen || Array.from(data.HoTen).length > 100) {
        return "Họ tên không được để trống và tối đa 100 ký tự.";
    }

    if (!isValidDate(data.NgaySinh)) {
        return "Ngày sinh không hợp lệ.";
    }

    if (!["", "Nam", "Nữ", "Khác"].includes(data.GioiTinh)) {
        return "Giới tính không hợp lệ.";
    }

    const phonePattern = /^[0-9+\s().-]{8,20}$/;

    if (
        data.SoDienThoai !== "" &&
        !phonePattern.test(data.SoDienThoai)
    ) {
        return "Số điện thoại không hợp lệ.";
    }

    return "";
}

hoTenInput.addEventListener("input", updateSummary);

profileForm.addEventListener("submit", function (event) {
    event.preventDefault();
    clearMessage();

    const data = getFormData();
    const error = validateProfile(data);

    if (error) {
        showMessage(error, "error");
        return;
    }

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        originalProfile = { ...data };
        updateSummary();

        showMessage(
            "Đã lưu dữ liệu trên trình duyệt, chưa cập nhật SQL Server.",
            "success"
        );
    } catch (error) {
        showMessage("Không thể lưu dữ liệu.", "error");
    }
});

profileForm.addEventListener("reset", function () {
    setTimeout(function () {
        fillForm(originalProfile);
        clearMessage();
    }, 0);
});

function initProfile() {
    try {
        const savedData = localStorage.getItem(STORAGE_KEY);

        if (savedData) {
            originalProfile = {
                ...defaultProfile,
                ...JSON.parse(savedData)
            };
        }
    } catch (error) {
        originalProfile = { ...defaultProfile };
    }

    fillForm(originalProfile);
}

initProfile();
