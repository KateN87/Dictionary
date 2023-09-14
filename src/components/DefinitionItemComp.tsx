interface IDefinitions {
	definitionItem: Definitions;
}

/**
 * - Gets one definition from prop definitionItem
 * - Displays synonyms and antonyms in lists
 */

export const DefinitionItemComp = ({ definitionItem }: IDefinitions) => {
	const { definition, example, synonyms, antonyms } = definitionItem;
	return (
		<li>
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
