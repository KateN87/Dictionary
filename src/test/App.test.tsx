import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

//frågor:
//1. Ska jag testa funktionen för att man fått ett ord här? Även om det mesta av det ligger i searchbar? Functions in searched word
//2. Samma med att kolla vilken icon som visas
//3. Samma med vad som händer när man klickar på ikonen
//4. För att hitta svg lade jag till aria-label i app.tsx, är det rätt? Annars behövde jag använde document. istf screen.

describe('Shows on load', () => {
	//Renders app before each test
	beforeEach(() => {
		render(<App />);
	});
	it('should show My Dictionary', () => {
		expect(screen.getByText('My Dictionary')).toBeInTheDocument();
	});

	it('should show sun icon', () => {
		const iconEls = screen.getByLabelText('sun');

		expect(iconEls).toBeInTheDocument();
	});

	it.todo("app should have 'light' in its class-list", () => {});

	it('should show searchbar w. placeholder', () => {
		const placeHolderText = screen.getByPlaceholderText('Search a word...');
		expect(placeHolderText).toBeInTheDocument();
	});
});

describe('functions in searched word', () => {
	it.todo(
		"should not show 'Searched Word' when wordList.length === 0 ",
		() => {}
	);

	it.todo("should show 'Searched Word' when word-list.length > 0", () => {});
	it.todo("Should show 'house' when 'house' is in wordList", () => {});
	it.todo("Should show icon save when 'house' is not in myWords", () => {});
	it.todo("Should show icon check when 'house 'is in myWords", () => {});
});

describe('theme-toggle', () => {
	it.todo('should change to moon icon on click', () => {});
	it.todo(
		"app should have 'dark' in its class-list when moon-icon is present"
	);
	it.todo('should change back to sun icon on two clicks', () => {});
});
