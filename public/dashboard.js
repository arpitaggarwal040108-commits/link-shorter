const body = document.querySelector("#links-body");

function renderEmpty() {
  body.innerHTML = '<tr><td colspan="3">No shortened links yet.</td></tr>';
}

function renderLinks(links) {
  if (!links.length) {
    renderEmpty();
    return;
  }

  body.innerHTML = links.map((link) => {
    const shortPath = `/s/${link.code}`;
    return `
      <tr>
        <td><a href="${shortPath}">${link.code}</a></td>
        <td><a href="${link.url}" target="_blank" rel="noreferrer">${link.url}</a></td>
        <td>${link.clicks}</td>
      </tr>
    `;
  }).join("");
}

try {
  const response = await fetch("/api/links");
  const data = await response.json();
  renderLinks(data.links || []);
} catch {
  body.innerHTML = '<tr><td colspan="3">Unable to load links.</td></tr>';
}
