import { useEffect, useState } from "react";
import "./App.css";
import { WordComp } from "./components/WordComp";
import { HeaderComp } from "./components/HeaderComp";
import { WordList } from "./components/WordList";

function App() {
	const [word, setWord] = useState("");
	const [wordInfo, setWordInfo] = useState<Word[]>([]);
	const [wordList, setWordList] = useState<string[]>([]);

	useEffect(() => {
		if (word) {
			const getWord = async () => {
				const resp = await fetch(
					`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
				);

				const data = await resp.json();
				setWordInfo(data);
				console.log("RESPONSE WORDINFO", data);
			};

			getWord();
		}
	}, [word]);

	return (
		<div className="App">
			<HeaderComp setWord={setWord} />
			<div className="body-container">
				<div className="word-list-container">
					<WordList wordList={wordList} />
				</div>
				<div className="word-comp-container">
					{wordInfo && (
						<WordComp
							wordInfo={wordInfo}
							setWordList={setWordList}
						/>
					)}
				</div>
			</div>
		</div>
	);
}

export default App;
