/**
 * Gets one definition from prop definitionItem
 * Maps through synonyms and antonyms and returns ul
 */

interface IDefinitions {
	definitionItem: Definitions;
	idx: number;
}

export const MeaningsListComp = ({ definitionItem, idx }: IDefinitions) => {
	const { definition, example, synonyms, antonyms } = definitionItem;
	return (
		<li key={idx}>
			{definition}
			{example && <p>Example: {example}</p>}
			{synonyms.length > 0 && (
				<>
					<p>Synonyms:</p>

					<ul>
						{synonyms.map((syn, idx) => (
							<li key={idx}>{syn}</li>
						))}
					</ul>
				</>
			)}
			{antonyms.length > 0 && (
				<>
					<p>Antonyms:</p>

					<ul>
						{antonyms.map((ant, idx) => (
							<li key={idx}>{ant}</li>
						))}
					</ul>
				</>
			)}
		</li>
	);
};
