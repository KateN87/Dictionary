import { vi, describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MyWordsList } from '../components/MyWordsList';
/* import mockMyWords from './mockMyWords.json'; */

//Fråga:
//1. Ska jag kolla att de läggs till här eller i app.test?

describe('Shows on load', () => {
	//Renders app before each test
	beforeEach(() => {
		render(
			<MyWordsList
				setMyWords={vi.fn()}
				myWords={[]}
				setWordList={vi.fn()}
				setFoundWord={vi.fn()}
			/>
		);
	});

	it('should show My Words', () => {
		const textEl = screen.getByText('My Words');
		expect(textEl).toBeInTheDocument();
	});

	it('should have a list element', () => {
		screen.debug();
		const listEl = screen.getByRole('list');
		expect(listEl).toBeInTheDocument();
	});

	it('should have an empty list element', () => {
		const itemEl = screen.queryByRole('listitem');
		expect(itemEl).toBeNull();
	});
});
