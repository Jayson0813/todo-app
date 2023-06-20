import styles from "./TaskList.module.css";
import TaskItem from "./TaskItem"

const TaskList = ({ tasks, deleteTask, toggleTask, enterEditMode }) => {
  const tasksQuantity = tasks.length;
  const completedTasks = tasks.filter(task => task.checked).length;

  return (
    <>
    <div className={styles['task-container']}>
    <div className={styles['task-header']}>
      <div className={styles['task-head']}></div>
      <div className={styles.title}>My Task List</div>
    </div>      

    <div className={styles['task-bg']}>
    
      <div className={styles.task}>
        <div>
          <p>Task List <span>{tasksQuantity}</span></p>
        </div>
                        
        <div>
          <p>Completed Tasks <span>{completedTasks} / {tasksQuantity}</span></p>
        </div>
      </div>

      <ul className={styles.tasks}>
          {tasks.map(task => (
              <TaskItem 
                  key={task.id}
                  task={task}
                  deleteTask={deleteTask}
                  toggleTask={toggleTask}
                  enterEditMode={enterEditMode}
              />
          ))
          }
      </ul>
      </div>
      </div>
    </>
  )
}

export default TaskList