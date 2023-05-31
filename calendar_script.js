// creating the calendar
const calendar = document.querySelector(".calendar"),
	date = document.querySelector(".date"),
	daysContainer = document.querySelector(".days"),
	prev = document.querySelector(".prev"),
	next = document.querySelector(".next"),
	todayBtn = document.querySelector(".today-btn"),
	gotoBtn = document.querySelector(".goto-btn"),
	dateInput = document.querySelector(".date-input"),
	eventDay = document.querySelector(".event-day"),
	eventDate = document.querySelector(".event-date"),
	eventsContainer = document.querySelector(".events"),
    addEventSubmit = document.querySelector(".add-event-btn");

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];
//events array
/* const eventsArr = [
{
	day:24,
	month:5,
	year: 2023,
	events: [
	{
		title: "Event 1 lorem ipsun dolar sit genfa tersd dsad",
		time: "10:00 AM",
	},
	{
		title:"Event 2",
		time: "11:00 AM",
	},
	],
    },
//
{
	day:29,
	month:5,
	year: 2023,
	events: [
	{
		title: "Event 1 lorem ipsun dolar sit genfa tersd dsad",
		time: "10:00 AM",
	},
	],
    },
]; */
let eventsArr = [];
getEvents();

// function to add days
function initCalendar() {
	// to get prev month days and current month all days and rem next month days
	const firstDay = new Date(year, month, 1);
	const lastDay = new Date(year, month + 1, 0);
	const prevLastDay = new Date(year, month, 0);
	const prevDays = prevLastDay.getDate();
	const lastDate = lastDay.getDate();
	const day = firstDay.getDay();
	const nextDays = 7 - lastDay.getDay() - 1;

	// update date top of calendar
	date.innerHTML = months[month] + " " + year;

	//adding days on dom
	let days = "";
	//prev month days
	for (let x = day; x > 0; x--) {
		days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
	}
	//current month days
	for (let i = 1; i <= lastDate; i++) {
	//check if there is an event on the current date
	let event = false;
	eventsArr.forEach((eventObj) => {
		if(
		eventObj.day == i &&
		eventObj.month == month + 1 &&
		eventObj.year == year
		)
		{
		 // if event found
		 event = true;
		}
	})
		//if day is today add class today
		if (
			i === new Date().getDate() &&
			year === new Date().getFullYear() &&
			month === new Date().getMonth()
		) {
			activeDay = i;
			getActiveDay(i);
			updateEvents(i);
			// if event found also add event class
			
			//add active on today at start
			if(event){
			days += `<div class="day today active event">${i}</div>`;
			}
			else {
		 		days += `<div class="day today active">${i}</div>`;
		}
			
		else {
			if(event){
			days += `<div class="day event">${i}</div>`;
			}
			else {
		 		days += `<div class="day ">${i}</div>`;
		}
		}
	}
	// next month days
	for (let j = 1; j <= nextDays; j++) {
		days += `<div class="day next-date">${j}</div>`;
	}
	daysContainer.innerHTML = days;
	//listner for events after calendar is initialized
	addListner();
}
initCalendar();


	// prev month
	function prevMonth() {
		month--;
		if (month < 0) {
			month = 11;
			year--;
		}
		initCalendar();
	}

	//next month
	function nextMonth() {
		month++;
		if (month > 11) {
			month = 0;
			year++;
		}
		initCalendar();
	}

	// add event listener on prev and next month
	prev.addEventListener("click", prevMonth);
	next.addEventListener("click", nextMonth);

	initCalendar();
	// calendar is ready

	// Go to date and Go to today functions
	todayBtn.addEventListener("click", () => {
		today = new Date();
		month = today.getMonth();
		year = today.getFullYear();
		initCalendar();
	});

	dateInput.addEventListener("input", (e) => {
		// allows only numbers and nothing else
		dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
		// add a dash after two numbers are entered
		if (dateInput.value.length === 2) {
			dateInput.value += "/";
		}
		// not allowing more than 7 characters
		if (dateInput.value.length > 7) {
			dateInput.value = dateInput.value.slice(0, 7);
		}
		// if backspace pressed
		if (e.inputType === "deleteContentBackward") {
			if (dateInput.value.length === 3) {
				dateInput.value = dateInput.value.slice(0, 2);
			}
		}
	});
	// function to go to entered date
	gotoBtn.addEventListener("click", gotoDate);

	function gotoDate() {
		console.log("here");
		const dateArr = dateInput.value.split("/");
		if (dateArr.length === 2) {
			// date validation
			if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
				month = dateArr[0] - 1;
				year = dateArr[1];
				initCalendar();
				return;
			}
		}
		// if invalid date
		alert("Invalid Date");
}

