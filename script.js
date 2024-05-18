let butts = document.querySelectorAll(".var")
let mainq = document.querySelector(".ques")
let stat = document.querySelector(".stat")
let start = document.querySelector(".start")
let base = document.querySelector(".base")
let mainInput = document.querySelector(".mainInput")
let split1 = document.querySelector(".split1")
let thisQ
let rightA = 0
let allA = 1
let cookieflag = false
let cookieflag2 = false
let textArray = []
let textHeight = []
let cookieText = ""
let cookieText2 = ""
// this function is for coockies

console.log(document.cookie)
let dcs = document.cookie.split(";")
function cookieF() {
    dcs = document.cookie.split(";")
    for (let i = 0; i < dcs.length; i++) {
        if (dcs[i].split("=")[0] == "lastS") {
            cookieflag = true
            document.cookie = `${dcs[i].split("=")[0]}=Ваш последний результат: ${Math.round(rightA / allA * 100)}%. Правильно: ${rightA} из ${allA}`
        }
    }
    if (cookieflag == false) {
        document.cookie = `lastS=Ваш последний результат: ${Math.round(rightA / allA * 100)}%. Правильно: ${rightA} из ${allA}; max-age=99999999;`
    }
}
function cookieF2() {
    dcs = document.cookie.split(";")
    cookieText = ""
    for (let i = 0; i < dcs.length; i++) {
        if (dcs[i].split("=")[0] == "lastMM") {
            cookieflag2 = true
            for (let i = 0; i < mainInput.value.split("\n").length; i++) {
                cookieText += mainInput.value.split("\n")[i]
                cookieText += "%"
            }
            cookieText = cookieText.slice(0, -1)
            document.cookie = `lastMM=${cookieText}_${split1.value}; max-age=99999999;`
        }
    }
    if (cookieflag2 == false) {
        for (let i = 0; i < mainInput.value.split("\n").length; i++) {
            cookieText += mainInput.value.split("\n")[i]
            cookieText += "%"
        }
        cookieText = cookieText.slice(0, -1)
        document.cookie = `lastMM=${cookieText}_${split1.value}; max-age=99999999;`
    }
}
function cookieF3() {
    dcs = document.cookie.split(";")
    cookieText2 = ""
    for (let i = 0; i < dcs.length; i++) {
        if (dcs[i].includes("lastMM") == true) {
            for (let k = 0; k < dcs[i].split("=")[1].split("_")[0].split("%").length; k++) {
                cookieText2 += `${dcs[i].split("=")[1].split("_")[0].split("%")[k]}\n`
                console.log(cookieText2)
            }
            split1.value = dcs[i].split("=")[1].split("_")[1]
            mainInput.value = cookieText2.slice(0, -1)
        }
    }

}
cookieF();
cookieF3();



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
        objects[i].style.display = toD
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


mainInput.addEventListener("keydown", function (e) {
    textHeight = mainInput.value
    textHeight = textHeight.split("\n")
    if (e.key == "Enter") {
        if (textHeight.length > 4) {
            mainInput.style.height = `${8.33333 * textHeight.length + 10}vh`
        }
    }
    else if (e.keyCode == 8) {
        if (textHeight.length > 4) {
            mainInput.style.height = `${8.33333 * (textHeight.length - 1) + 10}vh`
        }
    }
})


//this function is for start button
start.addEventListener("click", function () {
    if (start.innerHTML == "ГОТОВО") {
        textArray = mainInput.value
        console.log(textArray)
        textArray = textArray.split("\n")
        if (textArray.length > 3 && split1.value.length > 0) {
            cookieF2()
            for (let i = 0; i < textArray.length; i++) {
                textArray[i] = textArray[i].split(split1.value)
            }
            displayObj([mainInput, start, split1], "none")
            displayObj([base], "block")
            thisQ.displayques();
            setTimeout(function () { console.log(document.cookie) }, 100);
            return textArray;
        }
        if (textArray.length < 4) {
            mainInput.placeholder = "Введите более 4 пар!"
        }
        if (split1.value.length == 0) {
            split1.placeholder = "Введите разделитель термина и перевода!"
        }
    }
    else {
        thisQ = new QUESTION()
        rightA = 0
        allA = 1
        displayObj([base], "block")
        thisQ.displayques();
        displayObj([stat, start], "none")
    }
})



//this function display statistics
function displayStat() {
    stat.innerHTML = `Ваш результат: ${Math.round(rightA / allA * 100)}% \n Правильно: ${rightA} из ${allA}`
    start.innerHTML = "НАЧАТЬ ЗАНОВО"
    displayObj([stat, start], "block")
    base.style.display = "none"
    console.log(stat, start)
}


displayObj([base, stat], "none")
thisQ = new QUESTION()
for (let i = 0; i < butts.length; i++) {
    butts[i].addEventListener("click", function () {
        if (allA < textArray.length) {
            if (butts[i].innerHTML == textArray[thisQ.randI][1]) {
                rightA++
            }
            thisQ.displayques()
        }
        else {
            if (butts[i].innerHTML == textArray[thisQ.randI][1]) {
                rightA++
            }
            displayStat()
            cookieF()
        }
        console.log(rightA, allA)
        allA++
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