import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import { expect, vi } from "vitest";
import App from "../components/App";

beforeEach(() => {
  // Reset mocks before each test
  vi.restoreAllMocks();
});

afterEach(() => {
  // Clean up if needed (optional, restoreAllMocks usually enough)
  vi.clearAllMocks();
});

// Mock fetch for Vitest
const mockData = [
    { id: 1, message: "Hello World!" },
    { id: 2, message: "From mockDB" }
  ];

global.fetch = vi.fn(() => {
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockData),
  });
});

test("displays received server data", async () => {
    
  render(<App />);
  
  // Find the hello world message
  expect(await screen.findByText(/Web Server Template/i)).toBeInTheDocument();
  // Wait for the data to be received and displayed
  expect(await screen.findByText(/Hello World!/i)).toBeInTheDocument();
  expect(await screen.findByText(/From mockDB/i)).toBeInTheDocument();
  expect(fetch).toHaveBeenCalledTimes(1);
});

test("handles fetch error gracefully", async () => {
  // Mock fetch to simulate an error
  fetch.mockImplementationOnce(() => 
    Promise.reject({
       ok: false,
       status: 500,
       json: async () => ({error: "Fetch error"}),
    }));

  // Mock console.error to avoid cluttering test output
  const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

  render(<App />);

  // Check that the main title is still rendered
  expect(await screen.findByText(/Web Server Template/i)).toBeInTheDocument();
  expect(await screen.findByText(/No Data Retrieved/i)).toBeInTheDocument();
  // Since there's an error, the data messages should not be found
  expect(screen.queryByText(/Hello World!/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/From mockDB/i)).not.toBeInTheDocument();
  expect(fetch).toHaveBeenCalledTimes(1);
  // expect console.error to have been called
  expect(consoleErrorSpy).toHaveBeenCalled();
});