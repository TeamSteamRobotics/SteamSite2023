let b1 = document.getElementById("b1");
let b2 = document.getElementById("b2");
let b3 = document.getElementById("b3");
let b4 = document.getElementById("b4");

let c1 = document.getElementById("c1");
let c2 = document.getElementById("c2");
let c3 = document.getElementById("c3");
let c4 = document.getElementById("c4");

let bs = document.getElementById("bs");
let pb = document.getElementById("pb");

let vals = {5119:{0:{0:0}}};

let bVals = [0, 0, 0, 0]
let checkedBoxes = 0;

function checkCBoxes(x) {
    switch (x) {
        case 0:
            c2.checked = 0;
            c3.checked = 0;
            c4.checked = 0;
            break;
        case 1:
            c1.checked = false;
            c3.checked = false;
            c4.checked = false;
            break;
        case 2:
            c2.checked = 0;
            c1.checked = 0;
            c4.checked = 0;
            break;
        case 3:
            c2.checked = false;
            c3.checked = false;
            c1.checked = false;
            break;

    }

}

b1.addEventListener("click", () => {
    bVals[0]++;
    b1.innerText = bVals[0]
})
b2.addEventListener("click", () => {
    bVals[1]++;
    b2.innerText = bVals[1]
})
b3.addEventListener("click", () => {
    bVals[2]++;
    b3.innerText = bVals[2]
})
b4.addEventListener("click", () => {
    bVals[3]++;
    b4.innerText = bVals[3]
})
bs.addEventListener("click",()=>{
    window.location.href = "disp.html";
})
pb.addEventListener("click",()=>{
    document.cookie = "val="+JSON.stringify(vals)
    console.log(decodeURIComponent(document.cookie))
    
    
})