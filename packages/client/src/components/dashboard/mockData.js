// {
//   "date": {
//     "$date": "2023-08-02T08:49:40.564Z"
//   },
//   "weight": 81.4,
//   "notes": "",
//   "photos": [],
//   "measurements": {
//     "leftArm": 20.25,
//     "rightArm": 20.25,
//     "back": 20.25,
//     "chest": 20.25,
//     "waist": 20.25,
//     "hips": 20.25,
//     "leftThigh": 20.25,
//     "rightThigh": 20.25,
//     "leftCalve": 20.25,
//     "rightCalve": 20.25
//   }
// }

const fs = require("fs");

const generate = () => {
  const output = [];

  for (let i = 0; i < 100; i++) {
    const thigh = 75 + Math.random() * (2 - -2) + -2;
    const calve = 45 + Math.random() * (2 - -2) + -2;
    const arm = 32 + Math.random() * (1.5 - -1.5) + -1.5;
    const date = new Date();
    date.setDate(date.getDate() - 7 * Math.abs(i - 100));
    output.push({
      date: {
        $date: date.toISOString(),
      },
      weight: 80 + Math.random() * (5 - -5) + -5,
      notes: "",
      photos: [],
      measurements: {
        leftArm: arm,
        rightArm: arm,
        back: 85 + Math.random() * (2 - -2) + -2,
        chest: 115 + Math.random() * (2 - -2) + -2,
        waist: 85 + Math.random() * (2 - -2) + -2,
        hips: 95 + Math.random() * (2 - -2) + -2,
        leftThigh: thigh,
        rightThigh: thigh,
        leftCalve: calve,
        rightCalve: calve,
      },
    });
  }

  fs.writeFileSync("chart.json", JSON.stringify(output));
};

generate();
