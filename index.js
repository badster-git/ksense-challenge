// Fetches users from API
const getUsers = async (userId = 1) => {
  let userData = await fetch(`http://jsonplaceholder.typicode.com/users`)
    .then((resp) => {
      if (!resp.ok) {
        return Promise.reject(resp);
      }
      return resp.json();
    })
    .then((data) => {
      return data;
    })
    .catch((err) => console.error(err));

  return userData;
};

// Column order is 'id','name','email','total posts'
const setupTable = async () => {
  try {
    // Get table element by id
    const tableElement = document.querySelector("#user-table");

    // Create columns in table
    const topRow = HtmlElement.create("tr")
      .addId("top-row")
      .addChildren([
        {
          elem: "th",
          id: "id-row",
          classes: ["table-row-name"],
          textContent: "ID",
        },
        {
          elem: "th",
          id: "name-row",
          classes: ["table-row-name"],
          textContent: "Name",
        },
        {
          elem: "th",
          id: "name-row",
          classes: ["table-row-name"],
          textContent: "Username",
        },
        {
          elem: "th",
          id: "email-row",
          classes: ["table-row-name"],
          textContent: "Email",
        },
      ]);

    topRow.appendTo(tableElement);
  } catch (e) {
    console.error(e);
  }
};

const populateTable = (tableData = []) => {
  try {
    const mainTable = document.querySelector("#user-table");

    if (mainTable === null) {
      console.error("no table found with id 'user-table'");
      throw new Error("no table found with id 'user-table'");
    }

    tableData.forEach((user, idx) => {
      const userRow = HtmlElement.create("tr")
        .addId(`user-${idx + 1}-row`)
				.addClass('table--user-row')
        .addChildren([
          {
            elem: "td",
            id: `user-${user.id}-id`,
            classes: ["user-id"],
            textContent: user.id ? user.id : 'N/A',
          },
          {
            elem: "td",
            id: `user-${user.id}-name`,
            classes: ["user-name"],
            textContent: user.name,
          },
          {
            elem: "td",
            id: `user-${user.id}-username`,
            classes: ["user-username"],
            textContent: user.username,
          },
          {
            elem: "td",
            id: `user-${user.id}-email`,
            classes: ["user-email"],
            textContent: user.email,
          },
        ]);

      // Add created user rows to main table element
      userRow.appendTo(mainTable);
    });
  } catch (e) {
    console.error(e);
  }
};

const main = () => {
  // setup table before and then fetch
  setupTable().then(async () => {
    const userData = await getUsers();
    populateTable(userData);
  });
};

// HtmlElement constructor
class HtmlElement {
  constructor(elem) {
    this.element =
      elem instanceof HTMLElement ? elem : document.createElement(elem);
  }
  // Add id
  addId(id) {
    this.element.id = id || "";
    return this;
  }
  // Add a single class
  addClass(className) {
    className && this.element.classList.add(className);
    return this;
  }
  // Add multiple classes. Use of rest parameter
  // allows classNames to be either a comma-
  // separated list or an array of args.
  addClasses(...classNames) {
    for (const className of classNames) {
      this.addClass(className);
    }

    return this;
  }
  // Add text content to element
  addTextContent(text = "") {
    this.element.textContent = text;
    return this;
  }
  // Add single child element and append to parent
  addChild(args = {}) {
    const child = HtmlElement.create(args.elem)
      .addId(args.id)
      .addClasses(args.classes) // addClasses can take an array or a comma-separated list
      .addTextContent(args.textContent);
    this.append(child);
    return this;
  }
  // Add multiple child elements
  // Takes array of objects
  addChildren(children = []) {
    for (const child of children) {
      this.addChild(child);
    }

    return this;
  }
  // Gets child of the current HtmlElement and
  // wraps it in an instance of HtmlElement
  getChild(selector) {
    return new HtmlElement(this.element.querySelector(selector));
  }
  // Get element by its id
  getElement(selector) {
    return new HtmlElement(this.element.querySelector(selector));
  }
  // Appends an HtmlElement's inner element property
  // to the current HtmlElement. Not chainable,
  // but would be if you add return this.
  append(htmlElement) {
    this.element.appendChild(htmlElement.element);
  }
  // Appends the current HtmlElement's inner
  // element property to a DOM element.
  // Return this to make chainable.
  appendTo(domElement) {
    domElement.appendChild(this.element);
  }
  // Static method that calls constructor
  // and returns chainable object
  static create(elem) {
    return new HtmlElement(elem);
  }
}
