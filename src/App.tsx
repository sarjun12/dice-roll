import { useState } from "react";
function App() {
  function getRandom() {
    return Math.ceil(Math.random() * 6);
  }
  const [points1, setPoints1] = useState(0);
  const [isRolling, setIsRolling] = useState(false);
  const [points2, setPoints2] = useState(0);
  const [turns1, setTurns1] = useState(5);
  const [turns2, setTurns2] = useState(5);
  const [isPlayer1, setIsPlayer1] = useState(true);
  const [side, setSide] = useState(getRandom());
  function reset() {
    setPoints1(0);
    setPoints2(0);
    setIsPlayer1(true);
    setTurns1(5);
    setTurns2(5);
  }

  async function diceAnimation() {
    for (let i = 0; i < 5; i++) {
      setSide(getRandom());
      await sleep(200);
    }
  }
  function sleep(ms: number) {
    return new Promise((res) => setTimeout(res, ms));
  }
  console.log(isRolling);
  async function handleRoll() {
    setIsRolling(true);

    await diceAnimation();
    let score = getRandom();
    setSide(score);
    if (isPlayer1) {
      setPoints1((prev) => prev + score);
      setTurns1((prev) => prev - 1);
    } else {
      setPoints2((prev) => prev + score);
      setTurns2((prev) => prev - 1);
    }
    setIsPlayer1((prev) => !prev);
    setIsRolling(false);
  }
  return (
    <>
      <div className="h-screen w-screen bg-slate-700 text-white flex justify-center">
        <div className="flex flex-row justify-evenly w-full min-h-96 items-center">
          <div className="flex  h-52 bg-slate-800 py-3 px-5 flex-col text-center">
            <span className="text-2xl font-mono font-medium py-3">
              player 1
            </span>
            <span className="text-xl font-mono font-normal py-3">
              points :{points1}
            </span>
            <span className="text-xl font-mono font-normal py-3">
              Remaining Turns :{turns1}
            </span>
            <button
              className="bg-blue-500 hover:bg-blue-800 disabled:bg-zinc-700 disabled:text-zinc-500 rounded-full "
              onClick={handleRoll}
              disabled={!isPlayer1 || isRolling}
            >
              ROLL
            </button>
          </div>
          {side === 1 && <One></One>}
          {side === 2 && <Two></Two>}
          {side === 3 && <Three></Three>}
          {side === 4 && <Four></Four>}
          {side === 5 && <Five></Five>}
          {side === 6 && <Six></Six>}
          <div className="flex  h-52 bg-slate-800  flex-col font-mono text-center py-3 px-5">
            <span className="text-2xl font-medium py-3">Player 2:</span>
            <span className="text-xl font-normal py-3">points :{points2}</span>
            <span className="text-xl font-normal py-3">
              Remaining Turns :{turns2}
            </span>
            <button
              className="bg-blue-500 hover:bg-blue-800 disabled:bg-zinc-700 disabled:text-zinc-500 rounded-full "
              onClick={handleRoll}
              disabled={isPlayer1 || isRolling}
            >
              ROLL
            </button>
          </div>
        </div>
      </div>
      {turns2 == 0 && (
        <Result score1={points1} score2={points2} reset={reset}></Result>
      )}
    </>
  );
}
function Result(props: { score1: number; score2: number; reset: () => void }) {
  return (
    <div
      id="default-modal"
      className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className="absolute top-0 left-0 w-screen h-screen bg-black opacity-80 text-center"></div>
      <div className="relative text-white flex justify-center items-center p-4 w-screen h-screen text-center">
        <div className="relative flex flex-col justify-between bg-gray-800 rounded-lg min-w-56 min-h-32 p-6 shadow">
          <div className="text-xl w-full">
            {props.score1 > props.score2 && "Player 1 won"}
            {props.score1 < props.score2 && "Player 2 won"}
            {props.score1 === props.score2 && "Tie"}
          </div>
          <button
            className="p-2 bg-blue-500 hover:bg-blue-400 rounded-md text-lg"
            onClick={props.reset}
          >
            Restart
          </button>
        </div>
      </div>
    </div>
  );
}
function One() {
  return (
    <div className="flex w-24 h-24 bg-white justify-center  items-center">
      <div className="bg-black w-2 h-2 rounded-full justify-"></div>
    </div>
  );
}

function Two() {
  return (
    <div className="flex w-24 h-24 bg-white justify-evenly items-center">
      <div className="bg-black w-2 h-2  rounded-full"></div>
      <div className="bg-black w-2 h-2 rounded-full"></div>
    </div>
  );
}

function Four() {
  return (
    <div className="flex flex-col w-24 h-24 bg-white justify-evenly">
      <div className="flex flex-row align-middle w-full justify-evenly">
        <div className="bg-black w-2 h-2 rounded-full"></div>
        <div className="bg-black w-2 h-2 rounded-full"></div>
      </div>
      <div className="flex flex-row w-full justify-evenly ">
        <div className="bg-black flex flex-row w-2 h-2 rounded-full"></div>
        <div className="bg-black  flex-row w-2 h-2 rounded-full"></div>
      </div>
    </div>
  );
}
function Six() {
  return (
    <div className="flex flex-col w-24 h-24 bg-white justify-evenly">
      <div className="flex flex-row align-middle w-full justify-evenly">
        <div className="bg-black w-2 h-2 rounded-full"></div>
        <div className="bg-black w-2 h-2 rounded-full"></div>
        <div className="bg-black w-2 h-2 rounded-full"></div>
      </div>
      <div className="flex flex-row w-full justify-evenly ">
        <div className="bg-black w-2 h-2 rounded-full"></div>
        <div className="bg-black w-2 h-2 rounded-full"></div>
        <div className="bg-black  flex-row w-2 h-2 rounded-full"></div>
      </div>
    </div>
  );
}
function Five() {
  return (
    <div className="flex flex-col w-24 h-24 bg-white justify-evenly">
      <div className=" px-4 flex flex-row align-middle w-full justify-between">
        <div className="bg-black w-2 h-2 rounded-full"></div>
        <div className="bg-black w-2 h-2 rounded-full"></div>
      </div>
      <div className=" flex flex-row w-full justify-center">
        <div className="bg-black w-2 h-2 rounded-full"></div>
      </div>
      <div className="flex flex-row w-full justify-between px-4 ">
        <div className="bg-black w-2 h-2 rounded-full"></div>
        <div className="bg-black  flex-row w-2 h-2 rounded-full"></div>
      </div>
    </div>
  );
}
function Three() {
  return (
    <div className="flex  flex-col justify-evenly w-24 px-3 h-24 bg-white ">
      <div className="flex w-full justify-start">
        <div className="bg-black w-2 h-2 rounded-full "></div>
      </div>

      <div className="flex w-full justify-center items-center">
        <div className="bg-black w-2 h-2 rounded-full "></div>
      </div>

      <div className="flex w-full justify-end">
        <div className="bg-black w-2 h-2 rounded-full "></div>
      </div>
    </div>
  );
}
export default App;
