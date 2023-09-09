import { Dispatch, SetStateAction } from 'react';
//styles
import styles from './MyWordsList.module.css';

interface IMyList {
	myWords: Word[][];
	setWordList: Dispatch<SetStateAction<Word[]>>;
}

export const MyWordsList = ({ myWords, setWordList }: IMyList) => {
	return (
		<div>
			<h3 className={styles.title}>My Words</h3>
			<ul className={styles['word-list']}>
				{myWords.map((w: Word[], idx) => (
					<li key={idx} onClick={() => setWordList(w)}>
						{w[0].word}
					</li>
				))}
			</ul>
		</div>
	);
};
