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
				const audio = this.state.audio;
				if (audio && audio.current) {
					const duration_string = audio.current.duration;
					this.setState({ duration: duration_string });
				}
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
				const audio = this.state.audio;
				if (audio && audio.current) {
					const currentTime = audio.current.currentTime;
					this.setState({ currentTime: currentTime });
				}
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
		if (audio && audio.current) {
			audio.current.currentTime = v;
			this.setState({ audio });
		}
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

	getTextWidth = (text, font) => {
		const canvas = document.createElement("canvas");
		const context = canvas.getContext("2d");
		context.font = font;
		const width = context.measureText(text).width;
		return width;
	};

	render() {
		const {
			song,
			handleSkipForward,
			handleTooglePlay,
			handleSkipBackward,
			hideSidebar,
		} = this.props;

		const stageWidth = 600;
		const stageHeight = 500;
		const xCenter = stageWidth / 2;
		const imageRadius = 150; 

		return (
			<div className="song" onClick={hideSidebar} style={{ padding: '20px', textAlign: 'center', marginTop: '90px' }}>
				{!song.image ? (
					<FontAwesomeIcon icon={faPlay} />
				) : (
					<>
						<div style={{ borderRadius: '50%', overflow: 'hidden', width: imageRadius * 2, height: imageRadius * 2, margin: '40px auto' }}>
							<Stage
								width={imageRadius * 2}
								height={imageRadius * 2}
								options={{ backgroundAlpha: 0 }}
							>
								<Container>
									<Sprite
										image={song.image}
										x={imageRadius}
										y={imageRadius}
										width={imageRadius * 2}
										height={imageRadius * 2}
										anchor={0.5}
									/>
								</Container>
							</Stage>
						</div>
						<Stage
							width={stageWidth}
							height={200}
							options={{ backgroundAlpha: 0 }}
							style={{ marginTop: '-40px' }}
						>
							<Container>
								<Text
									text={song.name}
									x={xCenter - this.getTextWidth(song.name, "30px Arial") / 2}
									y={30} 
									style={{ fontSize: 30, fill: "white", fontStyle: 'italic', textTransform: 'uppercase' }}
								/>
								<Text
									text={song.artist}
									x={xCenter - this.getTextWidth(song.artist, "22px Arial") / 2}
									y={80}
									style={{ fontSize: 22, fill: "white", fontStyle: 'italic', textTransform: 'uppercase' }}
								/>
							</Container>
						</Stage>
					</>
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
