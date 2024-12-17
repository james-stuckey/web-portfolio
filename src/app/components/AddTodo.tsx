'use client';

import { useState } from 'react';
import Button from './Button';

export default function AddTodo({
  onAddTodo,
}: {
  onAddTodo: (t: string) => void;
}) {
  const [text, setText] = useState('');

  return (
    <>
      <input
        placeholder="Ask todo"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
        onKeyDown={(e: any) => {
          if (e.key === 'Enter' && e.target.value.trim()) {
            onAddTodo(e.target.value);
            e.target.value = '';
            setText('');
          }
        }}
      />
      <Button
        handleClick={() => {
          if (!text) return;
          onAddTodo(text);
          setText('');
        }}
      >
        Add
      </Button>
    </>
  );
}
