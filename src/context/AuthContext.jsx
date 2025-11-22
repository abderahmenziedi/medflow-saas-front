import { createContext, useContext, useEffect, useReducer, useCallback } from "react";



const loadInitialState = () => {
    const user = localStorage.getItem('user') != undefined 
        ? JSON.parse(localStorage.getItem('user')) 
        : null;

    const role = localStorage.getItem('role') || null;
    const token = localStorage.getItem('token') || null;

    return {
        user,
        role,
        token
    };
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
    localStorage.setItem('user', JSON.stringify(state.user));
    localStorage.setItem('role', state.role);
    localStorage.setItem('token', state.token);
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
