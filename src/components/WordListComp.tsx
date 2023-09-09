//styles
import styles from './WordListComp.module.css';

interface IWord {
	wordList: Word[];
}

export const WordListComp = ({ wordList }: IWord) => {
	return (
		<div>
			{wordList.map((w, idx) => (
				<div key={idx} className={styles['word-container']}>
					<p>Word: {w.word}</p>
					{w.phonetics.map((p, idx) => {
						if (p.audio !== '') {
							return (
								<audio controls key={idx} src={p.audio}>
									Your webpage doesn't support audio
								</audio>
							);
						}
					})}

					<p>phonetic: {w.phonetic}</p>

					{w.phonetics.map((p, idx) => (
						<p key={idx}>phonetic-list: {p.text}</p>
					))}
					{w.origin && <p>origin: {w.origin}</p>}
					{w.meanings.map((m, idx) => (
						<p key={idx}>meanings: {m.partOfSpeech}</p>
					))}
					<p>License: {w.license.name}</p>
					{w.sourceUrls.map((s, idx) => (
						<p key={idx}>
							Source-url:{' '}
							<a href={s} target='_blank'>
								{s}
							</a>
						</p>
					))}
				</div>
			))}
		</div>
	);
};
