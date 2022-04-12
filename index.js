// Fetches users from API
const getUsers = async () => {
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

// Fetches posts from API
const getPosts = async (userId = 1) => {
  let userPosts = await fetch(
    `http://jsonplaceholder.typicode.com/users/${userId}/posts`
  )
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

  return userPosts;
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
          id: "table-id-header",
          classes: ["table-col-name", "column1", "column"],
          textContent: "ID",
        },
        {
          elem: "th",
          id: "table-name-header",
          classes: ["table-col-name", "column2", "column"],
          textContent: "Name",
        },
        {
          elem: "th",
          id: "table-username-header",
          classes: ["table-col-name", "column3", "column"],
          textContent: "Username",
        },
        {
          elem: "th",
          id: "table-email-header",
          classes: ["table-col-name", "column4", "column"],
          textContent: "Email",
        },
      ]);

    topRow.appendTo(tableElement);
  } catch (e) {
    console.error(e);
  }
};

// Populates table with userData
const populateTable = async (tableData = []) => {
  try {
    const mainTable = document.querySelector("#user-table");

    if (mainTable === null) {
      console.error("no table found with id 'user-table'");
      throw new Error("no table found with id 'user-table'");
    }

    tableData.forEach((user, idx) => {
      const userRow = HtmlElement.create("tr")
        .addId(`user-${idx + 1}-row`)
        .addClass("table--user-row")
        .addClass("row")
        .addChildren([
          {
            elem: "td",
            id: `user-${user.id}-id`,
            classes: ["user-id", "row", "column1", "column"],
            textContent: user.id ? user.id : "N/A",
          },
          {
            elem: "td",
            id: `user-${user.id}-name`,
            classes: ["user-name", "row", "column2", "column"],
            textContent: user.name,
          },
          {
            elem: "td",
            id: `user-${user.id}-username`,
            classes: ["user-username", "row", "column3", "column"],
            textContent: user.username,
          },
          {
            elem: "td",
            id: `user-${user.id}-email`,
            classes: ["user-email", "row", "column4", "column"],
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

// Sets up click listener for rows
const setupClickListener = () => {
  let mainTable = document.querySelector("#user-table");
  let mainContainer = document.querySelector(".main-container");

  // Check if element containing 'row' in classList is clicked
  mainTable.addEventListener("click", async (e) => {
    if (e.target.classList.contains("column")) {
      // Check if post data already exists; if so remove it
      let elemExists = document.querySelector("#post-data-container");
      if (!!elemExists) {
        elemExists.remove();
      }

      // Grab userid from selected row
      const userId = e.target.id.split("-")[1];
      // Fetch posts based on selected userId
      const userPosts = await getPosts(userId);

			// Create post container to hold all posts
      const userPostsContainer = HtmlElement.create("div")
        .addId("post-data-container")
        .addClasses(["container", "container--all-posts"]);
      userPostsContainer.appendTo(mainContainer);

			// Create element to show number of posts by user
      userPostsContainer.addChild({
        elem: "h6",
        id: "number-of-posts",
        textContent: `Number of posts by user: ${userPosts.length}`,
      });

      // Add every post to userPostsContainer
      for (const post of userPosts) {
        userPostsContainer.addChildren([
          {
            elem: "h3",
            classes: ["post-title"],
            textContent: post.title,
          },
          {
            elem: "p",
            classes: ["post-body"],
            textContent: post.body,
          },
        ]);
      }
    }
  });
};

const main = () => {
  // setup table before and then fetch
  setupTable().then(async () => {
    const userData = await getUsers();
    await populateTable(userData);
    setupClickListener();
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
    if (typeof className === "string") {
      className && this.element.classList.add(className);
    } else if (typeof className === "object") {
      for (const newClass of className) {
        className && this.element.classList.add(newClass);
      }
    }
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
