import React, { useEffect } from 'react';
import './App.css';
import {POINTS} from './Points';
function App() {
  const [pos1, setPos1] = React.useState({
    x: 0,
    y: 0,
  });

  const [pos2, setPos2] = React.useState({
      x: 0,
      y: 0,
  });
  const [condition, setCondition] = React.useState(true);
  const list: any = [];

const drawLine = () => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const ctx = canvas?.getContext("2d") as CanvasRenderingContext2D;
    ctx?.beginPath();
    ctx?.moveTo(pos1.x, pos1.y);
    ctx?.lineTo(pos2.x, pos2.y);
    ctx?.stroke();
    list.push({ x1: pos1.x, y1: pos1.y, x2: pos2.x, y2: pos2.y });
    console.log(list);
    setPos1({ x: 0, y: 0 });
    setPos2({ x: 0, y: 0 });
    
}
const handleClick = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
      condition
        ? setPos1({ x: e.clientX, y: e.clientY })
        : setPos2({ x: e.clientX, y: e.clientY });
      console.log(pos1, pos2);
      setCondition(!condition);
}
  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

 const draw = async () => {
  
    for(let i = 0; i < POINTS.length; i++) {
        const canvas = document.getElementById("canvas") as HTMLCanvasElement;
        const ctx = canvas?.getContext("2d") as CanvasRenderingContext2D;
        ctx.lineWidth = 10;
        switch (POINTS[i].color) {
          case "red":
            ctx.strokeStyle = "#ff000050";
            break;
          case "green":
            ctx.strokeStyle = "#00ff0050";
            break;
          case "blue":
            ctx.strokeStyle = "#0000ff50";
            break;
          default:
            ctx.strokeStyle = "#00000050";
            break;
        }
        ctx.beginPath();
        ctx.moveTo(POINTS[i].x1, POINTS[i].y1);
        ctx.lineTo(POINTS[i].x2, POINTS[i].y2);
        ctx.stroke();
        await sleep(500);
    };
}

  return (
    <div className="App">
      <canvas
        id="canvas"
        width="800"
        height="600"
        onClick={handleClick}
      />
      <button onClick={draw}>Draw Line</button>
    </div>
  );
}

export default App;
