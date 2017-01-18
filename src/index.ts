import { exec } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as commander from 'commander';

const packageSettings = require('../package.json');

commander
  .version(packageSettings.version)
  .description(packageSettings.description)
  .usage('npm start -- -i node-image -t 7.4.0')
  .option('-u, --user [username]', 'Username', 'brunolm')
  .option('-i, --image <name>', 'Image name')
  .option('-t, --tag <version>', 'Tag version')
  .option('-p, --publish', 'Publish image')
  .parse(process.argv);

function run(command: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(command, (err, stdout) => {
      if (err) {
        return reject(err);
      }

      return resolve(stdout);
    });
  });
}

async function start() {
  try {
    const shouldPublish = commander['publish'];
    const dockerfileLocation = `./${commander['image']}/${commander['tag']}/Dockerfile`;
    const dockerfileOnbuildLocation = `./${commander['image']}/${commander['tag']}/Dockerfile-onbuild`;
    const dockerfileExists = fs.existsSync(dockerfileLocation);
    const dockerfileOnbuildExists = fs.existsSync(dockerfileOnbuildLocation);

    if (!dockerfileExists && !dockerfileOnbuildExists) {
      throw new Error(`Image not found. ${dockerfileLocation} / ${dockerfileOnbuildLocation}`);
    }

    const imageName = `${commander['user']}/${commander['image']}:${commander['tag']}`;

    const command = `docker build --force-rm -t ${imageName} -f ${dockerfileLocation} .`;
    const commandOnbuild = `docker build --force-rm -t ${imageName}-onbuild -f ${dockerfileOnbuildLocation} .`;

    const publishCommand = `docker push ${imageName}`;

    let output = '';

    if (dockerfileExists) {
      console.log(`Building ${imageName}`, command);
      output = await run(`${command}`);
      console.log(output);

      if (shouldPublish) {
        console.log(`Publishing ${imageName}`, publishCommand);
        output = await run(`${publishCommand}`);
        console.log(output);
      }
    }

    if (dockerfileOnbuildExists) {
      console.log(`Building ${imageName}-onbuild`, commandOnbuild);
      output = await run(`${commandOnbuild}`);
      console.log(output);

      if (shouldPublish) {
        console.log(`Publishing ${imageName}-onbuild`, `${publishCommand}-onbuild`);
        output = await run(`${publishCommand}-onbuild`);
        console.log(output);
      }
    }
  }
  catch (err) {
    console.error(err);
    process.exit(-1);
  }
}

start();
