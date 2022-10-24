import React from 'react';

function TodoListInput({addTodo}) {
  // Value inside the "Add a Todo" input textbox
  let [newTodoInput, setNewTodoInput] = React.useState('');

  return (
    <input
      type="text"
      placeholder="Add a Todo"
      className="form-control mb-3"
      value={newTodoInput}
      onChange={e => setNewTodoInput(e.target.value)}
      onKeyUp={e => {
        if (e.key === 'Enter') {
          addTodo(e.target.value);
          setNewTodoInput('');
        }
      }}
      />
  );
}

export default TodoListInput;