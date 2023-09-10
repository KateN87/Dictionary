import { Dispatch, SetStateAction } from 'react';
//styles
import styles from './MyWordsList.module.css';

interface IMyList {
	myWords: Word[][];
	setWordList: Dispatch<SetStateAction<Word[]>>;
	setFoundWord: Dispatch<SetStateAction<string>>;
}

export const MyWordsList = ({
	myWords,
	setWordList,
	setFoundWord,
}: IMyList) => {
	const handleClick = (w: Word[]) => {
		setFoundWord(w[0].word);
		setWordList(w);
	};

	return (
		<div>
			<h3 className={styles.title}>My Words</h3>
			<ul className={styles['word-list']}>
				{myWords.map((w: Word[], idx) => (
					<li
						key={idx}
						onClick={() => handleClick(w)}
						className={styles['word-list']}
					>
						{w[0].word}
					</li>
				))}
			</ul>
		</div>
	);
};