// Events 
const addEventBtn = document.querySelector(".add-event"),
addEventContainer = document.querySelector(".add-event-wrapper"),
addEventCloseBtn = document.querySelector(".close"),      
addEventTitle = document.querySelector(".event-name"),
addEventFrom = document.querySelector(".event-time-from"),
addEventTo = document.querySelector(".event-time-to");   

//Buttons to add and remove events
addEventBtn.addEventListener("click", () => {
  addEventContainer.classList.toggle("active");
});
addEventCloseBtn.addEventListener("click", () => {
  addEventContainer.classList.remove("active");
});

document.addEventListener("click", (e) => {
// if click outside
   if (e.target != addEventBtn && !addEventContainer.contains(e.target)){
      addEventContainer.classList.remove("active");
   }
});

//time formatting - from time
addEventFrom.addEventListener("input", (e) => {
	// allow anything except numbers
	addEventFrom.value = addEventFrom.value.replace(/[^0-9]/g, "");
	if(addEventFrom.value.length==2){
		addEventFrom.value += ":";
	}
	// this doesn't let the user enter more than 5 chars
	if(addEventFrom.value.length > 5){
		addEventFrom.value = addEventFrom.value.slice(0,5);
	}
});
// time formatting - to time
addEventTo.addEventListener("input", (e) => {
	// allow anything except numbers
	addEventTo.value = addEventTo.value.replace(/[^0-9]/g, "");
	if(addEventTo.value.length==2){
		addEventTo.value += ":";
	}
	// this doesn't let the user enter more than 5 chars
	if(addEventTo.value.length > 5){
		addEventTo.value = addEventTo.value.slice(0,5);
	}
});

//function which adds listner on days after rendered
function addListner(){
    const days = document.querySelectorAll(".day"); 
    days.forEach((day) => {
	day.addEventListener("click", (e) => {
	// set current day as active day
	activeDay = Number(e.target.innerHTML)
	
	//calls active day after click
	getActiveDay(e.target.innerHTML);
	updateEvents(Number(e.target.innerHTML));
		
	// remove active from already active day
	days.forEach((day) => {
		day.classList.remove("active");
		});
	// if prev month day clicked goto prev month and add active
		if(e.target.classList.contains("prev-date")){
			prevMonth();
			
			setTimeout( () => {
			// select all days of that month
			const days = document.querySelectorAll(".day");
			//after going to prev month add active to be clicked	
			days.forEach((day) => {
				if(
				!day.classList.contains("prev-date") && 
				day.innerHTML == e.target.innerHTML){
					day.classList.add("active");
					}
				});
			}, 100);
			// same with next month
		} else 
			if(e.target.classList.contains("next-date")){
			nextMonth();
			
			setTimeout( () => {
			// select all days of that month
			const days = document.querySelectorAll(".day");
			//after going to prev month add active to be clicked	
			days.forEach((day) => {
				if(
				!day.classList.contains("next-date") && 
				day.innerHTML == e.target.innerHTML){
					day.classList.add("active");
					}
				});
			}, 100);
		}
		else {
			//remaining current month days
			e.target.classList.add("active");
		}
     });
	});
}
//show active day events and date at top
function getActiveDay(date){
	const day = new Date(year, month, date);
	const dayName = day.toString().split(" ")[0];
	eventDay.innerHTML = dayName;
	eventDate.innerHTML = date + " " + months [month] + " " + year;
}

