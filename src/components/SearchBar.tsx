import { useState } from "react";
import styles from "./SearchBar.module.css";

interface IFunction {
	handleSearch: (sWord: string) => Promise<void>;
}

export const SearchBar = ({ handleSearch }: IFunction) => {
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
				onClick={() => handleSearch(searchWord)}
			/>
		</div>
	);
};
