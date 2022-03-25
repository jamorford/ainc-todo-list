import React from 'react'
import TodoItem from './TodoItem.js'

function TodoList() {
  // Setup todo state and populate with local storage value on start
  let [todos, setTodosState] = React.useState(() => {
    let storageTodos = window.localStorage.getItem('todos')
    if (storageTodos === null) {
      storageTodos = []
    } else {
      storageTodos = JSON.parse(storageTodos)
    }
    return storageTodos
  })

  // Setup todo ID state and populate with local storage value on start
  let [todoIdNext, setTodoIdNextState] = React.useState(() => {
    let storageTodoIdNext = window.localStorage.getItem('todoIdNext')
    if (storageTodoIdNext === null) {
      storageTodoIdNext = 0
    } else {
      storageTodoIdNext = parseInt(storageTodoIdNext)
    }
    return storageTodoIdNext
  })

  let [filters, setFilters] = React.useState(() => {
    let initialFilters = Object.create(null)
    initialFilters.archived = false
    return initialFilters
  })

  let [newTodoInput, setNewTodoInput] = React.useState('')

  // --- LOCAL STORAGE PERSISTANCE --- //
  // Save the updated todo list to local storage, then update the React state
  function setTodos(newTodos) {
    window.localStorage.setItem('todos', JSON.stringify(newTodos))
    setTodosState(newTodos)
  }

  // Save the updated todo ID to local storage, then update the React state
  function setTodoIdNext(id) {
    window.localStorage.setItem('todoIdNext', id)
    setTodoIdNextState(id)
  }

  // --- TODO CRUD OPERATIONS --- //
  function addTodo(name) {
    let newTodo = Object.create(null)
    newTodo.id = todoIdNext
    newTodo.name = name
    newTodo.completed = false
    newTodo.archived = false

    let newTodos = [newTodo, ...todos]
    setTodos(newTodos)
    setTodoIdNext(todoIdNext + 1)
  }

  function setTodoArchived(index) {
    let newTodos = [...todos]
    newTodos[index].archived = true
    setTodos(newTodos)
  }

  function setTodoCompleted(index) {
    let newTodos = [...todos]
    newTodos[index].completed = newTodos[index].completed ? false : true
    setTodos(newTodos)
  }

  // --- FILTERS --- //
  function setFilterAll() {
    let newFilters = Object.create(null)
    Object.assign(newFilters, filters)
    delete newFilters.completed
    setFilters(newFilters)
  }

  function setFilterNotCompleted() {
    let newFilters = Object.create(null)
    Object.assign(newFilters, filters)
    newFilters.completed = false
    setFilters(newFilters)
  }

  function setFilterCompleted() {
    let newFilters = Object.create(null)
    Object.assign(newFilters, filters)
    newFilters.completed = true
    setFilters(newFilters)
  }

  // --- COMPLETED ACTIONS --- //
  function setTodoCompletedAll(status) {
    let newTodos = [...todos]
    newTodos.forEach((todo, index) => {
      if (!todo.archived) {
        newTodos[index].completed = status
      }
    })
    setTodos(newTodos)
  }

  // --- COMPLETED ACTIONS --- //
  function setTodoArchivedCompleted() {
    let newTodos = [...todos]
    newTodos.forEach((todo, index) => {
      if (!todo.archived && todo.completed) {
        newTodos[index].archived = true
      }
    })
    setTodos(newTodos)
  }


  // Filter the todos and store results as a local variable
  // This should be re-calculated on each re-render
  let todosFiltered = todos
    .map((item, index) => {
      let todoItem = Object.create(null)
      todoItem.index = index
      todoItem.data = item
      return todoItem
    })
    .filter(item => {
      let includeItem = true
      // Check each filter in the array, return false if any of them do not match
      Object.entries(filters).forEach((filter) => {
        if (item.data[filter[0]] !== filter[1]) includeItem = false
      })
      return includeItem
    })

  let todosFilteredCompleted = todosFiltered.filter(item => item.data.completed === false)

  
  return (
    <div>
      <input type="button" value="All" onClick={setFilterAll}/>
      <input type="button" value="Not Completed" onClick={setFilterNotCompleted}/>
      <input type="button" value="Completed" onClick={setFilterCompleted}/>
      <input type="button" value="Complete All" onClick={() => setTodoCompletedAll(true)}/>
      <input type="button" value="Un-complete All" onClick={() => setTodoCompletedAll(false)}/>
      <input type="button" value="Clear Completed" onClick={setTodoArchivedCompleted}/>
      <br/>
      <input
        type="text"
        placeholder="Add Todo"
        value={newTodoInput}
        onChange={e => setNewTodoInput(e.target.value)}
        onKeyUp={e => {
          if (e.key === 'Enter') {
            addTodo(e.target.value)
            setNewTodoInput('')
          }
        }}
        />
      <div>
        {todosFiltered.length === 0 && filters.completed === undefined && <p>Congrats! You've reached inbox zero</p>}
        {todosFiltered.length === 0 && filters.completed === true && <p>There are no complete tasks</p>}
        {todosFiltered.length === 0 && filters.completed === false && <p>There are no incomplete tasks</p>}
        {todosFiltered.map(item => 
          <TodoItem
            key={item.data.id}
            name={item.data.name}
            completed={item.data.completed}
            actionCompleted={() => setTodoCompleted(item.index)}
            actionArchive={() => setTodoArchived(item.index)}
            />
        )}
      </div>
      <p>{todosFilteredCompleted.length} item(s) remaining</p>
    </div>
  )
}

export default TodoList