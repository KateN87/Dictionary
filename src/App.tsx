import { useEffect, useState } from "react";
import "./App.css";
import { WordComp } from "./components/WordComp";
import { HeaderComp } from "./components/HeaderComp";
import { WordList } from "./components/WordList";

function App() {
	const [word, setWord] = useState("");
	const [wordInfo, setWordInfo] = useState<Word>({
		word: "",
		license: {},
		meanings: [],
		phonetics: [],
		sourceUrls: [],
	});

	useEffect(() => {
		if (word) {
			const getWord = async () => {
				const resp = await fetch(
					`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
				);

				const data = await resp.json();
				setWordInfo(data[0]);
				console.log("RESPONSE WORDINFO", data[0]);
			};

			getWord();
		}
	}, [word]);

	return (
		<div className="App">
			<HeaderComp setWord={setWord} />
			<div className="body-container">
				<div className="word-list-container">
					<WordList /* wordInfo={wordInfo} */ />
				</div>
				<div className="word-comp-container">
					{wordInfo.word && <WordComp wordInfo={wordInfo} />}
				</div>
			</div>
		</div>
	);
}

export default App;
