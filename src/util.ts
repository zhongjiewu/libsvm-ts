import { UtilError } from "./Errors";

const mapOptionToCommand = {
  quiet: 'q',
  type: 's',
  kernel: 't',
  degree: 'd',
  gamma: 'g',
  coef0: 'r',
  cost: 'c',
  nu: 'n',
  epsilon: 'p',
  cacheSize: 'm',
  tolerance: 'e',
  shrinking: 'h',
  probabilityEstimates: 'b',
  weight: 'w'
};

export function getCommand(options) {
  let str = '';
  const keys = Object.keys(options);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (options[key] == null) {
      continue;
    }
    if (mapOptionToCommand[key] == null) {
      throw new UtilError('Bad option');
    }

    // Adding an empty space before append a new command
    if (str) {
      str += ' ';
    }

    // Handling each key
    switch (key) {
      case 'probabilityEstimates':
      case 'shrinking':
        str += `-${mapOptionToCommand[key]} ${options[key] ? 1 : 0}`;
        break;
      case 'quiet': {
        if (options[key]) {
          str += `-${mapOptionToCommand[key]} 1`;
        }
        break;
      }
      case 'weight': {
        const weightKeys = Object.keys(options.weight);
        for (let j = 0; j < weightKeys.length; j++) {
          if (j !== 0) {
            str += ' ';
          }
          str += `-w${weightKeys[j]} ${options.weight[weightKeys[j]]}`;
        }
        break;
      }
      default: {
        str += `-${mapOptionToCommand[key]} ${options[key]}`;
        break;
      }
    }
  }

  return str;
}

