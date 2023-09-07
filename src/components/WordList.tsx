//styles
import styles from "./WordList.module.css";

interface IMyList {
	wordList: string[];
}

export const WordList = ({ wordList }: IMyList) => {
	return (
		<div className={styles["main-container"]}>
			<h3 className={styles.title}>My Words</h3>
			<ul className={styles["word-list"]}>
				{wordList.map((w, idx) => (
					<li key={idx}>{w}</li>
				))}
			</ul>
		</div>
	);
};
