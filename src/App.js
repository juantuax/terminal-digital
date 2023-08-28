import React from 'react';
import { store, persistor } from './Store';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SocketContext, socket } from './context/Socket';
import Layout from './layouts/Layout';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SocketContext.Provider value={socket}>
          <Router>
            <Layout />
          </Router>
        </SocketContext.Provider>
      </PersistGate>
    </Provider>
  );
}

export default App;