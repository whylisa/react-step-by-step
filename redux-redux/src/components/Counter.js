import React from 'react'
import { connect } from 'react-redux'
// actions
import { increment, decrement } from '../actions'

// 创建组件：
const Counter = ({ count, onIncrement, onDecrement }) => {
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

export default CounterContainer
