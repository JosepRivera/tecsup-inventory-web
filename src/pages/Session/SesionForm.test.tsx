import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SesionForm } from "./SesionForm";

vi.mock("@/hooks/useSesion", () => ({
  useSesion: () => ({
    iniciar: vi.fn(),
    loading: false,
  }),
}));

// Mock ResizeObserver for shadcn select component
globalThis.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Also mock PointerEvent
if (typeof globalThis.PointerEvent === "undefined") {
  globalThis.PointerEvent = class PointerEvent extends MouseEvent {} as any;
}

describe("SesionForm Component", () => {
  it("should render the form fields correctly", () => {
    render(<SesionForm />);

    // Check for the presence of the main inputs
    const nameInput = screen.getByPlaceholderText(/Ej: Juan Pérez/i);
    expect(nameInput).toBeInTheDocument();

    const closetInput = screen.getByPlaceholderText(/Ej: Armario 1, Fila A.../i);
    expect(closetInput).toBeInTheDocument();

    const submitButton = screen.getByRole("button", { name: /Iniciar jornada/i });
    expect(submitButton).toBeInTheDocument();
  });
});
