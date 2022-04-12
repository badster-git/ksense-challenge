// Fetches users from API
const getUsers = async (userId = 1) => {
  let userData = await fetch(
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

  return userData;
};

const setupTable = async () => {
  try {
    // Get table element by id
    const tableElement = document.getElementById("user-table");

    // Create columns in table
    const topRow = document.createElement("tr");
    topRow.id = "top-row-id";

    // Create userID column and add 'UserID' text to it
    const userIDCol = document.createElement("th");
    const userColText = document.createTextNode("Id");
    userIDCol.appendChild(userColText);

    // Create Name column and add 'Name' text
    const nameCol = document.createElement("th");
    const nameColText = document.createTextNode("Name");
    nameCol.appendChild(nameColText);

    // Create number of posts column and add 'Total Posts' text
    const emailCol = document.createElement("th");
    const emailColTxt = document.createTextNode("Email");
    emailCol.appendChild(emailColTxt);

    // Create number of posts column and add 'Total Posts' text
    const totalPostsCol = document.createElement("th");
    const postColText = document.createTextNode("Total Posts");
    totalPostsCol.appendChild(postColText);

    // Append columns to main row
    topRow.appendChild(userIDCol);
    topRow.appendChild(nameCol);
    topRow.appendChild(emailCol);
    topRow.appendChild(totalPostsCol);

    tableElement.appendChild(topRow);
  } catch (e) {
    console.error(e);
  }
};

const main = () => {
  // setup table before and then fetch
  setupTable().then(async () => {
    const userData = await getUsers();
  });
};
