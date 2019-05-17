import moment from 'moment';

export function readableDate(dateString){
    if (moment(dateString)){
        return moment(dateString).format("DD MMM, YYYY")
    }
    return;
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
        return `${startDate ? startDate.format("dddd MMM Do, YYYY") : ''} ${ endDate ?  ` - ${endDate.format("ddd MMM Do, YYYY")}` : '' }`;
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