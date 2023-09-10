import { useState } from 'react';
import './App.css';
import { WordListComp } from './components/WordListComp';
import { HeaderComp } from './components/HeaderComp';
import { MyWordsList } from './components/MyWordsList';
import { IoSaveSharp } from 'react-icons/io5';
import { FaSun, FaMoon } from 'react-icons/fa6';

function App() {
	const [foundWord, setFoundWord] = useState('');
	const [wordList, setWordList] = useState<Word[]>([]);
	const [myWords, setMyWords] = useState<Word[][]>([]);
	const [theme, setTheme] = useState('light');

	const getWords = async (
		sWord: string
	): Promise<string | boolean | undefined> => {
		try {
			const resp = await fetch(
				`https://api.dictionaryapi.dev/api/v2/entries/en/${sWord}`
			);

			if (resp.status === 200) {
				const data = await resp.json();
				setFoundWord(sWord);
				setWordList(data);

				return true;
			} else if (resp.status === 404) {
				throw new Error(
					'Sorry, we couldn`t find the word you searched for :('
				);
			} else {
				throw new Error('Failed to fetch data from the API.');
			}
		} catch (err) {
			if (err instanceof Error) {
				return err.message;
			}
		}
	};

	const handleClick = () => {
		if (theme === 'light') {
			setTheme('dark');
		} else {
			setTheme('light');
		}
	};

	return (
		<div className={`app ${theme}`}>
			{theme === 'light' ? (
				<FaSun onClick={handleClick} className='theme-toggle' />
			) : (
				<FaMoon onClick={handleClick} className='theme-toggle' />
			)}

			<HeaderComp getWords={getWords} />
			<div className='body-container'>
				<div>
					<MyWordsList
						myWords={myWords}
						setWordList={setWordList}
						setFoundWord={setFoundWord}
					/>
				</div>
				<div>
					{wordList.length > 0 && (
						<>
							<div className='word-container'>
								<h3>
									Searched Word:{' '}
									<span className='word'>{foundWord}</span>
								</h3>
								<IoSaveSharp
									className='save-icon'
									onClick={() =>
										setMyWords((prev) => [
											...prev,
											wordList,
										])
									}
								/>
							</div>
							<WordListComp wordList={wordList} />
						</>
					)}
				</div>
			</div>
		</div>
	);
}

export default App;
