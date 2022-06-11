import * as ActionTypes from './ActionTypes';

export const Feedback = (state = { errMess: null, feedback:[]}, action) => {
  switch (action.type) {
   
    case ActionTypes.ADD_FEEDBACK:
        var feedback = action.payload;
        return { ...state, comments: state.feedback.concat(feedback)};

    default:
      return state;
  }
};