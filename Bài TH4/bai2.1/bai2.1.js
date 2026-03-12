const form = document.querySelector("#registerForm");

function showError(fieldId, message) {
    document.querySelector("#" + fieldId + "-error").textContent = message;
}

function clearError(fieldId) {
    document.querySelector("#" + fieldId + "-error").textContent = "";
}

function validateFullname() {

    const name = document.querySelector("#fullname").value.trim();
    const regex = /^[A-Za-zÀ-ỹ\s]+$/;

    if (name === "") {
        showError("fullname", "Không được để trống");
        return false;
    }

    if (name.length < 3) {
        showError("fullname", "Ít nhất 3 ký tự");
        return false;
    }

    if (!regex.test(name)) {
        showError("fullname", "Chỉ chứa chữ cái");
        return false;
    }

    clearError("fullname");
    return true;
}

function validateEmail() {

    const email = document.querySelector("#email").value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
        showError("email", "Không được để trống");
        return false;
    }

    if (!regex.test(email)) {
        showError("email", "Email không hợp lệ");
        return false;
    }

    clearError("email");
    return true;
}

function validatePhone() {

    const phone = document.querySelector("#phone").value.trim();
    const regex = /^0\d{9}$/;

    if (phone === "") {
        showError("phone", "Không được để trống");
        return false;
    }

    if (!regex.test(phone)) {
        showError("phone", "Số điện thoại không hợp lệ");
        return false;
    }

    clearError("phone");
    return true;
}

function validatePassword() {

    const pass = document.querySelector("#password").value;
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (pass === "") {
        showError("password", "Không được để trống");
        return false;
    }

    if (!regex.test(pass)) {
        showError("password", "Mật khẩu ≥8 ký tự, có chữ hoa, chữ thường, số");
        return false;
    }

    clearError("password");
    return true;
}

function validateConfirm() {

    const pass = document.querySelector("#password").value;
    const confirm = document.querySelector("#confirmPassword").value;

    if (confirm !== pass) {
        showError("confirm", "Mật khẩu không khớp");
        return false;
    }

    clearError("confirm");
    return true;
}

function validateGender() {

    const gender = document.querySelector('input[name="gender"]:checked');

    if (!gender) {
        showError("gender", "Vui lòng chọn giới tính");
        return false;
    }

    clearError("gender");
    return true;
}

function validateTerms() {

    const terms = document.querySelector("#terms");

    if (!terms.checked) {
        showError("terms", "Bạn phải đồng ý điều khoản");
        return false;
    }

    clearError("terms");
    return true;
}

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const isValid =
        validateFullname() &
        validateEmail() &
        validatePhone() &
        validatePassword() &
        validateConfirm() &
        validateGender() &
        validateTerms();

    if (isValid) {

        const name = document.querySelector("#fullname").value;

        form.style.display = "none";

        document.querySelector("#success-message").innerHTML =
            `<p class="success">Đăng ký thành công <br>Chào ${name}</p>`;
    }

});