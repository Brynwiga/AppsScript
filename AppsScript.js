function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Functions')
      .addItem('Save Data', 'dailyPaste')
      .addSeparator()
  .addSubMenu(ui.createMenu('Update')
           .addItem('Update', 'updater'))
  .addSubMenu(ui.createMenu('Send Data')
          .addItem('Send Live Data to Sheet Owner', 'sendData')
          .addItem('Send Mined Data to Sheet Owner', 'sendMinedData'))    
      .addSubMenu(ui.createMenu('Miner')
          .addItem('Mine All Data', 'miner')
          .addItem('Mine Selected Data', 'selectedMiner')
          .addItem('Send Mined Data to Sheet Owner', 'sendMinedData'))
      .addSubMenu(ui.createMenu('Set Reader')
          .addItem('Set to "OR"', 'setToOr')
          .addItem('Set to "AND"', 'setToAnd')
          .addItem('Set to "NONE"', 'setToNone'))
      .addSubMenu(ui.createMenu('Break')
          .addItem('Break', 'cleanBreak')
          .addItem('Clear', 'clearContent'))
      .addToUi();
}
function secondMenu() {
  var ui = SpreadsheetApp.getUi();
  ui.creadMenu('Set Reader')
      .addItem('Set to "OR"','setToOr')
      .addItem('Set to "AND"','setToAnd')
  .addToUi();
}
function isPrime(num) {
  var prime = true;
  for (var i = 2; i < num / 2; i++) {
    if (num % i == 0) {
      prime = false;
    }
  }
  if (num == 4) {
      prime = false;
  }
  return prime;
}
function makeRange(start,end) {
  var array = [];
  if (start > end) {
    var tem = start;
    var start = end;
    var end = tem;
  }
  for (var i = start; i < end + 1; i++) {
    array.push(i);
  }
  return array;
}
function isPrimeArray(array) {
  var newArray = [];
  var len = array.length;
  for (var i = 0; i < len + 1; i++) {
    if (isPrime(array[i])) {
      newArray.push(array[i]);
    }
  }
  return newArray;
}
function getLength(array) {
  return array.length;
}
function recursive(num) {
  if (num == 1) {
    return 1;
  } else {
    return recursive(num - 1) * num;
  }
}
function fibonacci(num) {
  var array = [0,1,1];
  if (num == 1) {
    return array;
  } else if (num < 1) {
    return 'ERROR: Input number less than 1';
  } else {
    for (var i = 2; i < num + 1; i++) {
      var next = array[i] + array[i - 1];
      array.push(next);
    }
    return array;
  }
}
function lastRow(sheet,column) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (column == null) {
    if (sheet != null) {
      var sheet = ss.getSheetByName(sheet);
    } else {
      var sheet = ss.getActiveSheet();
    }
    return sheet.getLastRow();
  } else {
    var sheet = ss.getSheetByName(sheet);
    var lastRow = sheet.getLastRow();
    var array = sheet.getRange(column + 1 + ':' + column + lastRow).getValues();
    for (i=0;i<array.length;i++) {
      if (array[i] != '') {       
        var final = i + 1;
      }
    }
    if (final != null) {
      return final;
    } else {
      return 0;
    }
  }
}
function last(sheet,column) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  var lastRow = sheet.getLastRow();
  var array = sheet.getRange(column + 1 + ':' + column + lastRow).getValues();
  for (i=0;i<array.length;i++) {
    if (array[i] != '') {       
      var final = i + 1;
    }
  }
  if (final != null) {
    return sheet.getRange(column + final).getValue();
  } else {
    return sheet.getRange(column + lastRow).getValue();
  }
}
function setToOr() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var read = ss.getSheetByName('Read');
  var readRangeA = read.getRange('A1');
  var readRangeB = read.getRange('B1');
  var readRangeC = read.getRange('C1');
  var readRangeD = read.getRange('D1');
  var readRangeE = read.getRange('E1');
  var readRangeF = read.getRange('F1');
  var readRangeG = read.getRange('G1');
  var readRangeH = read.getRange('H1');
  var readRangeI = read.getRange('I1');
  readRangeA.setValue('OR');
  readRangeB.setValue('**^**%**$**&**');
  readRangeC.setValue('**^**%**$**&**');
  readRangeD.setValue('**^**%**$**&**');
  readRangeE.setValue('**^**%**$**&**');
  readRangeF.setValue('**^**%**$**&**');
  readRangeG.setValue('**^**%**$**&**');
  readRangeH.setValue('**^**%**$**&**');
  readRangeI.setValue('**^**%**$**&**');
}
function setToAnd() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var read = ss.getSheetByName('Read');
  var readRangeA = read.getRange('A1');
  var readRangeB = read.getRange('B1');
  var readRange = read.getRange('C1:I1');
  readRangeA.setValue('AND');
  readRangeB.setValue('**^**%**$**&**');
  readRange.clearContent();
}
function setToNone() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var read = ss.getSheetByName('Read');
  var readRangeA = read.getRange('A1');
  var readRange = read.getRange('B1:I1');
  readRangeA.setValue('NONE');
  readRange.clearContent();
}
function sendMinedData() {
  selectedMiner();
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var record = ss.getSheetByName('Record');
  var lastRowRecord = record.getLastRow();
  var time = record.getRange('A' + lastRowRecord).getValue().toString();
  var minedDataToSend = record.getRange('B' + lastRowRecord).getValue().toString();
  var email = 'thomasw@clicksignal.com';
  var subject = 'MINED DATA WAS SENT TO YOU'
  var body = time + '\n' + '\n' + minedDataToSend
  MailApp.sendEmail(email,subject,body);
}
function miner() {
  var live = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Output');
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var row = 1;
  var column = 1;
  var r = live.getRange("G1").getValue();
  var c = live.getLastColumn();
  var row = 1;
  var column = 1
  live.setActiveSelection('A' + row);
  var cell = live.getActiveCell().getValue();
  var cellData = cell.toString();
  while (row <= r) {
    var array = live.getRange("J1").getValue().toString();
    live.getRange("J1").setValue(array);
    live.setActiveSelection('A' + row);
    var cell = live.getActiveCell().getValue().toString();
    var cellData = cell.toString();
    
    row = row + 1;
    live.getRange("J1").setValue(array + '&' + cellData);
  }
  column = "B";
  row = 1;
  live.setActiveSelection('B' + row);
   while (row <= r) {
    var array = live.getRange("J1").getValue().toString();
    live.getRange("J1").setValue(array);
    live.setActiveSelection('B' + row);
    var cell = live.getActiveCell().getValue().toString();
    var cellData = cell.toString();
    
    row = row + 1;
    live.getRange("J1").setValue(array + '&' + cellData);
  }
  column = "C";
  row = 1;
  live.setActiveSelection('C' + row);
   while (row <= r) {
    var array = live.getRange("J1").getValue().toString();
    live.getRange("J1").setValue(array);
    live.setActiveSelection('C' + row);
    var cell = live.getActiveCell().getValue().toString();
    var cellData = cell.toString();
    
    row = row + 1;
    live.getRange("J1").setValue(array + '&' + cellData);
  }
   column = "D";
  row = 1;
  live.setActiveSelection('D' + row);
   while (row <= r) {
    var array = live.getRange("J1").getValue().toString();
    live.getRange("J1").setValue(array);
    live.setActiveSelection('D' + row);
    var cell = live.getActiveCell().getValue().toString();
    var cellData = cell.toString();
    
    row = row + 1;
    live.getRange("J1").setValue(array + '&' + cellData);
  }
   column = "E";
  row = 1;
  live.setActiveSelection('E' + row);
   while (row <= r) {
    var array = live.getRange("J1").getValue().toString();
    live.getRange("J1").setValue(array);
    live.setActiveSelection('E' + row);
    var cell = live.getActiveCell().getValue().toString();
    var cellData = cell.toString();
    
    row = row + 1;
    live.getRange("J1").setValue(array + '&' + cellData);
  }
   column = "F";
  row = 1;
  live.setActiveSelection('F' + row);
   while (row <= r) {
    var array = live.getRange("J1").getValue().toString();
    live.getRange("J1").setValue(array);
    live.setActiveSelection('F' + row);
    var cell = live.getActiveCell().getValue().toString();
    var cellData = cell.toString();
    
    row = row + 1;
    live.getRange("J1").setValue(array + '&' + cellData);
  }
  var date = Date();
  var data = live.getRange("J!").getValue();
  var dataRange = live.getRange("J1");
  var record = ss.getSheetByName('Record');
  record.appendRow([date,data]);
  var recordLastRow = record.getLastRow();
  record.getRange('C' + recordLastRow).setFormula('=iferror(REGEXEXTRACT(A' + recordLastRow + ',"..."),"")');
  record.getRange('D' + recordLastRow).setFormula('=IFERROR(regexextract(A' + recordLastRow + ',"[^(A-z){3}]..."),"")');
  record.getRange('E' + recordLastRow).setFormula('=iferror(regexextract(A' + recordLastRow + ',"[^(A-z| ){6}].."),"")');
  record.getRange('F' + recordLastRow).setFormula('=iferror(regexextract(A' + recordLastRow + ',"20.."),"")');
  record.getRange('G' + recordLastRow).setFormula('=iferror(regexextract(A' + recordLastRow + ',".[0-9]:[0-9].:[0-9]."),"")');
  record.getRange('H' + recordLastRow).setFormula('=iferror(regexextract(A' + recordLastRow + ',"[A-Z]..-"),"")');
  record.getRange('I' + recordLastRow).setFormula('=iferror(regexextract(A' + recordLastRow + ',"\\([A-Z]..."),"")');
  var clear = output.getRange(1,15,h,l);
  clear.clearContent();
  dataRange.clearContent();
  
}
function selectedMiner() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var output = ss.getSheetByName('Output');
  var miner = ss.getSheetByName('Miner');
  var activeRange = output.getActiveRange().getValues();
  var aRange = output.getActiveRange();
  var h = aRange.getNumRows();
  var l = aRange.getNumColumns();
  output.getRange(1,15,h,l).setValues(activeRange);

  var live = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Miner');
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var row = 1;
  var column = 1;
  var r = live.getRange("J1").getValue();
  var c = live.getLastColumn();
  var row = 1;
  var column = 1
  live.setActiveSelection('A' + row);
  var cell = live.getActiveCell().getValue();
  var cellData = cell.toString();
  while (row <= r) {
    var array = live.getRange("J2").getValue().toString();
    live.getRange("J2").setValue(array);
    live.setActiveSelection('A' + row);
    var cell = live.getActiveCell().getValue().toString();
    var cellData = cell.toString();
    
    row = row + 1;
    live.getRange("J2").setValue(array + '&' + cellData);
  }
  column = "B";
  row = 1;
  live.setActiveSelection('B' + row);
   while (row <= r) {
    var array = live.getRange("J2").getValue().toString();
    live.getRange("J2").setValue(array);
    live.setActiveSelection('B' + row);
    var cell = live.getActiveCell().getValue().toString();
    var cellData = cell.toString();
    
    row = row + 1;
    live.getRange("J2").setValue(array + '&' + cellData);
  }
  column = "C";
  row = 1;
  live.setActiveSelection('C' + row);
   while (row <= r) {
    var array = live.getRange("J2").getValue().toString();
    live.getRange("J2").setValue(array);
    live.setActiveSelection('C' + row);
    var cell = live.getActiveCell().getValue().toString();
    var cellData = cell.toString();
    
    row = row + 1;
    live.getRange("J2").setValue(array + '&' + cellData);
  }
   column = "D";
  row = 1;
  live.setActiveSelection('D' + row);
   while (row <= r) {
    var array = live.getRange("J2").getValue().toString();
    live.getRange("J2").setValue(array);
    live.setActiveSelection('D' + row);
    var cell = live.getActiveCell().getValue().toString();
    var cellData = cell.toString();
    
    row = row + 1;
    live.getRange("J2").setValue(array + '&' + cellData);
  }
   column = "E";
  row = 1;
  live.setActiveSelection('E' + row);
   while (row <= r) {
    var array = live.getRange("J2").getValue().toString();
    live.getRange("J2").setValue(array);
    live.setActiveSelection('E' + row);
    var cell = live.getActiveCell().getValue().toString();
    var cellData = cell.toString();
    
    row = row + 1;
    live.getRange("J2").setValue(array + '&' + cellData);
  }
   column = "F";
  row = 1;
  live.setActiveSelection('F' + row);
   while (row <= r) {
    var array = live.getRange("J2").getValue().toString();
    live.getRange("J2").setValue(array);
    live.setActiveSelection('F' + row);
    var cell = live.getActiveCell().getValue().toString();
    var cellData = cell.toString();
    
    row = row + 1;
    live.getRange("J2").setValue(array + '&' + cellData);
  }
  var date = Date();
  var data = live.getRange("J2").getValue();
  var dataRange = live.getRange("J2");
  var record = ss.getSheetByName('Record');
  record.appendRow([date,data]);
  var recordLastRow = record.getLastRow();
  record.getRange('C' + recordLastRow).setFormula('=iferror(REGEXEXTRACT(A' + recordLastRow + ',"..."),"")');
  record.getRange('D' + recordLastRow).setFormula('=IFERROR(regexextract(A' + recordLastRow + ',"[^(A-z){3}]..."),"")');
  record.getRange('E' + recordLastRow).setFormula('=iferror(regexextract(A' + recordLastRow + ',"[^(A-z| ){6}].."),"")');
  record.getRange('F' + recordLastRow).setFormula('=iferror(regexextract(A' + recordLastRow + ',"20.."),"")');
  record.getRange('G' + recordLastRow).setFormula('=iferror(regexextract(A' + recordLastRow + ',".[0-9]:[0-9].:[0-9]."),"")');
  record.getRange('H' + recordLastRow).setFormula('=iferror(regexextract(A' + recordLastRow + ',"[A-Z]..-"),"")');
  record.getRange('I' + recordLastRow).setFormula('=iferror(regexextract(A' + recordLastRow + ',"\\([A-Z]..."),"")');
  var clear = output.getRange(1,15,h,l);
  clear.clearContent();
  dataRange.clearContent();
}

