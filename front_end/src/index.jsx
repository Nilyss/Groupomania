import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// dependencies
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'

//dev tools
import { composeWithDevTools } from 'redux-devtools-extension'

// reducers
import rootReducer from './redux/reducers'
import { getUsers } from './redux/actions/usersActions'
import { PostProvider } from './context'

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

store.dispatch(getUsers())

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <PostProvider>
      <App />
    </PostProvider>
  </Provider>
)
