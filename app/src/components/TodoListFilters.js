function TodoListFilters({filters, setFilters}) {

  // --- FILTERS --- //
  function setFilter(type) {
    let newFilters = {...filters};

    switch(type){
      case 'all':
        delete newFilters.completed
        break;
      case 'notcompleted':
        newFilters.completed = false
        break;
      case 'completed':
        newFilters.completed = true
        break;
      default:
        break;
    }
    
    setFilters(newFilters);
  }

  return (
    <div className="btn-group mb-3" role="group" aria-label="Filters">
      <input
          type="button"
          value="All"
          className="btn btn-outline-primary"
          onClick={() => setFilter('all')}
          />
      <input
          type="button"
          value="Not Completed"
          className="btn btn-outline-primary"
          onClick={() => setFilter('notcompleted')}
          />
      <input
          type="button"
          value="Completed"
          className="btn btn-outline-primary"
          onClick={() => setFilter('completed')}
          />
    </div>
  );
}

export default TodoListFilters;