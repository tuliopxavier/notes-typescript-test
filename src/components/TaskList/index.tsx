import { useState, useRef, useEffect } from 'react';
import { FiCornerRightDown, FiXCircle } from 'react-icons/fi';
import { Section, Task } from './styles';
import type { TaskType } from '../types/TaskType'

export function TaskList() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [id, setId] = useState(0);
  const input = useRef<any>(null);


  function handleCreateNewTask() {
    if (newTaskTitle.trim() === '') return;
    setId(id + 1);

    const newTask = {
      id: id,
      title: newTaskTitle,
      isComplete: false
    };

    setTasks(prevState => [...prevState, newTask]);
    setNewTaskTitle('');
    input.current.focus();
  };
  
  function handleEnterSubmit(e: any) {
    if (e.key === 'Enter') {
      handleCreateNewTask();
    }
  };

  function handleToggleTaskCompletion(id: number) {
    const newTasks = tasks.map(task => task.id === id ? { ...task, isComplete: !task.isComplete } : task);
    setTasks(newTasks);
  };

  function handleRemoveTask(id: number) {
    const filteredTasks = tasks.filter(task => task.id !== id);
    setTasks(filteredTasks);
  };

  // focus input on loading
  useEffect(() => {
    input.current.focus();
  }, []);

  return (
    <Section>
      <header>
        <div>
          <input
            ref={input}
            type="text"
            placeholder="Add new note"
            maxLength={250}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyPress={(e) => handleEnterSubmit(e)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            Add <FiCornerRightDown />
          </button>

        </div>
        {newTaskTitle.length === 250 && <small>Max. 250 characters</small>}
      </header>

      <main>
        <ul>
          {tasks.map(task => (

            <Task key={task.id}>
              <article className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label>
                  <input
                    type="checkbox"
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                </label>
                <p>{task.title}</p>
              </article>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiXCircle />
              </button>
            </Task>

          ))}

        </ul>
      </main>
    </Section>
  );
};