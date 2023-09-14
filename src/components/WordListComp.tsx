//styles
import { MeaningsComp } from "./MeaningsComp";
import { PhoneticsComp } from "./PhoneticsComp";
import styles from "./WordListComp.module.css";

interface IWord {
	wordList: Word[];
}

/**
 * Renders the word from prop WordList
 * Maps through the word
 * Renders component PhoneticsComp and MeaningsComp
 */

export const WordListComp = ({ wordList }: IWord) => {
	return (
		<div>
			{wordList.map((wordItem, idx) => (
				<div
					key={idx}
					className={styles["word-container"]}
					data-testid="word-container"
				>
					<p>
						Word:{" "}
						<b>
							{wordItem.word} {wordItem.phonetic}
						</b>
					</p>
					{wordItem.phonetics.length > 0 && (
						<div className={styles["phonetics-container"]}>
							<p>Listen: </p>
							{wordItem.phonetics.map((phoneticItem, idx) => {
								if (phoneticItem.audio !== "") {
									return (
										<PhoneticsComp
											phonetic={phoneticItem}
											idx={idx}
											key={idx}
										/>
									);
								}
							})}
						</div>
					)}

					{wordItem.origin && <p>origin: {wordItem.origin}</p>}
					{wordItem.meanings?.map((meaning, idx) => (
						<MeaningsComp meaning={meaning} key={idx} />
					))}
					<p>
						License:{" "}
						<a href={wordItem.license.url}>
							{wordItem.license.name}
						</a>
					</p>
					{wordItem.sourceUrls.map((source, idx) => (
						<p key={idx}>
							Source:{" "}
							<a href={source} target="_blank">
								{source}
							</a>
						</p>
					))}
				</div>
			))}
		</div>
	);
};
