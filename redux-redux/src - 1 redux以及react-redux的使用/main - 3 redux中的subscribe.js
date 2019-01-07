/* 
  redux 的基本使用：
  1 安装： npm i -S redux
  2 导入redux
  3 调用 createStore 方法来创建store
*/

import { createStore } from 'redux'

// 创建reducer
const counter = (state = 0, action) => {
  console.log(state, action)
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

// 监听store中state的改变：
const unsubscribe = store.subscribe(() => {
  console.log('新状态为：', store.getState())
})

// 获取状态
console.log('获取状态：', store.getState())

// 分发任务
store.dispatch(increment())
// store.dispatch({ type: 'INCREMENT' })

// 分发其他任务：
store.dispatch(increment())

// 在此处调用该方法，表示取消监听state的改变
// 取消后，state再发生改变也不会再被打印内容出来了
unsubscribe()
store.dispatch(increment())
