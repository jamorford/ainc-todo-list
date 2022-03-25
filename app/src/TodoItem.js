import React from 'react'

function TodoItem({name, completed, actionCompleted, actionArchive}) {  
  return (
    <div>
      <input
        type="checkbox"
        checked={completed ? 'checked' : ''}
        onChange={actionCompleted}
        /> { name } 
      <input
        type="button"
        value="X"
        onClick={actionArchive}
        />
    </div>
  )
}

export default TodoItem