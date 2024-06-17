import React, { useEffect, useState, useRef } from "react";

interface Props {
  words: Array<string>;
  isTyping: boolean;
  toggleIsTyping: (value: boolean) => void;
  setWordsPerMinute: (value: number) => void;
  fetchWords: () => void;
}

interface JointCharacter {
  char: string;
  index: number;
  wordIndex: number;
}

function TextPort({
  words,
  isTyping,
  toggleIsTyping,
  setWordsPerMinute,
  fetchWords,
}: Props) {
  const [counter, setCounter] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [startTime, setStartTime] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  let line = "";

  for (let i = 0; i < words.length; i++) {
    line += words[i] + " ";
  }

  line = line.slice(0, line.length - 1);

  const splitInput: JointCharacter[] = line.split("").map((char, index) => ({
    char,
    index,
    wordIndex: line.substring(0, index).split(" ").length - 1,
  }));

  useEffect(() => {
    setInterval(() => {
      inputRef.current?.focus();
    }, 1000);
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (line.charAt(counter) === event.key) {
      setCounter((counter) => counter + 1);

      if (line.charAt(counter) === " ") {
        setWordCount((wordCount) => wordCount + 1);
      }
    }

    if (counter === 0) {
      setStartTime(Date.now());
      toggleIsTyping(true);
    }

    if (counter === line.length - 1) {
      const minutes = (Date.now() - startTime) / 60000;
      const wordsPerMinute = (wordCount + 1) / minutes;
      setWordsPerMinute(Math.round(wordsPerMinute));
      toggleIsTyping(false);
      setCounter(0);
      setWordCount(0);
      fetchWords();
    }
  };

  const handleClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      className="h-[75%] w-[75%] bg-zinc-800 rounded mx-auto mb-4 mt-2"
      onClick={handleClick}
    >
      <div className="flex flex-row flex-wrap items-center">
        {line.split(" ").map((_, wordIndex: number) => (
          <div key={wordIndex} className="flex flex-row text-3xl items-center">
            {splitInput
              .filter((char) => char.wordIndex === wordIndex)
              .map((char) => (
                <>
                  {counter === char.index ? (
                    <div
                      className={
                        isTyping
                          ? "h-7 w-0.5 transition ease-in-out rounded bg-amber-400"
                          : "h-7 w-0.5 transition ease-in-out rounded bg-green-800"
                      }
                    ></div>
                  ) : (
                    <></>
                  )}
                  <span
                    key={char.index}
                    className={
                      counter > char.index ? "text-white" : "text-zinc-600"
                    }
                  >
                    {char.char}
                  </span>
                </>
              ))}
            <span>&nbsp;</span>
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
