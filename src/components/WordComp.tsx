import { Dispatch, SetStateAction } from "react";
//styles
import styles from "./WordComp.module.css";

interface IWord {
	wordInfo: Word[];
	setWordList: Dispatch<SetStateAction<string[]>>;
}

export const WordComp = ({ wordInfo, setWordList }: IWord) => {
	return (
		<div className={styles["main-container"]}>
			{wordInfo.map((w, idx) => (
				<div key={idx} className={styles["word-container"]}>
					<button
						onClick={() => setWordList((prev) => [...prev, w.word])}
					>
						Add to favorite
					</button>
					<p>Word: {w.word}</p>
					{w.phonetics.map((p, idx) => {
						if (p.audio !== "") {
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
						<p key={idx}>Source-url: {s}</p>
					))}
				</div>
			))}
		</div>
	);
};
