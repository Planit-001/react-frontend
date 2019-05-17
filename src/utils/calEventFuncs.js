import moment from 'moment';

export function eventsApiMutator(events){
    return events.map((item, index) => {
        return {
            ...item,
            end_time: moment(item.end_time).toDate(),
            start_time: moment(item.start_time).toDate()
        }
    })
}