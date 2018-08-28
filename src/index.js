import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom'
import { DrizzleProvider } from 'drizzle-react'

// Layouts
import App from './App'
import { LoadingContainer } from 'drizzle-react-components'

import { store } from './store'
import drizzleOptions from './drizzleOptions'

ReactDOM.render((
    <DrizzleProvider options={drizzleOptions} store={store}>
      <LoadingContainer>
        <HashRouter store={store}>
          <App />
        </HashRouter>
      </LoadingContainer>
    </DrizzleProvider>
  ),
  document.getElementById('root')
);
