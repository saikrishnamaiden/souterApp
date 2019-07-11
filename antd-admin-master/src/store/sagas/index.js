import { all, fork } from 'redux-saga/effects';
import City from './city';
import Events from './events';
import Feebacks from './feebacks';
import Comments from './comments';

export default function* root() {
  yield all([
      fork(City),
      fork(Events),
      fork(Feebacks),
      fork(Comments),
     
  ]);
  
}
