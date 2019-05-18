#App To-do's

Next steps:
    - remove top text of event info card when event selected
    - 'lists' page (like todos, but no date)
    - feed dynamic coordinates into windy widget
    - delete redux state when user logouts: 
      - https://stackoverflow.com/questions/54199540/resetting-redux-state-on-logout
      - https://stackoverflow.com/questions/35622588/how-to-reset-the-state-of-a-redux-store/35641992#35641992

Future steps:
    - ability to download .ics file
    - drag and drop on calendar
    - finish pipeline (front-end) 
    - add a 'bulletin board' page. That imitates a bulletin board
    - react native app

Design improvements: 
  - add lightbulb to toggle dark mode in header
  - adapt calendar components styling for night mode
  - add a question mark icon button that reveals a popup that describes the page function
  - disappear drawer on mobile
  - improve header on mobile
  - make 'snackbar'/toasts themed according to success or error (green, red, etc.)
  - add a bottom navbar for mobile view (?) ( <BottomNavigation />)

Issues:
  - error messages for api failing in toasts

Meta ideas:
    - make a 'notes' page (like a bulleten board), where I can leave notes
    - Text editor could be a medium-like tool leveraging draftjs.
    - Save in db as a JSON blob
    - see: bitwiser.in or megadraft.io
  - gamify dashboard icon by showing a different https://fontawesome.com/icons?d=gallery&q=dashboard based on todos count (?)
  - add user settings page

Name/brand ideas:
  - 'planner' - something related to 'planning'
  - 'slplanner' - "simple life planner"
  - 'moreganizer'



Paid Features:
  - collaborative notes where users can collaborate on documents (using medium clone package) 
    - also see https://firepad.io/ for real-time collaboration (requires firebase)
    - and etherpad (truely open source but complicated)
  - the 'pipeline' builder - could be a paid feature
  - bulletin board - could be a paid feature
  - donation page (later)