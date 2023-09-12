import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

//frågor:
//1. Ska jag testa funktionen för att man fått ett ord här? Även om det mesta av det ligger i searchbar? Functions in searched word
//2. Samma med att kolla vilken icon som visas
//3. Samma med vad som händer när man klickar på ikonen
//4. För att hitta svg lade jag till aria-label i app.tsx, är det rätt? Annars behövde jag använde document. istf screen.

describe("Shows on load", () => {
	//Renders app before each test
	beforeEach(() => {
		render(<App />);
	});

	it("should show My Dictionary", () => {
		expect(screen.getByText("My Dictionary")).toBeInTheDocument();
	});

	it("should show sun icon", () => {
		const iconEls = screen.getByLabelText("sun-icon");

		expect(iconEls).toBeInTheDocument();
	});

	it("app should have 'light' in its class-list, but not 'dark'", () => {
		const divEl = screen.getByTestId("app-div");
		expect(divEl).toHaveClass("light");
		expect(divEl).not.toHaveClass("dark");
	});

	it("should show searchbar w. placeholder", () => {
		const placeHolderText = screen.getByPlaceholderText("Search a word...");
		expect(placeHolderText).toBeInTheDocument();
	});
});

describe("theme-toggle", () => {
	beforeEach(() => {
		render(<App />);
	});

	it("should show moon icon and remove sun-icon when sun-icon is clicked", async () => {
		const user = userEvent.setup();
		const sunIcon = screen.getByLabelText("sun-icon");

		await user.click(sunIcon);

		const moonIcon = screen.getByLabelText("moon-icon");
		expect(sunIcon).not.toBeInTheDocument();
		expect(moonIcon).toBeInTheDocument();
	});

	it("should show sun icon and remove moon-icon when moon-icon is clicked", async () => {
		const user = userEvent.setup();
		const sunIcon = screen.getByLabelText("sun-icon");

		await user.click(sunIcon);

		const moonIcon = screen.getByLabelText("moon-icon");
		await user.click(moonIcon);

		expect(moonIcon).not.toBeInTheDocument();
		waitFor(() => expect(sunIcon).toBeInTheDocument());
	});

	it("app should have 'dark' in its class-list after sun-icon is clicked", async () => {
		const user = userEvent.setup();
		const sunIcon = screen.getByLabelText("sun-icon");

		await user.click(sunIcon);
		const divEl = screen.getByTestId("app-div");

		expect(divEl).toHaveClass("dark");
	});
});

describe("functions in searched word", () => {
	it.todo(
		"should not show 'Searched Word' when wordList.length === 0 ",
		() => {}
	);

	it.todo("should show 'Searched Word' when word-list.length > 0", () => {});
	it.todo("Should show 'house' when 'house' is in wordList", () => {});
	it.todo("Should show icon save when 'house' is not in myWords", () => {});
	it.todo("Should show icon check when 'house 'is in myWords", () => {});
});
