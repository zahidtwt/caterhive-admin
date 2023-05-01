describe("template spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:3000");
    // signup
    // cy.get

    // login
    cy.get('input[type="text"]').type("captain@cook.com");
    cy.get('input[type="password"]').type("qaqaqaqa");
    cy.contains("Submit").click();

    // Add Food Item
    cy.get('button[aria-label="open drawer"]').click();
    cy.contains("food items").click();
    cy.contains("Add new Food Item").click();
    cy.get('input[name="title"]').type("Alu Vorta");
    cy.get('input[name="description"]').type(
      "Kaca Moric ar sorisar teler spicy & tasty alu vorta"
    );
    cy.get('input[name="price"]').type("50");
    cy.get('input[role="combobox"]').click();
    cy.get('div[role="presentation"]').contains("Main Course").click();
    cy.contains("Select an Image").selectFile("aluvorta.jpg");
    cy.get('button[type="submit"]').click();

    // Add Menu

    // Add Day Menu

    // Add Routine Menu

    // logout
    // cy.get('button[aria-label="open drawer"]').click();
    // cy.contains("Month").click();
    // cy.contains("logout").click();
  });
});
