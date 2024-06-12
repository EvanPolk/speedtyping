import { useState } from "react";
import Settings from "../components/Settings";
import TextPort from "../components/TextPort";

function Home() {
  const [quote, setQuote] = useState(
    "The quick brown fox jumped over the lazy dog."
  );

  return (
    <div className="h-full w-full flex flex-col justify-center">
      <Settings />
      <TextPort text={quote} />
    </div>
  );
}

export default Home;
