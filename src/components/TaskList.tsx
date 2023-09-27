import { TaskProps } from '../App'
import { Task } from './Task';
import styles from './TaskList.module.css'
import { Clipboard } from 'phosphor-react';

interface Props {
    tasks: TaskProps[]
    onDelete: (id: string) => void
    onComplete: (id: string) => void
}

export function TaskList({ tasks, onDelete, onComplete }: Props) {

    const tasksQuantity = tasks.length;
    const completedTasks = tasks.filter((task) => task.isCompleted).length;

    return (
        <>
            <div className={styles.insights}>
                <div className={styles.createdTasks}>
                    <h3>Tarefas criadas</h3>
                    <span className={styles.counter}>{tasksQuantity}</span>
                </div>

                <div className={styles.completedTasks}>
                    <h3>Concluídas</h3>
                    <span className={styles.counter}>{completedTasks} de {tasksQuantity}</span>
                </div>
            </div>

            <div className={styles.taskList}>
                {
                    tasks.map(task => {
                        return (
                            <Task
                                key={task.id}
                                task={task}
                                onDelete={onDelete}
                                onComplete={onComplete}
                            />
                        )
                    })
                }

                {tasksQuantity == 0 && (
                    <div className={styles.empty}>
                        <Clipboard size={56} weight="regular" />
                        <div className="text">
                            <strong>Você ainda não tem tarefas cadastradas</strong>
                            <p>Crie tarefas e organize seus itens a fazer</p>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}