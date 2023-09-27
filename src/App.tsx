import { ChangeEvent, FormEvent, useState } from "react";
import uuid from 'react-uuid'
import { Header } from "./components/Header";
import styles from './App.module.css'
import { PlusCircle } from "phosphor-react";
import { Task } from "./components/Task";
import { TaskList } from "./components/TaskList";

export interface TaskProps {
  id: string,
  description: string;
  isCompleted?: boolean;
}

export function App() {

  const [tasks, setTasks] = useState<TaskProps[]>([
    {
      id: 'teste',
      description: 'Teste de Tasks',
      isCompleted: false
    },
    {
      id: 'teste2',
      description: 'Teste de Tasks 2',
      isCompleted: true
    }
  ])


  const [description, setDescription] = useState('');

  function createTask(taskDescription: string) {
    setTasks([
      ...tasks,
      {
        id: crypto.randomUUID(),
        description: taskDescription,
        isCompleted: false
      }
    ])
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()

    createTask(description)

    setDescription('')

  }

  function onChangeDescription(event: ChangeEvent<HTMLInputElement>) {
    setDescription(event.target.value)
  }

  function deleteTaskById(taskId: string) {
    const newTasks = tasks.filter((task) => task.id !== taskId)

    setTasks(newTasks)
  }

  function toggleCompletedTask(taskId: string) {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          isCompleted: !task.isCompleted
        }
      }

      return task;
    })

    setTasks(newTasks)
  }

  return (
    <>
      <Header />
      <main className={styles.main}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            placeholder="Adicione uma nova tarefa"
            onChange={onChangeDescription}
            value={description}
          />
          <button disabled={description == ''} type="submit">Criar <PlusCircle size={16} weight="bold" /></button>
        </form>

        <TaskList 
          tasks={tasks} 
          onDelete={deleteTaskById}
          onComplete={toggleCompletedTask}/>
      </main>
    </>
  )
}
