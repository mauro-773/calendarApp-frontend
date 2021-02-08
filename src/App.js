import AppRouter from './router/AppRouter';
import store from './store/store';
import { Provider } from 'react-redux';

import './styles.css';

const App = () => {
   return (
      <Provider store={store}>
         <AppRouter />
      </Provider>
   );
};

export default App;
