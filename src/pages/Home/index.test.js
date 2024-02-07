import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";

describe("When Form is created", () => {
    it("a list of fields card is displayed", async () => {
        render(<Home />);
        await screen.findByText("Email");
        await screen.findByText("Nom");
        await screen.findByText("Prénom");
        await screen.findByText("Personel / Entreprise");
    });

    describe("and a click is triggered on the submit button", () => {
        it("the success message is displayed", async () => {
            render(<Home />);
            fireEvent(
                await screen.findByText("Envoyer"),
                new MouseEvent("click", {
                    cancelable: true,
                    bubbles: true,
                })
            );
            setTimeout(async () => {
                await screen.findByText("En cours");
                await screen.findByText("Message envoyé !");
            }, 1000); // Ajout d'un délai d'une seconde pour simuler l'envoi du formulaire au clic sur le bouton submit
        });
    });
});

describe("When a page is created", () => {
    it("a list of events is displayed", () => {
        // to implement test
        render(<Home />);
        setTimeout(async () => {
            const event1 = screen.getByText("Event 1");
            const event2 = screen.getByText("Event 2");
            expect(event1).toBeInTheDocument();
            expect(event2).toBeInTheDocument();
        });
    });
    it("a list a people is displayed", () => {
        // to implement
        render(<Home />);
        setTimeout(async () => {
            const person1 = screen.getByText("Person 1");
            const person2 = screen.getByText("Person 2");
            expect(person1).toBeInTheDocument();
            expect(person2).toBeInTheDocument();
        });
    });
    it("a footer is displayed", () => {
        // to implement
        render(<Home />);
        setTimeout(async () => {
            const footer = screen.getByText("Footer");
            expect(footer).toBeInTheDocument();
        });
    });
    it("an event card, with the last event, is displayed", () => {
        // to implement
        render(<Home />);
        setTimeout(async () => {
            const event1 = screen.getByText("Event 1");
            expect(event1).toBeInTheDocument();
        });
    });
});
