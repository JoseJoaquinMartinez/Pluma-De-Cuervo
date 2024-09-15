export async function extractContentFromTextArea(textArea: string) {
  let content: { type: "paragraph"; value: string }[] = [];

  content = textArea.split("\n").map((paragraph) => ({
    type: "paragraph",
    value: paragraph,
  }));

  return content;
}
