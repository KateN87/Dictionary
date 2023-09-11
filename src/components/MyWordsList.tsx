import { Dispatch, SetStateAction } from 'react';
import { IoTrash } from 'react-icons/io5';
//styles
import styles from './MyWordsList.module.css';

interface IMyList {
	setMyWords: Dispatch<SetStateAction<Word[][]>>;
	myWords: Word[][];
	setWordList: Dispatch<SetStateAction<Word[]>>;
	setFoundWord: Dispatch<SetStateAction<string>>;
}

export const MyWordsList = ({
	setMyWords,
	myWords,
	setWordList,
	setFoundWord,
}: IMyList) => {
	const handleClick = (w: Word[]) => {
		setFoundWord(w[0].word);
		setWordList(w);
	};

	const deleteHandler = (w: Word[]) => {
		const newList = myWords.filter((word) => word[0].word !== w[0].word);

		setMyWords(newList);
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
						<IoTrash
							className={styles['icon-trash']}
							onClick={() => deleteHandler(w)}
						/>
					</li>
				))}
			</ul>
		</div>
	);
};
