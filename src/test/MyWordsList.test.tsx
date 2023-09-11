import { vi, describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MyWordsList } from '../components/MyWordsList';
/* import mockMyWords from './mockMyWords.json'; */

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
		expect(screen.getByText('My Words')).toBeInTheDocument();
	});

	it.todo('should have a list element', () => {});

	it.todo('should have an empty list element', () => {});
});
