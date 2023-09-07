//styles
import styles from './WordList.module.css';

interface IMyList {
	handleSearch: (sWord: string) => Promise<void>;
	wordList: string[];
}

export const WordList = ({ wordList, handleSearch }: IMyList) => {
	return (
		<div className={styles['main-container']}>
			<h3 className={styles.title}>My Words</h3>
			<ul className={styles['word-list']}>
				{wordList.map((w, idx) => (
					<li key={idx} onClick={() => handleSearch(w)}>
						{w}
					</li>
				))}
			</ul>
		</div>
	);
};
