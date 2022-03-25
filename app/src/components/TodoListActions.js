function TodoListActions({todos, setTodos}) {
  // Set the completed flag on all non-archived tasks
  function setTodoCompletedAll(status) {
    let newTodos = [...todos]
    newTodos.forEach((todo, index) => {
      if (!todo.archived) {
        newTodos[index].completed = status
      }
    })
    setTodos(newTodos)
  }

  // Set the archived flag on all completed, non-archived tasks
  function setTodoArchivedCompleted() {
    let newTodos = [...todos]
    newTodos.forEach((todo, index) => {
      if (!todo.archived && todo.completed) {
        newTodos[index].archived = true
      }
    })
    setTodos(newTodos)
  }

  return (
    <div className="btn-group btn-group-sm mb-3" role="group" aria-label="Actions">
      <input
        type="button"
        value="Complete All"
        className="btn btn-outline-danger"
        onClick={() => setTodoCompletedAll(true)}
        />
      <input
        type="button"
        value="Un-complete All"
        className="btn btn-outline-danger"
        onClick={() => setTodoCompletedAll(false)}
        />
      <input
        type="button"
        value="Clear Completed"
        className="btn btn-outline-danger"
        onClick={() => setTodoArchivedCompleted()}
        />
    </div>
  )
}

export default TodoListActions