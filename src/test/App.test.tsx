import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../App";

describe("Shows on load", () => {
	render(<App />);

	it("show Dictionary", () => {
		expect(screen.getByText("Dictionary")).toBeInTheDocument();
	});
});
