import React, { createContext, useReducer, useEffect } from 'react';

class INITIAL_STATE {
  currentUser = { auth: {}, data: {}};
  enterprise = {};
}

const currentUserReducer = (state, action) => {
  switch (action.type) {
    case "STORE_USER_DATA":
      return action.payload;
    default:
      return state;
  }
};

const enterpriseReducer = (state, action) => {
  switch (action.type) {
    case "STORE_ENTERPRISE_DATA":
      return action.payload;
    default:
      return state;
  }
}

// Sets up a way to remove all of the data on logout
const stateReducer = ({ currentUser, enterprise }, action) => {
  switch (action.type) {
    case 'REMOVE_ALL_DATA':
      return new INITIAL_STATE();
    case 'STORE_USER_DATA':
      return {
        currentUser: currentUserReducer(currentUser, action),
        enterprise: enterprise
      };
    case 'STORE_ENTERPRISE_DATA':
      return {
        currentUser: currentUser,
        enterprise: enterpriseReducer(enterprise, action),
      };
    case 'STORE_ALL_DATA':
      return action.payload;
    default:
      return {
        currentUser: currentUserReducer(currentUser, action),
      };
  }
};

// Actual provider that adds the state to be accessible anywhere
const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(stateReducer, new INITIAL_STATE());

  useEffect(() => {
    (async () => {
      // const loggedInUser = await doCurrentUserFetch();
      // if (loggedInUser) {
      //   dispatch({ type: 'STORE_USER_DATA', payload: loggedInUser });
      // }
      // Firebase.refreshUser(dispatch)
      const currentUserData = await getCurrentUser();
      // console.log("Got user for context: ", currentUserData);
      if (currentUserData) {
        console.log("Got user for context: ", currentUserData);
        if (currentUserData.data.Subscription === 'Enterprise' && currentUserData.data.Company) {
          const companyData = await getCompanyData(currentUserData.auth.uid, currentUserData.data.Company);
          console.log("Got company for context: ", companyData);
          dispatch({ type: 'STORE_ALL_DATA', payload: { currentUser: currentUserData, enterprise: companyData } });
        } else {
          dispatch({ type: 'STORE_USER_DATA', payload: currentUserData });
        }
      }
    })();
  }, []);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export { Context, ContextProvider };