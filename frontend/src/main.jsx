
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import  store  from './store/store.js'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
      <Toaster/>
    </Provider>
  </BrowserRouter>
)
