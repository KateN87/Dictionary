import { useState } from 'react';
import { PiCaretCircleDown, PiCaretCircleUp } from 'react-icons/pi';
import styles from './MeaningsComp.module.css';
import { DefinitionItemComp } from './DefinitionItemComp';

interface IMeaning {
	meaning: Meanings;
}

/**
 * - Render prop meaning
 * - Shows "show More" if there are more than one definition
 * - Always displays the first definition
 * - Displays more definitions when "show more" is clicked, if more than one definition
 * - Displays first definition when show less is clicked
 * - Shows MeaningsList comp
 */

export const MeaningsComp = ({ meaning }: IMeaning) => {
	const [showMore, setShowMore] = useState(false);

	return (
		<div data-testid='meaning'>
			<p>
				Part of speech: <b>{meaning.partOfSpeech}</b>
			</p>

			<div className={styles['title-def-container']}>
				<p>Definition:</p>
				{meaning.definitions?.length > 1 && (
					<p
						onClick={() => setShowMore(!showMore)}
						className={styles['show-more-less']}
					>
						{showMore ? (
							<>
								show less
								<PiCaretCircleUp
									className={styles['icon-caret']}
								/>
							</>
						) : (
							<>
								show more
								<PiCaretCircleDown
									className={styles['icon-caret']}
								/>
							</>
						)}
					</p>
				)}
			</div>
			<ul className={styles['def-list']}>
				{meaning.definitions?.map((definitionItem, idx) => {
					if (idx === 0) {
						return (
							<DefinitionItemComp
								definitionItem={definitionItem}
								key={idx}
							/>
						);
					} else if (showMore) {
						return (
							<DefinitionItemComp
								definitionItem={definitionItem}
								key={idx}
							/>
						);
					}
				})}
			</ul>
		</div>
	);
};
