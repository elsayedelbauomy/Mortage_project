
const moneyEle = document.getElementById("money");
const moneyEleIcone = document.querySelector(".mortInp i");
const term = document.getElementById("terms");
const interest = document.getElementById("interstRate");
const interRadio = document.getElementById("inter");
const repaymentRadio = document.getElementById("repay");
const btn = document.getElementById("btn");
const empty = document.getElementById("emp");
const result = document.getElementById("res");

function clearAll() {
    moneyEle.value = "";
    term.value = "";
    interest.value = "";
    repaymentRadio.checked = false;
    interRadio.checked = false;
    empty.style.display = "flex";
    result.style.display = "none";
    interRadio.parentElement.style.borderColor = "hsl(200, 26%, 54%)";
    interRadio.parentElement.style.background = "#fff";
    repaymentRadio.parentElement.style.borderColor = "hsl(200, 26%, 54%)";
    repaymentRadio.parentElement.style.background = "#fff";
}
// ///////////// erorr elements ///////

const amountError = document.querySelector(".amount-error")
const yearsError = document.querySelector(".years-error")
const interError = document.querySelector(".inter-error")
const radioError = document.querySelector(".radio-error ")

// /////////// error elements //////

let valid ;


function CheckAndCalculate() {
    if(moneyEle.value == "") {
        amountError.classList.remove("none");
        moneyEleIcone.classList.add("red")
        moneyEle.parentElement.style.borderColor = "hsl(4, 69%, 50%)";
    }else {
        amountError.classList.add("none");
        moneyEleIcone.classList.remove("red");
        moneyEle.parentElement.style.borderColor = "hsl(200, 26%, 54%)";
    }

    if(term.value == "") {
        yearsError.classList.remove("none");
        term.parentElement.style.borderColor = "hsl(4, 69%, 50%)";
        term.nextElementSibling.classList.add("red");
    }else {
        yearsError.classList.add("none");
        term.nextElementSibling.classList.remove("red");
        term.parentElement.style.borderColor = "hsl(200, 26%, 54%)";
    }

    if(interest.value == "") {
        interError.classList.remove("none");
        interest.parentElement.style.borderColor = "hsl(4, 69%, 50%)";
        interest.nextElementSibling.classList.add("red");
    }else {
            interError.classList.add("none");
        interest.nextElementSibling.classList.remove("red");
        interest.parentElement.style.borderColor = "hsl(200, 26%, 54%)";
    }

    if(interRadio.checked || repaymentRadio.checked) {
        radioError.classList.add("none")
        
    }else {
        radioError.classList.remove("none");
    }
    if(moneyEle.value != "" && term.value != "" && interest.value != "" && (repaymentRadio.checked || interRadio.checked) ) {
        valid = true;
    }else {
        valid = false;
    }
    resultFun(valid)
}

function resultFun(v) {
    let  resultMonth = document.getElementById("resultMonth");
    let  resultTotal = document.getElementById("resultTotal");
    let p = moneyEle.value;
    let r = (interest.value / 100) / 12;
    let n = term.value * 12;
    let rOfN = (r + 1) ** n;
    let partOne = (r *rOfN) / (rOfN -1);
    let totalMonthRate = p * partOne; 
    let theWholeLoan = totalMonthRate * n;
    if(v && repaymentRadio.checked) {
        empty.style.display = "none";
        result.style.display = "block";
        resultMonth.textContent= "";
        resultTotal.textContent= "";
        resultMonth.innerHTML += Number(totalMonthRate.toFixed(2)).toLocaleString();
        resultTotal.innerHTML += theWholeLoan.toLocaleString("en-US");
        return;
    }
    let monthInter = p * r;
    let yearInter = monthInter * n;

    if(v && interRadio.checked) { 
        empty.style.display = "none";
        result.style.display = "block";
        resultMonth.textContent= "";
        resultTotal.textContent= "";
        resultMonth.innerHTML += Number(monthInter.toFixed(2)).toLocaleString();
        resultTotal.innerHTML += yearInter.toLocaleString("en-US");
        return;
    }
}

interRadio.onclick = function () {
    if(interRadio.checked) {
        interRadio.parentElement.style.borderColor = "hsl(61, 70%, 52%)";
        interRadio.parentElement.style.background = "#d7da2f14";
        repaymentRadio.parentElement.style.borderColor = "hsl(200, 26%, 54%)";
        repaymentRadio.parentElement.style.background = "#fff";
    }
}

repaymentRadio.onclick = function () {
    if(repaymentRadio.checked) {
        repaymentRadio.parentElement.style.borderColor = "hsl(61, 70%, 52%)";
        repaymentRadio.parentElement.style.background = "#d7da2f14";
        interRadio.parentElement.style.borderColor = "hsl(200, 26%, 54%)";
        interRadio.parentElement.style.background = "#fff";
    }
}

