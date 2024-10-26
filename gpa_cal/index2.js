let index_row = -1;
const first_cardEl = document.getElementById("first_card");
const last_cardEl = document.getElementById("last_card");
const add_btn = document.getElementById("add_entery");
const courseEL = document.getElementById("course");
const marksEl = document.getElementById("marks");
const creditEL = document.getElementById("credits");
const calEL = document.getElementById("cal_btn_m");
const resetEL = document.getElementById("reset_btn");
const msgEl = document.getElementById("msg");
const marks_msgEl = document.getElementById("marks_msg");
const credit_msgEl = document.getElementById("credit_msg");
calEL.addEventListener("click", () => {
  var tableEl = document.getElementById("m_table");
  if (tableEl.rows.length > 0) {
    msgEl.classList.remove("message");
    msgEl.classList.add("hide");
    let gradeSum = 0;
    let creditSum = 0;
    let final_gpa = 0;
    for (let i = 0; i <= tableEl.rows.length - 1; i++) {
      gradeSum += parseFloat(
        getGP(tableEl.rows[i].cells[2].innerText) *
          parseFloat(tableEl.rows[i].cells[3].innerText)
      );
      creditSum += parseFloat(tableEl.rows[i].cells[3].innerText);
    }
    console.log(gradeSum);
    console.log(creditSum);
    final_gpa = parseFloat(gradeSum / creditSum).toFixed(2);
    console.log(final_gpa);
    const result_card = document.getElementById("r_gpa");

    first_cardEl.classList.add("hide");
    last_cardEl.classList.add("r_card");
    last_cardEl.classList.remove("hide");
    result_card.innerText = final_gpa;
  } else {
    msgEl.classList.remove("hide");
    msgEl.classList.add("message");
    courseEL.value = "";
    marksEl.value = "";
    creditEL.value = "";
    courseEL.focus();

    var tableEl = document.getElementById("m_table");
    tableEl.innerHTML = "";
    first_cardEl.classList.remove("hide");
    last_cardEl.classList.remove("r_card");
    last_cardEl.classList.add("hide");

    marks_msgEl.classList.add("hide");
    credit_msgEl.classList.add("hide");
  }
});
resetEL.addEventListener("click", () => {
  courseEL.value = "";
  marksEl.value = "";
  creditEL.value = "";
  courseEL.focus();

  var tableEl = document.getElementById("m_table");
  tableEl.innerHTML = "";
  first_cardEl.classList.remove("hide");
  last_cardEl.classList.remove("r_card");
  last_cardEl.classList.add("hide");

  marks_msgEl.classList.add("hide");
  credit_msgEl.classList.add("hide");
});
function add_entery_process() {
  msgEl.classList.remove("message");
  const form = document.getElementById("form_main");
  msgEl.classList.add("hide");
  const formdata = new FormData(form);
  const data = {};
  formdata.forEach((value, key) => {
    if (key == "course_Name") data[key] = value;
    else data[key] = +value;
    // console.log(`${key} ${value}`);
  });
  console.log(data);
  var tableEl = document.getElementById("m_table");
  if (index_row === -1) {
    var row = tableEl.insertRow(index_row);
    row.insertCell(0).innerText = tableEl.rows.length;
  } else {
    tableEl.deleteRow(index_row);
    var row = tableEl.insertRow(index_row);
    row.insertCell(0).innerText = index_row + 1;
    index_row = -1;
  }

  row.insertCell(1).innerText = data["course_Name"];
  row.insertCell(2).innerText = data["Marks"];
  row.insertCell(3).innerText = data["credit_hours"];
  row.insertCell(4).innerText = getGrade(getGP(data["Marks"]));
  var actionCell = row.insertCell(5);

  // Create Remove button
  var removeBtn = document.createElement("i");
  removeBtn.className = "fa-solid fa-trash";
  removeBtn.id = "remove_btn";
  removeBtn.addEventListener("click", () => {
    tableEl.deleteRow(row.rowIndex - 1);
    for (let i = 0; i < tableEl.rows.length; i++) {
      tableEl.rows[i].cells[0].innerText = i + 1;
    } // Adjust for the row index
  });
  actionCell.appendChild(removeBtn);

  // Create Edit button
  var editBtn = document.createElement("i");
  editBtn.className = "fa-solid fa-pen-to-square";
  editBtn.id = "edit_btn";
  editBtn.addEventListener("click", () => {
    first_cardEl.classList.remove("hide");
    last_cardEl.classList.remove("r_card");
    last_cardEl.classList.add("hide");
    courseEL.value = row.cells[1].innerText;
    marksEl.value = row.cells[2].innerText;
    creditEL.value = row.cells[3].innerText;
    index_row = row.rowIndex - 1;
  });
  actionCell.appendChild(editBtn);
}
add_btn.addEventListener("click", (e) => {
  e.preventDefault();
  let check = formValid();
  console.log(check);
  if (check) {
    add_entery_process();
    courseEL.value = "";
    marksEl.value = "";
    creditEL.value = "";
    courseEL.focus();
  }
});
const checkEl = document.getElementById("check");
const tableHead = document.getElementById("check_1");
checkEl.addEventListener("change", () => {
  console.log("ttt");
  if (checkEl.checked) {
    // If the checkbox is checked, hide the header
    tableHead.classList.remove("table_main_visible");
    tableHead.classList.add("table_main_margin");
  } else {
    // If the checkbox is unchecked, show the header
    tableHead.classList.remove("table_main_margin");
    tableHead.classList.add("table_main_visible");
  }
});
function formValid() {
  marks_msgEl.classList.add("hide");
  credit_msgEl.classList.add("hide");
  console.log(marksEl.value);
  if (marksEl.value == "") {
    marksEl.focus();
    console.log("aya hai");
    marks_msgEl.classList.remove("hide");
    return false;
  } else if (marksEl.value > 100 || marksEl.value < 0) {
    marksEl.value = "";
    marksEl.focus();
    marks_msgEl.classList.remove("hide");
    return false;
  }
  console.log(creditEL.value);
  if (creditEL.value == "") {
    creditEL.focus();
    credit_msgEl.classList.remove("hide");
    return false;
  } else if (creditEL.value > 4 || creditEL.value < 0.5) {
    creditEL.value = "";
    creditEL.focus();
    credit_msgEl.classList.remove("hide");
    return false;
  }
  console.log("tyyy");
  return true;
}
function getGP(marks) {
  if (marks >= 85 && marks <= 100) {
    return 4.0;
  } else if (marks >= 80 && marks < 85) {
    return 3.7;
  } else if (marks >= 75 && marks < 80) {
    return 3.3;
  } else if (marks >= 70 && marks < 75) {
    return 3.0;
  } else if (marks >= 65 && marks < 70) {
    return 2.7;
  } else if (marks >= 61 && marks < 65) {
    return 2.3;
  } else if (marks >= 58 && marks < 61) {
    return 2.0;
  } else if (marks >= 55 && marks < 58) {
    return 1.7;
  } else if (marks >= 50 && marks < 55) {
    return 1.0;
  } else if (marks < 50) {
    return 0.0;
  }
}
function getGrade(points) {
  if (points == 4.0) {
    return "A";
  } else if (points == 3.7) {
    return "A-";
  } else if (points == 3.3) {
    return "B+";
  } else if (points == 3.0) {
    return "B";
  } else if (points == 2.7) {
    return "B-";
  } else if (points == 2.3) {
    return "C+";
  } else if (points == 2.0) {
    return "C";
  } else if (points == 1.7) {
    return "C-";
  } else if (points == 1.0) {
    return "D";
  } else if (points == 0.0) {
    return "F";
  }
}
