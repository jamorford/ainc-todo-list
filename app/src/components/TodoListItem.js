import React from 'react'

function TodoItem({name, completed, actionCompleted, actionArchive}) {  
  return (
    <li className="list-group-item">
      <div className="d-flex justify-content-between">
        <div>
          <input
            type="checkbox"
            className="form-check-input me-1"
            checked={completed ? 'checked' : ''}
            onChange={actionCompleted}
            /> {name} 
        </div>
        <input
          type="button"
          className="btn btn-close"
          onClick={actionArchive}
          />
      </div>
    </li>
  )
}

export default TodoItem