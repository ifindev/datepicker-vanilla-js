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

// ========================================= actions

function prevMonth() {
  current.setMonth(current.getMonth() - 1);
  render();
}

function nextMonth() {
  current.setMonth(current.getMonth() + 1);
  render();
}

// ========================================= render

function renderCurrent() {
  const currentDate = `${MONTHS[current.getMonth()]} ${current.getFullYear()}`;
  document.getElementById('current').innerHTML = currentDate;
}

function render() {
  renderCurrent();
}

render();
