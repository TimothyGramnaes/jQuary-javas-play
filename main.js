window.addEventListener('load', main);

function main() {
    addEventListeners();
    console.log('Working?')
}

function addEventListeners() {
    document.getElementById('days').addEventListener('click', fetchDays);
}

function fetchDays(event) {
    $.ajax({
        url: 'http://api.dryg.net/dagar/v2.1/1989',
        type: "GET",
        
        success: function(response) {
            presentHolidays(response.dagar);
        },
        error: function(error) {
            console.error(error)
        },

    });

}

function presentHolidays(allDaysForAYear) {
    
    const container = document.getElementById('holidays-container');
    container.innerHTML = "";
    
    const holidays = getHolidays(allDaysForAYear);
    const listItems = createListItems(holidays);
    container.append(...listItems);

}

function createListItems(holidays) {
    const listItems = []
    for  (const day of holidays) {
        const li = document.createElement('li');
        li.innerHTML = day.helgdag + ' - ' + day.datum;
        listItems.push(li); 
    }

    return listItems;

}

function getHolidays(allDaysForAYear) {
    const holidays = [];

    for (const day of allDaysForAYear) {
        if (day.helgdag) {
            holidays.push(day);
        }
    }

    return holidays

}