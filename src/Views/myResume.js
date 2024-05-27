import "../styles/myResume.scss"
import {cloudConfig, treeConfig, pictureConfig} from "../sceneConfig/sceneConfig";
import {useEffect, useRef, useState} from "react";

let timer = null;

function MyResume() {
		let numberList = ["One", "Two", "Three", "Four"];
		let characterDom = useRef();
		let [dogAnimation, setDogAnimation] = useState({left: "10%",bottom:"-1.7%"});
		let [sceneMove, setSceneMove] = useState({left: "0%"});
		let [dogClassName, setDogClassName] = useState("characterFall");

		function getCloud(sceneNumber) {
				let getCloudInfo = cloudConfig[`scene${numberList[sceneNumber - 1]}Config`];
				const cloudAmount = 7;
				let arr = [];
				for (let i = 1; i < cloudAmount + 1; i++) {
						arr.push(
								<div key={getCloudInfo[i - 1].top + i} style={getCloudInfo[i - 1]}
													className={`cloud scene${sceneNumber}Cloud`}></div>
						)
				}
				return arr
		}

		useEffect(() => {
				window.onkeydown = (e) => {
						if (timer === null && e.key === 'ArrowRight') {
								let left = parseInt(dogAnimation.left.split("%")[0]);
								let sceneLeft = parseInt(sceneMove.left.split("%")[0]);
								setDogAnimation({...dogAnimation,transform:"rotateY(0deg)", animation: "characterWalk .5s ease-out", left: left + 2 + "%"})
								setSceneMove({...sceneMove,left: `${sceneLeft-6}%`})
								console.log(sceneLeft);
								timer = setTimeout(() => {
										timer = null;
										setDogAnimation({...dogAnimation,transform:"rotateY(0deg)", animation: "none", left: left + 2 + "%"})
										clearTimeout(timer);
								}, 200)
						}
						if (timer === null && e.key === 'ArrowLeft') {
								let left = parseInt(dogAnimation.left.split("%")[0]);
								let sceneLeft = parseInt(sceneMove.left.split("%")[0]);
								if(sceneLeft===0) {
										return;
								}
								setDogAnimation({...dogAnimation,transform:"rotateY(180deg)", animation: "characterWalk .5s ease-out", left: left - 2 + "%"})
								setSceneMove({...sceneMove,left: `${sceneLeft+6}%`})
								console.log(sceneLeft);
								timer = setTimeout(() => {
										timer = null;
										setDogAnimation({...dogAnimation,transform:"rotateY(180deg)", animation: "none", left: left - 2 + "%"})
										clearTimeout(timer);
								}, 200)
						}
				}
		}, [dogAnimation])

		function getTree(sceneNumber) {
				let getTreeInfo = treeConfig[`scene${numberList[sceneNumber - 1]}Config`];
				let arr = [];
				for (let i = 1; i <= getTreeInfo.length; i++) {
						let {bottom, left, url, zIndex} = getTreeInfo[i - 1];
						arr.push(
								<img key={url + Math.random()} alt={"scene"} src={url} className={"tree"} style={getTreeInfo[i - 1]}></img>
						)
				}
				return arr;
		}

		setTimeout(()=>{
				setDogClassName(dogClassName.replace("characterFall","characterWalking"));
		},1000)

		return (
				<div className={"resumeMain"}>
						<div className="scene1">
								<div className="onGround" style={sceneMove}>
										<div className="resumeTitle">
												<img className={"ribbonLeft"} src={pictureConfig.ribbonLeft} alt=""/>
												<h2 className={"content"}>My Resume</h2>
												<img className={"ribbonRight"} src={pictureConfig.ribbonRight} alt=""/>
										</div>
										<div className={`characterWalking ${dogClassName}`} ref={characterDom} style={dogAnimation}></div>
										{getCloud(1)}
										{getTree(1)}
								</div>
								<div className="underGround" style={sceneMove}>
										<div className="ground"></div>
										<div className="tipsTutorial">
												Press right or left arrow button to move
										</div>
								</div>
						</div>
				</div>
		)
}

export default MyResume
