import React from "react";
import { ChapterProps } from "../chapter/interface/chapter";
import { MessageSquare } from "lucide-react";

export const ChapterReadArea = ({ ...chapter }: ChapterProps) => {
  return (
    <div className="bg-cardsBackground rounded-lg px-3 md:p-4 mt-2">
      {chapter.paragraph.map(
        ({ id, paragraphNumber, paragraphText, paragraphType }) => {
          if (paragraphType === "paragraph") {
            return (
              <div className="flex flex-col" key={id}>
                <span
                  className="self-end text-2xl md:text-3xl text-encabezados"
                  onClick={() => console.log("click bocadillo")}
                >
                  <MessageSquare />
                </span>
                <p
                  key={id}
                  className="text-mainText mb-4"
                  dangerouslySetInnerHTML={{ __html: paragraphText }}
                  onClick={() => console.log("click parrafo")}
                />
              </div>
            );
          }

          if (paragraphType === "table") {
            const parser = new DOMParser();
            const tableDoc = parser.parseFromString(paragraphText, "text/html");
            const rows = Array.from(tableDoc.querySelectorAll("tr"));

            return (
              <div
                className="flex flex-col text-xs md:text-base items-center justify-center"
                key={id}
              >
                <span
                  className="self-end text-2xl md:text-3xl text-encabezados"
                  onClick={() => console.log("click tabla bocadillo")}
                >
                  <MessageSquare />
                </span>
                <div key={id} onClick={() => console.log("click tabla")}>
                  <table
                    key={id}
                    className="table-auto mb-4 border-collapse text-mainText border border-gray-300"
                  >
                    <tbody>
                      {rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {Array.from(row.querySelectorAll("td, th")).map(
                            (cell, cellIndex) => (
                              <td
                                key={cellIndex}
                                className="border border-gray-400 px-4 py-2 text-left"
                                dangerouslySetInnerHTML={{
                                  __html: cell.innerHTML,
                                }}
                              />
                            )
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          }

          return null;
        }
      )}
    </div>
  );
};
