import { Dispatch, SetStateAction } from "react";
import { SearchBar } from "./SearchBar";

//styles
import styles from "./HeaderComp.module.css";

interface words {
	setWord: Dispatch<SetStateAction<string>>;
}

export const HeaderComp = ({ setWord }: words) => {
	return (
		<div className={styles["main-container"]}>
			<h3 className={styles["title"]}>Kate's Dictionary</h3>
			<SearchBar setWord={setWord} />
		</div>
	);
};
