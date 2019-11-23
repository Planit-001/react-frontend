export const loadState = () => {
    const stateVersionNo  = 1
    const localVersion    = localStorage.getItem('version');

    if (localVersion < stateVersionNo){
      //Update local version, and get a new version of redux state.
      localStorage.setItem('version', stateVersionNo);
      return undefined
    }

    try {
      const serializedState = localStorage.getItem('bbstate');
      if(serializedState === null ) {
        return undefined
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return undefined
    }
  }
  
  export const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('bbstate', serializedState);
    } catch (err) {
      // ignore write error
    }
  }