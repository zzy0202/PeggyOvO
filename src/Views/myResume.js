import "../styles/myResume.scss"
import {cloudConfig, gateConfig, pictureConfig, treeConfig} from "../sceneConfig/sceneConfig";
import {useEffect, useRef, useState} from "react";
import "animate.css"

let timer = null;
let initialTimer = null;
let loadingEndTimer = null;
let loadingDotInterval = null;

function MyResume() {
		let numberList = ["One", "Two", "Three", "Four"];
		let animationList = ["animate__bounceInUp display"]
		let characterDom = useRef();
		let [dogAnimation, setDogAnimation] = useState({left: "10%", bottom: "-1.7%"});
		let [sceneMove, setSceneMove] = useState({left: "0%"});
		let [dogClassName, setDogClassName] = useState("characterFall");
		let gradeLevel = ["BEGINNER", "ELEMENTARY", 'INTERMEDIATE', "ADVANCED", "EXPERT"];
		let skillDom = useRef();
		let [animateShowDomList, setAnimateShowDomList] = useState([]);
		let [animationClassName, setAnimationClassName] = useState([]);
		let [characterMoveDistance, setCharacterMoveDistance] = useState();
		let [fallingEnd, setFallingEnd] = useState(0);
		let [isLoadingEnd, setIsLoadingEnd] = useState(0);
		let [animationDomList, setAnimationDomList] = useState([]);
		let [toShowList, setToShowList] = useState({});
		let workExperience = [
				{work: "Vue2", percent: "80%"},
				{work: "React", percent: "15%"},
				{work: "Node", percent: "5%"},
		]
		let [loadingDotActive, setLoadingDotActive] = useState(0);
		let [testingInterval, setTestingInterval] = useState(null);
		let [paperProperty,setpaperProperty] = useState([]);

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

		//初始化渲染函数
		useEffect(() => {
				let timer = setTimeout(() => {
						setFallingEnd(1);
						clearTimeout(timer);
				}, 2300)
				animateShowDomList.push(skillDom)

				loadingEndTimer = setTimeout(() => {
						setIsLoadingEnd(1);
				}, 1200)

				let temp = document.querySelectorAll(".needToAnimate");
				setAnimationDomList([...temp]);
		}, [isLoadingEnd, fallingEnd])

		useEffect(() => {
				for (const [index, animationElement] of animateShowDomList.entries()) {
						let {offsetLeft} = animationElement.current;
						if (offsetLeft - characterDom.current.offsetLeft <= 350 && offsetLeft !== 0 && !isNaN(characterMoveDistance)) {
								animationElement.current.className = animationElement.current.className.replace("noDisplay", "");
								let temp = animationClassName;
								temp[index] = animationList[index];
								setAnimationClassName([...temp]);
						}
				}

				animationDomList.forEach((value, index) => {
						let {left} = value.getBoundingClientRect();
						if (left <= innerWidth - 1050 && !toShowList[index]) {
								let temp = toShowList;
								temp[index] = true;
								setToShowList(temp);
						}
				})
		}, [characterMoveDistance, animateShowDomList,toShowList])

		useEffect(() => {
				initialTimer = window.onkeydown = (e) => {
						if (timer === null && e.key === 'ArrowRight' && fallingEnd) {
								let left = parseInt(dogAnimation.left.split("%")[0]);
								let sceneLeft = parseInt(sceneMove.left.split("%")[0]);
								if (left >= 181) {
										setDogAnimation({
												...dogAnimation,
												transform: "rotateY(0deg)",
												animation: "characterJump 1000ms ease-out infinite",
												left: left + "%"
										})
										return 0;
								}
								setDogAnimation({
										...dogAnimation,
										transform: "rotateY(0deg)",
										animation: "characterWalk .5s ease-out",
										left: left + 3 + "%"
								})
								setSceneMove({...sceneMove, left: `${sceneLeft - 8.7}%`})
								timer = setTimeout(() => {
										timer = null;
										setCharacterMoveDistance(characterDom.current.offsetLeft);
										setDogAnimation({...dogAnimation, transform: "rotateY(0deg)", animation: "none", left: left + 3 + "%"})
										clearTimeout(timer);
								}, 200)
						}
						if (timer === null && e.key === 'ArrowLeft' && fallingEnd) {
								let left = parseInt(dogAnimation.left.split("%")[0]);
								let sceneLeft = parseInt(sceneMove.left.split("%")[0]);
								if (sceneLeft >= 0) {
										sceneLeft = 0
										left = 0;
										setDogAnimation({
												...dogAnimation,
												transform: "rotateY(180deg)",
												left: 10 + "%"
										})
										setSceneMove({...sceneMove, left: `${0}%`});
										return;
								}
								setDogAnimation({
										...dogAnimation,
										transform: "rotateY(180deg)",
										animation: "characterWalk .5s ease-out",
										left: left - 3 + "%"
								})
								setSceneMove({...sceneMove, left: `${sceneLeft + 8.6}%`})
								timer = setTimeout(() => {
										timer = null;
										setDogAnimation({...dogAnimation, transform: "rotateY(180deg)", animation: "none", left: left - 3 + "%"})
										clearTimeout(timer);
								}, 200)
						}
				}
		}, [dogAnimation, fallingEnd])

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

		function getGate() {
				let arr = [];
				for (let i = 0; i < gateConfig.length; i++) {
						let {width, bottom, left, zIndex, url, innerText} = gateConfig[i];
						arr.push(
								<div key={width.toString()} style={{width, bottom, left, zIndex}} className={"gate"}>
										<img src={url} style={{width: "100%"}} alt="gate"/>
										<span>{innerText}</span>
								</div>
						)
				}
				return arr
		}

		function getGradeLevel() {
				return gradeLevel.reverse().map(grade => {
						return (
								<div key={grade} className={`grade ${grade}`}>{grade}</div>
						)
				})
		}

		function getSkillGradeResult() {
				let skillInfo = [
						{name: "Html", level: 4.6},
						{name: "CSS", level: 4.8},
						{name: "Javascript", level: 5.2},
						{name: "Vue", level: 5.2},
						{name: "React", level: 3.9},
						{name: "NodeJS", level: 3.1},
				]
				return skillInfo.map((info, index) =>
						(<div key={info.name} className={"skillCategory animateElement"}>
								<div className="skillName">{info.name}</div>
								<div className={`flower ${animationClassName[0]}`}
													style={{transitionDelay: `${index * .15}s`, transitionDuration: ".15s"}}>
										<div style={{height: `${info.level * 16.5}%`, animationDuration: "1s", animationDelay: `${0.15 * index}s`}}
															className={`flowerStem ${animationClassName[0]}`}></div>
								</div>
						</div>)
				)
		}

		setTimeout(() => {
				setDogClassName(dogClassName.replace("characterFall", "characterWalking"));
		}, 2300)

		function getColorPaper() {
				let arr = [];
				for (let i = 0; i < paperProperty.length; i++) {
						arr.push(<div className={"paper"} style={paperProperty[i]}></div>)
				}
				return arr;
		}

		useEffect(()=>{
				let paperAmount = 60;
				let arr = [];
				for (let i = 0; i < paperAmount; i++) {
						let style = {
								width:`${Math.round(Math.random()*10+4)}px`,
								height:`${Math.round(Math.random()*10+4)}px`,
								backgroundColor:`#${Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, "0")}`,
								left:`${Math.round(Math.random()*95)}%`,
								transform:`rotate(${Math.floor(Math.random()*360)}deg)`,
								animation: `paperAnimation ${Math.random()*3+1.5}s linear infinite`,
								// top:"-5%",
								// animation:`paperAnimation ${Math.random()*3}s linear`
						}
						arr.push(style)
				}
				setpaperProperty(arr);
		},[])

		return (
				<div className={"resumeMain"}>
						<div className="wrapperPreload"></div>
						{/*<h1>{animateShowDomList[0].current.className}</h1>*/}
						<div className={`loadingPage ${isLoadingEnd ? "noDisplay" : ""}`}>
								<div className="leftRibbon"></div>
								<div className="loading">
										<span className={"loadingText"}>Loading</span>
										<div className="loadingBullets">
												{
														Array(4).fill("").map((res, index) => <span style={{animationDelay:`${index*.1}s`}} className={`bullet ${index}`}></span>)
												}
										</div>
								</div>
								<div className="rightRibbon"></div>
						</div>
						<div className="scene1" style={sceneMove}>
								<div className="onGround">
										<div className="resumeTitle animate__fadeIn" style={{animationDuration: "1s"}}>
												<img className={"ribbonLeft"} src={pictureConfig.ribbonLeft} alt=""/>
												<h2 className={"content"}>My Resume</h2>
												<img className={"ribbonRight"} src={pictureConfig.ribbonRight} alt=""/>
										</div>
										<div className={`characterWalking ${dogClassName}`} ref={characterDom} style={dogAnimation}></div>
										{getCloud(1)}
										{getTree(1)}
										{getGate()}
										<div className="mySkill noDisplay" ref={skillDom}>
												<div className="gradeLevel">
														{getGradeLevel()}
												</div>
												<div className="skillGrade">
														{getSkillGradeResult()}
												</div>
										</div>
								</div>
								<div className="onConstruction">
										{getCloud(1)}
										<div className="titleExperience"></div>
										<div className="boxes"></div>
										<div className="tower tower1"></div>
										{/*${animateShowDomList[0].isShow?"show":""}*/}
										<div className={`firstExperience needToAnimate`}>
												<div className="educationExperienceTitle">
														<span className="leftRibbon"></span>
														<h2>Education Experience</h2>
														<span className="rightRibbon"></span>
												</div>
												<div className={`chainBoxMain ${toShowList[0] ? "animate__fadeInDownBig show" : ""}`}
																	style={{animationDuration: "1s"}}>
														<div className="chainString"></div>
														<div className="experienceBox">
																<h3 className="date">September 2019 - June 2023</h3>
																<div className="schoolName">
																		Beijing University of Aeronautics and Astronautics
																</div>
																<div className="major">Software Engineering</div>
																<p>
																		Main courses I've learned: C Programming, Data Structure, Algorithm Design and Analyse, Java OOP
																		programming, Linux and System Programming and others.
																</p>
														</div>
												</div>
												<div className={`robotMain ${toShowList[0] ? "animate__fadeInRightBig show" : ""}`}
																	style={{animationDuration: "1s"}}>
														<div className={`content ${toShowList[0] ? "show" : ""}`}
																			style={{animationDuration: "1s", animationDelay: "1s"}}>
																<ul>
																		<li>Received Distinguished Foreign Students Scholarship Award from 2019-2023</li>
																		<li>Awarded a merit-based scholarship of full tuition fees for four years</li>
																</ul>
														</div>
												</div>
												<div className="skill"></div>
										</div>
										<div className="factory">
												<div className="window"></div>
												<div className="door"></div>
										</div>
										<div className={`secondExperience experience needToAnimate`}>
												<div className="educationExperienceTitle">
														<span className="leftRibbon"></span>
														<h2>Working Experience</h2>
														<span className="rightRibbon"></span>
												</div>
												<div className={`chainBoxMain ${toShowList[1] ? "animate__fadeInDownBig show" : ""}`}
																	style={{animationDuration: "1s"}}>
														<div className="chainString"></div>
														<div className="experienceBox">
																<h3 className="date">July 2022 - October 2023</h3>
																<div className="schoolName">
																		Benchmark Tech Malaysia
																</div>
																<div className="major">Frontend Engineer</div>
																<p>
																		I am responsible for implementing and maintaining the website in this role, cooperate with UI and
																		backend colleagues. Besides, I also coordinating frontend and testing works in Malaysia with the
																		Taiwan HQ.
																</p>
														</div>
												</div>
												<div className={`squidMain ${toShowList[1] ? "animate__fadeInRightBig show" : ""}`}
																	style={{animationDuration: "1s"}}>
														<div className={`content ${toShowList[1] ? "show" : ""}`}
																			style={{animationDuration: "1s", animationDelay: "1s"}}>
																{
																		workExperience.map((res, index) =>
																				(<div key={res.work + index} className={`contentUnit content${index}`}>
																						<div>{res.work}</div>
																						<div>{res.percent}</div>
																				</div>)
																		)
																}
																<div className="smallCircle"></div>
														</div>
														{
																Array(4).fill("").map((res, index) => {
																		return <div className={`squidTentacle tentacle${index}`}></div>
																})
														}
												</div>
												<div className="skill"></div>
										</div>
										<div className="endingContent needToAnimate">
												<div className={`toBeContinue ${toShowList[2] ? "animate__fadeInDown show" : ""}`}
																	style={{animationDuration: "1s"}}>
														<div className={`flagTop`}></div>
														<h2>To be continue ;)</h2>
														<div className="flagBottom"></div>
												</div>
												<div className={`celebrationPaper ${toShowList[2]?"show":""}`}>
														{
																getColorPaper()
														}
												</div>
										</div>
								</div>
								<div className="underGround">
										<div className="ground"></div>
										<div className="tipsTutorial">
												Press right or left arrow button to move
										</div>
										<div className="constructionGround">
												<div className="floor"></div>
												<div className="constructUnderground"></div>
										</div>
								</div>
						</div>
				</div>
		)
}

export default MyResume
