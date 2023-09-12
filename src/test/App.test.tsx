import { describe, it, expect, beforeEach, beforeAll, afterAll } from "vitest";
import { render, screen, waitFor, within } from "@testing-library/react";
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
			return res(
				// Send a valid HTTP status code
				ctx.status(404)
			);
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
	it("should not show 'Searched Word' when wordList.length === 0 ", () => {
		const textEl = screen.queryByText("Searched Word");
		expect(textEl).toBeNull();
	});

	it.todo("Should show 'house' when 'house' is in wordList", () => {});
	it.todo("Should show icon save when 'house' is not in myWords", () => {});
	it.todo("Should show icon check when 'house 'is in myWords", () => {});
});

describe("Search functions", () => {
	beforeEach(() => {
		render(<App />);
	});

	it("Shuld show typed word", async () => {
		const user = userEvent.setup();
		const searchBar = screen.getByPlaceholderText("Search a word...");
		await user.type(searchBar, "house");

		const textEl = screen.getByDisplayValue("house");
		expect(textEl).toBeInTheDocument();
	});

	it("should show 'Searched Word: house' when house is submitted", async () => {
		const user = userEvent.setup();
		const searchBar = screen.getByPlaceholderText("Search a word...");
		await user.type(searchBar, "house");

		const submitButton = screen.getByDisplayValue("Submit");
		await user.click(submitButton);

		const textEl = await screen.findByText("Searched Word:");
		const textEl2 = await within(textEl).findByText("house", {
			exact: false,
		});

		expect(textEl2).toBeInTheDocument();
	});

	it("should show 'Sorry, we couldn`t find the word you searched for' when 'abc' is submitted", async () => {
		const user = userEvent.setup();
		const searchBar = screen.getByPlaceholderText("Search a word...");
		await user.type(searchBar, "abc123");

		const submitButton = screen.getByDisplayValue("Submit");
		await user.click(submitButton);

		const textEl = await screen.findByText(
			"Sorry, we couldn`t find the word you searched for"
		);

		waitFor(() => expect(textEl).toBeInTheDocument());
	});
});
