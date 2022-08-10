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

    const leftTimeObj = convertMs(selectedDate - toDay);

    
    const updateTimerValue = dtProp => {
        refs.leftTime[dtProp].textContent = addLeadingZero(leftTimeObj[dtProp]);
    };

    Object.keys(refs.leftTime).forEach(updateTimerValue);

};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);

  const hours = Math.floor((ms % day) / hour);

  const minutes = Math.floor(((ms % day) % hour) / minute);

  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return value.toString().padStart(2,"0");
}