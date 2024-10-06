import { extractContentFromPDF } from "./extractContentFromPDF";
import { extractContentFromWord } from "./extractContentFromWord";

export async function fileContentManagement(
  filePath: string,
  fileExtension: string
) {
  let content: { type: string; value: string }[] = [];

  switch (fileExtension) {
    case "application/pdf":
      //TODO perhaps get a paid services that can actually get the format of the text, depending of the document the formating that its parsed changes.
      content = await extractContentFromPDF(filePath);
      break;
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      content = await extractContentFromWord(filePath);
      break;
    default:
      throw new Error("formato de archivo no soportado");
  }
  return content;
}
