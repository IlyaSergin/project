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
let textArray = []
let time = 999999999
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
    console.log(objects)
    for (let i = 0; i < objects.length; i++) {
        objects[i].style.display = "none"
    }
}
cookieF()
function rand(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}
start.addEventListener("click", function () {
    //console.log(split1.value + split2.value)
    textArray = mainInput.value
    //let split_2 = split2.value
    //textArray = textArray.split(`${split_2}`)
    textArray = textArray.split("\n")
    console.log(textArray)
    for (let i = 0; i < textArray.length; i++) {
        textArray[i] = textArray[i].split(split1.value)
    }
    console.log(textArray)
    displayObj([mainInput, start, split1], "none")
    displayObj([base], "block")
    time = 1
    return textArray;
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
        this.randI = 0
        this.txtA = textArray
        this.randV = []
    }
    displayques() {
        this.randI = Math.floor(Math.random() * this.txtA.length)
        mainq.innerHTML = this.txtA[this.randI][0]
        this.randV = [this.txtA[this.randI][1], this.txtA[Math.floor(Math.random() * this.txtA.length)][1], this.txtA[Math.floor(Math.random() * this.txtA.length)][1], this.txtA[Math.floor(Math.random() * this.txtA.length)][1]]
        shuffle(this.randV)
        for (let i = 0; i < butts.length; i++) {
            butts[i].innerHTML = this.randV[i]
        }
    }
}

displayObj([base, stat, mainq, split2], "none")
setTimeout(function () { thisQ.displayques() }, time) 
thisQ = new QUESTION()
for (let i = 0; i < butts.length; i++) {
    butts[i].addEventListener("click", function () {
        if (butts[i].innerHTML == thisQ.textArray[thisQ.randI][1]){
            rightA ++
        }
        allA++
        thisQ.displayques()
    }
    )
}

/*

a - b
c - d
e - f
g - h
i - j
k - l
m - n
o - p



*/