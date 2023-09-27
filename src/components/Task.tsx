import styles from './Task.module.css'
import { CheckCircle, Trash } from 'phosphor-react'
import { TaskProps } from '../App'
import { useState } from 'react';

interface Props {
    task: TaskProps,
    onDelete: (id: string) => void
    onComplete: (id: string) => void
}

export function Task({ task, onDelete, onComplete }: Props) {

    return (

        <div className={styles.task}>
            <button onClick={()=> onComplete(task.id)} className={styles.check}>

                {
                    task.isCompleted ? <CheckCircle size={18} weight="fill" />  : <div />
                }
                
            </button>
            <label htmlFor="task" className={task.isCompleted ? styles.completed : ''}>
                {task.description}
            </label>
            <div onClick={() => onDelete(task.id)} className={styles.boxIcon}>
                <Trash  size={14} />
            </div>
        </div>

    )
}