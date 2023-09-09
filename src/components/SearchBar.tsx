import { useState } from 'react';
import styles from './SearchBar.module.css';

interface IFunction {
	handleSearch: (sWord: string) => Promise<string | boolean | undefined>;
}

export const SearchBar = ({ handleSearch }: IFunction) => {
	const [searchWord, setSearchWord] = useState('');
	const [error, setError] = useState('');

	const trySearch = async () => {
		setError('');

		if (searchWord === '') {
			return setError('You need to type something in');
		}

		const resp = await handleSearch(searchWord);
		if (typeof resp === 'string') {
			setError(resp);
		} else if (resp === true) {
			setSearchWord('');
		}
	};

	return (
		<div className={styles['search-container']}>
			<div>
				<input
					className={styles['search-input']}
					placeholder='Search a word...'
					value={searchWord}
					type='text'
					onChange={(e) => setSearchWord(e.target.value)}
				/>

				<input
					className={styles['submit-btn']}
					type='submit'
					onClick={trySearch}
				/>
			</div>
			{error && (
				<div className={styles['error-container']}>
					<p className={styles['error-text']}>{error}</p>
				</div>
			)}
		</div>
	);
};
