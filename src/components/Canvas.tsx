import { defaultMaxListeners } from "events";
import React, { Component, useEffect, useRef, useState } from "react";
import { init, draw, update } from "./draw";

// interface Props {
// 	state: {
// 		width: number;
// 		height: number;
// 	}
// }

// type MyState = {
// 	width: number;
// 	height: number;
// 	scale: number,
// }

// class Canvas extends Component<MyState> {
// 	state: MyState = {
// 		width: 0,
// 		height: 0,
// 		scale: 1,
// 	};

// 	canvasRef: (el: HTMLCanvasElement) => void;
// 	onResize: () => void;

// 	$canvas: HTMLCanvasElement;
	
// 	componentDidMount() {
// 		window.addEventListener('resize', this.handleResize, false);
// 		this.setSize();
// 	  }
	
// 	  componentWillUnmount() {
// 		window.removeEventListener('resize', this.handleResize, false);
// 	  }
	
// 	  handleResize = () => {
// 		this.setSize();
// 		this.onResize();
// 	  };

// 	  setSize = () => {
// 		const parent = this.$canvas.parentElement;
	
// 		if (!parent) {
// 		  return;
// 		}

// 		const width = parent.offsetWidth;
// 		const height = parent.offsetHeight;
	
// 		// const [width, height] = getSize(parent);
	
// 		this.setState({ width, height });
// 	  };

// 	// setRef = (el: HTMLCanvasElement) => {	
// 	// 	this.$canvas = el;
// 	// 	if (typeof canvasRef === 'function') {
// 	// 	  canvasRef(el);
// 	// 	}
// 	//   };

// 	render() {
// 		// const { scale, onResize, canvasRef, ...props } = this.props;
//     	const { width, height, scale } = this.state;
	
// 		return (
// 			<canvas
// 				ref={this.canvasRef}
// 				width={width * scale}
//         		height={height * scale}
//         		style={{ width, height }}
// 			/>
// 		);
// 	};
// }

function parentWidth(elem: HTMLElement | null) {
	return elem!.clientWidth;
}

function parentHeight(elem: HTMLElement | null) {
	return elem!.clientWidth;
}

// export default Canvas;
// prop: { width: number, height: number }
const Canvas = () => {
	// var {width, height} = prop;
	const canvas = useRef<HTMLCanvasElement | null>(null);
	const div = useRef<HTMLDivElement | null>(null);

	const [countdown, setCountdown] = useState(true);

	let canvasHeight = 0;
	let canvasWidth = 0;
	if (document.getElementById('container')) {
		canvasHeight = parentWidth(document.getElementById('container'));
		canvasWidth = parentHeight(document.getElementById('container'));
	}
		
	const mouse = {
		y : 0,
	}

	// const ball = {
	// 	x : canvasWidth / 2,
	// 	y : canvasHeight / 2,
	// 	radius : 10,
	// 	velocityX : 7,
	// 	velocityY : 0,
	// 	speed : 7,
	// }

	// const user = {
	// 	x : 0,
	// 	y : (canvasHeight - 100) / 2,
	// 	width : 10,
	// 	height : 100,
	// 	score : 0,
	// }

	// const com = {
	// 	x : canvasWidth - 10,
	// 	y : (canvasHeight - 100) / 2,
	// 	width : 10,
	// 	height : 100,
	// 	score : 0,
	// }

	// const net = {
	// 	x : (canvasWidth - 2) / 2,
	// 	y : 0,
	// 	width : 2,
	// 	height : 10,
	// }

	useEffect(() => {
		init({ canvas, mouse });
	}, [])
	
	useEffect(() => {
		console.log(document.getElementById('container')?.clientHeight);
		console.log(document.getElementById('container')?.clientWidth);
		const interval = setInterval(() => {
			update({ canvas, mouse });
			draw({ canvas, mouse });
		}, 25);
		return () => clearInterval(interval);
	}, [countdown]);

	// document.getElementById('container')?.addEventListener('resize', resizeCanvas, false);

//  className=" m-4 mt-8 flex  h-5/6 flex-col justify-center rounded-lg md:ml-4 lg:m-8  lg:mr-2 lg:w-screen "

	return (
		<div id="container" ref={div} className="w-4/5 h-5/6">			
			<canvas
					id="myCanvas"
					ref={canvas}
					style={{border: "1px solid #000"}}
					onMouseMove={(evt) => {mouse.y = evt.clientY - canvas.current!.getBoundingClientRect().top - 50}}
				/>
			{/* { countdown && <div id="overlay" className="text-6xl text-red-400"><h1>Ready?</h1><CountdownTimer seconds={3}/></div>} */}
		</div>
	);
}

export default Canvas;

// const CountdownTimer = ({seconds}: {seconds: number}) => {
	// 	const [timeLeft, setTimeLeft] = useState(seconds);

	// 	useEffect(() => {
	// 		if (timeLeft == -1) {
	// 			setCountdown(false);
	// 			return ;
	// 		}
	// 		const interval = setInterval(() => {
	// 			setTimeLeft(timeLeft - 1);
	// 		}, 1000);
	// 		return () => clearInterval(interval);
	// 	}, [timeLeft]);
	// 	if (timeLeft)
	// 		return (<h1>{timeLeft}</h1>);
	// 	else
	// 		return (<h1>GO!</h1>)
	// }
 