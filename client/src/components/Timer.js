import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:9003/");

function Timer() {
  //timer
  const [time, setTime] = useState({ m: 3, s: 20 });
  const [timeOpponent, setTimeOpponent] = useState({ m: 3, s: 20 });
  const [show, setShow] = useState(false);
  const [buttonTimer, setButtonTimer] = useState(true);
  const [status, setStatus] = useState(0);
  const [interv, setInterv] = useState();
  const [statusOpponent, setStatusOpponent] = useState(0);
  const [intervOpponent, setIntervOpponent] = useState();
  var updatedS = time.s;
  var updatedM = time.m;
  var updatedSOpponent = timeOpponent.s;
  var updatedMOpponent = timeOpponent.m;

  useEffect(() => {
    socket.on("timerStart", () => {
      runOpponent();
      setStatusOpponent(1);
      setIntervOpponent(setInterval(runOpponent, 1000));
    });
  }, []);

  useEffect(() => {
    socket.on("timerStop", () => {
      clearInterval(intervOpponent);
      setStatusOpponent(1);
    });
  }, [intervOpponent]);

  useEffect(() => {
    socket.on("timerStop2", () => {
      run();
      setStatus(1);
      setInterv(setInterval(run, 1000));
    });
  }, []);

  const startTimerHandler = () => {
    run();
    setInterv(1);
    setInterv(setInterval(run, 1000));
    socket.emit("timerStart");
  };

  const stop = () => {
    clearInterval(interv);
    setStatus(1);
    runOpponent();
    setStatusOpponent(1);
    setIntervOpponent(setInterval(runOpponent, 1000));
    socket.emit("timerStop");
    socket.emit("timerStop2");
  };
  const startTimerOpponentHandler = () => {
    socket.emit("timerStartOpponent");
  };

  const stopOpponent = () => {
    clearInterval(intervOpponent);
    setStatusOpponent(1);
    socket.emit("timerStopOpponent");
  };

  const run = () => {
    if (updatedS === 0) {
      updatedM--;
      updatedS = 60;
    }
    updatedS--;
    return setTime({ s: updatedS, m: updatedM });
  };

  const runOpponent = () => {
    if (updatedSOpponent === 0) {
      updatedMOpponent--;
      updatedSOpponent = 60;
    }
    updatedSOpponent--;
    return setTimeOpponent({ s: updatedSOpponent, m: updatedMOpponent });
  };

  const updateHandler = () => {
    setTime({ m: 3, s: 20 });
    setTimeOpponent({ m: 3, s: 20 });
    socket.emit("setUpdate");
  };
  //timer

  return (
    <div className="motherBoard">
      <h1>
        {time.m < 10 ? `0${time.m}` : time.m}:
        {time.s < 10 ? `0${time.s}` : time.s}
      </h1>
      {buttonTimer && (
        <button onClick={(e) => startTimerHandler(e)}>Start Timer</button>
      )}

      <button onClick={() => stop()}>Stop</button>
      <button onClick={() => updateHandler()}>Update</button>
      <br />
      <h1>
        {timeOpponent.m < 10 ? `0${timeOpponent.m}` : timeOpponent.m}:
        {timeOpponent.s < 10 ? `0${timeOpponent.s}` : timeOpponent.s}
      </h1>
    </div>
  );
}

export default Timer;
