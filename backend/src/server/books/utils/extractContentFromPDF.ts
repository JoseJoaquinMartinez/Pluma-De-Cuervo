import fs from "fs";
import pdf from "pdf-parse";
import pdf2table from "pdf2table";

export async function extractContentFromPDF(filePath: string) {
  const dataBuffer = fs.readFileSync(filePath);
  const content: { type: string; value: string }[] = [];

  const data = await pdf(dataBuffer);
  const paragraphs: string[] = data.text.split("\n");

  paragraphs.forEach((paragraph) => {
    content.push({ type: "paragraph", value: paragraph.trim() });
  });

  const extractedTables = await new Promise<{ type: string; value: string }[]>(
    (resolve, reject) => {
      pdf2table.parse(filePath, (err: Error | null, rows: string[][]) => {
        if (err) {
          return reject(err);
        }

        const tables = rows.map((row) => ({
          type: "row",
          value: row.join("|"),
        }));

        resolve(tables);
      });
    }
  );
  content.push(...extractedTables);

  return content;
}
