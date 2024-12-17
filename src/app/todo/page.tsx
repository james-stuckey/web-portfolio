'use client';

import Image from 'next/image';
import { Suspense, useReducer } from 'react';
import AddTodo from '../components/AddTodo';
import TodoList from '../components/TodoList';
import { Todo } from '../types';
import Loading from '../loading';
import { usePersistedState } from '../hooks/useLocalStorage';

const getNextId = () => {
    const currentId = parseInt(
        localStorage.getItem('todo-id-counter') || '0',
        10,
    );
    const nextId = currentId + 1;
    localStorage.setItem('todo-id-counter', nextId.toString());
    return nextId;
};

export default function Home() {
    const [initialState, setTodos] = usePersistedState('todo-list', []);

    const [todos, dispatch] = useReducer(tasksReducer, initialState);

    function handleAddTodo(text: string) {
        dispatch({
            type: 'add',
            id: getNextId(),
            todo: {
                id: getNextId(),
                title: text,
                completed: false,
            },
        });
    }

    function handleDeleteTodo(taskId: number) {
        dispatch({
            type: 'delete',
            id: taskId,
            // todo: {
            // 	id: 0,
            // 	title: "",
            // 	completed: true
            // }
        });
    }

    const handleEditTodo = (todo: Todo) => {
        dispatch({
            type: 'edit',
            id: todo.id,
            todo: todo,
        });
    };

    const handleCompleteTodo = (taskId: number) => {
        setTodos((prevTodos: Todo[]) =>
            todos.map((todo: Todo) => {
                if (todo.id === taskId) {
                    return {
                        ...todo,
                        title: todo.title,
                        completed: !todo.completed,
                    };
                } else return todo;
            }),
        );
    };

    return (
        <>
            <h1 className="">Todo List</h1>

            <AddTodo onAddTodo={handleAddTodo} />
            <Suspense fallback={<Loading />}>
                <TodoList
                    todos={todos}
                    onEditTodo={handleEditTodo}
                    onDeleteTodo={handleDeleteTodo}
                    onCompleteTodo={handleCompleteTodo}
                />
            </Suspense>
        </>
    );
}

interface AddTodo {
    type: 'add';
    id: number;
    payload: any;
}

function tasksReducer(todos: Todo[], action: any) {
    switch (action?.type) {
        case 'add': {
            return [
                ...todos,
                {
                    id: action.id,
                    title: action.todo.title,
                    completed: false,
                },
            ];
        }
        case 'delete': {
            return todos.filter((t) => t.id !== action.id);
        }
        case 'edit': {
            return todos.map((t) => {
                if (t.id === action.todo.id) {
                    return action.todo;
                } else
                    return {
                        t,
                    };
            });
        }
        default: {
            throw Error(`Unknown action: ` + action.type);
        }
    }
}
