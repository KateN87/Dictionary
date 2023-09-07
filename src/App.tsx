import { useState } from 'react';
import './App.css';
import { WordComp } from './components/WordComp';
import { HeaderComp } from './components/HeaderComp';
import { WordList } from './components/WordList';
import { IoSaveSharp } from 'react-icons/io5';

function App() {
	const [word, setWord] = useState('');
	const [wordInfo, setWordInfo] = useState<Word[]>([]);
	const [wordList, setWordList] = useState<string[]>([]);

	const handleSearch = async (sWord: string) => {
		const resp = await fetch(
			`https://api.dictionaryapi.dev/api/v2/entries/en/${sWord}`
		);

		const data = await resp.json();
		setWord(sWord);
		setWordInfo(data);
		console.log('RESPONSE WORDINFO', data);
	};

	return (
		<div className='App'>
			<HeaderComp handleSearch={handleSearch} />
			<div className='body-container'>
				<div className='word-list-container'>
					<WordList wordList={wordList} handleSearch={handleSearch} />
				</div>
				<div className='word-comp-container'>
					{wordInfo.length > 0 && (
						<>
							<div className='word-container'>
								<h3>
									Searched Word:{' '}
									<span className='word'>{word}</span>
								</h3>
								<IoSaveSharp
									className='save-icon'
									onClick={() =>
										setWordList((prev) => [...prev, word])
									}
								/>
							</div>
							<WordComp wordInfo={wordInfo} />
						</>
					)}
				</div>
			</div>
		</div>
	);
}

export default App;
