/// <reference types="vite/client" />

type Word = {
	word: string;
	phonetic: string;
	phonetics: Phonetics[];
	origin?: string;
	meanings: Meanings[];
	license: License;
	sourceUrls: string[];
};

type Phonetics = {
	audio: string;
	license: License;
	sourceUrl: string;
	text: string;
};

type License = {
	name: string;
	url: string;
};

type Meanings = {
	antonyms: string[];
	definition: Definitions[];
	partOfSpeech: string;
	synonyms: string[];
};

type Definitions = {
	antonyms: string[];
	definition: string;
	synonyms: string[];
};
