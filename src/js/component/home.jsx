import React from "react";
import List from "./List.jsx"

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";




//create your first component
const Home = () => {
	return (
		<div className="container d-flex flex-column align-items-center mt-5">
			<div className="todo-title">todos</div>
			<List/>
		</div>
	);
};

export default Home;
