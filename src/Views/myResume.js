import "../styles/myResume.scss"
import {cloudConfig} from "../sceneConfig/sceneConfig";

function MyResume() {

		function getCloud(sceneNumber) {
				let numberList = ["One","Two","Three","Four"]
				let getCloudInfo = cloudConfig[`scene${numberList[sceneNumber-1]}Config`];
				console.log(getCloudInfo);
				const cloudAmount = 7;
				let arr = [];
				for (let i = 1; i < cloudAmount+1; i++) {
						arr.push(
								<div key={getCloudInfo[i-1].top+i} style={getCloudInfo[i-1]} className={`cloud scene${sceneNumber}Cloud`}></div>
						)
				}
				return arr
		}

		return (
				<div className={"resumeMain"}>
						<div className="scene1">
								<div className="onGround">
										{getCloud(1)};
								</div>
								<div className="ground"></div>
								<div className="underGround">

								</div>
						</div>
				</div>
		)
}

export default MyResume
