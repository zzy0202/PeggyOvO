//Scene 1 picture
import tree1 from "../images/myResume/scene1/tree1.png"
import tree2 from "../images/myResume/scene1/tree2.png"
import tree3 from "../images/myResume/scene1/tree3.png"
import tree4 from "../images/myResume/scene1/tree4.png"
import treeBright from "../images/myResume/scene1/tree_bright.png"
import treeDark from "../images/myResume/scene1/tree_dark.png"
import mountain from "../images/myResume/scene1/mountain.png"

import ribbonLeft from "../images/myResume/scene1/ribbon_left.png"
import ribbonRight from "../images/myResume/scene1/ribbon_right.png"
export let cloudConfig = {
		sceneOneConfig :[
				{top:"28%",left:"2%"},
				{top:"12%",left:"13%"},
				{top:"22%",left:"28%"},
				{top:"11%",left:"55%"},
				{top:"12%",left:"72%"},
				{top:"17%",left:"86%"},
				{top:"13%",left:"95%"},
		]
}

export let treeConfig = {
		sceneOneConfig: [
				{width:"3.4%",bottom:0,left:"5%",url:tree1,zIndex:1},
				{width:"3.5%",bottom:0,left:"7%",url:tree2,zIndex:2},
				{width:"2.4%",bottom:0,left:"9.5%",url:tree3,zIndex:3},
				{width:"2.4%",bottom:0,left:"20.5%",url:tree4,zIndex:2},
				{width:"3.5%",bottom:0,left:"21.3%",url:treeBright,zIndex:1},
				{width:"2.4%",bottom:0,left:"23.8%",url:treeDark,zIndex:1},
				{width:"14.4%",bottom:0,left:"1000px",url:mountain,zIndex:0},
		]
}

export let pictureConfig = {
		ribbonLeft,ribbonRight,
}
