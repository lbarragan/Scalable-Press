const addBusinessTime = (holiday, time, duration) => {
    let responseDate = new Date(time.getTime());
    
    // Validate if time collide with holiday
    if (responseDate.getTime() >= holiday.start.getTime() && responseDate.getTime() <= holiday.end.getTime()) {
        // If we are subtracting take holiday start date as base, because holiday can be assumed to ends after it starts, otherwise take holiday end date as base
        if(duration < 0)
            responseDate = new Date(holiday.start.getTime());
        else
            responseDate = new Date(holiday.end.getTime());
        // Add seconds to time
        responseDate.setSeconds(responseDate.getSeconds() + duration);
    }else{
        // Time doesn't collide with holiday adding seconds
        responseDate.setSeconds(responseDate.getSeconds() + duration);
        // Validate if new time collide with holiday
        if(responseDate.getTime() >= holiday.start.getTime() && responseDate.getTime() <= holiday.end.getTime()){
            // New time collide holiday, get diference and take holiday end as base date and attaching the difference
            let difference = responseDate.getTime() - holiday.start.getTime();
            responseDate = new Date(holiday.end.getTime());
            responseDate.setSeconds(responseDate.getSeconds() + (difference/1000));
        }
    }

    return responseDate;
};

// Christmas 2019, 9pm Dec 24th to 9pm Dec 25th
const holiday = {
    start: new Date(Date.UTC(2019,11,24,21,0,0)),
    end: new Date(Date.UTC(2019,11,25,21,0,0))
};

addBusinessTime(holiday, new Date(Date.UTC(2019,11,1,0,0,0)), 60 * 60)      // returns 2019-12-01T01:00:00
addBusinessTime(holiday, new Date(Date.UTC(2019,11,24,21,0,0)), 1)          // returns 2019-12-25T21:00:01
addBusinessTime(holiday, new Date(Date.UTC(2019,11,24,20,30,0)), 60 * 60)   // returns 2019-12-25T21:30:00
addBusinessTime(holiday, new Date(Date.UTC(2019,11,25,0,0,0)), 1)           // returns 2019-12-25T21:00:01
addBusinessTime(holiday, new Date(Date.UTC(2019,11,25,0,0,0)), -1)          // returns 2019-12-24T20:59:59