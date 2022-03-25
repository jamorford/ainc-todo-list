import React from 'react'
import TodoListItem from './TodoListItem.js'
import TodoListFilters from './TodoListFilters.js'
import TodoListInput from './TodoListInput.js'
import TodoListActions from './TodoListActions.js'

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

  // Object containing all desired task filters, in the format of "property": "value"
  let [filters, setFilters] = React.useState(() => {
    let initialFilters = Object.create(null)
    initialFilters.archived = false
    return initialFilters
  })

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

    let newTodos = [ ...todos, newTodo]
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

  // Filter the todos based on filter state and store results as a local variable
  // This will be re-calculated on each re-render
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

  // Additionally create a filtered list of completed items
  // Currently used only for the "items remaining" counter
  let todosFilteredCompleted = todosFiltered.filter(item => item.data.completed === false)
  
  return (
    <>
      <TodoListFilters
        filters={filters}
        setFilters={setFilters}
        />
      <TodoListInput addTodo={addTodo}/>
      <div>
        {todosFiltered.length === 0 && filters.completed === undefined && <p>Congrats! &#127881; You've reached inbox zero</p>}
        {todosFiltered.length === 0 && filters.completed === true && <p>There are no complete tasks</p>}
        {todosFiltered.length === 0 && filters.completed === false && <p>There are no incomplete tasks</p>}
        <ul className="list-group mb-3">
          {todosFiltered.map(item => 
            <TodoListItem
              key={item.data.id}
              name={item.data.name}
              completed={item.data.completed}
              actionCompleted={() => setTodoCompleted(item.index)}
              actionArchive={() => setTodoArchived(item.index)}
              />
          )}
        </ul>
      </div>
      <p className="me-2">{todosFilteredCompleted.length} item(s) remaining</p>
      <TodoListActions
        todos={todos}
        setTodos={setTodos}
        />
    </>
  )
}

export default TodoList