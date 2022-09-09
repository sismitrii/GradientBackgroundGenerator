//console.log(Math.floor(Math.random() * 0xFFFFFF).toString(16)); va nous permettre de sortir des valeurs aléatoire en Hexa

function randomHexaValue(){
    return Math.floor(Math.random() * 0xFFFFFF).toString(16);
    
}
const allColorBloc = document.querySelectorAll(".color-bloc");
const randomButton = document.querySelector(".random");
const colorContainer = document.querySelector(".color-container");
const plusButton = document.querySelector(".plus");
const minusButton = document.querySelector(".minus");
const rangeButton = document.querySelector(".inpRange");
const errorMsg = document.querySelector('span');
const body = document.querySelector('body');


let colorTab =[];
let index = 3;
let inclinaison = 300;

//----------------------------- Init'--------------------------------------------

getRandomColor();
body.style.background = `linear-gradient(${inclinaison}deg, ${colorTab})`;
allColorBloc.forEach(input => {
    input.addEventListener('input', function(e){
        input.style.backgroundColor = e.target.value ;
        colorTab[input.dataset.index - 1] = e.target.value;
        body.style.background = `linear-gradient(${inclinaison}deg, ${colorTab})`;
    }); 
});

//----------------------------- Button Random-----------------------------------

randomButton.addEventListener('click', function(){
    getRandomColor();
    body.style.background = `linear-gradient(${inclinaison}deg, ${colorTab})`;
});

//----------------------------- Button Plus-----------------------------------

plusButton.addEventListener('click', function(){
    if (index < 9){
        let newColorInput = document.createElement('input');
        newColorInput.type = "text";
        newColorInput.classList.add("color-bloc");
        newColorInput.dataset.index = index;
        index ++; // A check
        newColorInput.maxLength = "7";
        colorTab.push(("#" + Math.floor(Math.random() * 0xFFFFFF).toString(16)).toUpperCase());
        newColorInput.value = colorTab[colorTab.length - 1] ;
        newColorInput.style.backgroundColor = newColorInput.value ;

        newColorInput.addEventListener('input', function(e){
            newColorInput.style.backgroundColor = e.target.value ;
            colorTab[newColorInput.dataset.index - 1] = e.target.value;
            body.style.background = `linear-gradient(${inclinaison}deg, ${colorTab})`;
        });

        colorContainer.appendChild(newColorInput);
        errorMsg.innerHTML ="";
        body.style.background = `linear-gradient(${inclinaison}deg, ${colorTab})`;
    }
});

//----------------------------- Button Minus-----------------------------------
minusButton.addEventListener('click', function(){
    const inputs = document.querySelectorAll(".color-bloc");
    if (index > 3){
        inputs[inputs.length - 1].remove();
        colorTab.pop();
        body.style.background = `linear-gradient(${inclinaison}deg, ${colorTab})`;
        index --;
    } else {
        errorMsg.innerHTML ="Deux couleurs minimum sont nécessaires";
        setTimeout(function(){
            errorMsg.innerHTML = "";
        }, 3000);
    }
});


//-------------------- Range Button---------------------------

rangeButton.addEventListener('input', function(e){
    inclinaison = e.target.value;
    body.style.background = `linear-gradient(${inclinaison}deg, ${colorTab})`;
});



function getRandomColor(){
    colorTab =[];
    const inputs = document.querySelectorAll(".color-bloc");
    for (let i=1 ; i < (inputs.length + 1) ; i++) {
        colorTab.push(("#" + Math.floor(Math.random() * 0xFFFFFF).toString(16)));
    }

    for (let i=0; i < (inputs.length); i++){
        inputs[i].value = colorTab[i].toUpperCase();
        inputs[i].style.backgroundColor = colorTab[i];
   }
}

