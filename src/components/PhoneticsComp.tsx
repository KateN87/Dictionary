import { AiFillSound } from "react-icons/ai";
import styles from "./PhoneticsComp.module.css";
import { useState } from "react";

interface IPhonetic {
	phonetic: Phonetics;
	idx: number;
}

/**
 * gets a phonetic item in props
 * renders the phonetic text and sound icon
 * render info about the phonetic on hover
 * playAudio when sound icon is clicked
 */

export const PhoneticsComp = ({ phonetic, idx }: IPhonetic) => {
	const [showPhonInfo, setShowPhonInfo] = useState(false);

	const playAudio = (mp3: string) => {
		const audio = new Audio(mp3);

		audio.play();
	};

	return (
		<div
			key={idx}
			className={styles["sound-container"]}
			onMouseEnter={() => setShowPhonInfo(true)}
			onMouseLeave={() => setShowPhonInfo(false)}
		>
			<p>
				<b> {phonetic.text} </b>
			</p>
			<AiFillSound
				className={styles.audio}
				onClick={() => playAudio(phonetic.audio)}
				aria-label="sound-icon"
			/>
			{/* only shows when hover on parent div */}
			{showPhonInfo && (
				<div className={styles["phonetic-info"]}>
					{phonetic.license?.url && (
						<a href={phonetic.license.url} target="_blank">
							license: {phonetic.license.name}
						</a>
					)}

					{phonetic.sourceUrl && (
						<a href={phonetic.sourceUrl}>source</a>
					)}
				</div>
			)}
		</div>
	);
};
