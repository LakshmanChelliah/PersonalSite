import { mkdir, writeFile } from "node:fs/promises";
await mkdir("public/fonts", { recursive: true });
for (const [family, id] of [
  ["Inter:wght@100..900", "inter"],
  ["Space+Grotesk:wght@300..700", "space"],
  ["JetBrains+Mono", "mono"],
]) {
  const response = await fetch(
    `https://fonts.googleapis.com/css2?family=${family}&display=swap`,
    {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
      },
    },
  );
  const css = await response.text();
  const url = [...css.matchAll(/url\((https[^)]+)\)/g)].at(-1)?.[1];
  if (!url) throw new Error(css);
  await writeFile(
    `public/fonts/${id}.woff2`,
    Buffer.from(await (await fetch(url)).arrayBuffer()),
  );
  console.log("Font", id, css.match(/font-weight:[^;]+/)?.[0]);
}
for (const [directory, id] of [
  ["inter", "inter"],
  ["spacegrotesk", "space"],
  ["jetbrainsmono", "mono"],
]) {
  const response = await fetch(
    `https://raw.githubusercontent.com/google/fonts/main/ofl/${directory}/OFL.txt`,
  );
  if (!response.ok)
    throw new Error(`Unable to obtain license for ${directory}`);
  await writeFile(`public/fonts/OFL-${id}.txt`, await response.text());
}
