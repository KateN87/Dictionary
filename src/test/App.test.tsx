import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { setupServer } from "msw/node";
import { rest } from "msw";
import App from "../App";

import mockWordList from "./mockWordList.json";

const server = setupServer(
	// Describe the requests to mock.
	rest.get(
		`https://api.dictionaryapi.dev/api/v2/entries/en/house`,
		(_req, res, ctx) => {
			return res(ctx.json(mockWordList));
		}
	),
	rest.get(
		`https://api.dictionaryapi.dev/api/v2/entries/en/abc123`,
		(_req, res, ctx) => {
			return res(ctx.status(404));
		}
	),
	//represents a network error
	rest.get(
		`https://api.dictionaryapi.dev/api/v2/entries/en/dgfgdsd`,
		(_req, res) => {
			return res.networkError("Failed to fetch");
		}
	)
);

beforeAll(() => server.listen());
afterAll(() => server.close());

describe("Shows on load", () => {
	it("should show My Dictionary", () => {
		render(<App />);
		expect(screen.getByText("My Dictionary")).toBeInTheDocument();
	});

	it("should show sun icon", () => {
		render(<App />);

		const sunIcon = screen.getByLabelText("sun-icon");
		expect(sunIcon).toBeInTheDocument();
	});

	it("app should have 'light' in its class-list, but not 'dark'", () => {
		render(<App />);

		const divEl = screen.getByTestId("app-div");
		expect(divEl).toHaveClass("light");
		expect(divEl).not.toHaveClass("dark");
	});

	it("should show searchbar w. placeholder", () => {
		render(<App />);

		const placeHolderText = screen.getByPlaceholderText("Search a word...");
		expect(placeHolderText).toBeInTheDocument();
	});
});

describe("theme-toggle", () => {
	it("should show moon icon and remove sun-icon when sun-icon is clicked", async () => {
		const user = userEvent.setup();
		render(<App />);

		const sunIcon = screen.getByLabelText("sun-icon");

		await user.click(sunIcon);

		const moonIcon = screen.getByLabelText("moon-icon");
		expect(sunIcon).not.toBeInTheDocument();
		expect(moonIcon).toBeInTheDocument();
	});

	it("should show sun icon and remove moon-icon when moon-icon is clicked", async () => {
		const user = userEvent.setup();
		render(<App />);

		const sunIcon = screen.getByLabelText("sun-icon");
		await user.click(sunIcon);

		const moonIcon = screen.getByLabelText("moon-icon");
		await user.click(moonIcon);

		expect(moonIcon).not.toBeInTheDocument();

		//Need to get the sunIcon again, to get a new reference
		const newSunIcon = screen.getByLabelText("sun-icon");
		expect(newSunIcon).toBeInTheDocument();
	});

	it("app should have 'dark' in its class-list after sun-icon is clicked", async () => {
		const user = userEvent.setup();
		render(<App />);

		const sunIcon = screen.getByLabelText("sun-icon");

		await user.click(sunIcon);
		const divEl = screen.getByTestId("app-div");

		expect(divEl).toHaveClass("dark");
	});
});

describe("Search features", () => {
	it("should not show 'Searched Word' when wordList.length === 0 ", () => {
		render(<App />);

		const searchedWord = screen.queryByText("Searched Word");
		expect(searchedWord).toBeNull();
	});

	it("Shuld show typed word", async () => {
		const user = userEvent.setup();
		render(<App />);

		const searchBar = screen.getByPlaceholderText("Search a word...");
		await user.type(searchBar, "house");

		const word = screen.getByDisplayValue("house");
		expect(word).toBeInTheDocument();
	});

	it("should show 'Searched Word: house' when house is submitted", async () => {
		const user = userEvent.setup();
		render(<App />);

		const searchBar = screen.getByPlaceholderText("Search a word...");
		await user.type(searchBar, "house");

		const submitButton = screen.getByDisplayValue("Submit");
		await user.click(submitButton);

		const searchedWord = await screen.findByText("Searched Word:");
		const word = await within(searchedWord).findByText("house", {
			exact: false,
		});
		expect(word).toBeInTheDocument();
	});

	it("should show 'Sorry, we couldn`t find the word you searched for' when 'abc' is submitted", async () => {
		const user = userEvent.setup();
		render(<App />);

		const searchBar = screen.getByPlaceholderText("Search a word...");
		await user.type(searchBar, "abc123");

		const submitButton = screen.getByDisplayValue("Submit");
		await user.click(submitButton);

		const errorText = await screen.findByText(
			"Sorry, we couldn`t find the word you searched for"
		);

		expect(errorText).toBeInTheDocument();
	});

	it("should show 'Something went wrong' when 'dgfgdsd' is submitted", async () => {
		const user = userEvent.setup();
		render(<App />);

		const searchBar = screen.getByPlaceholderText("Search a word...");
		await user.type(searchBar, "dgfgdsd");

		const submitButton = screen.getByDisplayValue("Submit");
		await user.click(submitButton);

		const errorText = await screen.findByText("Something went wrong");

		expect(errorText).toBeInTheDocument();
	});

	it("error message should disappear when 'house' is searched", async () => {
		const user = userEvent.setup();
		render(<App />);

		const searchBar = screen.getByPlaceholderText("Search a word...");
		await user.type(searchBar, "abc123");

		const submitButton = screen.getByDisplayValue("Submit");
		await user.click(submitButton);

		const errorText = await screen.findByText(
			"Sorry, we couldn`t find the word you searched for"
		);
		expect(errorText).toBeInTheDocument();

		await user.type(
			searchBar,
			"{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}house"
		);

		await user.click(submitButton);

		expect(errorText).not.toBeInTheDocument();
	});

	it("searchbar value should be empty when you`ve clicked submit and a word is ok", async () => {
		const user = userEvent.setup();
		render(<App />);

		const searchBar = screen.getByPlaceholderText("Search a word...");
		await user.type(searchBar, "house");

		const submitButton = screen.getByDisplayValue("Submit");
		await user.click(submitButton);

		expect(searchBar).toHaveValue("");
	});
});

