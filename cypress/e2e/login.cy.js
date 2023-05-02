describe("template spec", () => {
  it("should login a caterer, add food item, add menu, add day menu, add routine menu", () => {
    const waitTime = 5000;
    cy.visit("http://localhost:3000");
    // signup
    // cy.contains("Signup").click();
    // cy.get('input[name="businessName"]').type("Shahriar Hotel");
    // cy.get('input[name="email"]').type("shahriar@habijabi.com");
    // cy.get('input[name="phone"]').type("01827600522");
    // cy.get('input[name="password"]').type("11223344");
    // cy.get('input[name="confirmPassword"]').type("11223344");
    // cy.contains("Brand Image").selectFile("shahriarHotel.jpg");
    // cy.contains("From").next().eq(0).click();
    // cy.get('div[role="presentation"]').contains("Saturday").click();
    // cy.contains("To").next().eq(0).click();
    // cy.get('div[role="presentation"]').contains("Thursday").click();

    // const operationalAreas = ["Gulshan-2", "Banani"];
    // operationalAreas.forEach((item) => {
    //   cy.contains("Operational Areas").next().eq(0).click();
    //   cy.get('div[role="presentation"]').contains(item).click();
    // });

    // cy.get('button[type="submit"]').click();
    // cy.wait(waitTime);

    // login
    cy.get('input[type="text"]').type("shahriar@habijabi.com");
    cy.get('input[type="password"]').type("11223344");
    cy.get('button[type="submit"]').click();

    cy.get('button[aria-label="open drawer"]').click();

    // Add Food Item
    cy.contains("food items").click();
    cy.contains("Add new Food Item").click();
    cy.get('input[name="title"]').type("Beef");
    cy.get('input[name="description"]').type("Tender and juicy Beefsteak");
    cy.get('input[name="price"]').type("200");
    cy.get('input[role="combobox"]').click();
    cy.get('div[role="presentation"]').contains("Main Course").click();
    cy.contains("Select an Image").selectFile("beef.jpg");
    cy.get('button[type="submit"]').click();
    cy.wait(waitTime);
    cy.scrollTo("bottom", { duration: waitTime });

    // Add Menu
    cy.contains("menus").click();
    cy.contains("Add new menu").click();
    cy.get('input[name="title"]').type("Beef dish");
    cy.get('input[name="description"]').type("Khailei Moja");
    cy.get('input[name="tags"]').type("Biriyani, Chap, Coffee");
    cy.contains("Select an Thumbnail").selectFile("beefDish.jpeg");

    const foodItems = ["Beef"];

    foodItems.forEach((item) => {
      cy.get('input[role="combobox"]').click();
      cy.get('div[role="presentation"]').contains(item).click();
    });

    cy.get('button[type="submit"]').click();
    cy.wait(waitTime);
    // cy.scrollTo("bottom", { duration: waitTime });

    // Add Day Menu
    cy.contains("day menus").click();
    cy.contains("Add new menu").click();
    cy.get('input[name="title"]').type("Beef Thali");
    cy.get('input[name="price"]').type("2000");

    const menusForDayMenu = ["Beef dish"];

    menusForDayMenu.forEach((item) => {
      cy.get('input[role="combobox"]').click();
      cy.get('div[role="presentation"]').contains(item).click();
    });

    cy.get('button[type="submit"]').click();
    cy.wait(waitTime);
    // cy.scrollTo("bottom", { duration: waitTime });

    // Add Routine Menu
    cy.contains("routine menus").click();
    cy.contains("Add/Change routine menu").click();

    cy.contains("Chose a day").next().eq(0).click();
    cy.get('div[role="presentation"]').contains("Tuesday").click();

    cy.contains("Menu for the day").next().eq(0).click();
    cy.get('div[role="presentation"]').contains("Beef Thali").click();

    cy.get('button[type="submit"]').click();
    cy.wait(waitTime);
    // cy.scrollTo("bottom", { duration: waitTime });

    // logout
    cy.contains("logout").click();
  });
});
