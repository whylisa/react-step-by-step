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

// 创建组件：
class Counter extends React.Component {
  componentDidMount() {
    // 监听状态的改变
    this.unsubscribe = this.props.store.subscribe(() => {
      // 调用该方法强制组件重新渲染
      this.forceUpdate()
    })
  }

  // 组件卸载时，取消state的监听
  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const { store } = this.props

    return (
      <div>
        <h1>
          当前值：
          {store.getState()}
        </h1>
        <button onClick={() => store.dispatch(increment())}>+1</button>
        <button onClick={() => store.dispatch(decrement())}>-1</button>
      </div>
    )
  }
}

ReactDOM.render(<Counter store={store} />, document.getElementById('app'))
