import fs from "fs";
/* import { PdfReader } from "pdfreader";
import pdf from "pdf-parse";
import pdf2table from "pdf2table"; */

export async function extractContentFromPDF(filePath: string) {
  const dataBuffer = fs.readFileSync(filePath);
  const content: { type: string; value: string }[] = [];

  return content;
}
/* const data = await pdf(dataBuffer);
  const paragraphs: string[] = data.text.split("\n\n");

  paragraphs.forEach((paragraph) => {
    content.push({ type: "paragraph", value: paragraph.trim() });
  });
  console.log(content); */

/* const extractedTables = await new Promise<{ type: string; value: string }[]>(
    (resolve, reject) => {
      pdf2table.parse(filePath, (err: Error | null, rows: string[][]) => {
        if (err) {
          return reject(err);
        }

        const tables = rows.map((row) => ({
          type: "row",
          value: row.join("|"),
        }));

        console.log("las tablas:", tables);

        resolve(tables);
      });
    }
  );
  content.push(...extractedTables); */
