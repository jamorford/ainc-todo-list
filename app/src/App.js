import 'bootstrap/dist/css/bootstrap.css';
import TodoList from './components/TodoList.js'

function App() {
  return (
    <div className="container mt-3 d-flex justify-content-center">
      <div style={{'width': '100%', 'maxWidth': '500px'}}>
        <h1 className="mb-3">Todos</h1>
        <TodoList/>
      </div>
    </div>
  );
}

export default App;
