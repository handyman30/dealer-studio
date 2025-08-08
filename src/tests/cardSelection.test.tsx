import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CardSelectionProvider } from "@/components/state/CardSelectionContext";
import { Card } from "@/components/ui/Card";

function setup() {
  render(
    <CardSelectionProvider initialSelectedId={2}>
      <div className="grid grid-cols-3 gap-4">
        <Card
          id={1}
          title="Heading 1"
          imageUrl="/placeholder.png"
          description={["paragraph"]}
          cta="Button 1"
        />
        <Card
          id={2}
          title="Heading 2"
          imageUrl="/placeholder.png"
          description={["paragraph"]}
          cta="Button 2"
        />
        <Card
          id={3}
          title="Heading 3"
          imageUrl="/placeholder.png"
          description={["p1", "p2"]}
          cta="Button 3"
        />
      </div>
    </CardSelectionProvider>
  );
}

describe("Card border selection", () => {
  it("middle card is selected by default", () => {
    setup();
    const middle = screen.getByTestId("card-2");
    expect(middle.className).toContain("border-[3px]");
  });

  it("clicking a card button selects that card", async () => {
    setup();
    await userEvent.click(screen.getByTestId("card-button-1"));
    const selected = screen.getByTestId("card-1");
    expect(selected.className).toContain("border-[3px]");
  });
});

