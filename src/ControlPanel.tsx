import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { next, reset, dragGlider } from "./Actions";

interface IControlPanelProps {}

export default function ControlPanel(props: IControlPanelProps) {
  const [state, setState] = useState({
    isPlaying: false,
    interval: 50,
  });
  const dispatch = useDispatch();

  const timer = useRef(0);

  const handleTogglePlay = () => {
    setState({ ...state, isPlaying: !state.isPlaying });
  };

  useEffect(() => {
    if (state.isPlaying) {
      timer.current = setInterval(() => {
        dispatch(next());
      }, state.interval);
    } else {
      clearInterval(timer.current);
    }
  }, [state]);

  return (
    <div className="control-panel">
      <div className="row">
        {!state.isPlaying && (
          <button
            onClick={() => {
              dispatch(next());
            }}>
            Next!
          </button>
        )}
        <button
          onClick={() => {
            handleTogglePlay();
          }}>
          {state.isPlaying ? "Stop" : "Start!"}
        </button>
        {!state.isPlaying && (
          <button
            onClick={() => {
              dispatch(reset());
            }}>
            Reset!
          </button>
        )}
        {!state.isPlaying && (
          <button
            onClick={() => {
              dispatch(dragGlider("basic"));
            }}>
            Get glider!
          </button>
        )}
      </div>
    </div>
  );
}
