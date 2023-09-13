import { useEffect, useState } from 'react';
import './App.css';
import { WordListComp } from './components/WordListComp';
import { HeaderComp } from './components/HeaderComp';
import { MyWordsList } from './components/MyWordsList';
import { IoSaveSharp, IoCheckmarkSharp } from 'react-icons/io5';
import { FaSun, FaMoon } from 'react-icons/fa6';

function App() {
	const [foundWord, setFoundWord] = useState('');
	const [wordExists, setWordExists] = useState(false);
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

			console.log('RESP', resp);

			if (resp.status === 200) {
				const data = await resp.json();
				setFoundWord(sWord);
				setWordList(data);

				return true;
			} else if (resp.status === 404) {
				throw new Error(
					'Sorry, we couldn`t find the word you searched for'
				);
			} else {
				throw new Error('Something went wrong');
			}
		} catch (err) {
			console.log('err');
			if (err instanceof Error) {
				if (err.message === 'Failed to fetch') {
					err.message = 'Something went wrong';
				}
				return err.message;
			}
		}
	};

	useEffect(() => {
		const maybeExists = myWords.find((word) => word[0].word === foundWord);

		if (maybeExists) {
			setWordExists(true);
		} else {
			setWordExists(false);
		}
	}, [myWords, foundWord]);

	const handleClick = () => {
		if (theme === 'light') {
			setTheme('dark');
		} else {
			setTheme('light');
		}
	};

	const handleSave = () => {
		setMyWords((prev) => [...prev, wordList]);
	};

	return (
		<div className={`app ${theme}`} data-testid='app-div'>
			{theme === 'light' ? (
				<FaSun
					onClick={handleClick}
					className='theme-toggle sun'
					aria-label='sun-icon'
				/>
			) : (
				<FaMoon
					onClick={handleClick}
					className='theme-toggle moon'
					aria-label='moon-icon'
				/>
			)}

			<HeaderComp getWords={getWords} />
			<div className='body-container'>
				<div>
					<MyWordsList
						setMyWords={setMyWords}
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
								{wordExists ? (
									<IoCheckmarkSharp
										className='check-icon'
										aria-label='check'
									/>
								) : (
									<IoSaveSharp
										className='save-icon'
										onClick={handleSave}
										aria-label='save'
									/>
								)}
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
