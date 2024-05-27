import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import FixedRange from "./FixedRange"; 

describe("FixedRange component", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test("displays loading initially", () => {
    render(<FixedRange />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("fetches and displays range values correctly", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve({ values: [0, 25, 50, 75, 100] }),
      })
    );

    render(<FixedRange />);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
    await waitFor(() =>
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument()
    );

    expect(screen.getByText("0.00€")).toBeInTheDocument();
    expect(screen.getByText("100.00€")).toBeInTheDocument();
  });

  

  test("min slider does not cross max slider", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve({ values: [0, 25, 50, 75, 100] }),
      })
    );

    const { container } = render(<FixedRange />);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
    await waitFor(() =>
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument()
    );

    const minBullet = container.querySelectorAll(".slider-bullet")[0];

    fireEvent.mouseDown(minBullet, { clientX: 0 });
    fireEvent.mouseMove(window, { clientX: 500 });
    fireEvent.mouseUp(window);

    expect(minBullet.style.left).toBe("0%"); 
  });

  test("max slider does not cross min slider", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve({ values: [0, 25, 50, 75, 100] }),
      })
    );

    const { container } = render(<FixedRange />);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
    await waitFor(() =>
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument()
    );

    const maxBullet = container.querySelectorAll(".slider-bullet")[1];

    fireEvent.mouseDown(maxBullet, { clientX: 100 });
    fireEvent.mouseMove(window, { clientX: 0 });
    fireEvent.mouseUp(window);

    expect(maxBullet.style.left).toBe("100%"); 
  });
});
