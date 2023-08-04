import React, { Dispatch, createContext, useReducer, useEffect, ReactNode } from 'react';
import { getCompanyData, getCurrentUser } from '../helpers/api/auth';

class currentUserData {
  auth: any = {};
  data: any = {};
}

class UserAuthData {
  currentUser = new currentUserData();
  enterprise: any = {};
}

interface UserAuthContextInterface {
  userAuth: UserAuthData,
  setUserAuth: Dispatch<any>
}

const UserAuthContext = createContext<UserAuthContextInterface>({
  userAuth: new UserAuthData(),
  setUserAuth: () => {}
});

type UserAuthAction = 
{ type: 'REMOVE_ALL_DATA' | 'STORE_USER_DATA' | 'STORE_ENTERPRISE_DATA' | 'STORE_ALL_DATA', payload: any };

const currentUserReducer = (state: any, action: UserAuthAction) => {
  switch (action.type) {
    case "STORE_USER_DATA":
      return action.payload;
    default:
      return state;
  }
};

const enterpriseReducer = (state: any, action: UserAuthAction) => {
  switch (action.type) {
    case "STORE_ENTERPRISE_DATA":
      return action.payload;
    default:
      return state;
  }
}

// Sets up a way to remove all of the data on logout
const stateReducer = ({ currentUser, enterprise }: UserAuthData, action: UserAuthAction) => {
  switch (action.type) {
    case 'REMOVE_ALL_DATA':
      return new UserAuthData();
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

interface UserAuthProviderProps {
  children: ReactNode;
}

// Actual provider that adds the state to be accessible anywhere
const UserAuthContextProvider = ({ children }: UserAuthProviderProps) => {
  const [userAuth, setUserAuth] = useReducer(stateReducer, new UserAuthData());

  useEffect(() => {
    console.log("UserAuthContextProvider useEffect");
    (async () => {
      // const loggedInUser = await doCurrentUserFetch();
      // if (loggedInUser) {
      //   dispatch({ type: 'STORE_USER_DATA', payload: loggedInUser });
      // }
      // Firebase.refreshUser(dispatch)
      console.log("UserAuthContextProvider useEffect async");
      const currentUserData = await getCurrentUser();
      console.log("Got user for context: ", currentUserData);
      if (currentUserData) {
        console.log("Got user for context: ", currentUserData);
        if (currentUserData.data.Subscription === 'Enterprise' && currentUserData.data.Company) {
          const companyData = await getCompanyData(currentUserData.auth.uid, currentUserData.data.Company);
          console.log("Got company for context: ", companyData);
          setUserAuth({ type: 'STORE_ALL_DATA', payload: { currentUser: currentUserData, enterprise: companyData } });
        } else {
          setUserAuth({ type: 'STORE_USER_DATA', payload: currentUserData });
        }
      }
    })();
  }, []);

  return (
    <UserAuthContext.Provider value={{ userAuth, setUserAuth }}>{children}</UserAuthContext.Provider>
  );
};

export { UserAuthContext, UserAuthContextProvider };