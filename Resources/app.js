// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();

var win1 = Titanium.UI.createWindow({  
    title:'Date Selector Ex',
    backgroundColor:'#fff',
		layout:"vertical"
});
var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'ex',
    window:win1
});

var startTime = "";
var endTime = "";

var lblStartsEnds = Ti.UI.createLabel({
	font: {
   fontSize:14,
   fontWeight:'bold'
  },
	text: "Starts\nEnds",
	left:10,
	top:0
});

var lblTimes = Ti.UI.createLabel({
	font: {
   fontFamily:"Helvetica Neue",
   fontSize:14,
   fontWeight:'bold'
  },
	text: startTime + "\n" + endTime,
	left:70,
	top:0
});

var eventDate = Ti.UI.createButton({
	top:8,
  width:300,
  height:60,
	color:"#000",
  font: {fontSize:16, fontWeight:'bold'},
  borderRadius:5
});

eventDate.add(lblStartsEnds);
eventDate.add(lblTimes);

var lblHeader = Titanium.UI.createLabel({
	color:'#000',
	text:'Date Selector Example',
	font:{fontSize:24,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto',
	top:10
});

win1.add(lblHeader);
win1.add(eventDate);

//
//  add tabs
//
tabGroup.addTab(tab1);  

// open tab group
tabGroup.open();

eventDate.addEventListener('click', function() {
	var startOrEnd = "start";
	var dateSelectWin = Titanium.UI.createWindow({
		backgroundColor:"#fff"
	});
	var saveButton = Ti.UI.createButton({
    bottom:10,
    width:300,
    height:40,
    font: {fontSize:16, fontWeight:'bold'},
    borderRadius:10,
    backgroundImage:'none',
    backgroundGradient:{ type:'linear', colors:['#5594bd','#185f8d']},
    title:'Done'
	});
	var backButton = Titanium.UI.createButton({
    systemButton: Titanium.UI.iPhone.SystemButton.CANCEL,
		title:"Back"
  });

	dateSelectWin.setLeftNavButton(backButton);
	backButton.addEventListener("click", function() {
		dateSelectWin.close();
	});
	
	saveButton.addEventListener("click", function() {
		dateSelectWin.close();
	});
	
	var minDate = new Date();
	minDate.setFullYear(2011);
	minDate.setMonth(0);
	minDate.setDate(1);
	
	var maxDate = new Date();
	maxDate.setFullYear(2099);
	maxDate.setMonth(11);
	maxDate.setDate(31);
	
	var value = new Date ();
	value.setFullYear(2011);
	value.setMonth(2);
	value.setDate(1);

	var picker = Ti.UI.createPicker({
		type:Ti.UI.PICKER_TYPE_DATE_AND_TIME,
		minDate:minDate,
		maxDate:maxDate,
		value:value,
		bottom:60
	});
	picker.selectionIndicator = true;
	
	var buttonStart = Ti.UI.createLabel({
		top:10,
    width:300,
    height:40,
		color:"#fff",
		backgroundGradient:{
      type:'linear',
      colors:['#5594bd','#185f8d']
    },
    font: {fontSize:14},
    borderRadius:5
	});
	
	var nonRoundedCover = Ti.UI.createLabel({
		backgroundColor:"#fff",
		width:300,
		height:80,
		top:30
	});
	
	var lblStarts = Ti.UI.createLabel({
		font: {
     fontFamily:"Helvetica Neue",
     fontSize:14,
		 fontWeight:'bold'
    },
		text: "Starts",
		color:"#fff",
		left:10,
		top:0
	});
	
	var lblStartTime = Ti.UI.createLabel({
		font: {
     fontFamily:"Helvetica Neue",
     fontSize:14},
		text: startTime,
		right:0,
		top:0,
		width:200
	});
	
	buttonStart.addEventListener('click', function() {
		startOrEnd = 'start';
		buttonStart.backgroundGradient = {
      type:'linear',
      colors:['#5594bd','#185f8d']
    };
		lblStarts.color = "#fff";
		lblStartTime.color = "#fff";
		buttonEnd.backgroundGradient = {type:'linear', color:["#fff"]};
		lblEnd.color = "#000";
		lblEndTime.color = "#000";
	});
	
	var buttonEnd = Ti.UI.createLabel({
		top:50,
    width:300,
    height:40,
		color:"#000",
		backgroundColor:"#fff",
    font: {fontSize:14},
    borderRadius:5
	});
	
	var lblEnd = Ti.UI.createLabel({
		font: {
     fontFamily:"Helvetica Neue",
     fontSize:14,
		 fontWeight:'bold'
    },
		text: "Ends",
		left:10,
		top:0
	});
	
	var lblEndTime = Ti.UI.createLabel({
		font: {
     fontFamily:"Helvetica Neue",
     fontSize:14},
		text: endTime,
		right:0,
		top:0,
		width:200
	});
	
	buttonEnd.addEventListener('click', function() {
		startOrEnd = 'end';
		buttonStart.backgroundGradient = {type:'linear', colors:["#fff", '#fff']};
		lblStarts.color = "#000";
		lblStartTime.color = "#000";
		buttonEnd.backgroundGradient = {
      type:'linear',
      colors:['#5594bd','#185f8d']
    };
		lblEnd.color = "#fff";
		lblEndTime.color = "#fff";
	});
	
	var timeValue;
	picker.addEventListener("change", function(e) {
		timeValue = new Date(e.value);
		Ti.API.log("Selected Value: " + timeValue);
		var timeFormatted;
		if (allDaySwitch.value == 0) {
			timeFormatted = dateFormat(timeValue, "ddd mmm dd yyyy h:MM TT");
		} else {
			timeFormatted = dateFormat(timeValue, "ddd mmm dd yyyy");
		};
		
		if (startOrEnd == 'start') {
			if (allDaySwitch.value == 1) {
				lblEndTime.text = timeFormatted + " 11:59 PM";
				endTime = timeFormatted + " 11:59 PM";
				timeFormatted += " 12:00 AM";
			};
			lblStartTime.text = timeFormatted;
			startTime = timeFormatted;
		} else if (startOrEnd == "end") {
			if (allDaySwitch.value == 1) {
				timeFormatted += " 11:59 PM";
			}
			lblEndTime.text = timeFormatted;
			endTime = timeFormatted;
		};
	});
	
	var buttonAllDay = Ti.UI.createLabel({
		top:90,
    width:300,
    height:40,
		color:"#000",
		backgroundColor:"#fff",
    font: {fontSize:14},
    borderRadius:5
	});
	
	var lblAllDay = Ti.UI.createLabel({
		text:"All-day",
		font: {
     fontFamily:"Helvetica Neue",
     fontSize:14,
		 fontWeight:'bold'
    },
		left:10,
		top:0
	});
	
	var allDaySwitch = Ti.UI.createSwitch({
		value:false,
		right:20,
		top:97
	});
	
	allDaySwitch.addEventListener('change', function(e) {
		Ti.API.log(e.value);
		if (e.value == 1) {
			picker.type = Ti.UI.PICKER_TYPE_DATE;
		} else if (e.value == 0) {
			picker.type = Ti.UI.PICKER_TYPE_DATE_AND_TIME;
		}
	});
	
	saveButton.addEventListener('click', function() {
		lblTimes.text = startTime + "\n" + endTime;
	});
	
	buttonStart.add(lblStarts);
	buttonStart.add(lblStartTime);
	buttonEnd.add(lblEnd);
	buttonEnd.add(lblEndTime);
	buttonAllDay.add(lblAllDay);
	
	dateSelectWin.add(nonRoundedCover);
	dateSelectWin.add(buttonStart);
	dateSelectWin.add(buttonEnd);
	dateSelectWin.add(buttonAllDay);
	dateSelectWin.add(allDaySwitch);
	dateSelectWin.add(picker);
	dateSelectWin.add(saveButton);
	dateSelectWin.open({modal:true, modalTransitionStyle: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_CROSS_DISSOLVE, modalStyle: Ti.UI.iPhone.MODAL_PRESENTATION_FORMSHEET});
});
