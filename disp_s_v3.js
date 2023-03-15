let del = 0;
let cbox = document.getElementById("cbox");
let last = ""
let qrOut = ""
let team = document.getElementById("teamnum")
let teamnum = 0
let size;
let textBoxes = [document.getElementById("t1"),document.getElementById("t2"),document.getElementById("t3"),document.getElementById("t4"),document.getElementById("t5")]

let version = 2

let maxVals = [63,1,1,15,9,6,6,3,3,1,1]

function decrypt(x){
  let output = [];
  let bin = []
  let split = []
  for(i = 0;i<x.length;i++){
    let hold = parseInt(x[i]).toString(2)
    while(hold.length<8){
      hold = "0"+hold
    }
    bin[i] = hold
  }
  //console.log(bin)
  split.push(parseInt(bin[0].substring(0,6),2))//round num
  split.push(parseInt(bin[0].substring(6,7),2))//seesaw a
  split.push(parseInt(bin[0].substring(7,8),2))//seesaw a
  split.push(parseInt(bin[1].substring(0,4),2))//auto all
  split.push(parseInt(bin[1].substring(4,8),2))//tele bottom
  split.push(parseInt(bin[2].substring(0,3),2))//cone t
  split.push(parseInt(bin[2].substring(3,6),2))//cone b
  split.push(parseInt(bin[2].substring(6,8),2))//cube t
  split.push(parseInt(bin[3].substring(4,6),2))//cube b
  split.push(parseInt(bin[3].substring(6,7),2))//seesaw t
  split.push(parseInt(bin[3].substring(7,8),2))
  console.log(split)
  return split;
}
function encrypt(x, rn) {
  x.unshift(parseInt(rn))
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
      //console.log(outBin)
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
  x.shift()
  console.log(x)
  return outStr;
  
}
function checkMax(x) {
  for (let i = 0; i < x.length; i++) {
      if (x[i] > maxVals[i]) {
          x[i] = maxVals[i]
      }
  }
}
function onScanSuccess(decodedText, decodedResult) {//on succes
  // Handle on success condition with the decoded text or result.
  if(last!=decodedText){

    console.log(`Scan result: ${decodedText}`);
    qrToJson(decodedText) 
    scandler(10)
    last = decodedText
  }
}
function onScanFailure(decodedText, decodedResult){//on fail
  scandler(0)
  //console.log(`Scan result fail: ${decodedText}`);
}
function cookiecoder(cookie,value){//decodes cookies
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
function qrToJson(input) {//qr in json out
  let tempa = input.split(",")//splits out diferent teams
  for (let i = 0; i < tempa.length; i++) {
    let tempb = tempa[i].split(".")//splits team and data
    let teamnumloc = tempb[0]
    if (vals[teamnumloc] == undefined) {//makes sure team is on vals
      vals[teamnumloc] = {}
    }
    tempb.shift()
    let splitVals = tempb
    let data = decrypt(splitVals)
    for (let j = 0; j < data.length; j += 11) {
      let nv = [data[1], data[2], data[3], data[4], data[5], data[6], data[7], data[8], data[9], data[10]]//a seesaw 1 2, a scr, all, cn 12, cb 12, seesaw 1 2
      vals[teamnumloc][data[0]] = nv
      //console.log(nv)
    }
  }
  document.cookie = "vals="+JSON.stringify(vals)  
  updateAllList()
  //updateVals()
  //qrgen()
}
function qrgen(){//generates qr code
  qrOut = ""
  for(let i = 0;i<Object.keys(vals).length;i++){//finds all the teams
      let iVal = vals[Object.keys(vals)[i]]
      if(Object.keys(vals)[i] == teamnum){
        for(let j= 0;j<Object.keys(iVal).length;j++){//finds all the rounds
          if(j>0){
            qrOut+=","
          }
          let jVal = iVal[Object.keys(iVal)[j]]
          console.log(Object.keys(iVal)[j])
          qrOut+=Object.keys(vals)[i]+encrypt(jVal,Object.keys(iVal)[j])//adds them to the list
        }
      }
  }
 console.log(qrOut)
 document.cookie = "vals="+JSON.stringify(vals)
  qrcode.clear()
  qrcode.makeCode(qrOut)
  
}
function pitHandler(index){//handles changes in pit scouting data
  teamnum = parseInt(team.value)
  if(team.value.trim() != ""){
  pitVals = JSON.parse(cookiecoder(document.cookie,"pitData"))
  if(pitVals[teamnum] == undefined){
    pitVals[teamnum] =[]
  }
  while(pitVals[teamnum].length<5){
    pitVals[teamnum].push("")
  }  
  pitVals[teamnum][index]=textBoxes[index].value
  document.cookie = "pitData="+JSON.stringify(pitVals)
  //console.log(document.cookie)
  }else{
    alert("add team number before writing pit scouting data")
  }
}
function scandler(x){//scan handler
  del += x
  if(del>0){
    del--
    cbox.style.backgroundColor = "#00FF00"
  }else{
    cbox.style.backgroundColor = "red"
  }
}
function updateAllList() {//updates all teams list
  //allchart.reset();
  console.log("balls")
  let ls = []
  for (i = 0; i < Object.keys(vals).length; i++) {
    let nv = [Object.keys(vals)[i], 0, 0, 0, 0, 0, 0]//new values
    let teamtemp = Object.keys(vals)[i];
    //console.log(i)
    let totalRound = Object.keys(vals[teamtemp]).length
    for (let j = 0; j < totalRound; j++) {
      let key = vals[teamtemp][Object.keys(vals[teamtemp])[j]]
      nv[1] += parseInt(key[4]) + parseInt(key[5])
      nv[2] += parseInt(key[6]) + parseInt(key[7])
      nv[4] += parseInt(key[1]) + parseInt(key[9])
      nv[5] += parseInt(key[0]) + parseInt(key[8])
      nv[3] += parseInt(key[2])
    }
    for (let t = 1; t < nv.length; t++) {//divides the newvalues by total rounds
      nv[t] = nv[t] / totalRound
    }
    nv[6] = nv[1] + nv[2] + nv[3] + nv[4] + nv[5]
    ls.push(nv)
    allchart.data.datasets.forEach((dataset) => {
      dataset.data.pop();
    });
    allchart.data.labels.pop();
  }
  allchart.update();
  console.log(ls)
  ls.sort((a, b) => { if (a[6] > b[6]) {return 1} else if (a[6] < b[6]) { return -1 } return 0 })
  console.log(ls)

  for(i = 0;i<ls.length;i++){
    let cval = ls.length-i-1
    allchart.data.datasets.forEach((dataset) => {//this adds the values to the line graph
      switch (dataset.label) {
        case "coneTotal":
          dataset.data.push(ls[cval][1])
          break;
        case "cubeTotal":
          dataset.data.push(ls[cval][2])
          break;
        case "autoPoints":
          dataset.data.push(ls[cval][3])
          break;
        case "docked":
          dataset.data.push(ls[cval][4])
          break;
        case "engaged":
            dataset.data.push(ls[cval][5])
            break;
        default:
          break;
      }
    });
    allchart.data.labels.push(ls[cval][0])
  }
  allchart.update();
}
function updateVals() {//updates all the garpghs
  for (let i = 0; i < 13; i++) {//deletes all the stuff
    line.data.datasets.forEach((dataset) => {
      dataset.data.pop();
    });
    radial.data.datasets.forEach((dataset) => {
      dataset.data.pop();
    });
  }
  let nv = [0, 0, 0, 0, 0, 0, 0, 0]//new values
  //console.log(Object.keys(vals[teamnum]).length)
  let totalRound = Object.keys(vals[teamnum]).length
  for (let j = 0; j < Object.keys(vals[teamnum]).length; j++) {
    let key = vals[teamnum][Object.keys(vals[teamnum])[j]]
    nv[0] += parseInt(key[3])
    nv[1] += parseInt(key[2])
    nv[2] += parseInt(key[4])
    nv[3] += parseInt(key[5])
    nv[4] += parseInt(key[7])
    nv[5] += parseInt(key[6])
    nv[6] += parseInt(key[1])+parseInt(key[8])
    nv[7] += parseInt(key[0])+parseInt(key[7])
    //console.log(nv)
    line.data.datasets.forEach((dataset) => {//this adds the values to the line graph
      switch (dataset.label) {
        case "coneTotal":
          dataset.data.push(parseInt(key[4]) + parseInt(key[5]))
          break;
        case "cubeTotal":
          dataset.data.push(parseInt(key[6]) + parseInt(key[7]))
          break;
        case "docked":
          dataset.data.push(parseInt(key[1])+ parseInt(key[9]))
          break;
        case "engaged":
            dataset.data.push(parseInt(key[0])+ parseInt(key[8]))
            break;
        default:
          break;
      }
    });
  }
  for (let t = 0; t < nv.length; t++) {//divides the newvalues by total rounds
    nv[t] = nv[t] / totalRound
  }
  radial.data.datasets.forEach((dataset) => {
    dataset.data = nv //output in radial graph
  });
  line.update();
  radial.update();
}
function updatePit(){//
  //updates pit scouting data
  let pitVals = JSON.parse(cookiecoder(document.cookie,"pitData"))
  if(pitVals[teamnum] == undefined){
    pitVals[teamnum] =[]
  }
  while(pitVals[teamnum].length<5){
    pitVals[teamnum].push("")
  }         
  for(let i=0;i<pitVals[teamnum].length;i++){
      textBoxes[i].value = pitVals[teamnum][i]
  }
}
if(parseFloat(cookiecoder(document.cookie,"version"))<version){
  document.cookie="vals={}"
  document.cookie="pitData={}"
  document.cookie="version="+version
}
if(cookiecoder(document.cookie,"version")==null){
  document.cookie="version="+version
}
var html5QrcodeScanner = new Html5QrcodeScanner("reader", { fps: 10})//scanner for qr codes
html5QrcodeScanner.render(onScanSuccess,onScanFailure);//renders camera for scanner

if(document.body.clientHeight>document.body.clientWidth){//gets size the qr code should be
  size = document.body.clientWidth *.9
}else{
  size = document.body.clientWidth * .40
}
let qrcode = new QRCode(document.getElementById("qr"), {
  width : size,
  height: size,
  text: " "
});

if(cookiecoder(document.cookie,"vals")==null){//adds vals to cookie
  document.cookie="vals={}"
}
if(cookiecoder(document.cookie,"pitData")==null){//adds pit data to cookies
  document.cookie="pitData={}"
}
let vals = JSON.parse(cookiecoder(document.cookie,"vals"))//sets vals var to the vals in cookies  
if(vals!={}){//if there is stuff to generate it will
  qrgen()
}

let cl = document.getElementById("clear");
let bs = document.getElementById("bs");//all page swapping code
bs.addEventListener("click", () => {
  window.location.href = "main.html";
})
cl.addEventListener("click", () => {//clears crap
  vals = {}
  document.cookie = "vals={}"
  document.cookie = "pitData={}"
  qrgen()
  for(i=0;i<100;i++){
    allchart.data.datasets.forEach((dataset) => {
      dataset.data.pop();
    });
    allchart.data.labels.pop();
  }
  updateAllList()
  for(let i = 0;i<textBoxes.length;i++){
    textBoxes[i].value = ""
  }
  console.log(vals)
})
team.addEventListener("blur", () => {//when you type in a team this runs
  teamnum = (team.value)
  if (vals[teamnum] != undefined) {//makes sure team is on vals
    updateVals()
  }
  qrgen()
  updateAllList()
  updatePit()
})

const radialdata = {//data for radial
  labels: [
    'Bottom',
    'AutoAll',
    'ConeUp',
    'ConeDown',
    'CubeDown',
    'CubeUp',
    'DockAver',
    'EngAver'
  ],
  datasets: [{
    label: 'Average Scores',
    data: [1, 2, 3, 4, 5, 6, 7, 8],
    fill: true,
    backgroundColor: 'rgba(255, 99, 132, 0.2)',
    borderColor: 'rgb(255, 99, 132)',
    pointBackgroundColor: 'rgb(255, 99, 132)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgb(255, 99, 132)'
  }],
};
const radialconfig = {//config for radial
  type: 'radar',
  data: radialdata,
  options: {  
    responsive: false,
    scales: {
      r: {
        suggestedMin: 0,
        suggestedMax: 10,
        pointLabels: {
          font: {
            size: 25
          }
        }
      }
    },
  }
};
const radial = new Chart(document.getElementById('radial'), radialconfig);//setup for radial

const linedata = {
  labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
  datasets: [{
    label: "coneTotal",
    data: [1, 2, 3, 4, 5, 6],
    borderColor: "rgb(255, 0, 0)",
  }, {

    label: "cubeTotal",
    data: [4, 2, 3, 4, 5, 6],
    borderColor: "rgb(0, 255, 0)",
  }, {
    label: 'docked',
    data: [1, 2, 3, 8, 5, 6],
    borderColor: "rgb(0, 0, 255)",
  },
  {
    label: 'engaged',
    data: [1, 2, 3, 8, 5, 6],
    borderColor: "rgb(255, 0, 255)",
  }],
};
const lineconfig = {
  type: 'line',
  data: linedata,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        suggestedMin: 0,
        suggestedMax: 10,
        pointLabels: {
          font: {
            size: 25
          }
        }
      }
    },
  }
};
const line = new Chart(document.getElementById('line'),lineconfig);

const alldata = {
  labels: [],
  datasets: [
    {
      label: 'coneTotal',
      data: [],
      backgroundColor: "rgb(255, 0, 0)",
    },
    {
      label: 'cubeTotal',
      data: [],
      backgroundColor: "rgb(0, 255, 0)",
    },
    {
      label: 'autoPoints',
      data: [],
      backgroundColor: "rgb(225, 225, 0)",
    },
    {
      label: 'docked',
      data: [],
      backgroundColor: "rgb(0, 0, 255)",
    },
    {
      label: 'engaged',
      data: [],
      backgroundColor: "rgb(0, 225, 255)",
    }
  ]
};
const allconfig = {
  type: 'bar',
  data: alldata,
  options: {
    maintainAspectRatio: false,
    responsive: true,
    indexAxis: 'y',
    plugins: {
      title: {
        //display: true,
        text: 'Chart.js Bar Chart - Stacked'
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    }
  }
};
const allchart = new Chart(document.getElementById('allteams'),allconfig);
//qrToJson("0001.11.33.101.4")
