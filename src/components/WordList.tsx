//styles
import styles from "./WordList.module.css";

/* interface IWordInfo {
	wordInfo: Word;
} */

export const WordList = (/* { wordInfo }: IWordInfo */) => {
	const initialWords = ["house", "car", "dog"];

	return (
		<div className={styles["main-container"]}>
			<h3 className={styles.title}>My Words</h3>
			<ul className={styles["word-list"]}>
				{initialWords.map((w, idx) => (
					<li key={idx}>{w}</li>
				))}
			</ul>
		</div>
	);
};
