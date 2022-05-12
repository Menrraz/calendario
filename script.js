import {displayEvents, events} from './events.js'
window.dayClicked = dayClicked
//let currentMonth = new Date().getMonth();
const mainHTML = document.querySelector('main')
let month = new Date().getMonth();
let year = new Date().getFullYear()
let weekDay = new Date().getDay();
const day = new Date().getDate();
let firstDay = getFirstDay(day, weekDay);
let displayEventsCall = 1
const cbHoliday = document.getElementById('cbHoliday').addEventListener('change', function eventsCheckBox(){
    if (this.checked) {
        for (let i = 0; i < events.length; i++) {
            try {document.querySelectorAll('.event')[i].style.display = 'none'}catch{}
        }  
        displayEventsCall = 0
    } else {
        for (let i = 0; i < events.length; i++){
            try {document.querySelectorAll('.event')[i].style.display = 'block'}catch{}
        }
        displayEventsCall = 1
        displayEvents(displayEventsCall)
    }
})
function main(){
    const monthName = document.getElementById('monthName');
    let previous = document.getElementById('previous').addEventListener('click', previousMonth)
    let next = document.getElementById('next').addEventListener('click', nextMonth)
    const currentYear = document.getElementById('currentYear').innerHTML = year
    firstDay = getFirstDay(day, weekDay);
    displayCalander(firstDay, getMonthDays(month-1), getMonthDays(month), 'First Call');
    monthName.innerHTML = getMonthName(month);
    displayCalanderImage()
}
function getMonthName(month) {
    let m = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro',  'Novembro', 'Dezembro'];
    if (month < 0) {
        month = month+12
    } else if (month > 11) {
        month = month-12
    }
    return m[month];
}
function getFirstDay(day, weekDay) {
    let firstDay = weekDay
    while (day > 1) {
        day = day-1;
        firstDay = firstDay == 0 ? 6: firstDay-1
    }
    return firstDay;
}
// 31 days: 0, 2, 4, 6, 7, 9, 11 // 30 days: 3, 5, 8, 10 // 29/28 days: 1
function getMonthDays(i) { 
    if (i == 'previous') {
        return d[month-1]
    }
    if (i < 0) {
        i = i+12
    } else if (i > 11) {
        i = i-12
    }
    let d = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    if (year % 400 == 0 || year % 4 == 0 && year % 100 != 0) { // Leapyear
        return d[i] == 28 ? 29: d[i];
    }
    return d[i]
}
function calanderHTML(i, date, firstDay, previousMonthDays, monthDays){
    let currentMonth = new Date().getMonth()
    let calanderWeek = document.getElementById(`calanderWeek${i+1}`)
    calanderWeek.insertAdjacentHTML('beforeend', `
    <td 
    class='day ${date == day && firstDay < 0 && Math.abs(firstDay) <= monthDays && month == currentMonth? 'today': ''}${firstDay > 0 ? 'gray' : Math.abs(firstDay) >= monthDays ? 'gray': ''}'
    id='${firstDay > 0 ? previousMonthDays-firstDay+1 : date}/${firstDay > 0 ? month-1 : Math.abs(firstDay) >= monthDays ? month+1: month}' onclick="dayClicked('${firstDay > 0 ? previousMonthDays-firstDay+1 : date}/${firstDay > 0 ? month-1 : Math.abs(firstDay) >= monthDays ? month+1: month}')">
    ${date}
    </td>`)
}
function deleteCalanderHTML (i, date, firstDay) {
    for (let i = 0; i < 6; i++) {
        let calanderWeek = document.getElementById(`calanderWeek${i+1}`)
        calanderWeek.remove()
    }
}
function displayCalander(firstDay, previousMonthDays, monthDays, call) {
    let date = 1
    for (let i = 0; i < 6; i++) {
        if (call == 'First Call') {
            calander.insertAdjacentHTML('beforeend', `<tr id='calanderWeek${i+1}'></tr>`)
        }
        for (let j = 1; j <= getMonthDays(month); j++) {
            date = date <= monthDays && firstDay < 0 ? date: 1
            date = firstDay > 0 ? previousMonthDays-firstDay+1 : date
            if (call == "First Call") {
                calanderHTML(i, date, firstDay, previousMonthDays, monthDays)
            }
            date++
            firstDay--
            if (j % 7 == 0 || j >= 31) {break}
        }
    }
}
function nextMonth() {
    let nextFirstDay = getMonthDays(month) == 31 ? [3, 4, 5, 6, 0, 1, 2]: ''
        nextFirstDay = getMonthDays(month) == 30 ? [2, 3, 4, 5, 6, 0, 1]: nextFirstDay
        nextFirstDay = getMonthDays(month) == 29 ? [1, 2, 3, 4, 5, 6, 0]: nextFirstDay
        nextFirstDay = getMonthDays(month) == 28 ? [0, 1, 2, 3, 4, 5, 6]: nextFirstDay
    firstDay = nextFirstDay[firstDay]
    deleteCalanderHTML()
    month++
    displayCalander(firstDay, getMonthDays(month-1), getMonthDays(month), 'First Call')
    monthName.innerHTML = getMonthName(month)
    if (month >= 11) {
        month = month-12
        year++
        currentYear.innerHTML = year
    }
    displayEvents(displayEventsCall)
    displayCalanderImage()
}
function previousMonth() {
    let previousFirstDay = getMonthDays(month-1) == 31 ? [4, 5, 6, 0, 1, 2, 3] : ''
        previousFirstDay = getMonthDays(month-1) == 30 ? [5, 6, 0, 1, 2, 3, 4] : previousFirstDay
        previousFirstDay = getMonthDays(month-1) == 29 ? [6, 0, 1, 2, 3, 4, 5] : previousFirstDay
        previousFirstDay = getMonthDays(month-1) == 28 ? [0, 1, 2, 3, 4, 5, 6] : previousFirstDay
    firstDay = previousFirstDay[firstDay]
    deleteCalanderHTML()
    month--
    displayCalander(firstDay, getMonthDays(month-1), getMonthDays(month), 'First Call')
    monthName.innerHTML = getMonthName(month)
    if (month <= 0) {
        month = month+12
        year--
        currentYear.innerHTML = year
    }
    displayEvents(displayEventsCall)
    displayCalanderImage()
}
function displayCalanderImage() {
    let monthName = getMonthName(month)
    document.getElementById('monthImage').src = `images/${monthName}${(Math.random()*20/10).toFixed()}.jpg`
}
let call = 0
function dayClicked(id) {
    if (!document.getElementById(id).children[0]) {
        try {eventDetails.remove()} catch {}
    } else {
        try {eventDetails.remove()} catch {}
        if (document.getElementById(id).children[0]) {
            mainHTML.insertAdjacentHTML('afterend', `<section id='eventDetails'></section>`)
            let eventDetails = document.getElementById('eventDetails')
            for (let i = 0; i < events.length; i++) {
                if (events[i].day == id) {
                    eventDetails.insertAdjacentHTML('beforeend', `
                    <h2 class='eventTitle'>${events[i].title}</h2>
                    <p class='eventDescription'>${events[i].description}</p>`)
                }
            }
        }
    }
}
main()
displayEvents(displayEventsCall)