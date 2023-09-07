import { Dispatch, SetStateAction, useState } from "react";
import styles from "./SearchBar.module.css";

interface words {
	setWord: Dispatch<SetStateAction<string>>;
}

export const SearchBar = ({ setWord }: words) => {
	const [searchWord, setSearchWord] = useState("");

	return (
		<div className={styles["search-container"]}>
			<input
				className={styles["search-input"]}
				placeholder="Search a word..."
				type="text"
				onChange={(e) => setSearchWord(e.target.value)}
			/>
			<input
				className={styles["submit-btn"]}
				type="submit"
				onClick={() => setWord(searchWord)}
			/>
		</div>
	);
};