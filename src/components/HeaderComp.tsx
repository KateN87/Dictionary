import { SearchBar } from "./SearchBar";
import book from "../assets/book-icon.png";

//styles
import styles from "./HeaderComp.module.css";

interface IFunction {
	getWords: (sWord: string) => Promise<string | boolean | undefined>;
}

/**
 * Displays 'My Dictionary' with a book image
 * Displays the search bar
 */

export const HeaderComp = ({ getWords }: IFunction) => {
	return (
		<div className={styles["main-container"]}>
			<div className={styles["logo-title-container"]}>
				<img
					src={book}
					alt="book icon"
					className={styles["book-icon"]}
				/>
				<h3 className={styles["title"]}>My Dictionary</h3>
			</div>
			<SearchBar getWords={getWords} />
		</div>
	);
};
