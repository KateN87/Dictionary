//styles
import styles from "./WordList.module.css";

interface IWord {
	wordInfo: Word;
}

export const WordComp = ({ wordInfo }: IWord) => {
	return (
		<div className={styles["main-container"]}>
			<p>Word: {wordInfo.word}</p>
			<p>phonetic: </p>
			<ul>
				{wordInfo.phonetics.map(
					(
						phon: { text: string; sourceUrl: string },
						idx: number
					) => {
						if (!phon.text) {
							return;
						} else {
							return <li key={idx}>{phon.text}</li>;
						}
					}
				)}
			</ul>
		</div>
	);
};
