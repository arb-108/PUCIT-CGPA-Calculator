const form = document.getElementById("m_form");
const calEl = document.getElementById("cal_b");
const resetEl = document.getElementById("reset_b");
const divEl = document.getElementById("show_div");
const r_cgpaEl = document.getElementById("cgpa_r");
const boxEl = document.getElementById("all_box");
const cgpaEl = document.getElementById("detail");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const submitter = e.submitter;
  if (submitter.id == "cal_b") {
    calcualate();
    calEl.disabled=true;
  } else {
    console.log("hello");
    cgpaEl.classList.remove("details");
    cgpaEl.classList.add("hide");
    divEl.classList.remove("results");
    divEl.classList.add("hide");
    boxEl.classList.remove("hide");
    boxEl.classList.add("input_box_m");
    form.querySelectorAll("input, select, textarea").forEach((input) => {
      if (input.type === "checkbox" || input.type === "radio") {
        input.checked = false;
      } else {
        input.value = "";
      }
    });
    cgpaEl.innerHTML="";
    calEl.disabled=false;

  }
  
});
function calcualate() {
  const formEl = new FormData(form);
  const data = {};
  formEl.forEach((value, key) => {
    data[key] = +value;
    console.log(`${key} ${value}`);
  });
  console.log(data);
  const len = Object.keys(data).length / 2;
  console.log(len);
  let weightage = 0;
  let cre_sum = 0;
  for (let i = 0; i < len; i++) {
    weightage += data[`gpa_${i + 1}`] * data[`credits_${i + 1}`];
    cre_sum += data[`credits_${i + 1}`];
    if (data[`gpa_${i + 1}`] * data[`credits_${i + 1}`] != 0) {
      
      var newp = document.createElement("p");
      newp.innerText = `${getOrdinal(i + 1)} Semester GPA is : ${data[
        `gpa_${i + 1}`
      ].toFixed(2)}`;
      cgpaEl.appendChild(newp);
      cgpaEl.classList.remove("hide");
      cgpaEl.classList.add("details");
      boxEl.classList.add("hide");
      boxEl.classList.remove("input_box_m");
    }
  }
  console.log(weightage);
  console.log(cre_sum);
  divEl.classList.remove("hide");
  divEl.classList.add("results");
  const res = weightage / cre_sum;
  r_cgpaEl.innerText = res.toFixed(2);
}
// resetEl.addEventListener('click',()=>{
//     form.querySelectorAll('input, select, textarea').forEach(input => {
//         if (input.type === 'checkbox' || input.type === 'radio') {
//             input.checked = false;
//         } else {
//             input.value = '';
//         }
//     });
// })
function getOrdinal(n) {
    
  let suffix = "th";
  if (n % 10 === 1 && n % 100 !== 11) {
    suffix = "st";
  } else if (n % 10 === 2 && n % 100 !== 12) {
    suffix = "nd";
  } else if (n % 10 === 3 && n % 100 !== 13) {
    suffix = "rd";
  }
  return n + suffix;
}
