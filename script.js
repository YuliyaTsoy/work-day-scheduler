// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var localeSettings = {};
dayjs.locale(localeSettings);

// Dependancies
var userInput = $(".description");
var saveButton = $(".saveBtn");
var timeblock = $(".time-block");
var hour = $(".hour");

// Data
var today = dayjs();
var hoursNow = dayjs().format("H");

// Functions

// By pressing saveButton corresponding data is saved in the local storage
saveButton.on("click", function () {
  userInput = $(this).siblings("textarea").val().trim();
  hour = $(this).siblings("div").attr("id");

  localStorage.setItem(hour, userInput);
});

// checks current time and compares it to time on the scheduler. assigns different colors to the time blocks: past(grey), present (red), future (green)
function checkCurrentTime() {
  timeblock.each(function () {
    var time = parseInt($(this).attr("id"));

    if (time === hoursNow) {
      timeblock.addClass("present");
      timeblock.removeClass("future");
      timeblock.removeClass("past");
    } else if (time < hoursNow) {
      timeblock.addClass("past");
      timeblock.removeClass("future");
      timeblock.removeClass("present");
    } else {
      timeblock.addClass("future");
      timeblock.removeClass("past");
      timeblock.removeClass("present");
    }
  });
}
checkCurrentTime();

// gets data from local storage and puts it back on the page: upon refresh data persists
timeblock.each(function () {
  var key = $(this).attr("id");
  var value = localStorage.getItem(key);
  $(this).children(userInput).val(value);
});

// displays current date in the header

$("#currentDay").text(today.format("MMM D, YYYY"));
