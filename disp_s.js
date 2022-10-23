function onScanSuccess(decodedText, decodedResult) {
  // Handle on success condition with the decoded text or result.
  console.log(`Scan result: ${decodedText}`, decodedResult);
}

var html5QrcodeScanner = new Html5QrcodeScanner(
"reader", { fps: 10, qrbox: 500 });
html5QrcodeScanner.render(onScanSuccess);

const labels = [
    'TeleUp',
    'TeleDown',
    'AutoUp',
    'AutoDown',
    'AutoAll',
    'TeleAll',
  ];

  const data = {
    labels: labels,
    datasets: [{
      label: 'Average Scores',
      data: [1, 2, 3, 4, 5, 6],
    fill: true,
    backgroundColor: 'rgba(255, 99, 132, 0.2)',
    borderColor: 'rgb(255, 99, 132)',
    pointBackgroundColor: 'rgb(255, 99, 132)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgb(255, 99, 132)'
    }],
  };

  const config = {
    type: 'radar',
    data: data,
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

  const linefig = {
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
    config
  );
  const line = new Chart(
    document.getElementById('line'),
    linefig
  );
  //store pit scouting data localy and transfer from paper
  