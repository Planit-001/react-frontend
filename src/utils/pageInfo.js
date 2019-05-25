export const pageInfo =  {
    dashboard: {
        title: "Dashboard",
        description: "Amazing!"
    },
    todos: {
        title: "Daily To-do's",
        description: `
            Here you can create to-do's by date. Creating a todo in a column will assign it with the due date of that day.

            If you check off a to-do it will be archived the next day. Most recently archived to-do's will be displayed in the 'recently archived' column.

            If you don't complete a to-do it will be carried over to the next day. 

            Any to-do can be clicked on and edited. It can be deleted. If you click on the clock you can change the due date of the to-do. 
        `
    },
    lists: {
        title: "Lists",
        description: `
            Here you can create lists. Within each list, you can create list items. Lists are similar to-do's, except they are not time-dependant. 
            
            Some examples of list titles might be: 'groceries', 'things to buy', 'marketing tactics tried', etc. 
            
            You can cross-off and delete list items, and you can edit and archive lists.
        `
    },
    calendar: {
        title: "Calendar",
        description: `
            Clicking on a day will bring up a dialogue for creating a calendar event.

            In month view, any click will render an 'all day' event (a.k.a. an event without a specific time).

            In the week or day view, you can click over the time of the event and drag to its completion. This will preserve the event's start and end time.

            The agenda view will show the list of events and times for about a month's time.

            Clicking on an event will render the event on the card at the side. You can edit and delete any event after creating them.
        `
    },
    pipeline: {
        title: "Pipeline builder",
        description: `
            Here you can create to-do's by date. Set a to-do in the future at the bottom.
        `
    }
}
export default pageInfo;