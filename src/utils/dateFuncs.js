import moment from 'moment';

export function readableDate(dateString){
    if (moment(dateString)){
        return moment(dateString).format("ddd, MMM Do")
    }
    return;
}

export function readableTime(dateString){
    if (moment(dateString)){
        return moment(dateString).format("h:mm a")
    }
    return;
}

export function today(){
    return moment().format("ddd, MMM Do")
}

export function tomorrow(){
    return moment().add(1, 'days').format("ddd, MMM Do")
}

export function dayAfter(){
    return moment().add(2, 'days').format("ddd, MMM Do")
}


export function checkContainsTime(momentObj){
    return !(momentObj.hour() === 0 && momentObj.minute() === 0 && momentObj.second() === 0 && momentObj.millisecond() === 0);
}

export function readableDateRange(startDateString, endDateString){
    const startDate = moment(startDateString);
    const endDate = moment(endDateString);

    if( startDate || endDate){

        if(startDate.format("ddd MMM Do YYYY") === endDate.format("ddd MMM Do YYYY") ){
            return startDate.format("dddd MMM Do, YYYY");
        }
        return `${startDate ? startDate.format("ddd MMM Do, YYYY") : ''} ${ endDate ?  ` - ${endDate.format("ddd MMM Do, YYYY")}` : '' }`;
    }
    return 
}


export function readableTimeRange(startDateString, endDateString){
    const startDate = moment(startDateString);
    const endDate = moment(endDateString);
    const startContainsTime = checkContainsTime(startDate);

    if(startContainsTime){
        return `${startDate.format("h:mm a")} - ${endDate.format("h:mm a")}`;
    }
    return
}