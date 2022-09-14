let b1 = document.getElementById("b1");
let b2 = document.getElementById("b2");
let b3 = document.getElementById("b3");
let b4 = document.getElementById("b4");

let c1 = document.querySelector("c1");
let c2 = document.querySelector("c2");
let c3 = document.querySelector("c3");
let c4 = document.querySelector("c4");

let bVals = [0,0,0,0]
let checkedBoxes = 0;

while(true){
    checkCBoxes()
}
function checkCBoxes(){
    if(c1.checked&&checkCBoxes!=0){
        checkCBoxes = 0
        c2.checked = false;
        c3.checked = false;
        c4.checked = false;
    }
}

b1.addEventListener("click", () => {
    bVals[0] ++;
    b1.innerText = bVals[0]
})
b2.addEventListener("click", () => {
    bVals[1] ++;
    b2.innerText = bVals[1]
})
b3.addEventListener("click", () => {
    bVals[2] ++;
    b3.innerText = bVals[2]
})
b4.addEventListener("click", () => {
    bVals[3] ++;
    b4.innerText = bVals[3]
})

