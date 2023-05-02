describe("template spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:3000");
    // signup
    // cy.get

    // login
    cy.get('input[type="text"]').type("captain@cook.com");
    cy.get('input[type="password"]').type("qaqaqaqa");
    cy.get('button[type="submit"]').click();

    cy.get('button[aria-label="open drawer"]').click();

    // Add Food Item
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
    cy.wait(3000);
    cy.scrollTo("bottom", { duration: 3000 });

    // Add Menu
    cy.contains("menus").click();
    cy.contains("Add new menu").click();
    cy.get('input[name="title"]').type("Osthir dish");
    cy.get('input[name="description"]').type("Khailei shanti");
    cy.get('input[name="tags"]').type("Biriyani, Chap, Coffee");
    cy.contains("Select an Thumbnail").selectFile("osthirDish.jpg");

    const foodItems = ["Biriyani", "Chap", "Coffee"];

    foodItems.forEach((item) => {
      cy.get('input[role="combobox"]').click();
      cy.get('div[role="presentation"]').contains(item).click();
    });

    cy.get('button[type="submit"]').click();
    cy.wait(3000);
    cy.scrollTo("bottom", { duration: 3000 });

    // Add Day Menu
    cy.contains("day menus").click();
    cy.contains("Add new menu").click();
    cy.get('input[name="title"]').type("Shera dish");
    cy.get('input[name="price"]').type("1000");

    const menusForDayMenu = ["Mubtasim's Favourite", "My Favorite Meal"];

    menusForDayMenu.forEach((item) => {
      cy.get('input[role="combobox"]').click();
      cy.get('div[role="presentation"]').contains(item).click();
    });

    cy.get('button[type="submit"]').click();
    cy.wait(2500);
    cy.scrollTo("bottom", { duration: 3000 });

    // Add Routine Menu
    cy.contains("routine menus").click();
    cy.contains("Add/Change routine menu").click();

    cy.contains("Chose a day").next().eq(0).click();
    cy.get('div[role="presentation"]').contains("Tuesday").click();

    cy.contains("Menu for the day").next().eq(0).click();
    cy.get('div[role="presentation"]').contains("Shera dish").click();

    cy.get('button[type="submit"]').click();
    cy.wait(2500);
    cy.scrollTo("bottom", { duration: 3000 });

    // logout
    cy.contains("logout").click();
  });
});
