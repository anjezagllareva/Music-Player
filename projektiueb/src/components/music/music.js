import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import Controls from "../controls/controls";
import { Stage, Sprite, Text, Container } from "@pixi/react";

class Music extends React.Component {
	state = {
		audio: null,
		duration: "00:00",
		currentTime: "00:00",
		volume: 70,
		last_volume: 70,
	};

	componentDidMount = () => {
		const audio = React.createRef();
		this.setState({ audio });

		document.addEventListener("keyup", (event) => {
			if (event.code === "Space") {
				this.props.handleTooglePlay(this.state.audio);
			}
		});
	};

	componentDidUpdate = () => {
		if (this.props.song.isPlaying) {
			var playPromise = this.state.audio.current.play();
			if (playPromise !== undefined) {
				playPromise
					.then((_) => {
						this.updateDuration();
					})
					.catch((error) => {});
			}
		}
	};

	updateDuration = () => {
		try {
			setTimeout(() => {
				const duration_string = this.state.audio.current.duration;
				this.setState({ duration: duration_string });
			}, 400);
		} catch (err) {
			setTimeout(() => {
				this.updateDuration();
			}, 200);
		}
	};

	updateCurrentTime = () => {
		try {
			setTimeout(() => {
				const currentTime = this.state.audio.current.currentTime;
				this.setState({ currentTime: currentTime });
			}, 400);
		} catch (err) {
			setTimeout(() => {
				this.updateCurrentTime();
			}, 200);
		}
	};

	onChangeSlider = (e) => {
		let v = e.target.value;
		this.setState({ currentTime: v });
		const audio = this.state.audio;
		audio.current.currentTime = v;
		this.setState({ audio });
	};

	onChangeVolume = (e) => {
		let v = e.target.value;
		this.setState({ volume: v, last_volume: v });
		const audio = this.state.audio;
		audio.current.volume = v / 100;
		this.setState({ audio });
	};

	toggleMute = () => {
		const audio = this.state.audio;
		let volume = this.state.volume / 100;
		if (!volume) {
			const last_volume = this.state.last_volume;
			audio.current.volume =
				last_volume !== 0 ? this.state.last_volume / 100 : 1;
			volume = last_volume !== 0 ? last_volume : 100;
		} else {
			audio.current.volume = 0;
			volume = 0;
		}
		this.setState({ audio, volume });
	};

	render() {
		const {
			song,
			handleSkipForward,
			handleTooglePlay,
			handleSkipBackward,
			hideSidebar,
		} = this.props;

		return (
			<div className="song" onClick={hideSidebar}>
				{!song.image ? (
					<FontAwesomeIcon icon={faPlay} />
				) : (
					<Stage
						width={600}
						height={500}
						options={{ backgroundAlpha: 0 }}
					>
						<Container>
							<Sprite
								image={song.image}
								x={300}
								y={200}
								width={300}
								height={300}
								anchor={0.5}
								borderRadius={150}
							/>
							<Text
								text={song.name}
								x={225}
								y={380}
								style={{ fontSize: 30, fill: "white" }}
							/>
							<Text
								text={song.artist}
								x={200}
								y={430}
								style={{ fontSize: 22, fill: "white" }}
							/>
						</Container>
					</Stage>
				)}
				<audio
					src={song.src}
					ref={this.state.audio}
					onEnded={() => {
						handleSkipForward();
					}}
					onTimeUpdate={this.updateCurrentTime()}
					preload="metadata"
				></audio>
				<Controls
					hadleTogglePlay={() => handleTooglePlay(this.state.audio)}
					isPlaying={song.isPlaying}
					handleSkipForward={handleSkipForward}
					handleSkipBackward={handleSkipBackward}
					duration={this.state.duration}
					currentTime={this.state.currentTime}
					onChangeSlider={this.onChangeSlider}
					onChangeVolume={this.onChangeVolume}
					vol={this.state.volume}
					toggleMute={this.toggleMute}
				/>
			</div>
		);
	}
}

export default Music;
