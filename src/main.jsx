import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux' // Ye add karein
import { store } from './store/store.js' // Ye add karein

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}> {/* Poori App ko wrap karein */}
      <App />
    </Provider>
  </React.StrictMode>,
)