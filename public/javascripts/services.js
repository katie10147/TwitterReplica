// Show an object on the screen.
function showObject(obj) {
  const pre = document.getElementById('response');
  const preParent = pre.parentElement;
  pre.innerText = JSON.stringify(obj, null, 4);
  preParent.classList.add('flashing');
  setTimeout(() => preParent.classList.remove('flashing'), 300);
}

// Axios responses have a lot of data. This shows only the most relevant data.
function showResponse(axiosResponse) {
  const fullResponse = axiosResponse.response === undefined
    ? axiosResponse
    : axiosResponse.response;
  const abridgedResponse = {
    data: fullResponse.data,
    status: fullResponse.status,
    statusText: fullResponse.statusText,
  };
  showObject(abridgedResponse);
}

/**
 * IT IS UNLIKELY THAT YOU WILL WANT TO EDIT THE CODE ABOVE.
 * EDIT THE CODE BELOW TO SEND REQUESTS TO YOUR API.
 * 
 * You can use axios to make API calls like this:
 * const body = { bar: 'baz' };
 * axios.post('/api/foo', body)
 *   .then(showResponse) // on success (Status Code 200)
 *   .catch(showResponse); // on failure (Other Status Code)
 * See https://github.com/axios/axios for more info
 */

/**
 * Fields is an object mapping the names of the form inputs to the values typed in
 * e.g. for createUser, fields has properites 'username' and 'password'
 */
function createUser(fields) {
  showObject(fields);
  axios.post('users/create', fields)
  .then(showResponse)
  .catch(showResponse);
}

function changeUsername(fields) {
  showObject(fields);
  axios.patch('users/edit/username', fields)
  .then(showResponse)
  .catch(showResponse);
}

function changePassword(fields) {
  axios.patch('users/edit/password', fields)
  .then(showResponse)
  .catch(showResponse);
}

function deleteUser(fields) {
  showObject(fields);
  axios.delete('users/delete', {data: fields})
  .then(showResponse)
  .catch(showResponse);
}

function signIn(fields) {
  showObject(fields);
  axios.post('users/signIn', fields)
  .then(showResponse)
  .catch(showResponse);
}

function signOut(fields) {
  showObject(fields);
  axios.get('users/signOut', fields)
  .then(showResponse)
  .catch(showResponse);
}

function viewAllFreets(fields) {
  showObject(fields);
  axios.get('freets/allFreets', fields)
  .then(showResponse)
  .catch(showResponse);
}

function viewFreetsByAuthor(fields) {
  showObject(fields);
  axios.get('freets/' + fields.author, fields)
  .then(showResponse)
  .catch(showResponse);
}

function createFreet(fields) {
  showObject(fields);
  axios.post('freets/create', fields)
  .then(showResponse)
  .catch(showResponse);
}

function editFreet(fields) {
  showObject(fields);
  axios.patch('freets/edit', fields)
  .then(showResponse)
  .catch(showResponse);
}

function deleteFreet(fields) {
  showObject(fields);
  axios.delete('freets/delete', {data: fields})
  .then(showResponse)
  .catch(showResponse);
}

function upvoteFreet(fields) {
  showObject(fields);
  axios.patch('freets/upvote', {data: fields})
  .then(showResponse)
  .catch(showResponse);
}

// Map form (by id) to the function that should be called on submit
const formsAndHandlers = {
  'create-user': createUser,
  'delete-user': deleteUser,
  'change-username': changeUsername,
  'change-password': changePassword,
  'sign-in': signIn,
  'sign-out': signOut,
  'view-all-freets': viewAllFreets,
  'view-freets-by-author': viewFreetsByAuthor,
  'create-freet': createFreet,
  'edit-freet': editFreet,
  'delete-freet': deleteFreet,
};

// Attach handlers to forms
function init() {
  Object.entries(formsAndHandlers).forEach(([formID, handler]) => {
    const form = document.getElementById(formID);
    form.onsubmit = (e) => {
      e.preventDefault();
      const data = {};
      (new FormData(form)).forEach((value, key) => {
        data[key] = value;
      });
      handler(data);
      return false; // Don't reload page
    };
  });
}

// Attach handlers once DOM is ready
window.onload = init; 