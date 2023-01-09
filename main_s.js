let round = document.getElementById("round")
let team = document.getElementById("teamnum")
//let mf = document.getElementById("mf");//major failure button
let version = 1.2

let pushString = ""

let buttonVals = [0,0,1,1,1,5,6,2,3,2]
let maxVals = [63,1,1,1,1,6,6,3,3,9]
let checkedBoxes = 0;
let mfv = 0

function buttonVal(i, x) {//changes values displayed on buttons by adding x to value i
    buttonVals[i] += x
    buttons[i].innerText = buttonVals[i]
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

    //buttonVals = [0, 0, 0, 0, 0, 0, 0]
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
    return String.fromCharCode(parseInt(x, 2))
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
    let outBin = ["", "", ""]
    let outStr = ""
    checkMax(x)
    let outNum = 0;
    for (i = 0; i < x.length; i++) {
        let binLen = 2;
        switch (i) {
            case 0:
                binLen = 6
                break;
            case 1||2||4:
                binLen = 1
            case 3:
                outNum = 1
                binLen = 1
                break;
            case 5:
                binLen = 3
                break;
            case 6:
                binLen = 3
                break;
            case 7:
                outNum = 2
                break;
            case 9:
                binLen = 4
                break;
        }
        for (let j = 0; j < binLen - x[i].toString(2).length; j++) {
            outBin[outNum] += "0"
        }
        outBin[outNum] += x[i].toString(2)
    }
    outStr += binToText(outBin[0])
    outStr += binToText(outBin[1])
    outStr+=binToText(outBin[2])
    console.log(outBin + " " + outStr)
    return outStr;
}

function push() {
    let teamnum = parseInt(team.value)
    let roundnum = parseInt(round.value)//gets round and team vals
    if (team.value.trim() != "" && round.value.trim() != "") {//checks to see if they both are filled out
        if (teamnum > 0 && roundnum > 0) {
            pushString += teamnum + "." + roundnum + encrypt(buttonVals, roundnum)
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
}
function clear() {//clears local cache, not cookies
    vals = {}
}
function mf() {
    mfv = 1
}
