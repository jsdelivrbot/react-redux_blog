import _ from 'lodash';
import {FETCH_POSTS} from '../actions'; // no need to specify file because we're importing from index.js

export default function(state={}, action){ //State default to be empty object
  switch(action.type){

    case FETCH_POSTS:
      return _.mapKeys(action.payload.data, 'id');
    default:
      return state;
  }
}
