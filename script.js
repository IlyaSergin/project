let butts = document.querySelectorAll(".var")
let mainq = document.querySelector(".ques")
let stat = document.querySelector(".stat")
let start = document.querySelector(".start")
let base = document.querySelector(".base")
let mainInput = document.querySelector(".mainInput")
let split1 = document.querySelector(".split1")
let thisQ
let rightA = 0
let allA = 0
let allCookie = document.cookie.split("; ")
let cookieflag = false
let textArray = []


// this function is for coockies
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
}
cookieF()



//this is a class for question
class QUESTION {
    constructor() {
        this.randI = 0
        this.randV = []
        this.oldAnswers = []
        this.oldQuestions = []
        this.newAns = 0
    }
    displayques() {
        this.randI = 0
        this.randV = []
        this.oldAnswers = []
        this.newAns = 0
        let i = 0
        while (i != 1) {
            this.randI = Math.round(Math.random() * (textArray.length - 1))
            if (this.oldQuestions.includes(this.randI) == false) {
                mainq.innerHTML = textArray[this.randI][0]
                this.oldQuestions.push(this.randI)
                i = 1
            }
        }
        i = 0
        this.randV = [textArray[this.randI][1]]
        this.oldAnswers.push(textArray[this.randI][1])
        while (i != 3) {
            this.newAns = Math.round(Math.random() * (textArray.length - 1))
            if (this.oldAnswers.includes(textArray[this.newAns][1]) == false) {
                this.randV.push(textArray[this.newAns][1])
                this.oldAnswers.push(textArray[this.newAns][1])
                i++
            }
        }
        shuffle(this.randV)
        for (let i = 0; i < butts.length; i++) {
            butts[i].innerHTML = this.randV[i]
        }
    }
}


// this function changes display style for objects in brackets
function displayObj(objects, toD) {
    for (let i = 0; i < objects.length; i++) {
        objects[i].style.display = "none"
    }
}



// random functions
function rand(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

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



//this function is for inputs
start.addEventListener("click", function () {
    textArray = mainInput.value
    textArray = textArray.split("\n")
    console.log(textArray)
    for (let i = 0; i < textArray.length; i++) {
        textArray[i] = textArray[i].split(split1.value)
    }
    console.log(textArray)
    displayObj([mainInput, start, split1], "none")
    base.style.display = "flex"
    thisQ.displayques();
    return textArray;
})



//this function display statistics
function displayStat() {
    stat.innerHTML = `Ваш результат: ${Math.round(rightA / allA * 100)}% \n Правильно: ${rightA} из ${allA}`
    start.innerHTML = "НАЧАТЬ"
    displayObj([stat, start], "block")
}



displayObj([base, stat], "none")
thisQ = new QUESTION()
for (let i = 0; i < butts.length; i++) {
    butts[i].addEventListener("click", function () {
        if (butts[i].innerHTML == thisQ.textArray[thisQ.randI][1]) {
            rightA++
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