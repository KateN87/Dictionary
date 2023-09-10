import { AiFillSound } from 'react-icons/ai';

import styles from './PhoneticsComp.module.css';

import { useState } from 'react';

interface IPhonetic {
	phonetic: Phonetics;
	idx: number;
}

export const PhoneticsComp = ({ phonetic, idx }: IPhonetic) => {
	const [showPhonInfo, setShowPhonInfo] = useState(false);

	const playAudio = (mp3: string) => {
		const audio = new Audio(mp3);

		audio.play();
	};

	return (
		<div
			key={idx}
			className={styles['sound-container']}
			onMouseEnter={() => setShowPhonInfo(true)}
			onMouseLeave={() => setShowPhonInfo(false)}
		>
			<p> {phonetic.text}</p>
			<AiFillSound
				className={styles.audio}
				onClick={() => playAudio(phonetic.audio)}
			/>
			{showPhonInfo && (
				<div className={styles['phonetic-info']}>
					<a href={phonetic.license.url} target='_blank'>
						license: {phonetic.license.name}
					</a>
				</div>
			)}
		</div>
	);
};
