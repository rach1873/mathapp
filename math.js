const clearBtn = document.getElementById('clear');
const equations = document.querySelectorAll('.numbers');
const span = document.querySelectorAll('span');
const submit = document.getElementById('submit');
const finalAnswers = document.querySelectorAll('input[type="number"]');
const final = document.getElementById('final-score');
const icon = document.querySelectorAll('.icon');
const typeOfOperator = localStorage.getItem('type')||'none';
const differentLevels = document.querySelectorAll('.levels')
const timerInfo = document.getElementById('timer-info');
const innerTimer = document.querySelector('.inner-timer');
const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');
const timerInputValues = document.querySelectorAll('input[name="clock"]');
const stopTimer = setInterval(countdown,1000)
const endClock = document.getElementById('end-clock');
const resume = document.getElementById('resume');
 

let timerValue;
let startValue = 1;


const numbersArray=[];
const userAnswers = [];
let finalScore = 0;




//!clear all answers

clearBtn.addEventListener('click', function(){
    inputValues.forEach(item=>{
        item.value = '';
    })

    icon.forEach(i=>{
        i.remove();
    })

    final.remove();
})

const operatorFunction = {
    '+' : function(x, y) {
        return x + y;
    },
    '-' : function(x, y) {
        return x - y;
    },
    '*' : function(x, y) {
        return x * y;
    },

    '/': function(x,y) {
        return x/y;
    }
};  
//!levels of difficulty
const easy = {
    num1: function () {
        return Math.floor(Math.random() * 10)
    },
    operators: ['+', '-', '*', '/'],

    num2: function () {
        return Math.floor(Math.random() * 10)
    },

    equal: "="
}

const moderate = {
    num1: function () {
        return Math.floor(Math.random() * 90 + 10)
    },
    operators: ['+', '-', '*', '/'],

    num2: function () {
        return Math.floor(Math.random() * 10)
    },

    equal: "="
}
const hard = {
    num1: function () {
        return Math.floor(Math.random() * 90 + 10)
    },
    operators: ['+', '-', '*', '/'],

    num2: function () {
        return Math.floor(Math.random() * 90 + 10)
    },

    equal: "="
}

//!Getting level choices

mode.addEventListener('click', ()=>{
    document.querySelector('.levels').classList.toggle('visible');
})

//!getting choices
differentLevels.forEach(x=>{
    x.addEventListener('click',(e)=>{

        let sign = (typeOfOperator === 'addition') ? 0 : 
                    (typeOfOperator === 'subtraction') ? 1: 
                    (typeOfOperator === 'multiplication') ? 2:
                     (typeOfOperator === 'division') ? 3 : '';

        if(e.target.textContent === 'Easy') {
            getValues(easy,sign);
        } else if (e.target.textContent ==='Moderate') {
            getValues(moderate,sign);
        } else if (e.target.textContent === 'Hard') {
            getValues(hard,sign);
        }

        console.log(sign)
     })

     
    
})

//!Writes values to page

function getValues(obj,type) {
    numbers.forEach(num=>{
        num.children[0].textContent = obj.num1();
        num.children[1].textContent = obj.operators[type];
        num.children[2].textContent = obj.num2();
        num.children[3].textContent = obj.equal;
    })
}



//!comparison between numbersArray and userAnswer
function compare(arr1, arr2) {
    for(let i = 0; i<arr1.length; i++) {
        if(arr1[i]===arr2[i]) {
            finalScore++;
            icon[i].innerHTML = '<i class="bi bi-check-circle-fill"></i>'
        } else {
            icon[i].innerHTML = '<i class="bi bi-x-circle-fill"></i>'
        }
    }

}

//! submit button

submit.addEventListener('click', ()=>{

    //!loops through equations to compute final answer to push to "numbersArray" 
    equations.forEach((num)=>{
    
        let num1 = num.children[0].textContent;
        let num2 = num.children[2].textContent;
        let operator = num.children[1].textContent;
        
    
      
    
         numbersArray.push(operatorFunction[operator](num1,num2))
         
    })

    //!loops through equations to compute final answer to push to "userAnswers" array
    finalAnswers.forEach(x=>{
        userAnswers.push(parseInt(x.value));
    })

    compare(numbersArray,userAnswers);

    // final.textContent = finalScore + "/" + numbersArray.length;
    final.textContent = `${finalScore} / ${numbersArray.length}`;
    
    
})
//!Hamburger icon
hamburger.addEventListener('click', ()=>{
    menu.classList.toggle('make-visible');
    menu.style.transition = 'all 2.5s';


})

//!Inner timer choices
timerInfo.addEventListener('click',()=>{
    innerTimer.classList.toggle('seeable');
    innerTimer.style.transition = 'all 2.5s';
})


//!get timer Value to use for clock countdown

timerInputValues.forEach(x=>{
   x.addEventListener('input',()=>{
        
        timerValue = parseInt(x.value);
        console.log(timerValue)
        
        
   })
})


// //!Timer

function countdown() {

    
    let formated = moment.utc(startValue*1000).format("mm:ss")
    
    if(startValue <= timerValue) {

        
        clockDisplay.textContent = formated
    } else {
        return;
    }    

    startValue++;

   
}

//!stop clock

endClock.addEventListener('click',()=>{
    clearInterval(stopTimer);
})

//!resume clock
resume.addEventListener('click', ()=>{
    setInterval(countdown,1000);
})
