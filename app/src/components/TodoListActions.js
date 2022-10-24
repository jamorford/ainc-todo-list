function TodoListActions({todos, setTodos}) {
  // Set the completed flag on all non-archived tasks
  function setTodoCompletedAll(status) {
    setTodos(todos.map(todo => {
      if (!todo.archived) {
        todo.completed = status;
      }
      return todo;
    }));
  }

  // Set the archived flag on all completed, non-archived tasks
  function setTodoArchivedCompleted() {
    setTodos(todos.map(todo => {
      if (!todo.archived && todo.completed) {
        todo.archived = true;
      }
      return todo;
    }));
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

export default TodoListActions;