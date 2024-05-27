import firstBackground from '../images/homepage/mainBackground.jpg'
import minuteClock from "../images/homepage/minute_clock.png"
import secondClock from "../images/homepage/second_clock.png"
import documentPicture from "../images/homepage/picture1.png"
import documentPicture2 from "../images/homepage/picture2.png"
import tree1Picture from "../images/homepage/pop_tree_right1.png"
import tree2Picture from "../images/homepage/pop_tree_right2.png"
import pinkDotPicture from "../images/homepage/dot.png"

import myAvatar from "../images/homepage/contact/avatar.png"

import "../styles/Home.scss"
import { useNavigate } from 'react-router-dom'

function Home() {
		const navigate = useNavigate();
		function getPinkDot() {
				let arr = [];
				for (let i = 1; i < 4; i++) {
						arr.push(<img key={i + "pinkDot"} className={`pinkDot${i}`} src={pinkDotPicture} alt=""/>)
				}
				return arr
		}

		function getContactList() {
				let contactDetails = [
						{
								url: "https://www.linkedin.com/in/peggy-choo-82a047232/",
								className: "linkedIn"
						},
						{
								url: "https://github.com/zzy0202",
								className: "github"
						},
						{
								url: "https://api.whatsapp.com/send?phone=601162041835&text=HelloWorld!",
								className: "whatsApp"
						},
						{
								url: "mailto:yung@hotmail.my",
								className: "email",
						}
				]
				return contactDetails.map(data=>{
						return <a href={data.url} key={data.url} target={"_blank"} className={`${data.className} contact`}></a>
				})
		}

		function toResumePage() {
				navigate("/myResume");
		}

		console.log("slalsa,ls")

		return (
				<div className={'homeMain'}>
						<div className="topBar">
								<div className="wrapper">
										<div className={'myName'}>Peggy Choo</div>
										<div className={'contactList'}>
												{getContactList()}
										</div>
								</div>
						</div>
						<div className="landingView">
								<div className="tableBackground">
										<img src={firstBackground} alt="" className={'firstBackground'}/>
										<div className="minuteClock clock">
												<img src={minuteClock} alt=""/>
										</div>
										<div className="secondClock clock">
												<img src={secondClock} alt=""/>
										</div>
										<div className={'documentPic'}>
												<img src={documentPicture} alt=""/>
										</div>
										<div className={'documentPic2'}>
												<img src={documentPicture2} alt=""/>
										</div>
										<div className={'tree1'}>
												<img src={tree1Picture} alt=""/>
										</div>
										<div className={'tree2'}>
												<img src={tree2Picture} alt=""/>
										</div>
										<div className={'pinkDot'}>
												{getPinkDot()}
										</div>
								</div>
						</div>
						<div className="aboutMe">
								<div className="avatar">
										<div className="circleBackground"></div>
										<img src={myAvatar} alt="avatar"/>
								</div>
								<div className="introduction">
										<h1>Hi! Here's Peggy.</h1>
										<h1>I am a frontend engineer <br/>currently based in Malaysia</h1>
										<p>I have been working as a frontend engineer since 2022.
												It's fun for me to build my own world with creativity.<br/>
												If you wish to know more about me, please click the button below
												and have an adventure here!
										</p>
										<div onClick={toResumePage} className="adventureButton">Start Adventure!</div>
								</div>
						</div>
						{/*<div className={"separatorBackground"}></div>*/}
						<div className="emailContactMe">
								<div className="leftContent">
										<h2>Please feel free to contact me!</h2>
										<input type="text" placeholder={"Email address"}/>
										<textarea type="text" className={"textContent"} placeholder={"Say something ;)"}></textarea>
										<div className={"sendButtonWrap"}>
												<button className={"sendMessage"}>Send Message</button>
										</div>
								</div>
						</div>
				</div>
		)
}

export default Home
