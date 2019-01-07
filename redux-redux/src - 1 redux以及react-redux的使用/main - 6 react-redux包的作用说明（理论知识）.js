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

// 问题：
//
// 使用 class 组件中的 forceUpdate() 方法，不是一个通用的解决方案
// 只能在 class 组件中，而函数组件中，只能使用重新渲染整个应用的方式
// 来将 redux 中state的改变，重新渲染到页面中
//
// 我们应该使用一种更加通用的方式，来将react和redux配合到一起使用

// react-redux 包负责将 react 和 redux 关联到一起使用
// 解决了两个问题：
// 1 react组件如何触发一个action动作
//    也就是如何正确调用 store.dispatch
// 2 store中state改变了，如何将最新的state重新渲染在组件中

// 对于上述第一个问题： react-redux包中提供了一个方法 connect 用来连接react和redux
// 通过 connect 方法，可以包装一个现有的组件（class组件或函数组件），为该组件提供组件
// 内部需要用到的 state 或 操作state的方法
//
// 对于上述第二个问题： 基于react中的单向数据流，父组件提供需要的数据，通过 props 将
// 这些state传递给子组件，子组件中就可以接收到这些数据并展示在页面中了。当父组件中的数据
// 发生改变的时候，因为 单向数据流 的原因，所以，改变后的state又会重新流动到子组件中
// 因此，子组件就接收到了更新后的数据，就会更新组件内容。这样在页面中就看到数据的改变了
// 我们需要使用 react-redux 中提供的父组件（Provider），来包裹我们自己写的组件

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
