
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";


const datetimePicker = document.getElementById("datetime-picker");
const startButton = document.querySelector('[data-start]');
const daysField = document.querySelector('[data-days]');
const hoursField = document.querySelector('[data-hours]');
const minutesField = document.querySelector('[data-minutes]');
const secondsField = document.querySelector('[data-seconds]');


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate < new Date()) {
      Notiflix.Notify.failure("Please choose a date in the future");
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};


flatpickr(datetimePicker, options);


startButton.addEventListener("click", () => {
  const countdownDate = new Date(datetimePicker.value).getTime();
  const countdownInterval = setInterval(() => {
    const currentTime = new Date().getTime();
    const timeDifference = countdownDate - currentTime;
    if (timeDifference < 0) {
      clearInterval(countdownInterval);
      Notiflix.Report.failure('Time is up', 'Please choose a new date', 'OK');
      startButton.disabled = true;
    } else {
      const time = convertMs(timeDifference);
      daysField.textContent = formatTime(time.days);
      hoursField.textContent = formatTime(time.hours);
      minutesField.textContent = formatTime(time.minutes);
      secondsField.textContent = formatTime(time.seconds);
    }
  }, 1000);
});


function formatTime(timeValue) {
  return timeValue.toString().padStart(2, "0");
}


function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor((ms % hour) / minute);
  const seconds = Math.floor((ms % minute) / second);
  return { days, hours, minutes, seconds };
}
