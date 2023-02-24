let round = document.getElementById("round")
let team = document.getElementById("teamnum")
//let mf = document.getElementById("mf");//major failure button
let version = 1.2

let pushString = ""

let buttonVals = [0,0,0,0,0,0,0,0,0,0]//a seesaw 1 2, a scr, all, cn 12, cb 12, seesaw 1 2
let maxVals = [63,1,1,15,9,6,6,3,3,1,1]
let mfv = 0


function buttonVal(i, j, x) {//changes values displayed on buttons by adding x to value i
    buttonVals[j] += x
    i.innerText = buttonVals[j]
    //console.log(buttonVals[j])
}
function checkVals(i,j){
    if(i.checked){
        buttonVals[j] = 1
    }else{
        buttonVals[j] = 0
    }
    if(j==0){
        if(buttonVals[j] == 0){
            document.getElementById("saw1").src="saw not level.png";
        }else{
            document.getElementById("saw1").src="saw level.png";
        }
    }
    if(j==8){
        if(buttonVals[j] == 0){
            document.getElementById("saw2").src="saw not level.png";
        }else{
            document.getElementById("saw2").src="saw level.png";
        }
    }
}
function cookieDecoder(cookieName) {//decodes cookies and releases the raw cookie minus the start parts like name
    let name = cookieName + "=";
    let decodedCookie = decodeURIComponent(document.cookie)
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
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
function qrgen(input) {//genrates qr codes
    console.log(input)
    qrcode.clear()
    qrcode.makeCode(input);
}

let qrcode = new QRCode(document.getElementById("qr"), {
    text: "",
    width: document.body.clientWidth*.94,
    height: document.body.clientWidth*.94,
    padding: 5,
    correctLevel: QRCode.CorrectLevel.H
});
function swapPage() {
    window.location.href = "disp.html";
}

if (cookieDecoder("vals") == null || cookieDecoder("vals") === "") {
    document.cookie = "vals={}"
}
if (parseFloat(cookieDecoder("version")) < version) {//checks version and resets vals is version isnt correct
    document.cookie = "vals={}"
    document.cookie = "pitData={}"
    document.cookie = "version=" + version
}
if (cookieDecoder("version") == null) {
    document.cookie = "version=" + version
}

let vals = JSON.parse(cookieDecoder("vals"))
qrgen("")


function binToText(x) {
    return parseInt(x, 2)+" "+String.fromCharCode(parseInt(x, 2))+" "
}
function checkMax(x) {
    for (let i = 0; i < x.length; i++) {
        if (x[i] > maxVals[i]) {
            x[i] = maxVals[i]
        }
    }
}
function encrypt(x, rn) {
    console.log(x)
    x.unshift(rn);
    console.log(x)
    let outBin = ["", "", "", ""]
    let outStr = ""
    checkMax(x)
    let outNum = 0;
    let binLen = 0;
    for (i = 0; i < x.length; i++) {
        switch (i) {
            case 0:
                binLen = 6
                break;
            case 1:
                binLen = 1
                break;
            case 3:
                outNum = 1
                binLen = 4
                break;
            case 5:
                outNum = 2
                binLen = 3
                break;
            case 7:
                binLen = 2
                break;
            case 8:
                outNum = 3
                break;
            case 9:
                binLen = 1
        }
        for (let j = 0; j < binLen - x[i].toString(2).length; j++) {
            outBin[outNum] += "0"
        }
        outBin[outNum] += x[i].toString(2)
    }
    outStr += "."+parseInt(outBin[0],2)
    outStr += "."+parseInt(outBin[1],2)
    outStr += "."+parseInt(outBin[2],2)
    outStr += "."+parseInt(outBin[3],2)
    console.log(outBin + " " + outStr)
    return outStr;
}
function resetPage(){
    team.value = ""
    round.value = ""
    buttonVals = [0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    var buttons = document.getElementsByTagName('button');
    for (let i = 0; i < buttons.length; i++) {
        let button = buttons[i];
        if(button.className == "InputButtonR" || button.className == "InputButtonY"){
            button.innerText = "0";
        }
    }
    var checks = document.querySelectorAll('input[type=checkbox]');
    for (let i = 0; i < checks.length; i++) {
        let indi = checks[i];
        indi.checked = false
    }
}
function push() {
    let teamnum = parseInt(team.value)
    let roundnum = parseInt(round.value)//gets round and team vals
    if (team.value.trim() != "" && round.value.trim() != "") {//checks to see if they both are filled out
        let teamStr = ""+teamnum
        while(teamStr.length<4){
            teamStr="0"+teamStr
        }
        console.log(teamStr)
        if (teamnum > 0 && roundnum > 0) {
            if(pushString.length>1){
                pushString+=","
            }
            pushString += teamStr + encrypt(buttonVals, roundnum)
            let pushVals = [buttonVals[0], buttonVals[1], buttonVals[2], buttonVals[3], buttonVals[4], buttonVals[5], buttonVals[6], buttonVals[7], buttonVals[8], buttonVals[9]]
            if (vals[teamnum] == undefined) {
                vals[teamnum] = {}
            }
            vals[teamnum][roundnum] = pushVals// makes the spot equal to the vals
            qrgen(pushString)
        } else {
            alert("round and team numbers must not include letters")
        }

    } else {
        alert("add a team number and round number before pushing")
    }
    resetPage();    
}
function clear() {//clears local cache, not cookies
    vals = {}
}
function mf() {
    mfv = 1
}
