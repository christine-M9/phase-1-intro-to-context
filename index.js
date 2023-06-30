// Your code here
function createEmployeeRecord(employeeData) {
    return {
      firstName: employeeData[0],
      familyName: employeeData[1],
      title: employeeData[2],
      payPerHour: employeeData[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  function createEmployeeRecords(employeeData) {
    return employeeData.map(employee => createEmployeeRecord(employee));
  }
  function createTimeInEvent(employeeRecord, dateTimeString) {
    const [date, time] = dateTimeString.split(' ');
  
    employeeRecord.timeInEvents.push({
      type: 'TimeIn',
      date: date,
      hour: parseInt(time, 10)
    });
  
    return employeeRecord;
  }


  function createTimeOutEvent(employeeRecord, dateTimeString) {
    const [date, time] = dateTimeString.split(' ');
  
    employeeRecord.timeOutEvents.push({
      type: 'TimeOut',
      date: date,
      hour: parseInt(time, 10)
    });
  
    return employeeRecord;
  }

  function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);
  
    const timeInHour = timeInEvent.hour;
    const timeOutHour = timeOutEvent.hour;
  
    const hoursWorked = (timeOutHour - timeInHour) / 100;
  
    return hoursWorked;
  }


  function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    const payRate = employeeRecord.payPerHour;
  
    const wagesEarned = hoursWorked * payRate;
  
    return wagesEarned;
  }

  function allWagesFor(employeeRecord) {
    const dates = employeeRecord.timeInEvents.map(event => event.date);
  
    const totalWages = dates.reduce((total, date) => {
      const wages = wagesEarnedOnDate(employeeRecord, date);
      return total + wages;
    }, 0);
  
    return totalWages;
  }
  function calculatePayroll(employeeRecords) {
    const totalPayroll = employeeRecords.reduce((total, employeeRecord) => {
      const employeeWages = allWagesFor(employeeRecord);
      return total + employeeWages;
    }, 0);
  
    return totalPayroll;
  }