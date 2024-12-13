"use client"

import Panel from "./Panel";

import { useEffect, useState } from "react";
import Button from "./Button";

export default function AddTodo({onAddTodo}: {onAddTodo: (t: string) => void}) {
	const [text, setText] = useState("");

	return (
		<>
			<input 
				placeholder="Ask todo"
				value={text}
				onChange={(e) => {
					setText(e.target.value)
				}}
			/>
			<Button handleClick={() => {
				if (!text) return;
				onAddTodo(text);
				setText('')
				
			}}>Add</Button>
		</>
	);
  }