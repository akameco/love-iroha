import kuromoji from 'kuromoji'
import _ from 'lodash'

const DIC_DIR = "./node_modules/kuromoji/dist/dict/";

export function tokenizer(word) {
  return new Promise(resolve => {
    kuromoji.builder({ dicPath: DIC_DIR }).build((error, tokenizer) => {
      resolve(tokenizer.tokenize(word))
    });
  });
}

export function filterToken(tokens) {
  return tokens.filter(x => {
    return !_.includes(['助詞', '助動詞', '記号'], x.pos)
  })
  .map(x => x.pronunciation)
  .filter(x => x)
}

