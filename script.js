const checkButtons = document.querySelectorAll('input[type="checkbox"]');
let index;
let operatorType = localStorage.getItem('type')||'none';

const inputValues = document.querySelectorAll('input[type="number"]')
const numbers = document.querySelectorAll('.numbers');
const addition = 0;
const subtraction = 1;
const multiplication = 2;
const division = 3;
const mode = document.getElementById('mode');
const timer = document.querySelectorAll('.timer');
const h3 = document.querySelectorAll('h3');
const clockIcon = document.getElementById('clock');
const clockOptions = document.getElementById('clock-options');

const clockDisplay = document.getElementById('clock-display');
const timerDisplay = document.querySelector('.timer-display');
const refresh = document.getElementById('refresh');
const stop = document.getElementById('stop');
// let t = setInterval(countdown,1000) 





const math = {
    num1: function () {
        return Math.floor(Math.random() * 10)
    },
    operators: {
        addition: "+",
        subtraction: "-",
        multiplication: "*",
        division: "/"
        
    },

    num2: function () {
        return Math.floor(Math.random() * 10)
    },

    equal: "="
}




//!if other checkboxes are not checked, then 'checked gets set to false and classes are removed
function checkOthers(i) {
    for (let i = 0; i < checkButtons.length; i++) {
        if (i != index) {
            checkButtons[i].checked = false;
           
        } else {
            checkButtons[i].checked = true;
            
        }
    }
}


checkButtons.forEach((btn, i) => {
    btn.addEventListener('click', (e) => {  
        index = i;

        checkOthers(i);

    })

}

)

//!save item to localStorage
checkButtons.forEach(btn=>{
    btn.addEventListener('input',(e)=>{

        let typeValue = e.target.value;

        localStorage.setItem('type',e.target.value)
        
       
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







getValues(math,operatorType);

