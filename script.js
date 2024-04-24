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




