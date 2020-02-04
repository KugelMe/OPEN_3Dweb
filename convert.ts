import fbx2gltf from "fbx2gltf";
import * as fs from "fs";
import { promisify } from "util";

const { readdir } = fs.promises;
const exists = promisify(fs.exists);

const models = "./models";
const src = "./src";

async function go() {
  const match = /^([^.]+)\.fbx$/;

  const files = await readdir(models);

  for (const file of files.filter(_ => _.match(match))) {
    const input = `${models}/${file}`;
    const output = file.replace(match, `${src}/$1.glb`);

    if (!(await exists(output))) {
      console.log(`Converting ${file}`);
      await fbx2gltf(input, output, ["--embed"]);
    }
  }
}

go();
