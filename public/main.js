const form = document.querySelector("#shorten-form");
const input = document.querySelector("#url");
const message = document.querySelector("#message");
const result = document.querySelector("#result");
const shortUrl = document.querySelector("#short-url");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  message.textContent = "";
  result.hidden = true;

  const response = await fetch("/api/links", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ url: input.value }),
  });

  const data = await response.json();

  if (!response.ok) {
    message.textContent = data.error || "Unable to shorten this URL.";
    return;
  }

  shortUrl.href = data.shortUrl;
  shortUrl.textContent = data.shortUrl;
  result.hidden = false;
  form.reset();
});
