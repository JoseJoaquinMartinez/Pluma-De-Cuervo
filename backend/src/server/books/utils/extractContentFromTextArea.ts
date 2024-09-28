export async function extractContentFromTextArea(textArea: string) {
  let content: { type: "paragraph"; value: string }[] = [];
  //Todo frontend should manage the "" string option
  content = textArea.split("\n").map((paragraph) => ({
    type: "paragraph",
    value: paragraph,
  }));

  return content;
}
