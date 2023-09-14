import { useState } from "react";
import { PiCaretCircleDown, PiCaretCircleUp } from "react-icons/pi";
import styles from "./MeaningsComp.module.css";
import { MeaningsListComp } from "./MeaningsListComp";

/**
 * Render prop meaning
 * Shows "show More" if there are more than one definition in meaning.definitions
 * Always shows the first definition in meaning.definitions
 * If more than one definition, it shows more definitions when show more is clicked, and shows less if then show less is clicked
 * Shows MeaningsList comp
 */

interface IMeaning {
	meaning: Meanings;
}

export const MeaningsComp = ({ meaning }: IMeaning) => {
	const [showMore, setShowMore] = useState(false);

	return (
		<div data-testid="meaning">
			<p>
				Part of speech: <b>{meaning.partOfSpeech}</b>
			</p>

			<div className={styles["title-def-container"]}>
				<p>Definition:</p>
				{meaning.definitions?.length > 1 && (
					<p
						onClick={() => setShowMore(!showMore)}
						className={styles["show-more-less"]}
					>
						{showMore ? (
							<>
								show less
								<PiCaretCircleUp
									className={styles["icon-caret"]}
								/>
							</>
						) : (
							<>
								show more
								<PiCaretCircleDown
									className={styles["icon-caret"]}
								/>
							</>
						)}
					</p>
				)}
			</div>
			<ul className={styles["def-list"]}>
				{meaning.definitions?.map((definitionItem, idx) => {
					if (idx === 0) {
						return (
							<MeaningsListComp
								definitionItem={definitionItem}
								idx={idx}
							/>
						);
					} else if (showMore) {
						return (
							<MeaningsListComp
								definitionItem={definitionItem}
								idx={idx}
							/>
						);
					}
				})}
			</ul>
		</div>
	);
};
