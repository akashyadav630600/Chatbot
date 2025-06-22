// Get chatbot elements
const chatbot = document.getElementById('chatbot');
const conversation = document.getElementById('conversation');
const inputForm = document.getElementById('input-form');
const inputField = document.getElementById('input-field');

inputForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const input = inputField.value.trim();
  inputField.value = '';
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" });

  if (input === '') return;

  addMessage(input, 'user-message', currentTime);

  const response = generateResponse(input);
  addMessage(response, 'chatbot', currentTime);
});

function addMessage(text, className, time) {
  const message = document.createElement('div');
  message.classList.add('chatbot-message', className);
  message.innerHTML = `<p class="chatbot-text" sentTime="${time}">${text}</p>`;
  conversation.appendChild(message);
  message.scrollIntoView({ behavior: "smooth" });
}

function generateResponse(input) {
  const cleanInput = input.toLowerCase().trim();

  // Handle math expressions
  try {
    const result = evaluateMath(cleanInput);
    if (result !== null) return `Answer is: ${result}`;
  } catch (e) {
    return "Invalid math expression.";
  }

  // Predefined responses
  if (cleanInput.includes("hello") || cleanInput.includes("hi")) {
    return "Hello there! 😊 How can I help you?";
  } else if (cleanInput.includes("who are you")) {
    return "I'm your friendly chatbot built by Akash Yadav! 🤖";
  } else if (cleanInput.includes("help") || cleanInput.includes("support")) {
    return "I'm here to assist you with questions and basic math. Just type something!";
  } else if (cleanInput.includes("thanks") || cleanInput.includes("thank you")) {
    return "You're welcome! 😊";
  } else if (cleanInput.includes("time")) {
    return `The current time is ${new Date().toLocaleTimeString()}`;
  }

  return "I'm not sure I understand that. Please ask something else or a math question.";
}

// Evaluate mathematical expressions
function evaluateMath(input) {
  const mathKeywords = ["+", "-", "*", "/", "**", "sqrt", "log", "sin", "cos", "tan"];
  if (!mathKeywords.some(k => input.includes(k))) return null;

  try {
    const math = {
      sqrt: Math.sqrt,
      log: Math.log10,
      sin: Math.sin,
      cos: Math.cos,
      tan: Math.tan
    };

    const sanitized = input.replace(/[^-()\d/*+.a-z]/gi, '');
    const result = Function('"use strict";return (' + sanitized + ')')();
    if (typeof result === 'number' && !isNaN(result)) {
      return result.toFixed(4);
    }
  } catch (e) {
    return null;
  }

  return null;
}

// Prevent tab switching
window.onblur = function () {
  alert('Trying to switch tabs eh!');
};
