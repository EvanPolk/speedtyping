import { useEffect, useState } from "react";
import Settings from "../components/Settings";
import TextPort from "../components/TextPort";
import axiosInstance from "../axiosInstance";

function Home() {
  const [words, setWords] = useState([]);
  const [isTyping, toggleIsTyping] = useState(false);
  const [amountOfWords, setAmountOfWords] = useState(25);
  const [wordsPerMinute, setWordsPerMinute] = useState(-1);

  useEffect(() => {
    fetchWords();
  }, []);

  const fetchWords = async () => {
    const res = await axiosInstance.get("/word?amount=" + amountOfWords);
    setWords(res.data);
  };

  const changeIsTyping = (value: boolean) => {
    toggleIsTyping(value);
  };

  const changeWordsPerMinute = (value: number) => {
    setWordsPerMinute(value);
  };

  const changeAmountOfWords = (value: number) => {
    setAmountOfWords(value);
  };

  return (
    <div className="h-full w-full flex flex-col justify-center">
      <Settings
        wordsPerMinute={wordsPerMinute}
        fetchWords={fetchWords}
        isTyping={isTyping}
        amountOfWords={amountOfWords}
        setAmountOfWords={changeAmountOfWords}
      />
      <TextPort
        words={words}
        isTyping={isTyping}
        toggleIsTyping={changeIsTyping}
        setWordsPerMinute={changeWordsPerMinute}
        fetchWords={fetchWords}
      />
    </div>
  );
}

export default Home;
