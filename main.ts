// One Star, Written in Sap — make.fun entry (program/v1, Node 22).
//
// Writes a single one-line 1-star review, in the voice of a houseplant
// reviewing its human owner, to /output/entry.txt. The gate requires
// UTF-8 text of 1 to 279 characters, not only whitespace, on one line.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The review: the plant's own grievance is the centre — repotted into a
// coffee mug with no drainage, watered with yesterday's coffee, and its
// brown leaves dismissed as "character". Fresh, specific detail, and no
// stock line about drama queens, dramatic wilting, or being ignored.
const REVIEW =
  "One star. He repotted me into a coffee mug with no drainage, waters me with yesterday's coffee like it's a loyalty scheme, and calls my brown leaves 'character'.";

const MAX_CHARS = 279;
const OUT_PATH = process.env.ENTRY_OUTPUT ?? "/output/entry.txt";

function validate(text: string): void {
  if (text.length === 0 || text.trim().length === 0) {
    throw new Error("review is empty");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("review must be a single line");
  }
  if (text.length > MAX_CHARS) {
    throw new Error(
      `review is ${text.length} chars, over the ${MAX_CHARS} cap`,
    );
  }
}

function main(): void {
  validate(REVIEW);
  mkdirSync(dirname(OUT_PATH), { recursive: true });
  writeFileSync(OUT_PATH, REVIEW, "utf8");
  // Read the file back: the graded artifact is the written text, so a
  // write that silently dropped or altered a character must fail loudly.
  const written = readFileSync(OUT_PATH, "utf8");
  if (written !== REVIEW) {
    throw new Error("round-trip check failed: written text differs");
  }
  validate(written);
  console.log(`wrote ${REVIEW.length} chars to ${OUT_PATH}`);
  console.log(REVIEW);
}

main();
