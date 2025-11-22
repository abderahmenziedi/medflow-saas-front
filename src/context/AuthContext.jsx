import { createContext, useContext, useEffect, useReducer, useCallback } from "react";



const loadInitialState = () => {
    try {
        const user = localStorage.getItem('user') && localStorage.getItem('user') !== 'undefined' && localStorage.getItem('user') !== 'null'
            ? JSON.parse(localStorage.getItem('user'))
            : null;

        const role = localStorage.getItem('role') || null;
        const token = localStorage.getItem('token') || null;

        return {
            user,
            role,
            token
        };
    } catch (error) {
        // If there's an error parsing localStorage items, return null values
        return {
            user: null,
            role: null,
            token: null
        };
    }
};


export const authContext = createContext(null);

const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                user: null,
                role: null,
                token: null,
            };
        case "LOGIN_SUCCESS":
            return {
                user: action.payload.user,
                token: action.payload.token,
                role: action.payload.role,
            };
        case "LOGOUT":
            return {
                user: null,
                role: null,
                token: null,
            };
        default:
            return state;
    }
};

 export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, loadInitialState());

  useEffect(() => {
    if (state.user) {
      localStorage.setItem('user', JSON.stringify(state.user));
    } else {
      localStorage.removeItem('user');
    }
    
    if (state.role) {
      localStorage.setItem('role', state.role);
    } else {
      localStorage.removeItem('role');
    }
    
    if (state.token) {
      localStorage.setItem('token', state.token);
    } else {
      localStorage.removeItem('token');
    }
  }, [state]);

  return (
    <authContext.Provider
      value={{
        user: state.user,
        role: state.role,
        token: state.token,
        dispatch,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
