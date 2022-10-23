let b1 = document.getElementById("b1");
let b2 = document.getElementById("b2");
let b3 = document.getElementById("b3");
let b4 = document.getElementById("b4");

let c1 = document.getElementById("c1");
let c2 = document.getElementById("c2");
let c3 = document.getElementById("c3");
let c4 = document.getElementById("c4");

let round = document.getElementById("round")
let team = document.getElementById("teamnum")
let bs = document.getElementById("bs");
let pb = document.getElementById("pb");
let cl = document.getElementById("clear");
let mf = document.getElementById("mf");

let vals = {};

let bVals = [0, 0, 0, 0]
let checkedBoxes = -1;

let mfv = 0

var qr = new QRious({
    element: document.getElementById('qr'),
});
qr.level = 'L';
qr.size = document.body.clientWidth - 20;
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

c1.addEventListener("click", () => {
    checkedBoxes = 3
})
c2.addEventListener("click", () => {
    checkedBoxes = 2
})
c3.addEventListener("click", () => {
    checkedBoxes = 1
})
c4.addEventListener("click", () => {
    checkedBoxes = 0
})

bs.addEventListener("click", () => {
    window.location.href = "disp.html";
})
pb.addEventListener("click", () => {
    let teamnum = parseInt(team.value)
    let roundnum = parseInt(round.value)
    if(team.value.trim() != ""&&round.value.trim() !=""){
        let nv = [ bVals[0], bVals[1], bVals[2], bVals[3], checkedBoxes, mfv]
    if (vals[teamnum] == undefined) {
        vals[teamnum] = {}
    }
    vals[teamnum][roundnum] = nv
    //console.log(vals)
    let qrOut = ""
    for(let i = 0;i<Object.keys(vals).length;i++){
        let iVal = vals[Object.keys(vals)[i]]
        qrOut+=Object.keys(vals)[i]+":"
        console.log(iVal)
        for(let j= 0;j<Object.keys(iVal).length;j++){
            let jVal = iVal[Object.keys(iVal)[j]]
            qrOut+=Object.keys(iVal)[j]+"."
            console.log(jVal)
            for(let l = 0;l<6;l++){
               qrOut+=jVal[l]
               if(l!=5){
                qrOut+="."
               }
            }
            if(j!=Object.keys(iVal).length-1){
              qrOut+="."  
            }
        }
        if(i!=Object.keys(vals).length-1){
            qrOut+=";"
        }
    }
    console.log(qrOut)
    qr.value = qrOut
    bVals = [0, 0, 0, 0]
    checkedBoxes = -1;

    team.value = ""
    round.value = ""

    b1.innerText = bVals[0]
    b2.innerText = bVals[1]
    b3.innerText = bVals[2]
    b4.innerText = bVals[3]
    c1.checked = false
    c2.checked = false
    c3.checked = false
    c4.checked = false
    mf = 0
    }else{
        console.log("hit")
        alert("add a team number and round number before pushing")
    }
})
cl.addEventListener("click", () => {
    vals = {}
})
mf.addEventListener("click", () => {
    mfv = 1
})