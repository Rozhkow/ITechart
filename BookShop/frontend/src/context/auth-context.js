import React from 'react';

// export this context to the highest lvl (app.js) of where we wanna use that because of using for children 
export default React.createContext({
    token: null,
    userId: null,
    login: (token, userId, tokenExpiration) => {},
    logout: () => {}
});