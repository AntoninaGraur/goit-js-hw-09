// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";


const datetimePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

let countdownInterval;

function updateCountdown(endTime) {
  const remainingTime = endTime - new Date();

  const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

  daysValue.textContent = days.toString().padStart(2, '0');
  hoursValue.textContent = hours.toString().padStart(2, '0');
  minutesValue.textContent = minutes.toString().padStart(2, '0');
  secondsValue.textContent = seconds.toString().padStart(2, '0');

  if (remainingTime <= 0) {
    clearInterval(countdownInterval);
  }
}

function startCountdown() {
  const selectedDate = flatpickr.parseDate(datetimePicker.value, 'Y-m-d H:i');
  if (selectedDate < new Date()) {
    window.alert('Please choose a date in the future');
    return;
  }
  countdownInterval = setInterval(() => updateCountdown(selectedDate), 1000);
}

startButton.disabled = true;

flatpickr(datetimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates.length > 0 && selectedDates[0] > new Date()) {
      startButton.disabled = false;
    } else {
      startButton.disabled = true;
    }
  },
});

startButton.addEventListener('click', startCountdown);

