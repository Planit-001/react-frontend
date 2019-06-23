/*******************
 *
 * Time to expire items in redux cache in milliseconds:
 *
 *
 *******************/

const expiry = {
    auth: {},
    admin: {
      users: 1800 * 1000,
      suggestions: 1800 * 1000
    },
  };
  
export default expiry;