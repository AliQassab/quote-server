
const API_BASE_URL = "https://ali-quote-sever-bn.hosting.codeyourfuture.io";

const quoteDisplay = document.getElementById("quote-display");
const getQuoteBtn = document.getElementById("get-quote-btn");
const showFormBtn = document.getElementById("show-form-btn");
const formSection = document.getElementById("form-section");
const quoteForm = document.getElementById("quote-form");
const cancelBtn = document.getElementById("cancel-btn");
const successMessage = document.getElementById("success-message");
const errorMessage = document.getElementById("error-message");

function showLoading() {
  quoteDisplay.innerHTML = '<div class="loading">Loading...</div>';
}

function showError(message) {
  quoteDisplay.innerHTML = `<div class="error">Error: ${message}</div>`;
}

function displayQuote(quote, author) {
  quoteDisplay.innerHTML = `
                <div class="quote-text">"${quote}"</div>
                <div class="quote-author">${author}</div>
            `;
}

function showSuccessMessage(message) {
  successMessage.textContent = message;
  successMessage.style.display = "block";
  errorMessage.style.display = "none";
  setTimeout(() => {
    successMessage.style.display = "none";
  }, 3000);
}

function showErrorMessage(message) {
  errorMessage.textContent = message;
  errorMessage.style.display = "block";
  successMessage.style.display = "none";
}

async function fetchQuote() {
  try {
    showLoading();
    getQuoteBtn.disabled = true;

    const response = await fetch(`${API_BASE_URL}/`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    displayQuote(data.quote, data.author);
  } catch (error) {
    console.error("Error fetching quote:", error);
    showError(
      "Failed to fetch quote. Please check if the backend server is running."
    );
  } finally {
    getQuoteBtn.disabled = false;
  }
}

// Submit a new quote to the backend
async function submitQuote(quoteText, author) {
  try {
    const response = await fetch(`${API_BASE_URL}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quote: quoteText,
        author: author,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }

    showSuccessMessage("Quote added successfully!");
    quoteForm.reset();

    displayQuote(data.quote.quote, data.quote.author);

    return true;
  } catch (error) {
    console.error("Error submitting quote:", error);
    showErrorMessage(error.message || "Failed to add quote. Please try again.");
    return false;
  }
}

function toggleForm() {
  const isHidden = formSection.style.display === "none";
  formSection.style.display = isHidden ? "block" : "none";
  showFormBtn.textContent = isHidden ? "Hide Form" : "Add New Quote";

  if (!isHidden) {
    quoteForm.reset();
    successMessage.style.display = "none";
    errorMessage.style.display = "none";
  }
}

getQuoteBtn.addEventListener("click", fetchQuote);
showFormBtn.addEventListener("click", toggleForm);
cancelBtn.addEventListener("click", toggleForm);

quoteForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const quoteText = document.getElementById("quote-input").value.trim();
  const author = document.getElementById("author-input").value.trim();

  if (!quoteText || !author) {
    showErrorMessage("Please fill in both quote and author fields.");
    return;
  }

  const submitBtn = document.getElementById("submit-quote-btn");
  const originalText = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = "Adding...";

  const success = await submitQuote(quoteText, author);

  submitBtn.disabled = false;
  submitBtn.textContent = originalText;

  if (success) {
    setTimeout(() => {
      toggleForm();
    }, 2000);
  }
});

window.addEventListener("load", fetchQuote);
