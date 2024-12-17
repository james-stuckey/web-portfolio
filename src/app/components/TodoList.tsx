import { memo, useState } from 'react';
import Button from './Button';
import { Todo } from '../types';

function TodoItem({
    todo,
    onChange,
    onDelete,
    onComplete,
}: {
    todo: Todo;
    onChange: (todo: Todo) => void;
    onDelete: (taskId: number) => void;
    onComplete: (taskId: number) => void;
}) {
    const [isEditing, setIsEditing] = useState(false);
    let todoContent;

    if (isEditing) {
        todoContent = (
            <>
                <input
                    value={todo.title}
                    onChange={(e) => {
                        onChange({
                            ...todo,
                            title: e.target.value,
                        });
                    }}
                />
                <Button handleClick={() => setIsEditing(false)}>Save</Button>
            </>
        );
    } else {
        todoContent = (
            <>
                {todo.title}
                <Button handleClick={() => setIsEditing(true)}>Edit</Button>
            </>
        );
    }
    return (
        <label>
            <input
                type="checkbox"
                checked={todo.completed}
                style={{ margin: '10px' }}
                onChange={() => onComplete(todo.id)}
            />
            <span className={todo.completed ? 'line-through' : 'initial'}>
                {todoContent}
            </span>
            <Button handleClick={() => onDelete(todo.id)}>Delete</Button>
        </label>
    );
}

function TodoList({
    todos,
    onEditTodo,
    onDeleteTodo,
    onCompleteTodo,
    undoDeleteTodo,
}: {
    todos: Todo[];
    onEditTodo: (todo: Todo) => void;
    onDeleteTodo: (taskId: number) => void;
    onCompleteTodo: (taskId: number) => void;
    undoDeleteTodo?: () => void;
}) {
    return (
        <ul>
            {todos.map((todo: Todo) => {
                return (
                    <li
                        key={todo.id}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '10px',
                        }}
                    >
                        <TodoItem
                            todo={todo}
                            onChange={onEditTodo}
                            onDelete={onDeleteTodo}
                            onComplete={onCompleteTodo}
                        />
                    </li>
                );
            })}
            <Button handleClick={undoDeleteTodo}>Undo</Button>
        </ul>
    );
}

export default TodoList;
