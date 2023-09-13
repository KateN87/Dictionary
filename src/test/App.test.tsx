import {
	describe,
	it,
	expect,
	beforeEach,
	beforeAll,
	afterAll,
	vi,
} from "vitest";
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
	)
);

beforeAll(() => server.listen());
afterAll(() => server.close());

describe("Shows on load", () => {
	//Renders app before each test
	beforeEach(() => {
		render(<App />);
	});

	it("should show My Dictionary", () => {
		expect(screen.getByText("My Dictionary")).toBeInTheDocument();
	});

	it("should show sun icon", () => {
		const sunIcon = screen.getByLabelText("sun-icon");

		expect(sunIcon).toBeInTheDocument();
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

		//Need to get the sunIcon again, to get a new reference
		const newSunIcon = screen.getByLabelText("sun-icon");
		expect(newSunIcon).toBeInTheDocument();
	});

	it("app should have 'dark' in its class-list after sun-icon is clicked", async () => {
		const user = userEvent.setup();
		const sunIcon = screen.getByLabelText("sun-icon");

		await user.click(sunIcon);
		const divEl = screen.getByTestId("app-div");

		expect(divEl).toHaveClass("dark");
	});
});

describe("Search functions", () => {
	beforeEach(() => {
		render(<App />);
	});

	it("should not show 'Searched Word' when wordList.length === 0 ", () => {
		const searchedWord = screen.queryByText("Searched Word");
		expect(searchedWord).toBeNull();
	});

	it("Shuld show typed word", async () => {
		const user = userEvent.setup();
		const searchBar = screen.getByPlaceholderText("Search a word...");
		await user.type(searchBar, "house");

		const word = screen.getByDisplayValue("house");
		expect(word).toBeInTheDocument();
	});

	it("should show 'Searched Word: house' when house is submitted", async () => {
		const user = userEvent.setup();
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
		const searchBar = screen.getByPlaceholderText("Search a word...");
		await user.type(searchBar, "abc123");

		const submitButton = screen.getByDisplayValue("Submit");
		await user.click(submitButton);

		const errorText = await screen.findByText(
			"Sorry, we couldn`t find the word you searched for"
		);

		expect(errorText).toBeInTheDocument();
	});

	it("error message should disappear when 'house' is searched", async () => {
		const user = userEvent.setup();
		const searchBar = screen.getByPlaceholderText("Search a word...");
		await user.type(searchBar, "abc123");

		const submitButton = screen.getByDisplayValue("Submit");
		await user.click(submitButton);

		const errorText = await screen.findByText(
			"Sorry, we couldn`t find the word you searched for"
		);
		expect(errorText).toBeInTheDocument();

		await user.type(searchBar, "house");
		await user.click(submitButton);

		expect(errorText).not.toBeInTheDocument();
	});

	it("searchbar value should be empty when you`ve clicked submit and a word is ok", async () => {
		const user = userEvent.setup();
		const searchBar = screen.getByPlaceholderText("Search a word...");
		await user.type(searchBar, "house");

		const submitButton = screen.getByDisplayValue("Submit");
		await user.click(submitButton);

		expect(searchBar).toHaveValue("");
	});
});

it.todo(
	"Should show error 'Failed to fetch data from the API.' when resp is neither 200 or 404"
);

it.todo("should render words in myWordList");

it.todo("Should show icon save when 'house' is not in myWords", () => {});
it.todo("Should show icon check when 'house 'is in myWords", () => {});

it.todo("myWordList should be longer when save icon is clicked");
it.todo("myWordList should be shorter when save icon is clicked");

it("should play sound when clicked", async () => {
	/* vi.spyOn(global.Audio, 'play') */
	/* const mockPlay = vi.fn(); */
	const audioSpy = vi.spyOn(global, "Audio");

	/* global.Audio = vi.fn().mockImplementation(() => ({
		play: mockPlay,
	})); */

	render(<App />);

	const user = userEvent.setup();
	const searchBar = screen.getByPlaceholderText("Search a word...");
	await user.type(searchBar, "house");

	const submitButton = screen.getByDisplayValue("Submit");
	await user.click(submitButton);

	const soundIconList = await screen.findAllByLabelText("sound-icon");
	await user.click(soundIconList[0]);

	expect(audioSpy).toHaveBeenCalled();
	/* expect(iconEl[0]).toBeInTheDocument(); */
});

it.todo("should show license on hover");

it.todo("shows more definitions when show more is clicked");
it.todo("shows less definitions when show less is clicked");

it.todo("Test that everything in word exists");
