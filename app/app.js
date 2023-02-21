import React from 'react';
import {Provider} from 'react-redux';
import store from './services/store';
import Home from './components/Home/Home';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Home />
      </Provider>
    );
  }
}

export default App;
