const getNewDate = (dayChange, dateName, hourNum) => {
  var date = new Date();
  date.setDate(date.getDate() + dayChange)
  date.setHours(hourNum, 0, 0, 0);
  return { title: `${dateName}`, start: date }
}

const buildDateArr = () => {
  let dateArr = [];
  // day 1 builder
  for (let i = 3; i < 8; i++) {
    for (let v = 1; v < 17; v++) {
      var hourNum = parseInt(v + 7)
      console.log(hourNum)
      var dateName = `${i}-${hourNum}`
      console.log(JSON.stringify(getNewDate(i, dateName, hourNum)))
      dateArr.push(getNewDate(i, dateName, hourNum))
    }
  }
  console.log(dateArr)
  return dateArr
}

// const buildDateArr = () => {
//   const curDate = new Date();
//   let firstDate = getNewDate(curDate, 3, 1)
//   let dateArr = [firstDate]
//   for (let i = 0; i < 6; i++) {
//     let dateNum = i + 1
//     let dayIncrement = (parseInt(i) + 4)
//     dateArr.push(getNewDate(dateArr[dateNum], dayIncrement, (dateNum + 1)));
//   }
//   console.log(dateArr)
//   return dateArr
// }

const changeTime = (date, hourNum) => {
  console.log(date.setHours(hourNum, 0, 0, 0));
}

// const finalizeDateArr = () => {
//   const dateArr = buildDateArr();
//   for (let i = 0; i < dateArr.length; i++) {
//     dateArr[i].start.setHours(8, 0, 0, 0)
//   }
//   return dateArr
// }


const curDate = new Date()

const calendarEvents = buildDateArr();
// [
//   {
//     title: 'event1',
//     start: '2010-01-01'
//   },
//   {
//     title: 'event2',
//     start: '2010-01-05',
//     end: '2010-01-07'
//   },
//   {
//     title: 'event3',
//     start: '2010-01-09T12:30:00',
//     allDay: false // will make the time show
//   }
// ]

export default calendarEvents;