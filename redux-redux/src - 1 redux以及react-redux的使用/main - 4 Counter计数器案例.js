/* 
  redux 的基本使用：
  1 安装： npm i -S redux
  2 导入redux
  3 调用 createStore 方法来创建store
*/

import { createStore } from 'redux'
import React from 'react'
import ReactDOM from 'react-dom'

// 创建reducer
const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      // state++
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

// 创建动作
// 计数器加1的动作：
const increment = () => ({
  type: 'INCREMENT'
})
// 计数器减1的动作：
const decrement = () => ({
  type: 'DECREMENT'
})

// 创建store
const store = createStore(counter)

store.subscribe(() => {
  // console.log('当前状态：', store.getState())
  render()
})

// 创建组件：
const Counter = () => (
  <div>
    <h1>
      当前值：
      {store.getState()}
    </h1>
    <button onClick={() => store.dispatch(increment())}>+1</button>
    <button onClick={() => store.dispatch(decrement())}>-1</button>
  </div>
)

const render = () => {
  // 渲染组件
  ReactDOM.render(<Counter />, document.getElementById('app'))
}

render()
