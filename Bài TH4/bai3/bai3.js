// lấy form
const form = document.querySelector("#registerForm");

// hiển thị lỗi
function showError(id, message) {
  document.querySelector("#" + id + "-error").textContent = message;
}

// xóa lỗi
function clearError(id) {
  document.querySelector("#" + id + "-error").textContent = "";
}

// validate họ tên
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

// validate email
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

// validate phone
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

// validate password
function validatePassword() {
  const pass = document.querySelector("#password").value;
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  if (pass === "") {
    showError("password", "Không được để trống");
    return false;
  }

  if (!regex.test(pass)) {
    showError("password", "≥8 ký tự, có hoa, thường, số");
    return false;
  }

  clearError("password");
  return true;
}

// validate confirm
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

// validate gender
function validateGender() {
  const gender = document.querySelector('input[name="gender"]:checked');

  if (!gender) {
    showError("gender", "Chọn giới tính");
    return false;
  }

  clearError("gender");
  return true;
}

// validate terms
function validateTerms() {
  const terms = document.querySelector("#terms");

  if (!terms.checked) {
    showError("terms", "Phải đồng ý điều khoản");
    return false;
  }

  clearError("terms");
  return true;
}

// submit form
form.addEventListener("submit", function(e) {

  e.preventDefault();

  const valid =
    validateFullname() &
    validateEmail() &
    validatePhone() &
    validatePassword() &
    validateConfirm() &
    validateGender() &
    validateTerms();

  if (valid) {
    const name = document.querySelector("#fullname").value;

    form.style.display = "none";

    document.querySelector("#success-message").innerHTML =
      `<p class="success">Đăng ký thành công 🎉<br>Chào ${name}</p>`;
  }

});

// toggle password
const toggle = document.querySelector("#togglePassword");
const password = document.querySelector("#password");

toggle.addEventListener("click", function() {

  if (password.type === "password") {
    password.type = "text";
  } else {
    password.type = "password";
  }

});

// password strength
const strength = document.querySelector("#strength");
const strengthText = document.querySelector("#strength-text");

password.addEventListener("input", function() {

  const val = password.value;
  let score = 0;

  if (val.length >= 8) score++;
  if (/[A-Z]/.test(val)) score++;
  if (/[0-9]/.test(val)) score++;
  if (/[^A-Za-z0-9]/.test(val)) score++;

  if (score <= 1) {
    strength.style.width = "33%";
    strength.style.background = "red";
    strengthText.textContent = "Yếu";
  }
  else if (score <= 3) {
    strength.style.width = "66%";
    strength.style.background = "orange";
    strengthText.textContent = "Trung bình";
  }
  else {
    strength.style.width = "100%";
    strength.style.background = "green";
    strengthText.textContent = "Mạnh";
  }

});

// đếm ký tự họ tên
const fullname = document.querySelector("#fullname");
const counter = document.querySelector("#name-counter");

fullname.addEventListener("input", function() {
  counter.textContent = this.value.length + "/50";
});