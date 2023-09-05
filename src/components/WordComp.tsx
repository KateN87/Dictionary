interface IWord {
	wordInfo: Word;
}

export const WordComp = ({ wordInfo }: IWord) => {
	return (
		<div>
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
