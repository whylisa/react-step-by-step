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

// 创建组件：
const Counter = props => {
  console.log('Counter 组件props：', props)
  const { count, onIncrement, onDecrement } = props
  return (
    <div>
      <h1>
        当前值：
        {count}
      </h1>
      <button onClick={onIncrement}>+1</button>
      <button onClick={onDecrement}>-1</button>
    </div>
  )
}

// 3 如果要在被包装的组件中，获取到 redux 中的state，需要提供该方法
const mapStateToProps = state => {
  return {
    count: state
  }
}

// 4 作用：将 调用dispatch方法的 逻辑代码，通过 props 映射到组件中
//         在组件中，就可以通过 props 获取到传递的方法并使用了
// 说明：如果传递了该方法，在组件中就无法获取到 dispatch ！！！
const mapDispatchToProps = dispatch => {
  return {
    onIncrement() {
      dispatch(increment())
    },
    onDecrement() {
      dispatch(decrement())
    }
  }
}

// 2 使用 connect 方法包装 Counter 组件
//   包装后在 Counter 组件中，就可以通过 props 获取到 redux 中的 state 和 dispatch
const CounterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)

ReactDOM.render(
  // 1 使用Provider组件包裹整个应用
  <Provider store={store}>
    <CounterContainer />
  </Provider>,
  document.getElementById('app')
)
