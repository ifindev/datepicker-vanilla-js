// ========================================= data

let current = new Date(new Date().getFullYear(), new Date().getMonth());
let selected = null;

const MONTHS = {
  0: 'January',
  1: 'February',
  2: 'March',
  3: 'April',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'August',
  8: 'September',
  9: 'October',
  10: 'November',
  11: 'December',
};

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// ========================================= util
function getDates(month, year) {
  const date = new Date(year, month, 1);
  const days = [];

  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

// ========================================= actions

function prevMonth() {
  current.setMonth(current.getMonth() - 1);
  render();
}

function nextMonth() {
  current.setMonth(current.getMonth() + 1);
  render();
}

function prevYear() {
  current.setFullYear(current.getFullYear() - 1);
  render();
}

function nextYear() {
  current.setFullYear(current.getFullYear() + 1);
  render();
}

function handleSelect(date) {
  selected = date;
  render();
}

// ========================================= render

function renderCurrent() {
  const currentDate = `${MONTHS[current.getMonth()]} ${current.getFullYear()}`;
  document.getElementById('current').innerHTML = currentDate;
}

function renderCalendar() {
  const currentMonth = current.getMonth();
  const currentYear = current.getFullYear();

  const calendar = document.getElementById('calendar');
  calendar.innerHTML = '';
  calendar.className = 'grid grid-cols-7 gap-2 mt-5';

  // generate days
  for (i = 0; i < DAYS.length; i++) {
    const day = document.createElement('span');
    day.className = 'text-center py-2';
    day.append(DAYS[i]);
    calendar.append(day);
  }

  // generate dates
  const dates = getDates(currentMonth, currentYear);

  const totalDays = 7;
  const firstDayOfTheMonth = dates[0].getDay();
  const lastDayOfTheMonth = dates[dates.length - 1].getDay() + 1;

  const padStart = firstDayOfTheMonth;
  const padEnd = totalDays - lastDayOfTheMonth;

  // Add whitespaces in the beginning week of the month
  for (i = 0; i < padStart; i++) {
    dates.splice(0, 0, '');
  }

  // Add whitespaces in the last week of the month
  for (i = 0; i <= padEnd; i++) {
    dates.splice(dates.length, 0, '');
  }

  for (i = 0; i < dates.length - 1; i++) {
    if (dates[i] === '') {
      const whitespace = document.createElement('span');
      whitespace.innerHTML = '';
      whitespace.className = 'text-center';
      calendar.append(whitespace);
      continue;
    }

    // date is button element so that we can select it later
    const date = document.createElement('button');
    date.className = 'text-center py-2 rounded';
    date.append(dates[i].getDate());

    const baseClass = 'text-center py-2 ';
    date.className = baseClass;

    // Add style for today
    if (
      dates[i].getDate() === current.getDate() &&
      dates[i].getMonth() === currentMonth &&
      dates[i].getFullYear() === currentYear &&
      selected === null
    ) {
      date.className = baseClass + 'rounded border bg-blue-600 text-white';
    }

    if (
      dates[i].getDate() === current.getDate() &&
      dates[i].getMonth() === currentMonth &&
      dates[i].getFullYear() === currentYear &&
      selected !== null
    ) {
      date.className = baseClass + 'rounded border border-gray-600';
    }

    if (
      selected &&
      dates[i].getDate() === selected.getDate() &&
      dates[i].getMonth() === selected.getMonth() &&
      dates[i].getFullYear() === selected.getFullYear()
    ) {
      date.className = baseClass + 'rounded bg-blue-600 text-white';
    }

    // use IIFE to get index i to solve the problem with closure
    date.addEventListener(
      'click',
      (function (index) {
        return function (evt) {
          handleSelect(dates[index]);
        };
      })(i)
    );
    calendar.append(date);
  }
}

function render() {
  renderCurrent();
  renderCalendar();
}

render();
