/* 
  redux 状态管理工具

  三个核心概念：

  1 action 动作、行为
    用来描述要执行什么任务，或者说：action提出来了一个想法
    action是一个 JS 对象
    必须得提供一个type属性
    type属性的值采用全大写字母的方式来表示，可以使用下划线来分割多个单词
    const addTodo = {
      type: 'ADD_TODO',
      name: '学习Redux'
    }

    actionCreator: 动作创建器，其实就是一个函数，这个函数返回 action
    const addTodo = (name) => ({
      type: 'ADD_TODO',
      name
    })

    addTodo('学习redux') ===> { type: 'ADD_TODO', name: '学习redux' }
    addTodo('复习 react') ===> { type: 'ADD_TODO', name: '复习 react' }

  2 reducer
    作用： 根据指定的 action 来实现要完成的动态
    语法：(state, action) => newState
    它实际上是一个纯函数
    注意：不要直接修改参数state，而应该根据传入的state（上一个state），来得到最新的状态

  3 store
    在一个 redux 应用中只应该提供一个 store
    store 提供了state； 也提供了操作state的方法
*/
