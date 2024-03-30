// InfluencerContext.js
import React, { createContext, useContext, useReducer } from "react";

const InfluencerContext = createContext();

const initialState = {
  influencers: []
};

const influencerReducer = (state, action) => {
  switch (action.type) {
    case "SET_INFLUENCER":
      let first = true;
      return {
        ...state,
        influencers: action.payload.map((element) => {
          if (first) {
            // first = false;
            return { ...element, selected: true };
          } else {
            return { ...element, selected: false };
          }
        }),
      };
    case "SELECT_INFLUENCER":
      return {
        ...state,
        influencers: state.influencers.map((element) =>
          element.id === action.payload.id
            ? { ...element, selected: !element.selected }
            : element
        ),
      };
    default:
      return state;
  }
};

export const InfluencerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(influencerReducer, initialState);

  return (
    <InfluencerContext.Provider value={{ state, dispatch }}>
      {children}
    </InfluencerContext.Provider>
  );
};

export const useInfluencerContext = () => useContext(InfluencerContext);
