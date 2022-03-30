import Router from './router';

import { Provider } from 'react-redux';
import { store } from './store';

export default function App( props ) {
	console.log('App')
  	return (
      <Provider store={ store }>
          <Router/>
      </Provider>
  	);
}