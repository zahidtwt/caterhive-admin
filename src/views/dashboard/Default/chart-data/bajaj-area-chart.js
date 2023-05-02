// ===========================|| DASHBOARD - BAJAJ AREA CHART ||=========================== //

const chartData = {
  type: "pie",
  height: 250,
  options: {
    chart: {
      //   id: "pie-chart",
      //   sparkline: {
      //     enabled: true,
      //   },
      //   width: 300,
      type: "pie",
    },
    labels: [
      "Team A",
      "Team B",
      "Team C",
      "Team D",
      "Team E",
      "Team F",
      "Team G",
    ],
    dataLabels: {
      enabled: false,
    },
    // stroke: {
    //   curve: "smooth",
    //   width: 1,
    // },
    // tooltip: {
    //   fixed: {
    //     enabled: false,
    //   },
    //   x: {
    //     show: false,
    //   },
    //   y: {
    //     title: "Ticket ",
    //   },
    //   marker: {
    //     show: false,
    //   },
    // },
  },
  series: [0, 15, 10, 50, 30, 40, 25],
};

// const chartData = {
//     type: "pie",
//     height: 95,
//     series: [44, 55, 13, 43, 22],
//     options: {
//       chart: {
//         width: 380,
//         type: "pie",
//       },
//       labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
//       responsive: [
//         {
//           breakpoint: 480,
//           options: {
//             chart: {
//               width: 200,
//             },
//             legend: {
//               position: "bottom",
//             },
//           },
//         },
//       ],
//     },
//   };

export default chartData;