describe("MyWords functions", () => {
	it("should not have words in myWordList", () => {
		render(<App />);
		const myWordsDiv = screen.getByTestId("my-words-list");
		expect(myWordsDiv).toBeInTheDocument();

		const wordsList = within(myWordsDiv).getByRole("list");
		expect(wordsList).toBeInTheDocument();

		const wordsListItem = within(wordsList).queryByRole("list-item");
		expect(wordsListItem).toBeNull();
	});

	it("Should show icon save when 'house' is not in myWords", async () => {
		const user = userEvent.setup();
		render(<App />);
		const searchBar = screen.getByPlaceholderText("Search a word...");
		await user.type(searchBar, "house");

		const submitButton = screen.getByDisplayValue("Submit");
		await user.click(submitButton);

		const saveIcon = screen.getByLabelText("save");

		expect(saveIcon).toBeInTheDocument();
	});

	it("Should have one word in myWordsList when save is clicked", async () => {
		const user = userEvent.setup();
		render(<App />);
		const searchBar = screen.getByPlaceholderText("Search a word...");
		await user.type(searchBar, "house");

		const submitButton = screen.getByDisplayValue("Submit");
		await user.click(submitButton);

		const saveIcon = screen.getByLabelText("save");
		await user.click(saveIcon);

		const myWordsDiv = screen.getByTestId("my-words-list");
		const wordsList = within(myWordsDiv).getByRole("list");
		const wordsListItem = within(wordsList).getAllByRole("listitem");

		expect(wordsListItem.length).toBe(1);

		const deleteIcon = within(wordsListItem[0]).getByLabelText(
			"delete-icon"
		);

		expect(deleteIcon).toBeInTheDocument();
	});

	it("Should show icon check when 'house 'is in myWords", async () => {
		const user = userEvent.setup();
		render(<App />);
		const searchBar = screen.getByPlaceholderText("Search a word...");
		await user.type(searchBar, "house");

		const submitButton = screen.getByDisplayValue("Submit");
		await user.click(submitButton);

		const saveIcon = screen.getByLabelText("save");
		await user.click(saveIcon);

		const checkIcon = screen.getByLabelText("check");

		expect(checkIcon).toBeInTheDocument();
	});

	it("myWordList should be shorter when delete icon is clicked", async () => {
		const user = userEvent.setup();
		render(<App />);
		const searchBar = screen.getByPlaceholderText("Search a word...");
		await user.type(searchBar, "house");

		const submitButton = screen.getByDisplayValue("Submit");
		await user.click(submitButton);

		const saveIcon = screen.getByLabelText("save");
		await user.click(saveIcon);

		const myWordsDiv = screen.getByTestId("my-words-list");
		const wordsList = within(myWordsDiv).getByRole("list");
		const wordsListItem = within(wordsList).getAllByRole("listitem");
		const deleteIcon = within(wordsListItem[0]).getByLabelText(
			"delete-icon"
		);

		await user.click(deleteIcon);

		//Need to get it again to get new ref
		const wordsListItem2 = within(wordsList).queryByRole("list-item");
		expect(wordsListItem2).toBeNull();
	});
});

