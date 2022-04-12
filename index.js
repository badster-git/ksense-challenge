const getUsers = async (userId=1) => {
  console.log("called");
  fetch(`http://jsonplaceholder.typicode.com/users/${userId}/posts`)
    .then((resp) => {
      if (!resp.ok) {
        return Promise.reject(resp);
      }
      return resp.json();
    })
    .then((data) => {
			console.log(data)
      return data;
    })
    .catch((err) => console.error(err));

};
