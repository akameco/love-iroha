import "babel/polyfill";
import kuromoji from 'kuromoji'
import _ from 'lodash'
import moji from 'moji'

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
  }).map(x => x.pronunciation).filter(x => x)
}

const dic = require('../data/dic_ja.json');
function rank(word) {
  let r = dic.filter(x => x.yomi == word)
  return r.length > 0 ? r[0].rank : 0
}

export async function rankWords(){
  let arr = await tokenizer(word)
  return filterToken(arr)
  .map(w => {
    let x = moji(w).convert('KK', 'HG').toString()
    return rank(x)
  })
  .reduce((sum, x) => sum + x,0)
}

