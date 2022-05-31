import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.scss'
import App from "./containers/App";
import { ModalProvider } from './components/modal/ModalContext/ModalContext';

ReactDOM.render(
  <React.StrictMode>
    <ModalProvider>
      <App />
    </ModalProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
