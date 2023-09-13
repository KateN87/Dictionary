import { Fragment, useState } from "react";
import { PiCaretCircleDown, PiCaretCircleUp } from "react-icons/pi";

//styles
import styles from "./MeaningsComp.module.css";

interface IMeaning {
	meaning: Meanings;
}

export const MeaningsComp = ({ meaning }: IMeaning) => {
	const [showMore, setShowMore] = useState(false);

	return (
		<div>
			<p>
				Part of speech: <b>{meaning.partOfSpeech}</b>
			</p>
			{meaning.definitions.length > 0 && (
				<>
					<div className={styles["title-def-container"]}>
						<p>Definition:</p>
						{meaning.definitions?.length > 1 && (
							<p
								onClick={() => setShowMore(!showMore)}
								className={styles["show-more-less"]}
							>
								{showMore ? "show less" : "show more"}

								{showMore ? (
									<PiCaretCircleUp
										className={styles["icon-caret"]}
									/>
								) : (
									<PiCaretCircleDown
										className={styles["icon-caret"]}
									/>
								)}
							</p>
						)}
					</div>
					<ul className={styles["def-list"]}>
						{meaning.definitions?.map((def, idx) => {
							if (idx === 0) {
								return (
									<li key={idx}>
										{def.definition}
										{def.example && (
											<p>Example: {def.example}</p>
										)}
										{def.synonyms.length > 0 && (
											<Fragment>
												<p>Synonyms:</p>

												<ul>
													{def.synonyms.map(
														(syn, idx) => (
															<li key={idx}>
																{syn}
															</li>
														)
													)}
												</ul>
											</Fragment>
										)}
										{def.antonyms.length > 0 && (
											<>
												<p>Antonyms:</p>

												<ul>
													{def.antonyms.map(
														(ant, idx) => (
															<li key={idx}>
																{ant}
															</li>
														)
													)}
												</ul>
											</>
										)}
									</li>
								);
							} else if (showMore) {
								return (
									<li key={idx}>
										{def.definition}
										{def.example && (
											<p>Example: {def.example}</p>
										)}
										{def.synonyms.length > 0 && (
											<>
												<p>Synonyms:</p>

												<ul>
													{def.synonyms.map(
														(syn, idx) => (
															<li key={idx}>
																{syn}
															</li>
														)
													)}
												</ul>
											</>
										)}
										{def.antonyms.length > 0 && (
											<>
												<p>Antonyms:</p>

												<ul>
													{def.antonyms.map(
														(ant, idx) => (
															<li key={idx}>
																{ant}
															</li>
														)
													)}
												</ul>
											</>
										)}
									</li>
								);
							}
						})}
					</ul>
				</>
			)}
		</div>
	);
};
