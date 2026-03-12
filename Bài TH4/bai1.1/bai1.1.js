const nameInput = document.getElementById("name");
const scoreInput = document.getElementById("score");
const addBtn = document.getElementById("add-btn");
const tbody = document.querySelector("tbody");

addBtn.addEventListener("click", function () {

    const name = nameInput.value.trim();
    const score = parseFloat(scoreInput.value);

    // kiểm tra dữ liệu
    if (name === "") {
        alert("Họ tên không được để trống");
        nameInput.focus();
        return;
    }

    if (isNaN(score) || score < 0 || score > 10) {
        alert("Điểm phải từ 0 đến 10");
        scoreInput.focus();
        return;
    }

    // xác định xếp loại
    let rank = "";
    let rankClass = "";

    if (score >= 8.5) {
        rank = "Giỏi";
        rankClass = "label-good";
    } 
    else if (score >= 7) {
        rank = "Khá";
        rankClass = "label-good";
    } 
    else if (score >= 5) {
        rank = "Trung bình";
    } 
    else {
        rank = "Yếu";
        rankClass = "label-bad";
    }

    // tạo STT
    const stt = tbody.rows.length + 1;

    const tr = document.createElement("tr");

    tr.innerHTML = `
        <td>${stt}</td>
        <td>${name}</td>
        <td>${score}</td>
        <td class="${rankClass}">${rank}</td>
        <td><button class="btn-del">Xóa</button></td>
    `;
    if (score < 5) {
        tr.style.backgroundColor = "yellow";
    }

    tbody.appendChild(tr);

    // nút xóa
    const delBtn = tr.querySelector(".btn-del");
    delBtn.addEventListener("click", function () {
        tr.remove();
        updateSTT();
    });

    // reset input
    nameInput.value = "";
    scoreInput.value = "";
    nameInput.focus();
});


// cập nhật lại STT
function updateSTT() {
    const rows = tbody.querySelectorAll("tr");
    rows.forEach((row, index) => {
        row.cells[0].textContent = index + 1;
    });
}