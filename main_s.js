let round = document.getElementById("round")
let team = document.getElementById("teamnum")
//let mf = document.getElementById("mf");//major failure button
let version = 1.2


let buttons = [document.getElementById("b1"),document.getElementById("b2"),document.getElementById("b3"),document.getElementById("b4")]
let buttonVals = [0, 0, 0, 0, 0, 0, 0]
let checkedBoxes = 0;
let mfv = 0

function buttonVal(i, x){//changes values displayed on buttons by adding x to value i
    buttonVals[i] += x
    buttons[i].innerText = buttonVals[i]
}
function cookieDecoder(cookieName){//decodes cookies and releases the raw cookie minus the start parts like name
    let name = cookieName + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
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
function qrgen(input){//genrates qr codes
    console.log(input)
    qrcode.clear()
    qrcode.makeCode(input);
    document.cookie="vals="+JSON.stringify(input)
    console.log(document.cookie)

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

if(cookieDecoder(document.cookie,"vals")==null){
    document.cookie="vals={}"
}
if(parseFloat(cookieDecoder(document.cookie,"version"))<version){//checks version and resets vals is version isnt correct
    document.cookie="vals={}"
    document.cookie="pitData={}"
    document.cookie="version="+version
}
if(cookieDecoder(document.cookie,"version")==null){
    document.cookie="version="+version
}

let vals = JSON.parse(cookieDecoder(document.cookie,"vals"))

function encrypt(x){
    let out =""
    for(i = 0;i<x.length;i++){
        out+=x[i].toString(2)
    }
    return out
}

function push(){
    let teamnum = parseInt(team.value)
    let roundnum = parseInt(round.value)//gets round and team vals
    if(team.value.trim() != ""&&round.value.trim() !=""){//checks to see if they both are filled out
        if(teamnum>0 && roundnum>0){
            let pushVals = encrypt(buttonVals)
    if (vals[teamnum] == undefined) {
        vals[teamnum] = {}
    }
    vals[teamnum][roundnum] = pushVals// makes the spot equal to the vals
    qrgen()
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
