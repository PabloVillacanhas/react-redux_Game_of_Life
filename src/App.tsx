import * as React from "react";
import "./styles.scss";
import { Grid } from "./Grid";
import ControlPanel from "./ControlPanel";
import { useDispatch } from "react-redux";
import { toggleMouseStatus } from "./Actions";

export default function App() {
  const dispatch = useDispatch();

  return (
    <div
      className="App"
      onMouseDown={() => dispatch(toggleMouseStatus())}
      onMouseUp={() => dispatch(toggleMouseStatus())}>
      Conway game of life
      <Grid diagonal={50} />
      <ControlPanel />
    </div>
  );
}
