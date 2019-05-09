import moment from 'moment';
import _ from 'lodash';

export function sameYear(dateString){
    return moment(dateString).get('year') === moment().get('year');
}

export function sameDay(dateString){
    return sameYear(dateString) && (moment(dateString).dayOfYear() === moment().dayOfYear());
}

export function beforeToday(dateString){
    return sameYear(dateString) && (moment(dateString).dayOfYear() < moment().dayOfYear());
}

export function tomorrow(dateString){
    return sameYear(dateString) && (moment(dateString).dayOfYear() === (moment().dayOfYear() + 1));
}

export function dayAfter(dateString){
    return sameYear(dateString) && (moment(dateString).dayOfYear() === (moment().dayOfYear() + 2));
}

export function future(dateString){
    return moment(dateString).diff(moment().startOf('day'), 'days') > 2
}


export function todaysTodos(todos){
    return todos.filter((todo) => {
        return sameDay(todo.due_date);
    });
}

export function todayNullOrBefore(todos){
    return todos.filter((todo) => {
        return _.isNull(todo.due_date) || sameDay(todo.due_date) || beforeToday(todo.due_date);
    });
}

export function tomorrowsTodos(todos){
    return todos.filter((todo) => {
        return tomorrow(todo.due_date);
    });
};

export function dayAfterTodos(todos){
    return todos.filter((todo) => {
        return dayAfter(todo.due_date);
    });
};

export function futureTodos(todos){
    return todos.filter(todo => {
        return future(todo.due_date)
    })
}

export function filterDone(todos){
    return todos.filter(todo => {
        return todo.done
    })
}

export function filterNotDone(todos){
    return todos.filter(todo => {
        return !todo.done
    })
}
