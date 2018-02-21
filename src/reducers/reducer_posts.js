import _ from 'lodash';
import {FETCH_POSTS, FETCH_POST, DELETE_POST} from '../actions'; // no need to specify file because we're importing from index.js

export default function(state={}, action){ //State default to be empty object
  switch(action.type){

    case DELETE_POST:
      return _.omit(state, action.payload)

    case FETCH_POST:
      const post = action.payload.data;
      const newState = {...state};
      newState[post.id] = post
      return newState;
      // Can also use syntax below
      // return {...state, [action.payload.data.id]: action.payload.data};
    case FETCH_POSTS:
      return _.mapKeys(action.payload.data, 'id');
    default:
      return state;

  }
}
