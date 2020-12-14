const getNewDate = (dayChange, dateName, hourNum) => {
  var date = new Date();
  date.setDate(date.getDate() + dayChange)
  date.setHours(hourNum, 0, 0, 0);
  return { title: `${dateName}`, start: date }
}

const buildDateArr = () => {
  let dateArr = [];
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

const calendarEvents = buildDateArr();

export default calendarEvents;