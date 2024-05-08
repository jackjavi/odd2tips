export async function markdownToHtml(markdown: string) {
  const response = await fetch("/api/markdown/convert", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ markdown }),
  });
  const { html } = await response.json();
  return html;
}
