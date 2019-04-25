import moment from 'moment';

export function readableDate(dateString){
    if (moment(dateString)){
        return moment(dateString).format("DD MMM, YYYY")
    }
    return;
}