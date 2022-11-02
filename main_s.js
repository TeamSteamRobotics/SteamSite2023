
 let buttons = [document.getElementById("b1"),document.getElementById("b2"),document.getElementById("b3"),document.getElementById("b4")]
let c1 = document.getElementById("c1");//check boxes
let c2 = document.getElementById("c2");
let c3 = document.getElementById("c3");
let c4 = document.getElementById("c4");

let round = document.getElementById("round")
let team = document.getElementById("teamnum")
let bs = document.getElementById("bs");//swap button
let pb = document.getElementById("pb");//push button
let cl = document.getElementById("clear");//clear
//let mf = document.getElementById("mf");//major failure button

let bVals = [0, 0, 0, 0]
let checkedBoxes = 0;
let mfv = 0

function checkCBoxes(x) {//check box unchecking code
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

function buttonHandler(index, value){
    bVals[index] += value
    buttons[index].innerText = bVals[index]
}

function cookiecoder(cookie,value){
    let name = value + "=";
  let decodedCookie = decodeURIComponent(cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return null;
}

function qrgen(){
    let qrOut = ""
    for(let i = 0;i<Object.keys(vals).length;i++){//finds all the teams
        let iVal = vals[Object.keys(vals)[i]]
        qrOut+=Object.keys(vals)[i]+":"//adds them to a certain spot
        for(let j= 0;j<Object.keys(iVal).length;j++){//finds all the rounds
            let jVal = iVal[Object.keys(iVal)[j]]
            qrOut+=Object.keys(iVal)[j]+"."//adds them to the list
            for(let l = 0;l<6;l++){//adds all the vals
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
            qrOut+=","
        }
    }
    document.cookie="vals="+JSON.stringify(vals)
    console.log(document.cookie)
    console.log(qrOut)
    //qr.value = qrOut
    qrcode.clear()
    qrcode.makeCode(qrOut);

    bVals = [0, 0, 0, 0]
    checkedBoxes = 0

    //clears every value
    team.value = ""
    round.value = ""

    buttons[0].innerText = bVals[0]
    buttons[1].innerText = bVals[1]
    buttons[2].innerText = bVals[2]
    buttons[3].innerText = bVals[3]
    c1.checked = false
    c2.checked = false
    c3.checked = false
    c4.checked = false
    mf = 0
}

let qrcode = new QRCode(document.getElementById("qr"), {
    text:"",
    width:document.body.clientWidth*.95,
    height:document.body.clientWidth*.95,    
    padding: 0,
    correctLevel : QRCode.CorrectLevel.H
});

if(cookiecoder(document.cookie,"vals")==null){
    document.cookie="vals={}"
}
let vals = JSON.parse(cookiecoder(document.cookie,"vals"))
if(vals!={}){
    qrgen()
}

//document.cookie = "vals=;expires=Thu, 01 Jan 1970 00:00:00 UTC;"

//all of these just add to clickers

c1.addEventListener("click", () => {
    checkedBoxes = 4
})
c2.addEventListener("click", () => {
    checkedBoxes = 3
})
c3.addEventListener("click", () => {
    checkedBoxes = 2
})
c4.addEventListener("click", () => {
    checkedBoxes = 1
})

bs.addEventListener("click", () => {
    window.location.href = "disp.html";
})

pb.addEventListener("click", () => {
    let teamnum = parseInt(team.value)
    let roundnum = parseInt(round.value)//gets round and team vals
    if(team.value.trim() != ""&&round.value.trim() !=""){//checks to see if they both are filled out
        let nv = [ bVals[0], bVals[1], bVals[2], bVals[3], checkedBoxes, mfv]
    if (vals[teamnum] == undefined) {
        vals[teamnum] = {}
    }
    vals[teamnum][roundnum] = nv// makes the spot equal to the vals
}else{
    alert("add a team number and round number before pushing")
}
qrgen()
})
cl.addEventListener("click", () => {
    vals = {}
    document.cookie="vals="+JSON.stringify(vals)
})
function mf(){
    mfv = 1
}
