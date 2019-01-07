// react
import React from 'react'
import ReactDOM from 'react-dom'
// redux
import { createStore } from 'redux'
// react-redux
import { Provider } from 'react-redux'

// reducers
import { counter } from './reducers'
// 组件
import Counter from './components/Counter'

// 创建store
const store = createStore(counter)

ReactDOM.render(
  <Provider store={store}>
    <Counter />
  </Provider>,
  document.getElementById('app')
)
