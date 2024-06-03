import {createHashRouter} from "react-router-dom";
import Home from "../Views/Home";
import MyResume from "../Views/myResume";

const routes = [
		{
				path:'/',
				Component:Home,
		},
		{
				path:'/myResume',
				Component:MyResume,
		}
]

export default createHashRouter(routes);
