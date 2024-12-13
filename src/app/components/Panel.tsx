import { useEffect, useState } from "react";
import Button from "./Button";

function Panel({ title, children, onShow, isActive }: {
	title: string,
	isActive: boolean,
	onShow: () => void;
	children: React.ReactNode,
}) {
	// const [isActive, setIsActive] = useState(false);

	return (
	  <section className="panel">
		<h3>{title}</h3>
		{isActive ? (
		  <p>{children}</p>
		) : (
		  <Button handleClick={onShow}>
			Show
		  </Button>
		)}
	  </section>
	);
}

export default Panel