/* Initial includes for abstracted code. */
Ti.include(
	"lib/dateFormat.js",
	"lib/createDatePickerWin.js"
);

/* Initial Window object creation */
var win1 = Titanium.UI.createWindow({  
    title:'Date Selector Ex',
    backgroundColor:'#fff',
		layout:"vertical"
});

/* Variable initialization.  We want to use the values of these variables in this scope,
but will assign them from within the createDatePickerWin function. */
var startTime = "";
var endTime = "";

/* UI object instantiation */
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

var lblHeader = Titanium.UI.createLabel({
	color:'#000',
	text:'Date Selector Example',
	font:{fontSize:24,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto',
	top:10
});

/* Object assignments */
eventDate.add(lblStartsEnds);
eventDate.add(lblTimes);
win1.add(lblHeader);
win1.add(eventDate);

/* Triggers */
eventDate.addEventListener("click", function() {
	/* Function call to included file.  This allows for some more modular codebases */ 
	createDatePickerWin();
});

/* Finally, open the window */
win1.open();