function sendData() {
  var ss = SpreadsheetApp.getActiveSpreadsheet(); 
  var record = SpreadsheetApp.setActiveSheet(ss.getSheetByName('Record'));
  var output = SpreadsheetApp.setActiveSheet(ss.getSheetByName('Output'));
  var a = output.getRange('A1:A200').getValues().join('%|$');
  var b = output.getRange('B1:B200').getValues().join('%|$');
  var c = output.getRange('C1:C200').getValues().join('%|$');
  var d = output.getRange('D1:D200').getValues().join('%|$');
  var e = output.getRange('E1:E200').getValues().join('%|$');
  var f = output.getRange('F1:F200').getValues().join('%|$');
  var g = output.getRange('G1:G200').getValues().join('%|$');
  var h = output.getRange('H1:H200').getValues().join('%|$');
  var allData = a + '*^@' + b + '*^@' + c + '*^@' + d + '*^@' + e + '*^@' + f + '*^@' + g + '*^@' + h;
  var column = ss.getRange("Output!B3:B200").getValues().toString();
  var column1 = ss.getRange("Output!B3:B200").getValues();
  var column2 = ss.getRange("Output!H3:H200").getValues().toString();
  var column3 = ss.getRange("Output!I3:I200").getValues().toString();
  var column4 = ss.getRange("Output!I3:I200").getValues();
  var ss = SpreadsheetApp.getActiveSpreadsheet(); 
  var live = SpreadsheetApp.setActiveSheet(ss.getSheetByName('Output'));
  var record = SpreadsheetApp.setActiveSheet(ss.getSheetByName('Record'));
  var row = record.getLastRow();
  var column = record.getLastColumn();
  var range = record.getRange(1,1,row, column);
  var body = range.toString();
  var email = 'thomasw@clicksignal.com';
  var subject = 'EMP DATA SUMARY';
  var date = Date();
  record.appendRow([date,allData]);
  var recordLastRow = record.getLastRow();
  record.getRange('C' + recordLastRow).setFormula('=iferror(REGEXEXTRACT(A' + recordLastRow + ',"..."),"")');
  record.getRange('D' + recordLastRow).setFormula('=IFERROR(regexextract(A' + recordLastRow + ',"[^(A-z){3}]..."),"")');
  record.getRange('E' + recordLastRow).setFormula('=iferror(regexextract(A' + recordLastRow + ',"[^(A-z| ){6}].."),"")');
  record.getRange('F' + recordLastRow).setFormula('=iferror(regexextract(A' + recordLastRow + ',"20.."),"")');
  record.getRange('G' + recordLastRow).setFormula('=iferror(regexextract(A' + recordLastRow + ',".[0-9]:[0-9].:[0-9]."),"")');
  record.getRange('H' + recordLastRow).setFormula('=iferror(regexextract(A' + recordLastRow + ',"[A-Z]..-"),"")');
  record.getRange('I' + recordLastRow).setFormula('=iferror(regexextract(A' + recordLastRow + ',"\\([A-Z]..."),"")');
  live.getRange("J1").clearContent();
  MailApp.sendEmail(email, subject, allData);
}
function dailyPaste() {
  var ss = SpreadsheetApp.getActiveSpreadsheet(); 
  var record = SpreadsheetApp.setActiveSheet(ss.getSheetByName('Record'));
  var output = SpreadsheetApp.setActiveSheet(ss.getSheetByName('Output'));
  var column = ss.getRange("Output!B3:B200").getValues().toString();
  var column1 = ss.getRange("Output!B3:B200").getValues();
  var column2 = ss.getRange("Output!H3:H200").getValues().toString();
  var column3 = ss.getRange("Output!I3:I200").getValues().toString();
  var column4 = ss.getRange("Output!I3:I200").getValues(); 
  var a = output.getRange('A1:A200').getValues().join('%|$');
  var b = output.getRange('B1:B200').getValues().join('%|$');
  var c = output.getRange('C1:C200').getValues().join('%|$');
  var d = output.getRange('D1:D200').getValues().join('%|$');
  var e = output.getRange('E1:E200').getValues().join('%|$');
  var f = output.getRange('F1:F200').getValues().join('%|$');
  var g = output.getRange('G1:G200').getValues().join('%|$');
  var h = output.getRange('H1:H200').getValues().join('%|$');
  var allData = a + '*^@' + b + '*^@' + c + '*^@' + d + '*^@' + e + '*^@' + f + '*^@' + g + '*^@' + h;
  var email = 'thomasw@clicksignal.com';
  var subject = 'EMP Automator';
  var date = Date();
  var body = 'Inspect EMP Automator for changes';
  ss.getRange("Output!I3:I200").setValues(column1);
  ss.getRange("Output!H3:H200").setValues(column4);
  ss.getRange("Record!A1").setValue(date);
  record.appendRow([date,allData]);
  var recordLastRow = record.getLastRow();
  record.getRange('C' + recordLastRow).setFormula('=iferror(REGEXEXTRACT(A' + recordLastRow + ',"..."),"")');
  record.getRange('D' + recordLastRow).setFormula('=IFERROR(regexextract(A' + recordLastRow + ',"[^(A-z){3}]..."),"")');
  record.getRange('E' + recordLastRow).setFormula('=iferror(regexextract(A' + recordLastRow + ',"[^(A-z| ){6}].."),"")');
  record.getRange('F' + recordLastRow).setFormula('=iferror(regexextract(A' + recordLastRow + ',"20.."),"")');
  record.getRange('G' + recordLastRow).setFormula('=iferror(regexextract(A' + recordLastRow + ',".[0-9]:[0-9].:[0-9]."),"")');
  record.getRange('H' + recordLastRow).setFormula('=iferror(regexextract(A' + recordLastRow + ',"[A-Z]..-"),"")');
  record.getRange('I' + recordLastRow).setFormula('=iferror(regexextract(A' + recordLastRow + ',"\\([A-Z]..."),"")');
}
function functionAlert() {
  var ss = SpreadsheetApp.getActiveSpreadsheet(); 
  var record = SpreadsheetApp.setActiveSheet(ss.getSheetByName('Record'));
  var column = ss.getRange("Output!B3:B200").getValues().toString();
  var column1 = ss.getRange("Output!B3:B200").getValues();
  var column2 = ss.getRange("Output!H3:H200").getValues().toString();
  var column3 = ss.getRange("Output!I3:I200").getValues().toString();
  var column4 = ss.getRange("Output!I3:I200").getValues();
  ss.getRange("Output!I3:I200").setValues(column1);
  if (column3 != column2) {
  var ss = SpreadsheetApp.getActiveSpreadsheet(); 
  var record = SpreadsheetApp.setActiveSheet(ss.getSheetByName('Record'));
  var output = SpreadsheetApp.setActiveSheet(ss.getSheetByName('Output'));
  var column = ss.getRange("Output!B3:B200").getValues().toString();
  var column1 = ss.getRange("Output!B3:B200").getValues();
  var column2 = ss.getRange("Output!H3:H200").getValues().toString();
  var column3 = ss.getRange("Output!I3:I200").getValues().toString();
  var column4 = ss.getRange("Output!I3:I200").getValues(); 
  var a = output.getRange('A1:A200').getValues().join('%|$');
  var b = output.getRange('B1:B200').getValues().join('%|$');
  var c = output.getRange('C1:C200').getValues().join('%|$');
  var d = output.getRange('D1:D200').getValues().join('%|$');
  var e = output.getRange('E1:E200').getValues().join('%|$');
  var f = output.getRange('F1:F200').getValues().join('%|$');
  var g = output.getRange('G1:G200').getValues().join('%|$');
  var h = output.getRange('H1:H200').getValues().join('%|$');
  var allData = a + '*^@' + b + '*^@' + c + '*^@' + d + '*^@' + e + '*^@' + f + '*^@' + g + '*^@' + h;
  var column = ss.getRange("Output!B3:B200").getValues().toString();
  var column1 = ss.getRange("Output!B3:B200").getValues();
  var column2 = ss.getRange("Output!H3:H200").getValues().toString();
  var column3 = ss.getRange("Output!I3:I200").getValues().toString();
  var column4 = ss.getRange("Output!I3:I200").getValues();
  var email = 'thomasw@clicksignal.com';
  var subject = 'EMP Automator';
  var date = Date();
  var body = 'Inspect EMP Automator for changes';
  ss.getRange("Output!I3:I200").setValues(column1);
  MailApp.sendEmail(email, subject, body);
  ss.getRange("Output!H3:H200").setValues(column4);
  ss.getRange("Record!A1").setValue(date);
  var recordLastRow = record.getLastRow();
  var cEquation = record.getRange('C' + recordLastRow).getFormula();
  var dEquation = record.getRange('D' + recordLastRow).getFormula();
  var eEquation = record.getRange('E' + recordLastRow).getFormula();
  var fEquation = record.getRange('F' + recordLastRow).getFormula();
  var gEquation = record.getRange('G' + recordLastRow).getFormula();
  var hEquation = record.getRange('H' + recordLastRow).getFormula();
  var iEquation = record.getRange('I' + recordLastRow).getFormula();
  record.appendRow([date,allData]);
  var recordLastRow = record.getLastRow();
  record.getRange('C' + recordLastRow).setFormula('=iferror(REGEXEXTRACT(A' + recordLastRow + ',"..."),"")');
  record.getRange('D' + recordLastRow).setFormula('=IFERROR(regexextract(A' + recordLastRow + ',"[^(A-z){3}]..."),"")');
  record.getRange('E' + recordLastRow).setFormula('=iferror(regexextract(A' + recordLastRow + ',"[^(A-z| ){6}].."),"")');
  record.getRange('F' + recordLastRow).setFormula('=iferror(regexextract(A' + recordLastRow + ',"20.."),"")');
  record.getRange('G' + recordLastRow).setFormula('=iferror(regexextract(A' + recordLastRow + ',".[0-9]:[0-9].:[0-9]."),"")');
  record.getRange('H' + recordLastRow).setFormula('=iferror(regexextract(A' + recordLastRow + ',"[A-Z]..-"),"")');
  record.getRange('I' + recordLastRow).setFormula('=iferror(regexextract(A' + recordLastRow + ',"\\([A-Z]..."),"")');
  updater();
  } 
}
function TEST() {
  var date = Date();
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.appendRow([date]);
}
function doTest() {
  var ss = SpreadsheetApp.getActiveSpreadsheet(); 
  var column =  ss.getRange("Output!I3").getValues().toString();
  var column2 =  ss.getRange("Output!H3").getValues().toString();
  var column3 = ss.getRange("Output!I3").getValues().toString();
  if(column3 != column2) {
    ss.getRange("Output!L1").setValue(1);
} else null
}
function updater() {
  var ss = SpreadsheetApp.openById('1Q6DfbfJbELa1-OveoPZuCfKkmBznr3c4e3uhmBc0dhE');
  var source = SpreadsheetApp.openById('1ipluZv1bCHf_q-sLOICXsRHWbA1SttrUGBvxA41gLz0');
  var open = ss.getSheetByName('Open');
  var import = source.getSheetByName('Output');
  var lastRow = open.getLastRow();
  var start = 1;
  for (i = 0; i < 17; i = i + 1) {
    var active = open.getRange('A' + start).getRow();
    var activeData = open.getRange('A' + start);
    var isBlank = activeData.isBlank();
    var imStart = 1;
    while (active <= lastRow) {
      if (isBlank !== false) {
        var sku = open.getRange('F' + active).getValue();
        var importValue = import.getRange('A' + imStart).getValue();
        while (sku !== importValue) {
          var imStart = imStart + 1;
          var importValue = import.getRange('A' + imStart).getValue();
        }
        var values = import.getRange('B' + imStart + ':F' + imStart).getValues();
        open.getRange('A' + active + ':E' + active).setValues(values);
        var start = start + 1;
        var active = open.getRange('A' + start).getRow();
        var activeData = open.getRange('A' + start);
        var isBlank = activeData.isBlank();
      } else {
        var start = start + 1;
        var active = open.getRange('A' + start).getRow();
        var activeData = open.getRange('A' + start);
        var isBlank = activeData.isBlank();
      }
    }
  }
}
function cleanBreak() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Read');
  var range = sheet.getRange('AT1');
  var str = range.getValue().toString();
  var arr = str.split('^');
  var column = ['BE','BF','BG','BH','BI','BJ','BK','BL'];
  var regex = /[^%$^*|@].+/;
  for (i=0;i<8;i=i+1) {
    var array = arr[i].toString().split('%');
    var start = 1;
    var c = column[i];
    for (j=0;j<200;j=j+1) {
      var r = sheet.getRange(c + start);
      var put = array[j].toString().match(regex);
      if (put != null) {
        var put = put.toString();
      } else {
        var put = '';
        }
      r.setValue(put.toString());
      var start = start + 1;
    }
  }
}
function clearContent() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Read');
  var range = sheet.getRange('BE1:BL200');
  range.clearContent();
}