// function to show events of the selected day
function updateEvents(date){
	let events = "";
	eventsArr.forEach((event) => {
	// get events of active day only
		if (
		date == event.day &&
		month + 1 == event.month &&
		year == event.year
		){
		// then show event on document
		event.events.forEach((event) => {
		events += '<div class="event">
			<div class="title">
				<i class="fas fa-circle"></i>
				<h3 class="event-title">${event.title}</h3>
			</div>
			<div class="event-time">
				<span class="event-time">${event.time}</span>
			</div>
		</div>
			';
			});
		}
	});
	// if nothing found
	if((event == "")){
	  events = '<div class="no-event">
		<h3>No Events</h3>
		</div>';
	}
	eventsContainer.innerHTML = events;
	//save events when update event called
	saveEvents();
	
}

//function to add events
addEventSubmit.addEventListener("click", () => {
    const eventTitle = addEventTitle.value;
    const eventTimeFrom = addEventFrom.value;
    const eventTimeTo = addEventTo.value;

    // validations
    if(eventTitle == "" || eventTimeFrom == "" || eventTimeTo == ""){
    alert("Please fill all the fields");
	return;
    }
	const timeFromArr = eventTimeFrom.split(":");
	const timeToArr = eventTimeTo.split(":");
	
	if(
	timeFromArr.length != 2 ||
	timeToArr.length != 2 ||
	timeFromArr[0] > 23 ||
	timeFromArr[1] > 59 ||
	timeToArr[0] > 23 ||
	timeToArr[1] > 59
	){
	  alert("Invalid Time Format");
	}
	
	const timeFrom = convertTime(eventTimeFrom);
	const timeTo = convertTime(eventTimeTo);
	const newEvent = {
	title: eventTitle,
		time: timeFrom + " - " + timeTo,
	};
	let eventAdded = false;
	//check if events are not empty
	if (eventsArr.length > 0){
	// check if current day has any event already
		eventsArr.forEach((item) => {
		if(
		 item.day == activeDay &&
		 item.month == month + 1 &&
		 item.year == year
		){
		item.events.push(newEvent);
		eventAdded = true;
		}
		});
	}
	// if event array is empty or current day has no event created
	if(!eventAdded){
		eventsArr.push({
		day: activeDay,
		month: month + 1,
		year: year,
		events: [newEvent],
		});
	}
	// remove active from add event form
	addEventContainer.classList.remove("active")
	//clear the fields
	addEventTitle.value = "";
	addEventFrom.value = "";
	addEventTo.value = "";
	
	//show current added event
	updateEvents(activeDay);
	
	const activeDayElem = document.querySelector(".day.active");
	if(!activeDayElem.classList.contains("event")){
		activeDayElem.classList.add("event");
	}
	
});

function convertTime(time){
	let timeArr = time.split(":");
	let timeHour = timeArr[0];
	let timeMin = timeArr[1];
	let timeFormat = timeHour >= 12 ? "PM" : "AM";
	timeHour = timeHour % 12 || 12;
	time = timeHour + ":" + timeMin + " " + timeFormat;
	return time;
}

// function which removes events on click
eventsConatiner.addEventListener("click", (e) => {
	if(e.target.classList.contains("event")){
	  const eventTitle = e.target.children[0].children[1].innerHTML;
	  // get the title of the event and then serach in the array through it so you can delete it
	  eventsArr.forEach((event) => {
	  if(
	  	event.day == activeDay &&
		event.month == month + 1 &&
		event.year == year
	  ){
	  	event.events.forEach((item, index) => {
		if(item.title == eventTitle){
			event.events.splice(index,1);
		}
		});
		// if no event remaning on that date
		if (event.events.length == 0){
	  	eventsArr.splice(eventsArr.indexOf(event), 1);
		//after remove day also remove active class
		const activeDayElem = document.querySelector(".day.active");
		if(activeDayElem.classList.contains("events")){
		   activeDayElem.classList.remove("event");
		}
	   }	  
	  }
	  });
	//after removing from array, update event
	updateEvents(activeDay);
	}
});

//store events in local storage
function saveEvents(){
	localStorarge.setItem("events", JSON.stringify(eventsArr));
}
	
function getEvents(){
	if(localStorage.getItem("event" == null)){
	return;
	}
	eventsArr.push(...JSON.parse(localStorage.getItem("events")));
}


