import React, { useEffect, useState, useRef } from "react";

interface Props {
  text: String;
}

function TextPort({ text }: Props) {
  const [counter, setCounter] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const splitInput = text.split("");

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleClick = () => {
    inputRef.current?.focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === splitInput[counter]) {
      setCounter((counter) => counter + 1);
    }

    if (counter === splitInput.length - 1) {
      setCounter(0);
    }
  };

  return (
    <div
      className="h-[75%] w-[75%] bg-zinc-800 rounded mx-auto mb-4 mt-2"
      onClick={handleClick}
    >
      <div className="flex flex-row flex-wrap items-center">
        {splitInput.map((char: String, index: number) => (
          <div key={index} className="flex flex-row items-center text-3xl">
            {index === counter ? (
              <div className="w-0.5 h-7 bg-amber-400"></div>
            ) : (
              <></>
            )}
            <span className={index < counter ? "text-white" : "text-zinc-700"}>
              {char === " " ? "\u00A0" : char}
            </span>
          </div>
        ))}
      </div>
      <input
        id="input"
        type="text"
        ref={inputRef}
        onKeyDown={handleKeyDown}
        className=" absolute left-[-9999px] overflow-hidden"
      ></input>
    </div>
  );
}

export default TextPort;
