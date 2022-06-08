function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

let registerid = makeid(8);
let pastetitleid = makeid(4);
let authorid = makeid(4);
let contentid = makeid(20);

describe("Page loading", () => {
  it("successfully loads", () => {
    cy.visit("/");
  });
});

describe("Test register page", () => {
  it("should successfully register", () => {
    cy.visit("/");
    cy.get("a.nav-item").contains("Register").click();
    cy.get('input[name="username"]').type("cypressUser" + registerid);
    cy.get('input[name="email"]').type(
      "cypressUser" + registerid + "@test.com"
    );
    cy.get('input[name="firstName"]').type("cypressUser" + registerid + "Name");
    cy.get('input[name="organisation"]').type(
      "cypressUser" + registerid + "Org"
    );
    cy.get('input[name="password1"]').type("zaq1@WSX");
    cy.get('input[name="password2"]').type("zaq1@WSX");
    cy.get("button.login-form-btn").contains("Register").click();
    cy.get("h2.title").should("contain.text", "Your pastes");
  });
});

describe("Test login page", () => {
  it("should successfully login to existing account", () => {
    cy.visit("/");
    cy.get("a.nav-item").contains("Login").click();
    cy.get('input[name="username"]').type("cypressUser" + registerid);
    cy.get('input[name="password"]').type("zaq1@WSX");
    cy.get("button.login-form-btn").contains("Login").click();
    cy.get("h2.title").should("contain.text", "Your pastes");
  });
  it("should logout", () => {
    cy.get("button.nav-item").contains("Logout").click();
    cy.get("button.login-form-btn").should("contain.text", "Login");
  });
});

describe("Test new paste page", () => {
  it("should successfully add new public paste (not logged in)", () => {
    cy.visit("/");
    cy.get("input#title").type("Paste" + pastetitleid);
    cy.get("input#author").type("Author" + authorid);
    cy.get("textarea#content").type("Content: " + contentid);
    cy.get("button").contains("add").click();
    cy.get("div.content").should("contain.text", "Content: " + contentid);
    /* TODO: going through pagination (stopping on last page)
    const findInPage = () => {
      cy.get('li.page-item > a.page-link').contains('next >').then((el) => {
        if (cy.get('ul > li.page-item.disabled').then((off) =>
            off.hasClass('page-item disabled')))
        {
          // on last page, break out
          return
        }
        cy.wrap(el).click()
        findInPage()
      })
    }
    findInPage()
    */

    cy.get("div.table-box > table > tbody")
      .find("tr")
      .should("not.have.length", 0); //weak check
  });
  it("should successfully add new private paste (logged in)", () => {
    cy.visit("/");
    cy.get("a.nav-item").contains("Login").click();
    cy.get('input[name="username"]').type("cypressUser" + registerid);
    cy.get('input[name="password"]').type("zaq1@WSX");
    cy.get("button.login-form-btn").contains("Login").click();
    cy.wait(1000); //doesnt work without wait
    cy.get("a.nav-item").contains("KTFB").click();
    cy.get("input#title").type("Paste" + makeid(4));
    cy.get("input#author").type("Author" + makeid(4));
    cy.get("textarea#content").type("Content: " + makeid(20));
    cy.get("input#privated").check();
    cy.get("button").contains("add").click();
    cy.get("a.nav-item").contains("profile").click();
    cy.get("div.table-box > table > tbody")
      .find("tr")
      .should("not.have.length", 0); //weak check
  });
});
