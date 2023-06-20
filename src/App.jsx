import { useState } from 'react'
import useLocalStorage from './components/hooks/useLocalStorage'
import CustomForm from './components/CustomForm'
import EditForm from './components/EditForm'
import TaskList from './components/TaskList'
import ThemeSwitcher from './components/ThemeSwitcher'

function App() {
  const [tasks, setTasks] = useLocalStorage('TodoApp.tasks', []);
  const [editedTask, setEditedTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [previousFocus, setPreviousFocus] = useState(null);

  const addTask = (task) => {
    setTasks(prevState => [...prevState, task])
  }

  const deleteTask = (id) => {
    setTasks(prevState => prevState.filter(tasks => tasks.id !== id));
  }

  const toggleTask = (id) => {
    setTasks(prevState => prevState.map(tasks => tasks.id === id ? {...tasks, checked: !tasks.checked} : tasks))
  }

  const updateTask = (task) => {
    setTasks(prevState => prevState.map(tasks => tasks.id === task.id ? {...tasks, name: task.name} : tasks))
    closeEditeMode();
  }

  const enterEditMode = (task) => {
    setEditedTask(task);
    setIsEditing(true);
    setPreviousFocus(document.activeElement);
  }

  const closeEditeMode = () => {
    setIsEditing(false);
    previousFocus.focus();
  }

  return (
    <div className="container">
      <header>
        <h1>Todo App</h1>
      </header>
      {
        isEditing && (
          <EditForm 
            editedTask={editedTask}
            updateTask={updateTask}
            closeEditeMode={closeEditeMode}
          />
        )
      }
      
      <CustomForm
        addTask={addTask}
      />
      {tasks && (
        <TaskList 
          tasks={tasks}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
          enterEditMode={enterEditMode}
        />
      )}
      <ThemeSwitcher />
    </div>
  )
}

export default App
