function createDatePickerWin() {
	/* Create a place holder variable that influences the selection logic as well as 
	holds the selections for later */
	var startOrEnd = "start";
	var timeValue;
	
	/* Create Window object used to bring objects into view */
	var dateSelectWin = Titanium.UI.createWindow({
		backgroundColor:"#fff"
	});
	
	/* Create button to be used as left nav for cancel */
	var backButton = Titanium.UI.createButton({
    systemButton: Titanium.UI.iPhone.SystemButton.CANCEL
  });

	/* If the user wants to cancel, just close the window.  Don't even worry about 
	saving any information.  This is what the done button accomplishes. */
	backButton.addEventListener("click", function() {
		dateSelectWin.close();
	});

	/* This nifty little assignment allows you to add a left nav button, or to override the default */
	dateSelectWin.setLeftNavButton(backButton);
	
	/* Create some date objects to hold the min and max as well as current 
	dates to be used in my picker. */
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

	/* Here, I am creating the picker of the specific PICKER_TYPE_DATE_AND_TIME type
	to emulate the iCal picker.  Not really emulating much as this is a platform construct. */
	var picker = Ti.UI.createPicker({
		type:Ti.UI.PICKER_TYPE_DATE_AND_TIME,
		minDate:minDate,
		maxDate:maxDate,
		value:value,
		bottom:60
	});
	/* Setting the selectionIndicator to true makes that blue bar that stays over the centerpoint of that
	picker visible.  Otherwise, users may be shooting the dark with what values they're selecting */
	picker.selectionIndicator = true;
	
	/* Creating the objects for the top of the window that allow for start and end selections 
	I call these buttons because they're behaving like buttons with a highlight color, but in all actuality
	they're simply labels.  Also, we're going to set the buttonStart as *selected* off the bat.  */
	var buttonStart = Ti.UI.createLabel({
		top:10,
    width:300,
    height:40,
		color:"#fff",
		backgroundGradient:{
      type:'linear',
      colors:['#f000ff','#333']
    },
    font: {fontSize:14},
    borderRadius:5
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
	
	var buttonAllDay = Ti.UI.createLabel({
		top:90,
    width:300,
    height:40,
		color:"#000",
		backgroundColor:"#fff",
    font: {fontSize:14},
    borderRadius:5
	});
	
	/* My not-so-good attempt at creating the flat borders in the middle and rounded top and bottom edges */
	var nonRoundedCover = Ti.UI.createLabel({
		backgroundColor:"#fff",
		width:300,
		height:80,
		top:30
	});
	
	/* Objects to add to the labels created a few lines ago. */
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
		color:"#fff",
		right:0,
		top:0,
		width:200
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
	
	/* This switch basically swaps functionality between all day events, and events
	with specific start and end times. */
	var allDaySwitch = Ti.UI.createSwitch({
		value:false,
		right:20,
		top:97
	});
	
	var doneButton = Ti.UI.createButton({
    bottom:10,
    width:300,
    height:40,
    font: {fontSize:16, fontWeight:'bold'},
    borderRadius:10,
    backgroundImage:'none',
    backgroundGradient:{ type:'linear', colors:['#f000ff','#333']},
    title:'Done'
	});
	
	/* TRIGGERS */
	allDaySwitch.addEventListener('change', function(e) {
		/* Logic to change the picker type on the fly depending on if its an all day event
		or whether it has a specific start and end time. */
		if (e.value == 1) {
			picker.type = Ti.UI.PICKER_TYPE_DATE;
		} else if (e.value == 0) {
			picker.type = Ti.UI.PICKER_TYPE_DATE_AND_TIME;
		}
	});
	
	doneButton.addEventListener("click", function() {
		/* Sets the lblTimes object from the outer window scope to our selected startTime and endTime 
		combination */
		lblTimes.text = startTime + "\n" + endTime;
		dateSelectWin.close();
	});
	
	picker.addEventListener("change", function(e) {
		timeValue = new Date(e.value);
		/* Implementation of the dateFormat library I included 
		Formats the date/time based on whether the event is an all day event or has specific
		start and end times*/
		var timeFormatted;
		if (allDaySwitch.value == 0) {
			timeFormatted = dateFormat(timeValue, "ddd mmm dd yyyy h:MM TT");
		} else {
			timeFormatted = dateFormat(timeValue, "ddd mmm dd yyyy");
		};
		
		/* If all day is selected, start times start at 12:00 AM and by default set the end time to 
		the same day, but at 11:59 PM.  If the end date is selected, it just changes that date and leaves
		the start alone. */
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
	
	/* These next two event listeners basically act as faux-button functionality.
	Since the Objects are label constructs, I want them to look like selected buttons 
	The gradients can be changed, I just thought they were pretty */
	buttonEnd.addEventListener('click', function() {
		startOrEnd = 'end';
		buttonStart.backgroundGradient = {type:'linear', colors:["#fff", '#fff']};
		lblStarts.color = "#000";
		lblStartTime.color = "#000";
		buttonEnd.backgroundGradient = {
      type:'linear',
      colors:['#f000ff','#333']
    };
		lblEnd.color = "#fff";
		lblEndTime.color = "#fff";
	});
	
	buttonStart.addEventListener('click', function() {
		startOrEnd = 'start';
		buttonStart.backgroundGradient = {
      type:'linear',
      colors:['#f000ff','#333']
    };
		lblStarts.color = "#fff";
		lblStartTime.color = "#fff";
		buttonEnd.backgroundGradient = {type:'linear', color:["#fff"]};
		lblEnd.color = "#000";
		lblEndTime.color = "#000";
	});
	
	/* In the end, add everything to objects and to the window (stage) */
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
	dateSelectWin.add(doneButton);
	
	/* Open the window with an animation, these can be swapped out easy as well */
	dateSelectWin.open({modal:true, modalTransitionStyle: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_CROSS_DISSOLVE, modalStyle: Ti.UI.iPhone.MODAL_PRESENTATION_FORMSHEET});
};
