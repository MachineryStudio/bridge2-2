// Lightweight romaji ↔ hiragana helpers used by the verb conjugation engine.

const ROMA2KANA = {
  // 3-char (y-glides & special onsets)
  sha: 'しゃ', shi: 'し', shu: 'しゅ', sho: 'しょ',
  cha: 'ちゃ', chi: 'ち', chu: 'ちゅ', cho: 'ちょ',
  ja: 'じゃ', ju: 'じゅ', jo: 'じょ',
  tsu: 'つ',
  kya: 'きゃ', kyu: 'きゅ', kyo: 'きょ',
  gya: 'ぎゃ', gyu: 'ぎゅ', gyo: 'ぎょ',
  nya: 'にゃ', nyu: 'にゅ', nyo: 'にょ',
  hya: 'ひゃ', hyu: 'ひゅ', hyo: 'ひょ',
  bya: 'びゃ', byu: 'びゅ', byo: 'びょ',
  pya: 'ぴゃ', pyu: 'ぴゅ', pyo: 'ぴょ',
  mya: 'みゃ', myu: 'みゅ', myo: 'みょ',
  rya: 'りゃ', ryu: 'りゅ', ryo: 'りょ',
  // 2-char
  ka: 'か', ki: 'き', ku: 'く', ke: 'け', ko: 'こ',
  sa: 'さ', su: 'す', se: 'せ', so: 'そ',
  ta: 'た', te: 'て', to: 'と',
  na: 'な', ni: 'に', nu: 'ぬ', ne: 'ね', no: 'の',
  ha: 'は', hi: 'ひ', fu: 'ふ', he: 'へ', ho: 'ほ',
  ma: 'ま', mi: 'み', mu: 'む', me: 'め', mo: 'も',
  ya: 'や', yu: 'ゆ', yo: 'よ',
  ra: 'ら', ri: 'り', ru: 'る', re: 'れ', ro: 'ろ',
  wa: 'わ', wo: 'を',
  ga: 'が', gi: 'ぎ', gu: 'ぐ', ge: 'げ', go: 'ご',
  za: 'ざ', zi: 'じ', zu: 'ず', ze: 'ぜ', zo: 'ぞ',
  ji: 'じ',
  da: 'だ', de: 'で', do: 'ど', di: 'ぢ', du: 'づ',
  ba: 'ば', bi: 'び', bu: 'ぶ', be: 'べ', bo: 'ぼ',
  pa: 'ぱ', pi: 'ぴ', pu: 'ぷ', pe: 'ぺ', po: 'ぽ',
  // 1-char
  a: 'あ', i: 'い', u: 'う', e: 'え', o: 'お', n: 'ん',
};

export function romaji2kana(roma) {
  if (!roma) return '';
  const lower = roma.toLowerCase();
  let out = '';
  let i = 0;
  while (i < lower.length) {
    const c = lower[i];
    const next = lower[i + 1];
    // geminate (small っ) before doubled consonant
    if (c === next && 'kstpcbgdzfhmr'.includes(c)) {
      out += 'っ';
      i += 1;
      continue;
    }
    const s3 = lower.slice(i, i + 3);
    const s2 = lower.slice(i, i + 2);
    if (ROMA2KANA[s3]) { out += ROMA2KANA[s3]; i += 3; }
    else if (ROMA2KANA[s2]) { out += ROMA2KANA[s2]; i += 2; }
    else { out += ROMA2KANA[c] || c; i += 1; }
  }
  return out;
}

const KANA2ROMA = {
  あ: 'a', い: 'i', う: 'u', え: 'e', お: 'o',
  か: 'ka', き: 'ki', く: 'ku', け: 'ke', こ: 'ko',
  さ: 'sa', し: 'shi', す: 'su', せ: 'se', そ: 'so',
  た: 'ta', ち: 'chi', つ: 'tsu', て: 'te', と: 'to',
  な: 'na', に: 'ni', ぬ: 'nu', ね: 'ne', の: 'no',
  は: 'ha', ひ: 'hi', ふ: 'fu', へ: 'he', ほ: 'ho',
  ま: 'ma', み: 'mi', む: 'mu', め: 'me', も: 'mo',
  や: 'ya', ゆ: 'yu', よ: 'yo',
  ら: 'ra', り: 'ri', る: 'ru', れ: 're', ろ: 'ro',
  わ: 'wa', を: 'wo', ん: 'n',
  が: 'ga', ぎ: 'gi', ぐ: 'gu', げ: 'ge', ご: 'go',
  ざ: 'za', じ: 'ji', ず: 'zu', ぜ: 'ze', ぞ: 'zo',
  だ: 'da', ぢ: 'ji', づ: 'zu', で: 'de', ど: 'do',
  ば: 'ba', び: 'bi', ぶ: 'bu', べ: 'be', ぼ: 'bo',
  ぱ: 'pa', ぴ: 'pi', ぷ: 'pu', ぺ: 'pe', ぽ: 'po',
};

export function kana2romaji(s) {
  if (!s) return '';
  let out = '';
  let geminate = false;
  const setY = (v) => {
    if (out.endsWith('shi')) out = out.slice(0, -3) + 's' + v;
    else if (out.endsWith('chi')) out = out.slice(0, -3) + 'ch' + v;
    else if (out.endsWith('ji')) out = out.slice(0, -2) + 'j' + v;
    else out = out.replace(/i$/, 'y' + v);
  };
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c === 'っ') { geminate = true; continue; }
    if (c === 'ー') { out += '-'; continue; }
    if (c === 'ん') { out += 'n'; continue; }
    if (c === 'ゃ') { setY('a'); continue; }
    if (c === 'ゅ') { setY('u'); continue; }
    if (c === 'ょ') { setY('o'); continue; }
    const r = KANA2ROMA[c];
    if (!r) { out += c; geminate = false; continue; }
    if (geminate) {
      const dbl = r[0] === 'c' ? 't' : r[0];
      out += dbl;
      geminate = false;
    }
    out += r;
  }
  return out;
}