import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import MinMaxRange from "./MinMaxRange";

describe("MinMaxRange component", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test("displays loading initially", () => {
    render(<MinMaxRange />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("fetches and displays range values correctly", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve({ min: 0, max: 100 }),
      })
    );

    render(<MinMaxRange />);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
    await waitFor(() =>
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument()
    );

    expect(screen.getByText("0€")).toBeInTheDocument();
    expect(screen.getByText("100€")).toBeInTheDocument();
  });
});
