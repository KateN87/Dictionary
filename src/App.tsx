import { useEffect, useState } from "react";
import "./App.css";
import { SearchBar } from "./components/SearchBar";

function App() {
	const [word, setWord] = useState("");
	const [wordInfo, setWordInfo] = useState({});

	useEffect(() => {
		if (word) {
			const getWord = async () => {
				const resp = await fetch(
					`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
				);

				const data = await resp.json();
				console.log(data);
				setWordInfo([...data]);
			};

			getWord();
			console.log(wordInfo);
		}
	}, [word]);
	return (
		<div>
			<h3>Dictionary</h3>
			<SearchBar setWord={setWord} />
		</div>
	);
}

export default App;