describe("Main word container", () => {
	it("shows all info", async () => {
		const user = userEvent.setup();
		render(<App />);
		const searchBar = screen.getByPlaceholderText("Search a word...");
		await user.type(searchBar, "house");

		const submitButton = screen.getByDisplayValue("Submit");
		await user.click(submitButton);

		const wordContainer = screen.getAllByTestId("word-container");
		expect(wordContainer.length).toBe(3);

		const wordTitleWord = within(wordContainer[0]).getByText("Word:");
		const wordTitleListen = within(wordContainer[0]).getByText("Listen:");
		const wordTitlePart = within(wordContainer[0]).getByText(
			"Part of speech:"
		);
		const wordTitleDefinition = within(wordContainer[0]).getByText(
			"Definition:"
		);
		const wordTitleLicense = within(wordContainer[0]).getByText("License:");
		const wordTitleSource = within(wordContainer[0]).getByText("Source:");
		const wordHousePhonetic = within(wordContainer[0]).getAllByText(
			"house",
			{ exact: false }
		);
		const partofspeechText = within(wordContainer[0]).getByText("noun");
		const licenseText = within(wordContainer[0]).getByText("CC BY-SA 3.0");
		const sourceUrl = within(wordContainer[0]).getByText(
			"https://en.wiktionary.org/wiki/house"
		);
		const showMore = within(wordContainer[0]).getByText("Show more", {
			exact: false,
		});

		expect(wordTitleWord).toBeInTheDocument();
		expect(wordTitleListen).toBeInTheDocument();
		expect(wordTitlePart).toBeInTheDocument();
		expect(wordTitleDefinition).toBeInTheDocument();
		expect(wordTitleLicense).toBeInTheDocument();
		expect(wordTitleSource).toBeInTheDocument();
		expect(wordHousePhonetic.length).toBeGreaterThan(0);
		expect(partofspeechText).toBeInTheDocument();
		expect(licenseText).toBeInTheDocument();
		expect(sourceUrl).toBeInTheDocument();
		expect(showMore).toBeInTheDocument();
	});

	it("should show 'source' on hover and remove on unhover", async () => {
		const user = userEvent.setup();
		render(<App />);
		const searchBar = screen.getByPlaceholderText("Search a word...");
		await user.type(searchBar, "house");

		const submitButton = screen.getByDisplayValue("Submit");
		await user.click(submitButton);

		const phoneticsContainer = screen.getAllByLabelText("sound-icon");
		await user.hover(phoneticsContainer[0]);

		const license = screen.getByText("source");
		expect(license).toBeInTheDocument();

		await user.unhover(phoneticsContainer[0]);

		//need new ref
		const license2 = screen.queryByText("source");
		expect(license2).toBeNull();
	});

	it('Definition-list should show one def when "show more" is visible', async () => {
		const user = userEvent.setup();
		render(<App />);
		const searchBar = screen.getByPlaceholderText("Search a word...");
		await user.type(searchBar, "house");

		const submitButton = screen.getByDisplayValue("Submit");
		await user.click(submitButton);

		const meaningList = screen.getAllByTestId("meaning");
		expect(meaningList.length).toBeGreaterThan(0);

		//Don't need getAllBy since I want it to fail if there´s more than one listitem
		const listItem = within(meaningList[0]).getByRole("listitem");

		expect(listItem).toBeInTheDocument();
	});

	it('Definition-list should show more than one def when "show less" is visible', async () => {
		const user = userEvent.setup();
		render(<App />);
		const searchBar = screen.getByPlaceholderText("Search a word...");
		await user.type(searchBar, "house");

		const submitButton = screen.getByDisplayValue("Submit");
		await user.click(submitButton);

		const wordContainer = screen.getAllByTestId("word-container");
		const showMore = within(wordContainer[0]).getByText("Show more", {
			exact: false,
		});
		await user.click(showMore);

		const showLess = within(wordContainer[0]).getByText("Show less", {
			exact: false,
		});

		expect(showLess).toBeInTheDocument();

		const meaningList = screen.getAllByTestId("meaning");
		const listItem = within(meaningList[0]).getAllByRole("listitem");

		expect(listItem.length).toBe(18);
	});
});

it("should play sound when clicked", async () => {
	const audioSpy = vi.spyOn(global, "Audio");

	render(<App />);

	const user = userEvent.setup();
	const searchBar = screen.getByPlaceholderText("Search a word...");
	await user.type(searchBar, "house");

	const submitButton = screen.getByDisplayValue("Submit");
	await user.click(submitButton);

	const soundIconList = await screen.findAllByLabelText("sound-icon");
	await user.click(soundIconList[0]);

	expect(audioSpy).toHaveBeenCalled();
});
