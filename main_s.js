let round = document.getElementById("round")
let team = document.getElementById("teamnum")
//let mf = document.getElementById("mf");//major failure button
let version = 1.2

let pushString = ""

let buttonVals = [8, 3, 2, 4, 5, 1, 0]
let maxVals = [9, 3, 3, 6, 6, 1, 1]
let checkedBoxes = 0;
let mfv = 0

function buttonVal(i, x){//changes values displayed on buttons by adding x to value i
    buttonVals[i] += x
    buttons[i].innerText = buttonVals[i]
}
function cookieDecoder(cookieName){//decodes cookies and releases the raw cookie minus the start parts like name
    let name = cookieName + "=";
  let decodedCookie = decodeURIComponent(document.cookie)
  let ca = decodedCookie.split(';');
  for(let i = 0; i < ca.length; i++) {
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
function qrgen(input){//genrates qr codes
    console.log(input)
    qrcode.clear()
    qrcode.makeCode(input);

    buttonVals = [0, 0, 0, 0, 0, 0, 0]
}

let qrcode = new QRCode(document.getElementById("qr"), {
    text:"",
    width:document.body.clientWidth*.95,
    height:document.body.clientWidth*.95,    
    padding: 0,
    correctLevel : QRCode.CorrectLevel.H
});

function swapPage(){
    window.location.href = "disp.html";
}

if(cookieDecoder("vals")==null||cookieDecoder("vals")===""){
    document.cookie="vals={}"
}
if(parseFloat(cookieDecoder("version"))<version){//checks version and resets vals is version isnt correct
    document.cookie="vals={}"
    document.cookie="pitData={}"
    document.cookie="version="+version
}
if(cookieDecoder("version")==null){
    document.cookie="version="+version
}

let vals = JSON.parse(cookieDecoder("vals"))
qrgen("")


function checkMax(x){
    for(let i = 0;i<x.length;i++){
        if(x[i]>maxVals[i]){
            x[i] = maxVals[i]
        }
    }
}
function encrypt(x,tn,rn){
    let out =""
    checkMax(x)
    for(i = 0;i<x.length;i++){
        let binLen = 2;
        switch (i) {
            case 0:
                binLen = 4
                break;
            case 3:
                binLen = 3
                break;
            case 4:
                binLen = 3
                break;
            case 5:
                binLen = 1
                break;
            case 6:
                binLen = 1
                break;
        }
        for(let j = 0;j<binLen-x[i].toString(2).length;j++){
            out+="0"
        }
        out+=x[i].toString(2)
        console.log(x[i].toString(2))
    }
    return out
}

function push(){
    let teamnum = parseInt(team.value)
    let roundnum = parseInt(round.value)//gets round and team vals
    if(team.value.trim() != ""&&round.value.trim() !=""){//checks to see if they both are filled out
        if(teamnum>0 && roundnum>0){
            pushString += encrypt(buttonVals,teamnum,roundnum)
            let pushVals = [buttonVals[0],buttonVals[1],buttonVals[2],buttonVals[3],buttonVals[4],buttonVals[5],buttonVals[6],buttonVals[7]]
    if (vals[teamnum] == undefined) {
        vals[teamnum] = {}
    }
    vals[teamnum][roundnum] = pushVals// makes the spot equal to the vals
    qrgen(pushString)
        }else{
            alert("round and team numbers must not include letters")
        }
        
}else{
    alert("add a team number and round number before pushing")
}
}
function clear(){//clears local cache, not cookies
    vals = {}
}
function mf(){
    mfv = 1
}
