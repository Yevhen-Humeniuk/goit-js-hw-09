import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import { Notify } from 'notiflix';

const refs = {
    dtPicker: document.querySelector('#datetime-picker'),
    btnStart: document.querySelector('button[data-start]'),
    leftTime:
    {
        days: document.querySelector(".timer [data-days]"),
        hours: document.querySelector(".timer [data-hours]"),
        minutes: document.querySelector(".timer [data-minutes]"),
        seconds: document.querySelector(".timer [data-seconds]"),
    },
};
refs.btnStart.setAttribute("disabled", true);

const datePickerOptions = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    dateFormat: 'd-m-Y H:i',
    onClose(selectedDates) {
        return checkDate(selectedDates)
    },
};
flatpickr(refs.dtPicker, datePickerOptions);

let interavlId = null;

function checkDate(selectedDates) {
    const toDay = (new Date()).getTime();
    const selectedDate = selectedDates[0].getTime();

    if (toDay >= selectedDate) {
        return Notify.warning('Please choose a date in the future');
    }

    refs.btnStart.removeAttribute("disabled");

    const onBtnStartClk = () => {
        refs.btnStart.setAttribute("disabled", true);
        refs.dtPicker.setAttribute("disabled", true);

        interavlId = setInterval(onChooseDate, 1000, selectedDate)
    }

    refs.btnStart.addEventListener('click', onBtnStartClk);
}

function onChooseDate(selectedDate) {
    const toDay = (new Date()).getTime();

    if (toDay >= selectedDate) {
        clearInterval(interavlId);
        refs.dtPicker.removeAttribute("disabled");
        return;
    }
    // осталось времени по категориям
    const leftTimeObj = convertMs(selectedDate - toDay);

    // Перебор ключей объекта ссылок
    // updateTimerValue(refs.leftTime, leftTimeObj);
    
    const updateTimerValue = dtProp => {
        refs.leftTime[dtProp].textContent = addLeadingZero(leftTimeObj[dtProp]);
    };

    Object.keys(refs.leftTime).forEach(updateTimerValue);

};


// function updateTimerValue({ days, hours, minutes, seconds }, leftTime) {
//     days.textContent = addLeadingZero(leftTime.days);
//     hours.textContent = addLeadingZero(leftTime.hours);
//     minutes.textContent = addLeadingZero(leftTime.minutes);
//     seconds.textContent = addLeadingZero(leftTime.seconds);
// };

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return value.toString().padStart(2,"0");
}