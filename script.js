let butts = document.querySelectorAll(".var")
let mainq = document.querySelector(".ques")
let stat = document.querySelector(".stat")
let start = document.querySelector(".start")
let base = document.querySelector(".base")
let mainInput = document.querySelector(".mainInput")
let split1 = document.querySelector(".split1")
let split2 = document.querySelector(".split2")
let thisQ
let rightA = 0
let allA = 0
let allCookie = document.cookie.split("; ")
let cookieflag = false
function cookieF() {
    allCookie = document.cookie.split("; ")
    for (let i = 0; i < allCookie.length; i++) {
        if (allCookie[i].split("=")[0] == "lastS") {
            cookieflag = true
            allCookie[i].split("=")[1] = `Ваш последний результат: ${Math.round(rightA / allA * 100)}%. Правильно: ${rightA} из ${allA}`
        }
    }
    if (cookieflag == false) {
        document.cookie = `lastS=Ваш последний результат: ${Math.round(rightA / allA * 100)}%. Правильно: ${rightA} из ${allA}`
    }
    console.log(document.cookie)
}
function displayObj(objects, toD) {
    for (let i = 0; i < objects.length; i++) {
        objects[i].style.display = toD
    }
}
cookieF()
function rand(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}
start.addEventListener("click", function () {
    base.style.display = "flex"
    start.style.display = "none"
    stat.style.display = "none"
})
function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}
function displayStat() {
    stat.style.display = "block"
    stat.innerHTML = `Ваш результат: ${Math.round(rightA / allA * 100)}% \n Правильно: ${rightA} из ${allA}`
    start.style.display = "block"
    start.innerHTML = "НАЧАТЬ"
}
class QUESTION {
    constructor() {
        this.vars = shuffle(this.vars)
    }
    displayques() {
        mainq.innerHTML = this.ques;
        for (let i = 0; i < 4; i++) {
            butts[i].innerHTML = this.vars[i]
        }
    }
}

displayObj([base, start, stat, mainq], "none")

thisQ = new QUESTION()
thisQ.displayques()
for (let i = 0; i < butts.length; i++) {
    butts[i].addEventListener("click", function () {

    }
    )
}