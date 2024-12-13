'use client'

import { count } from "console";
import Image from "next/image";
import { Suspense, useCallback, useEffect, useId, useReducer, useState } from "react";
import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";
import { Todo } from "../types/todo";
import Loading from "../loading";
import { usePersistedState } from "../hooks/useLocalStorage";

const getNextId = () => {
	const currentId = parseInt(localStorage.getItem('todo-id-counter') || '0', 10);
	const nextId = currentId + 1;
	localStorage.setItem('todo-id-counter', nextId.toString());
	return nextId;
};

export default function Home() {
	const [todos, setTodos] = usePersistedState('todo-list', []);
	

	// const [todos, dispatch] = useReducer(tasksReducer, initialState)

	function handleAddTodo(text: string) {
		setTodos([
			...todos,
			{
				id: getNextId(),
				title: text,
				completed: false
			}
		])
	}

	function handleDeleteTodo(taskId: number) {
		setTodos(todos.filter((t: Todo) => t.id !== taskId))
	}

	const handleEditTodo = (todo: Todo) => {
		setTodos(todos.map((t: Todo) => { 
			if (t.id === todo.id) {
				return todo
			} else {
				return t;
			}
		}))
	}

	const handleCompleteTodo = (taskId: number) => {
		setTodos((prevTodos) => todos.map((todo: Todo) => {
			if (todo.id === taskId) {
				return {
					...todo,
					title: todo.title,
					completed: !todo.completed
				}
			} else return todo
		}))
	}

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
	)
}

function tasksReducer(
	todos: Todo[], 
	action: {
		id: number,
		type: "add" | "delete" | "edit",
		todo: {
			id: number,
			title: string,
			completed: boolean
		}
	}) {
	if (action.type === "add") {

		return [
			...todos,
			{
				id: action.id,
				title: action.todo.title,
				completed: action.todo.id
			}
		]
	}
}


