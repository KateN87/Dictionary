import { useState } from "react";
import styles from "./SearchBar.module.css";

interface IFunction {
	getWords: (sWord: string) => Promise<string | boolean | undefined>;
}

/**
 * Input element with search function
 * uses getWords to search
 * shows error if empty string or error messages is returned frmo getWords
 */

export const SearchBar = ({ getWords }: IFunction) => {
	const [searchWord, setSearchWord] = useState("");
	const [error, setError] = useState("");

	const handleTrySearch = async () => {
		//Reset error-message
		setError("");

		if (searchWord === "") {
			return setError("You need to type something in");
		}

		const resp = await getWords(searchWord);
		//getWords() return a string if there is a error
		if (typeof resp === "string") {
			setError(resp);
			//getWords() return true if a response with word was fetched
		} else if (resp === true) {
			setSearchWord("");
		}
	};

	return (
		<div className={styles["search-container"]}>
			<div>
				<input
					className={styles["search-input"]}
					placeholder="Search a word..."
					value={searchWord}
					type="text"
					onChange={(e) => setSearchWord(e.target.value)}
				/>

				<input
					className={styles["submit-btn"]}
					type="submit"
					value="Submit"
					onClick={handleTrySearch}
				/>
			</div>
			{/* shows error if there is one */}
			{error && (
				<div className={styles["error-container"]}>
					<p className={styles["error-text"]}>{error}</p>
				</div>
			)}
		</div>
	);
};
