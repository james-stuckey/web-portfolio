"use client"

import { useState } from "react";
import Button from "./Button";

type Shape = {
	id: number;
	type: "circle" | "square" | "triangle"
	x: number;
	y: number;
}

let initialShapes = [
	{ id: 0, type: 'circle', x: 50, y: 100 },
	{ id: 1, type: 'square', x: 150, y: 100 },
	{ id: 2, type: 'triangle', x: 250, y: 100 },
  ] as Shape[]

export default function ShapeEditor() {
	const [shapes, setShapes] = useState(
	  initialShapes
	);
  
	function handleMoveCircles() {
	  const nextShapes = shapes.map((shape: Shape) => {
		if (shape.type === 'square') {
		  // No change
		  return shape;
		} if (shape.type === "triangle") {
			return shape
		} else {
		  // Return a new circle 50px below
		  return {
			...shape,
			y: shape.y + 50,
		  };
		}
	  });
	  // Re-render with the new array
	  setShapes(nextShapes);
	}

	function handleMoveTriangles(){
		const nextShapes = shapes.map((shape) => {
			if (shape.type === "triangle") {
				
				return {
					...shape,
					x: shape.x + 50
				}
			}
			else return shape
		})

		setShapes(nextShapes)
	}

	function handleMoveSquares() {
		const nextShapes = shapes.map((shape) => {
			if (shape.type === "square") {
				
				return {
					...shape,
					// x: shape.x + 50
					y: shape.y + 100
				}
			}
			else return shape
		})

		setShapes(nextShapes)
	}
  
	return (
	  <>
		<Button handleClick={handleMoveCircles}>
		  Move circles down!
		</Button>
		<Button handleClick={handleMoveTriangles}>
		  Move triangles over to the right!
		</Button>
		<Button handleClick={handleMoveSquares}>
		  Move squares down!
		</Button>
		<div 
			className="pt-5 mt-5"
		>
		{shapes.map((shape) => {
		  return <div
			
			key={shape.id}
			style={{
			background: shape.type === "triangle" ? "transparent":'purple',
			position: "absolute",
			left: shape.x,
			top: shape.y,
			
			borderRadius:
			  shape.type === 'circle'
				? '50%' : '',
			
			width: shape.type === "triangle" ? 0 : 20,
			height: shape.type === "triangle" ? 0 : 20,
			borderLeft: shape.type === "triangle" ?  '10px solid transparent': "initial",
			borderRight: shape.type === "triangle" ?  '10px solid transparent': "initial",
			borderBottom: shape.type === "triangle" ? '20px solid red' : "initial",
		  }} />
		})}
		</div>
	  </>
	);
  }
  