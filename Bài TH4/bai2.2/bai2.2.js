const prices = {
    Ao: 150000,
    Quan: 200000,
    Giay: 500000
}

const product = document.querySelector("#product")
const quantity = document.querySelector("#quantity")
const total = document.querySelector("#total")

function showError(id, msg) {
    document.querySelector("#" + id + "-error").textContent = msg
}

function clearError(id) {
    document.querySelector("#" + id + "-error").textContent = ""
}

function validateProduct() {
    if (product.value === "") {
        showError("product", "Chọn sản phẩm")
        return false
    }
    clearError("product")
    return true
}

function validateQuantity() {
    const q = Number(quantity.value)

    if (!Number.isInteger(q) || q < 1 || q > 99) {
        showError("quantity", "1-99")
        return false
    }

    clearError("quantity")
    return true
}

function validateDate() {
    const dateInput = document.querySelector("#date").value

    if (dateInput === "") {
        showError("date", "Chọn ngày")
        return false
    }

    const today = new Date()
    const selected = new Date(dateInput)

    const max = new Date()
    max.setDate(today.getDate() + 30)

    if (selected < today || selected > max) {
        showError("date", "0-30 ngày")
        return false
    }

    clearError("date")
    return true
}

function validateAddress() {
    const ad = document.querySelector("#address").value.trim()

    if (ad.length < 10) {
        showError("address", "Ít nhất 10 ký tự")
        return false
    }

    clearError("address")
    return true
}

function validateNote() {
    const note = document.querySelector("#note").value

    if (note.length > 200) {
        showError("note", "Tối đa 200 ký tự")
        return false
    }

    clearError("note")
    return true
}

function validatePayment() {
    const p = document.querySelector('input[name="payment"]:checked')

    if (!p) {
        showError("payment", "Chọn phương thức")
        return false
    }

    clearError("payment")
    return true
}

function updateTotal() {
    if (product.value && quantity.value) {
        const price = prices[product.value]
        const sum = price * quantity.value
        total.textContent = sum.toLocaleString("vi-VN")
    }
}

product.addEventListener("change", updateTotal)
quantity.addEventListener("input", updateTotal)

const note = document.querySelector("#note")
const counter = document.querySelector("#counter")

note.addEventListener("input", function () {
    counter.textContent = this.value.length + "/200"

    if (this.value.length > 200) {
        counter.style.color = "red"
    } else {
        counter.style.color = "black"
    }
})

document.querySelector("#orderForm").addEventListener("submit", function (e) {

    e.preventDefault()

    const ok =
        validateProduct() &
        validateQuantity() &
        validateDate() &
        validateAddress() &
        validateNote() &
        validatePayment()

    if (ok) {

        const summary = document.querySelector("#summary")

        summary.innerHTML =
            `
Sản phẩm: ${product.value}<br>
Số lượng: ${quantity.value}<br>
Tổng tiền: ${total.textContent} VNĐ<br>
Ngày giao: ${document.querySelector("#date").value}
`

        document.querySelector("#confirmBox").style.display = "block"

    }

})

document.querySelector("#confirmBtn").onclick = function () {

    document.querySelector("#confirmBox").style.display = "none"

    document.querySelector("#orderForm").style.display = "none"

    document.querySelector("#success").textContent = "Đặt hàng thành công 🎉"

}

document.querySelector("#cancelBtn").onclick = function () {

    document.querySelector("#confirmBox").style.display = "none"

}