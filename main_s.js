let round = document.getElementById("round")
let team = document.getElementById("teamnum")
//let mf = document.getElementById("mf");//major failure button
let version = 1.2

let pushString = ""

let buttonVals = [0,0,0,0,0,0,0,0,0,0,0,0,0,0]//ps 1234, cones 1 2btm 3 4tp, cubes 1 2btm 3 4tp, bottom 1 2
let maxVals = [63,1,1,1,1,6,6,3,3,9,6,6,3,3,9]
let checkedBoxes = 0;
let mfv = 0

function buttonVal(i, j, x) {//changes values displayed on buttons by adding x to value i
    buttonVals[j] += x
    i.innerText = buttonVals[j]
    console.log(buttonVals[j])
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
    width: document.body.clientWidth * .95,
    height: document.body.clientWidth * .95,
    padding: 0,
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
    x[0] = rn;
    let outBin = ["", "", "", ""]
    let outStr = ""
    checkMax(x)
    let outNum = 0;
    for (i = 0; i < x.length; i++) {
        let binLen = 2;
        switch (i) {
            case 0:
                binLen = 6
                break;
            case 1:
                binLen = 1
                break;
            case 3:
                outNum = 1
                binLen = 1
                break;
            case 5:
                binLen = 3
                break;
            case 7:
                outNum = 2
                break;
            case 9:
                binLen = 2
                break;
            case 10:
                outNum = 3
                break;
            case 12:
                binLen = 4
                break
            case 13:
                outNum = 3
                break;
        }
        for (let j = 0; j < binLen - x[i].toString(2).length; j++) {
            outBin[outNum] += "0"
        }
        outBin[outNum] += x[i].toString(2)
    }
    outStr += "."+parseInt(outBin[0],2)
    outStr += "."+parseInt(outBin[1],2)
    outStr += "."+parseInt(outBin[2],2)
    console.log(outBin + " " + outStr)
    return outStr;
}
function resetPage(){
    team.value = ""
    round.value = ""
    buttonVals = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
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
            let pushVals = [buttonVals[0], buttonVals[1], buttonVals[2], buttonVals[3], buttonVals[4], buttonVals[5], buttonVals[6], buttonVals[7], buttonVals[8], buttonVals[9],buttonVals[10], buttonVals[11], buttonVals[12], buttonVals[13], buttonVals[14]]
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
