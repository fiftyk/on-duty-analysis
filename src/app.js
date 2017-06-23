function Period(start, end) {
  this.start = start;
  this.end = end;
  this.contain = function(period) {
    if (this.start <= period.start && this.end >= period.end) {
      return true;
    }
    return false;
  };
}

function Staff(name) {
  this.name = name;
  this.toString = function() {
    return this.name;
  };
}

function Duty(staff, day, period) {
  this.staff = staff;
  this.day = day;
  this.period = period;
}

function encode() {
  var dataset = [];
  var records = document.getElementById('source').value.split(/\s/);
  for (var i = 0, size = records.length; i < size; i++) {
    var record = records[i];
    var values = record.split(/,/);
    var staff = new Staff(values[0]);
    for (var j = 1, jsize = values.length; j < jsize; j++) {
      var array = values[j].split(/-/);
      var start = array[0];
      var end = array[1];
      var period = new Period(start, end);
      var duty = new Duty(staff, j, period);
      dataset.push(duty);
    }
  }
  return dataset;
}

function anaylsis(dataset, day, period) {
  var staffs = [];
  for (var i = 0, size = dataset.length; i < size; i++) {
    var duty = dataset[i];
    if (day && day !== duty.day) {
      continue;
    }
    var dutyPeriod = duty.period;
    if (period.contain(dutyPeriod)) {
      staffs.push(duty.staff.name);
    }
  }
  return staffs;
}

function print(value) {
  document.getElementById('output').innerText = value;
};

function init() {
  document.getElementById('source').value = 'abc,08:00-10:00,13:00-18:00,\r\nxyz,08:00-10:00,13:00-18:00,';
}

function execute() {
  var dataset = encode();
  var period = new Period('08:00', '13:00');
  var staffs = anaylsis(dataset, 1, period);
  console.log(staffs);
  print(staffs)
}