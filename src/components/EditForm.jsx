import { useEffect, useState } from 'react';
import { CheckIcon } from '@heroicons/react/24/solid';

const EditForm = ({ editedTask, updateTask, closeEditeMode }) => {

    const [updatedTaskName, setUpdatedTaskName] = useState(editedTask.name);

    useEffect(() => {
        const closeModalIfEscaped = (e) => {
            e.key === "Escape" && closeEditeMode();
        }
        window.addEventListener('keydown', closeModalIfEscaped)

        return () => {
            window.removeEventListener('keydown', closeModalIfEscaped)
        }
    }, [])

    const handleFormSubmit = (e) => {
        e.preventDefault();
        updateTask({...editedTask, name: updatedTaskName});
    }

  return (
    <div 
        role="dialog"
        aria-labelledby="editTask"
        onClick={(e) => {e.target === e.currentTarget && closeEditeMode()}}
    >
        <form 
            className="todo"
            onSubmit={handleFormSubmit}
        >
            <div className="wrapper">
                <input 
                    type="text" 
                    id="editTask"
                    className="input"
                    value={updatedTaskName}
                    onInput={(e) => setUpdatedTaskName(e.target.value)}
                    required
                    autoFocus
                    maxLength={100}
                    placeholder="Updated Task"
                />
                <label 
                    htmlFor="editTask"
                    className="label"
                >Update Task</label>
            </div>

            <button 
                className="btn"
                aria-label={`Confirm edited task to now read ${updatedTaskName}`}
                type="submit"
            >
                <CheckIcon strokeWidth={2} width={24} height={24} />
            </button>
        </form>
    </div>
  )
}

export default EditForm