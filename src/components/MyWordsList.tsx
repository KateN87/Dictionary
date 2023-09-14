import { Dispatch, SetStateAction } from "react";
import { IoTrash } from "react-icons/io5";
//styles
import styles from "./MyWordsList.module.css";

/**
 * uses setMyWords, myWords, setWordList, setFoundWord
 * renders a list with myWords
 * when word is clicked setWordList is updated with that word
 * when trashcan is clicked the word will be deleted from the list with setMyWords
 * when word is clicked SetFoundWord is updated with that word
 */

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
		<div data-testid="my-words-list">
			<h3 className={styles.title}>My Words</h3>
			<ul className={styles["word-list"]}>
				{myWords.map((w: Word[], idx) => (
					<li
						key={idx}
						onClick={() => handleClick(w)}
						className={styles["word-list"]}
					>
						{w[0].word}
						<IoTrash
							aria-label="delete-icon"
							className={styles["icon-trash"]}
							onClick={() => deleteHandler(w)}
						/>
					</li>
				))}
			</ul>
		</div>
	);
};
