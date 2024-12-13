// "use client"

import { Suspense, useState } from "react";
import Button from "../components/Button";
import Loading from "../loading";
import ShapeEditor from "../components/ShapeEditor";


export default function ShapeEditorPage() {
  
	return (
	  <>
		<Suspense fallback={<Loading />}>
			<ShapeEditor />
		</Suspense>
	  </>
	);
  }
  