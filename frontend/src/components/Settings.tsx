import React, { useEffect } from "react";

interface Props {
  wordsPerMinute: number;
  fetchWords: () => void;
  isTyping: boolean;
  amountOfWords: number;
  setAmountOfWords: (value: number) => void;
}

function Settings({
  wordsPerMinute,
  fetchWords,
  isTyping,
  amountOfWords,
  setAmountOfWords,
}: Props) {
  useEffect(() => {
    fetchWords();
  }, [amountOfWords]);

  return (
    <div
      className={
        "w-[75%] mx-auto mt-4 mb-2 p-4 flex justify-around items-center rounded transition ease-in-out bg-zinc-800"
      }
    >
      <h3>
        {wordsPerMinute === -1 ? "Random Words" : wordsPerMinute + " wpm"}
      </h3>
      <div className="w-[50%] flex flex-row justify-evenly">
        <button
          className="p-1 bg-zinc-600 text-white transition ease-in-out hover:text-amber-400 rounded "
          onClick={isTyping ? () => {} : fetchWords}
        >
          Next Prompt
        </button>
        <div className="flex flex-row bg-zinc-600 rounded">
          <button
            className={
              "px-2 py-1 transition ease-in-out hover:text-amber-400 active:text-white rounded " +
              (amountOfWords === 10 ? "text-amber-400" : "text-white")
            }
            onClick={() => setAmountOfWords(10)}
          >
            10
          </button>
          <button
            className={
              "px-2 py-1 transition ease-in-out hover:text-amber-400 active:text-white rounded " +
              (amountOfWords === 25 ? "text-amber-400" : "text-white")
            }
            onClick={() => setAmountOfWords(25)}
          >
            25
          </button>
          <button
            className={
              "px-2 py-1 transition ease-in-out hover:text-amber-400 active:text-white rounded " +
              (amountOfWords === 50 ? "text-amber-400" : "text-white")
            }
            onClick={() => setAmountOfWords(50)}
          >
            50
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
