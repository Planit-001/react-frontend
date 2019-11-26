# Planit Frontend

This Project is open source. Feel free to start your own instance or submit a pull request to contribute. Site is https://app.planit.best

## To run

1. clone repo
2. run `yarn install`
3. to run locally, change `devMode` to `true` in `constants.js`
4. You might also want to download the Rails API. It doesn't really work without a server to save to items with.

## things to work on
  - delete redux state when user logouts: 
      - https://stackoverflow.com/questions/54199540/resetting-redux-state-on-logout
      - https://stackoverflow.com/questions/35622588/how-to-reset-the-state-of-a-redux-store/35641992#35641992
  - add a redux cache file (for time expiry)
  - ability to download .ics file
  - replace weather widget

## Future steps:
  - finish pipeline (front-end)
  - Mobile app (PWA vs. Ionic vs. React Native)
  - drag and drop on calendar
  - add a 'bulletin board' page. That imitates a bulletin board

## Design improvements: 
  - make 'snackbar'/toasts themed according to success or error (green, red, etc.)

## Meta ideas:
  - make a 'notes' page (like a bulleten board), where I can leave notes
  - Text editor could be a medium-like tool leveraging draftjs. 
  - Microsoft open-sourced a collaborative editor microsoft (ask mikhail)
  - Save in db as a JSON blob
  - see: bitwiser.in or megadraft.io
  - gameify dashboard icon by showing a different https://fontawesome.com/icons?d=gallery&q=dashboard based on todos count (?)
  - add user settings page