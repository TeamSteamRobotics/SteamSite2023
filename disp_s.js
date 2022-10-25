function onScanSuccess(decodedText, decodedResult) {
  // Handle on success condition with the decoded text or result.
  console.log(`Scan result: ${decodedText}`);
  qrToJson(decodedText)
  console.log(vals)
}

var html5QrcodeScanner = new Html5QrcodeScanner(
"reader", { fps: 10, qrbox: 500 });
html5QrcodeScanner.render(onScanSuccess);

function qrToJson(input){
  let tempa = input.split(";")//splits out diferent teams
  for(let i = 0;i<tempa.length;i++){
    let tempb = tempa[i].split(":")//splits team and data

    if (vals[tempb[0]] == undefined) {//makes sure team is on vals
      vals[tempb[0]] = {}
    }

    let data = tempb[1].split(".")
    for(let j = 0;j<data.length;j+=7){
      let nv = [ data[j+1], data[j+2], data[j+3], data[j+4], data[j+5], data[j+6]]
      vals[tempb[0]][data[j]] = nv
    }
  }
}

//qr code shit end

let vals = {}


let team = document.getElementById("teamnum")
let teamnum = 0

team.addEventListener("input", () => {
  teamnum = parseInt(team.value)
  if (vals[teamnum] != undefined) {//makes sure team is on vals
    updateVals() 
  }
})
function updateVals(){
  for(let i = 0;i<13;i++){
    line.data.datasets.forEach((dataset) => {
      dataset.data.pop();
  });
  radial.data.datasets.forEach((dataset) => {
    dataset.data.pop();
  });
  }
  let nv = [0,0,0,0,0,0,0]
  let j = 0
  for(j=0;j<Object.keys(vals[teamnum]).length;j++){
    console.log(j)
    let key = vals[teamnum][Object.keys(vals[teamnum])[j]]
    console.log(key)
    nv[5]+= parseInt(key[0])+parseInt(key[1])
    nv[4]+=parseInt(key[2])+parseInt(key[3])
    nv[3]+=parseInt(key[3])
    nv[2]+=parseInt(key[2])
    nv[1]+=parseInt(key[1])
    nv[0]+=parseInt(key[0])
    nv[6]+=parseInt(key[4])
  }
  console.log(nv)
radial.data.datasets.forEach((dataset) => {
  dataset.data = nv
});





line.update();
radial.update();
}


const labels = [
    'TeleUp',
    'TeleDown',
    'AutoUp',
    'AutoDown',
    'AutoAll',
    'TeleAll',
    'ClimbAll'
  ];

  const radialdata = {
    labels: labels,
    datasets: [{
      label: 'Average Scores',
      data: [1, 2, 3, 4, 5, 6,7],
    fill: true,
    backgroundColor: 'rgba(255, 99, 132, 0.2)',
    borderColor: 'rgb(255, 99, 132)',
    pointBackgroundColor: 'rgb(255, 99, 132)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgb(255, 99, 132)'
    }],
  };

  const radialconfig = {
    type: 'radar',
    data: radialdata,
    options: {
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
  const linedata = {
    labels: [1,2,3,4,5,6,7,8,9,10,11,12,13],
    datasets: [{
      label: "a",
      data: [1, 2, 3, 4, 5, 6],
      borderColor: "rgb(255, 0, 0)",
    },{
  
    label: "b",
    data: [4, 2, 3, 4, 5, 6],
    borderColor: "rgb(0, 255, 0)",
  },{
  label: 'c',
  data: [1, 2, 3, 8, 5, 6],
  borderColor: "rgb(0, 0, 255)",
}],
  };

  const lineconfig = {
    type: 'line',
    data: linedata,
    options: {
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
const radial = new Chart(
    document.getElementById('radial'),
    radialconfig
  );
  const line = new Chart(
    document.getElementById('line'),
    lineconfig
  );
  //store pit scouting data localy and transfer from paper
  