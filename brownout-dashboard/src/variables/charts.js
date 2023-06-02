let commonOptions = {
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  tooltips: {
    backgroundColor: "#f5f5f5",
    titleFontColor: "#333",
    bodyFontColor: "#666",
    bodySpacing: 4,
    xPadding: 12,
    mode: "nearest",
    intersect: 0,
    position: "nearest",
  },
  responsive: true,
  scales: {
    yAxes: {
      barPercentage: 1.6,
      gridLines: {
        drawBorder: false,
        color: "rgba(29,140,248,0.0)",
        zeroLineColor: "transparent",
      },
      ticks: {
        suggestedMin: 60,
        suggestedMax: 125,
        padding: 20,
        fontColor: "#9a9a9a",
      },
    },
    xAxes: {
      barPercentage: 1.6,
      gridLines: {
        drawBorder: false,
        color: "rgba(29,140,248,0.1)",
        zeroLineColor: "transparent",
      },
      ticks: {
        padding: 20,
        fontColor: "#9a9a9a",
      },
    },
  },
};

const batteryChart = {
  chart: {
    labels: Array(20).fill("00:00:00"),
    datasets: [
      {
        label: "Battery Percentage (%)",
        fill: true,
        borderColor: "#1f8ef1",
        borderWidth: 2,
        borderDash: [],
        borderDashOffset: 0.0,
        pointBackgroundColor: "#1f8ef1",
        pointBorderColor: "rgba(255,255,255,0)",
        pointHoverBackgroundColor: "#1f8ef1",
        pointBorderWidth: 20,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 15,
        pointRadius: 4,
        data: Array(20).fill(0),
      },
    ],
  },
  options: commonOptions,
};

let clusterChart = {
  power: {
    label: "Cluster Power Consmuption (W)",
  },
  cpu: {
    label: "Container CPU Utilization Sum (nc)",
  },
  properties: {
    fill: true,
    borderColor: "#1f8ef1",
    borderWidth: 2,
    borderDash: [],
    borderDashOffset: 0.0,
    pointBackgroundColor: "#1f8ef1",
    pointBorderColor: "rgba(255,255,255,0)",
    pointHoverBackgroundColor: "#1f8ef1",
    pointBorderWidth: 20,
    pointHoverRadius: 4,
    pointHoverBorderWidth: 15,
    pointRadius: 4,
  },
  options: commonOptions,
  powerLabels: Array(20).fill("00:00:00"),
  powerData: Array(20).fill(0.0),
  cpuLabels: Array(20).fill("00:00:00"),
  cpuData: Array(20).fill(0.0),
};

const srChart = {
  chart: {
    labels: Array(20).fill("00:00:00"),
    datasets: [
      {
        label: "Success Rate",
        fill: true,
        borderColor: "#00d6b4",
        borderWidth: 2,
        borderDash: [],
        borderDashOffset: 0.0,
        pointBackgroundColor: "#00d6b4",
        pointBorderColor: "rgba(255,255,255,0)",
        pointHoverBackgroundColor: "#00d6b4",
        pointBorderWidth: 20,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 15,
        pointRadius: 4,
        data: Array(20).fill(0.0),
      },
    ],
  },
  options: {
    maintainAspectRatio: false,
    legend: {
      display: false,
    },

    tooltips: {
      backgroundColor: "#f5f5f5",
      titleFontColor: "#333",
      bodyFontColor: "#666",
      bodySpacing: 4,
      xPadding: 12,
      mode: "nearest",
      intersect: 0,
      position: "nearest",
    },
    responsive: true,
    scales: {
      yAxes: {
        barPercentage: 1.6,
        gridLines: {
          drawBorder: false,
          color: "rgba(29,140,248,0.0)",
          zeroLineColor: "transparent",
        },
        ticks: {
          suggestedMin: 50,
          suggestedMax: 125,
          padding: 20,
          fontColor: "#9e9e9e",
        },
      },
      xAxes: {
        barPercentage: 1.6,
        gridLines: {
          drawBorder: false,
          color: "rgba(0,242,195,0.1)",
          zeroLineColor: "transparent",
        },
        ticks: {
          padding: 20,
          fontColor: "#9e9e9e",
        },
      },
    },
  },
};

const requestsChart = {
  chart: {
    labels: Array(20).fill("00:00:00"),
    datasets: [
      {
        label: "Total Requests",
        fill: true,
        borderColor: "#00d6b4",
        borderWidth: 2,
        borderDash: [],
        borderDashOffset: 0.0,
        pointBackgroundColor: "#00d6b4",
        pointBorderColor: "rgba(255,255,255,0)",
        pointHoverBackgroundColor: "#00d6b4",
        pointBorderWidth: 20,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 15,
        pointRadius: 4,
        data: Array(20).fill(0.0),
      },
      {
        label: "Slow Requests",
        fill: true,
        borderColor: "#1f8ef1",
        borderWidth: 2,
        borderDash: [],
        borderDashOffset: 0.0,
        pointBackgroundColor: "#1f8ef1",
        pointBorderColor: "rgba(255,255,255,0)",
        pointHoverBackgroundColor: "#1f8ef1",
        pointBorderWidth: 20,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 15,
        pointRadius: 4,
        data: Array(20).fill(0.0),
      },
      {
        label: "Error Requests",
        fill: true,
        borderColor: "#d048b6",
        borderWidth: 2,
        borderDash: [],
        borderDashOffset: 0.0,
        pointBackgroundColor: "#d048b6",
        pointBorderColor: "rgba(255,255,255,0)",
        pointHoverBackgroundColor: "#d048b6",
        pointBorderWidth: 20,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 15,
        pointRadius: 4,
        data: Array(20).fill(0.0),
      },
    ],
  },
  options: commonOptions,
};

module.exports = {
  batteryChart,
  clusterChart,
  srChart,
  requestsChart,
};
