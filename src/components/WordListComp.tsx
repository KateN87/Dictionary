//styles
import { MeaningsComp } from "./MeaningsComp";
import { PhoneticsComp } from "./PhoneticsComp";
import styles from "./WordListComp.module.css";

interface IWord {
	wordList: Word[];
}

export const WordListComp = ({ wordList }: IWord) => {
	return (
		<div>
			{wordList.map((w, idx) => (
				<div
					key={idx}
					className={styles["word-container"]}
					data-testid="word-container"
				>
					<p>
						Word:{" "}
						<b>
							{w.word} {w.phonetic}
						</b>
					</p>
					{w.phonetics.length > 0 && (
						<div className={styles["phonetics-container"]}>
							<p>Listen: </p>
							{w.phonetics.map((p, idx) => {
								if (p.audio !== "") {
									return (
										<PhoneticsComp
											phonetic={p}
											idx={idx}
											key={idx}
										/>
									);
								}
							})}
						</div>
					)}

					{w.origin && <p>origin: {w.origin}</p>}
					{w.meanings?.map((meaning, idx) => (
						<MeaningsComp meaning={meaning} key={idx} />
					))}
					<p>
						License: <a href={w.license.url}>{w.license.name}</a>
					</p>
					{w.sourceUrls.map((s, idx) => (
						<p key={idx}>
							Source:{" "}
							<a href={s} target="_blank">
								{s}
							</a>
						</p>
					))}
				</div>
			))}
		</div>
	);
};
