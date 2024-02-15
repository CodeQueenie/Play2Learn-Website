/*Index*/

var quotes = [
  {
    quote: "I've never had more fun than I do playing Anagram Hunt. It is the best game ever invented!",
    author: "Justin Jest",
  },
  {
    quote: "Play fuels your creativity, tickles your inner child and nurtures your soul.",
    author: "Claudia Black",
  },
  {
    quote: "We don’t stop playing because we grow old; we grow old because we stop playing.",
    author: "George Bernard Shaw",
  },
];

var quoteIndex = 0;

function rotateQuote() {
  quoteIndex = Math.floor(Math.random() * quotes.length);

  var quote = quotes[quoteIndex];
  document.getElementById("quote").innerHTML = "<q>" + quote.quote + "</q>";
  document.getElementById("author").innerHTML = quote.author;
}

window.onload = function() {
  document.getElementById("quote").innerHTML = "<q>" + quotes[quoteIndex].quote + "</q>";
  document.getElementById("author").innerHTML = quotes[quoteIndex].author;
  setInterval(rotateQuote, 10000); // rotate every 10 seconds
};

//Login/Register

// Get form and action switch elements
let loginContainer = document.getElementById('login-container');
let registerContainer = document.getElementById('register-container');
let loginLink = document.getElementById('login-link');
let registerLink = document.getElementById('register-link');

// Add event listeners to switch between forms
registerLink.addEventListener('click', function(e) {
  e.preventDefault();
  registerContainer.style.display = 'block';
  loginContainer.style.display = 'none';
});

loginLink.addEventListener('click', function(e) {
  e.preventDefault();
  loginContainer.style.display = 'block';
  registerContainer.style.display = 'none';
});

// Add event listeners to forms
document.getElementById('registerForm').addEventListener('submit', function(e) {
  e.preventDefault();
  let email = document.querySelector('#registerForm [name="email"]').value;
  let password = document.querySelector('#registerForm [name="password"]').value;
  // Add your registration logic here
  alert('Register form submitted with Email: ' + email + " | Password: " + password);
  
  // Clear the form fields
    document.querySelector('#registerForm [name="email"]').value = '';
    document.querySelector('#registerForm [name="password"]').value = '';
    document.querySelector('#registerForm [name="repeat_password"]').value = '';
    
  // Switch back to login form
    registerContainer.style.display = 'none';
    loginContainer.style.display = 'block';
});

document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  let email = document.querySelector('#loginForm [name="email"]').value;
  let password = document.querySelector('#loginForm [name="password"]').value;
  // Add your login logic here
  alert('Login form submitted with Email: ' + email + " | Password: " + password);
});



