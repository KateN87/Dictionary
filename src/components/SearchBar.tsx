import { Dispatch, SetStateAction, useState } from "react";

interface words {
	setWord: Dispatch<SetStateAction<string>>;
}

export const SearchBar = ({ setWord }: words) => {
	const [searchWord, setSearchWord] = useState("");

	return (
		<div>
			<input
				placeholder="Search a word..."
				type="text"
				onChange={(e) => setSearchWord(e.target.value)}
			/>
			<input type="submit" onClick={() => setWord(searchWord)} />
		</div>
	);
};
