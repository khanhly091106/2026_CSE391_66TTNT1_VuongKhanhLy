const nameInput = document.getElementById("name");
const scoreInput = document.getElementById("score");
const addBtn = document.getElementById("add-btn");

const searchInput = document.getElementById("search");
const filterSelect = document.getElementById("filter");
const scoreHeader = document.getElementById("score-header");

const tbody = document.querySelector("tbody");

let students = [
    {name: "Nguyễn Văn A", score: 8.5},
    {name: "Trần Thị B", score: 4.0}
];

let sortAsc = true;


/* xác định xếp loại */
function getRank(score){

    if(score >= 8.5) return "Giỏi";
    if(score >= 7) return "Khá";
    if(score >= 5) return "Trung bình";
    return "Yếu";

}


/* vẽ bảng */
function renderTable(data){

    tbody.innerHTML = "";

    if(data.length === 0){

        tbody.innerHTML =
        `<tr>
            <td colspan="5">Không có kết quả</td>
        </tr>`;

        return;
    }

    data.forEach((st,index)=>{

        const rank = getRank(st.score);

        const tr = document.createElement("tr");

        if(st.score < 5){
            tr.style.background = "yellow";
        }

        let labelClass = "";

        if(rank === "Giỏi" || rank === "Khá")
            labelClass = "label-good";

        if(rank === "Yếu")
            labelClass = "label-bad";

        tr.innerHTML = `
            <td>${index+1}</td>
            <td>${st.name}</td>
            <td>${st.score}</td>
            <td class="${labelClass}">${rank}</td>
            <td><button class="btn-del">Xóa</button></td>
        `;

        const delBtn = tr.querySelector(".btn-del");

        delBtn.addEventListener("click",()=>{

            students = students.filter(s => s !== st);
            applyFilters();

        });

        tbody.appendChild(tr);

    });

}


/* áp dụng tìm kiếm + lọc + sắp xếp */
function applyFilters(){

    const keyword = searchInput.value.toLowerCase();
    const filter = filterSelect.value;

    let filtered = students.filter(st=>{

        const matchName =
            st.name.toLowerCase().includes(keyword);

        const rank = getRank(st.score);

        const matchRank =
            filter === "all" || rank === filter;

        return matchName && matchRank;

    });

    filtered.sort((a,b)=>{

        if(sortAsc)
            return a.score - b.score;
        else
            return b.score - a.score;

    });

    renderTable(filtered);

}


/* thêm sinh viên */
addBtn.addEventListener("click",()=>{

    const name = nameInput.value.trim();
    const score = parseFloat(scoreInput.value);

    if(name === ""){
        alert("Họ tên không được để trống");
        return;
    }

    if(isNaN(score) || score < 0 || score > 10){
        alert("Điểm phải từ 0 đến 10");
        return;
    }

    students.push({
        name:name,
        score:score
    });

    nameInput.value = "";
    scoreInput.value = "";

    nameInput.focus();

    applyFilters();

});


/* tìm kiếm realtime */
searchInput.addEventListener("input",applyFilters);


/* lọc xếp loại */
filterSelect.addEventListener("change",applyFilters);


/* sắp xếp */
scoreHeader.addEventListener("click",()=>{

    sortAsc = !sortAsc;

    scoreHeader.textContent =
        sortAsc ? "Điểm ▲" : "Điểm ▼";

    applyFilters();

});


applyFilters();