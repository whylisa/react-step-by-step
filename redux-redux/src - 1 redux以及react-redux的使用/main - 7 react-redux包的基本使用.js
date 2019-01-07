/* 
  react-redux 的基本使用：
  1 安装：npm i -S react-redux
  2 从 react-redux 包中导入两个内容： Provider 和 connect
  3 使用 Provider 组件包裹整个react应用
  4 使用 connect 包装我们自己的组件，并且传递组件中要使用的 state 和 dispatch 等方法
*/

import { createStore } from 'redux'
import React from 'react'
import ReactDOM from 'react-dom'

// 导入react-redux
import { Provider, connect } from 'react-redux'

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
  console.log('state: ', store.getState())
})

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
const Counter = props => {
  console.log('Counter 组件props：', props)
  const { dispatch, count } = props
  return (
    <div>
      <h1>
        当前值：
        {count}
      </h1>
      <button onClick={() => dispatch(increment())}>+1</button>
      <button onClick={() => dispatch(decrement())}>-1</button>
    </div>
  )
}

// 为connect方法提供一个参数，用来在组件中获取到redux中提供的数据
// 方法的作用：将 redux 中的state 转化为传递给组件的 props
const mapStateToProps = state => {
  console.log('mapStateToProps:', state)

  // 通过返回值将redux中的state传递给组件

  return {
    // count 属性，就表示：传递给组件 Counter 的数据
    count: state
  }
}

// 如果组件中要用到 redux 中提供的state或dispatch方法，就使用 connect 来包裹这个组件
// 如果组件不需要使用 redux 中提供的任何内容，就不需要使用 connect 包裹了！！！

// 注意： connect() 方法内部又返回了一个新的方法，使用这个返回的方法来包裹 Counter组件
// 调用 connect() 方法后，会返回一个新的组件
// 新返回组件是 原始组件 的包装，JSX结构与原始组件完全相同，只不过包装后，组件中
// 就可以获取到 redux 的 state 以及 dispactch 等方法了
const CounterContainer = connect(mapStateToProps)(Counter)

// 使用 Provider 组件包裹整个应用，并且传递 store 属性给这个组件
// store 属性名是固定的
ReactDOM.render(
  <Provider store={store}>
    <CounterContainer />
  </Provider>,
  document.getElementById('app')
)
