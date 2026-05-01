// Initial verb data for seeding
export const initialVerbs = [
  {
    dictionary: "食べる", romaji: "taberu", hiragana: "たべる", meaning_en: "to eat",
    meaning_fr: "manger", meaning_es: "comer", group: "ichidan", level: "N5",
    forms: { present: "食べる", present_polite: "食べます", past: "食べた", past_polite: "食べました", negative: "食べない", negative_polite: "食べません", te_form: "食べて", potential: "食べられる", volitional: "食べよう", imperative: "食べろ", passive: "食べられる", causative: "食べさせる" },
    forms_romaji: { present: "taberu", present_polite: "tabemasu", past: "tabeta", past_polite: "tabemashita", negative: "tabenai", negative_polite: "tabemasen", te_form: "tabete", potential: "taberareru", volitional: "tabeyou" },
    example_sentence: "毎日ご飯を食べます。", example_sentence_en: "I eat rice every day."
  },
  {
    dictionary: "飲む", romaji: "nomu", hiragana: "のむ", meaning_en: "to drink",
    meaning_fr: "boire", meaning_es: "beber", group: "godan", level: "N5",
    forms: { present: "飲む", present_polite: "飲みます", past: "飲んだ", past_polite: "飲みました", negative: "飲まない", negative_polite: "飲みません", te_form: "飲んで", potential: "飲める", volitional: "飲もう", imperative: "飲め", passive: "飲まれる", causative: "飲ませる" },
    forms_romaji: { present: "nomu", present_polite: "nomimasu", past: "nonda", past_polite: "nomimashita", negative: "nomanai", negative_polite: "nomimasen", te_form: "nonde", potential: "nomeru", volitional: "nomou" },
    example_sentence: "水を飲みたいです。", example_sentence_en: "I want to drink water."
  },
  {
    dictionary: "行く", romaji: "iku", hiragana: "いく", meaning_en: "to go",
    meaning_fr: "aller", meaning_es: "ir", group: "godan", level: "N5",
    forms: { present: "行く", present_polite: "行きます", past: "行った", past_polite: "行きました", negative: "行かない", negative_polite: "行きません", te_form: "行って", potential: "行ける", volitional: "行こう", imperative: "行け", passive: "行かれる", causative: "行かせる" },
    forms_romaji: { present: "iku", present_polite: "ikimasu", past: "itta", past_polite: "ikimashita", negative: "ikanai", negative_polite: "ikimasen", te_form: "itte", potential: "ikeru", volitional: "ikou" },
    example_sentence: "学校に行きます。", example_sentence_en: "I go to school."
  },
  {
    dictionary: "来る", romaji: "kuru", hiragana: "くる", meaning_en: "to come",
    meaning_fr: "venir", meaning_es: "venir", group: "irregular", level: "N5",
    forms: { present: "来る", present_polite: "来ます", past: "来た", past_polite: "来ました", negative: "来ない", negative_polite: "来ません", te_form: "来て", potential: "来られる", volitional: "来よう", imperative: "来い", passive: "来られる", causative: "来させる" },
    forms_romaji: { present: "kuru", present_polite: "kimasu", past: "kita", past_polite: "kimashita", negative: "konai", negative_polite: "kimasen", te_form: "kite", potential: "korareru", volitional: "koyou" },
    example_sentence: "友達が来ました。", example_sentence_en: "My friend came."
  },
  {
    dictionary: "する", romaji: "suru", hiragana: "する", meaning_en: "to do",
    meaning_fr: "faire", meaning_es: "hacer", group: "irregular", level: "N5",
    forms: { present: "する", present_polite: "します", past: "した", past_polite: "しました", negative: "しない", negative_polite: "しません", te_form: "して", potential: "できる", volitional: "しよう", imperative: "しろ", passive: "される", causative: "させる" },
    forms_romaji: { present: "suru", present_polite: "shimasu", past: "shita", past_polite: "shimashita", negative: "shinai", negative_polite: "shimasen", te_form: "shite", potential: "dekiru", volitional: "shiyou" },
    example_sentence: "勉強をします。", example_sentence_en: "I study."
  },
  {
    dictionary: "見る", romaji: "miru", hiragana: "みる", meaning_en: "to see / look",
    meaning_fr: "voir", meaning_es: "ver", group: "ichidan", level: "N5",
    forms: { present: "見る", present_polite: "見ます", past: "見た", past_polite: "見ました", negative: "見ない", negative_polite: "見ません", te_form: "見て", potential: "見られる", volitional: "見よう", imperative: "見ろ", passive: "見られる", causative: "見させる" },
    forms_romaji: { present: "miru", present_polite: "mimasu", past: "mita", past_polite: "mimashita", negative: "minai", negative_polite: "mimasen", te_form: "mite", potential: "mirareru", volitional: "miyou" },
    example_sentence: "映画を見ます。", example_sentence_en: "I watch a movie."
  },
  {
    dictionary: "書く", romaji: "kaku", hiragana: "かく", meaning_en: "to write",
    meaning_fr: "écrire", meaning_es: "escribir", group: "godan", level: "N5",
    forms: { present: "書く", present_polite: "書きます", past: "書いた", past_polite: "書きました", negative: "書かない", negative_polite: "書きません", te_form: "書いて", potential: "書ける", volitional: "書こう", imperative: "書け", passive: "書かれる", causative: "書かせる" },
    forms_romaji: { present: "kaku", present_polite: "kakimasu", past: "kaita", past_polite: "kakimashita", negative: "kakanai", negative_polite: "kakimasen", te_form: "kaite", potential: "kakeru", volitional: "kakou" },
    example_sentence: "手紙を書きます。", example_sentence_en: "I write a letter."
  },
  {
    dictionary: "読む", romaji: "yomu", hiragana: "よむ", meaning_en: "to read",
    meaning_fr: "lire", meaning_es: "leer", group: "godan", level: "N5",
    forms: { present: "読む", present_polite: "読みます", past: "読んだ", past_polite: "読みました", negative: "読まない", negative_polite: "読みません", te_form: "読んで", potential: "読める", volitional: "読もう", imperative: "読め", passive: "読まれる", causative: "読ませる" },
    forms_romaji: { present: "yomu", present_polite: "yomimasu", past: "yonda", past_polite: "yomimashita", negative: "yomanai", negative_polite: "yomimasen", te_form: "yonde", potential: "yomeru", volitional: "yomou" },
    example_sentence: "本を読みます。", example_sentence_en: "I read a book."
  },
  {
    dictionary: "話す", romaji: "hanasu", hiragana: "はなす", meaning_en: "to speak / talk",
    meaning_fr: "parler", meaning_es: "hablar", group: "godan", level: "N5",
    forms: { present: "話す", present_polite: "話します", past: "話した", past_polite: "話しました", negative: "話さない", negative_polite: "話しません", te_form: "話して", potential: "話せる", volitional: "話そう", imperative: "話せ", passive: "話される", causative: "話させる" },
    forms_romaji: { present: "hanasu", present_polite: "hanashimasu", past: "hanashita", past_polite: "hanashimashita", negative: "hanasanai", negative_polite: "hanashimasen", te_form: "hanashite", potential: "hanaseru", volitional: "hanasou" },
    example_sentence: "日本語を話します。", example_sentence_en: "I speak Japanese."
  },
  {
    dictionary: "聞く", romaji: "kiku", hiragana: "きく", meaning_en: "to listen / ask",
    meaning_fr: "écouter / demander", meaning_es: "escuchar / preguntar", group: "godan", level: "N5",
    forms: { present: "聞く", present_polite: "聞きます", past: "聞いた", past_polite: "聞きました", negative: "聞かない", negative_polite: "聞きません", te_form: "聞いて", potential: "聞ける", volitional: "聞こう", imperative: "聞け", passive: "聞かれる", causative: "聞かせる" },
    forms_romaji: { present: "kiku", present_polite: "kikimasu", past: "kiita", past_polite: "kikimashita", negative: "kikanai", negative_polite: "kikimasen", te_form: "kiite", potential: "kikeru", volitional: "kikou" },
    example_sentence: "音楽を聞きます。", example_sentence_en: "I listen to music."
  },
  {
    dictionary: "買う", romaji: "kau", hiragana: "かう", meaning_en: "to buy",
    meaning_fr: "acheter", meaning_es: "comprar", group: "godan", level: "N5",
    forms: { present: "買う", present_polite: "買います", past: "買った", past_polite: "買いました", negative: "買わない", negative_polite: "買いません", te_form: "買って", potential: "買える", volitional: "買おう", imperative: "買え", passive: "買われる", causative: "買わせる" },
    forms_romaji: { present: "kau", present_polite: "kaimasu", past: "katta", past_polite: "kaimashita", negative: "kawanai", negative_polite: "kaimasen", te_form: "katte", potential: "kaeru", volitional: "kaou" },
    example_sentence: "スーパーで買い物をします。", example_sentence_en: "I shop at the supermarket."
  },
  {
    dictionary: "寝る", romaji: "neru", hiragana: "ねる", meaning_en: "to sleep",
    meaning_fr: "dormir", meaning_es: "dormir", group: "ichidan", level: "N5",
    forms: { present: "寝る", present_polite: "寝ます", past: "寝た", past_polite: "寝ました", negative: "寝ない", negative_polite: "寝ません", te_form: "寝て", potential: "寝られる", volitional: "寝よう", imperative: "寝ろ", passive: "寝られる", causative: "寝させる" },
    forms_romaji: { present: "neru", present_polite: "nemasu", past: "neta", past_polite: "nemashita", negative: "nenai", negative_polite: "nemasen", te_form: "nete", potential: "nerareru", volitional: "neyou" },
    example_sentence: "早く寝ます。", example_sentence_en: "I go to bed early."
  },
];

export const initialGrammar = [
  {
    pattern: "〜ます", meaning_en: "Polite present/future tense", level: "N5", category: "verb_forms",
    explanation_en: "The ます form is the polite way to conjugate verbs in Japanese. It's used in formal or polite conversation.",
    examples: [
      { sentence: "毎日学校に行きます。", romaji: "Mainichi gakkou ni ikimasu.", translation: "I go to school every day." },
      { sentence: "日本語を勉強します。", romaji: "Nihongo wo benkyou shimasu.", translation: "I study Japanese." },
    ]
  },
  {
    pattern: "〜ました", meaning_en: "Polite past tense", level: "N5", category: "verb_forms",
    explanation_en: "The ました form is used to express past actions in polite speech.",
    examples: [
      { sentence: "昨日映画を見ました。", romaji: "Kinou eiga wo mimashita.", translation: "I watched a movie yesterday." },
    ]
  },
  {
    pattern: "〜て", meaning_en: "Te-form (connecting actions)", level: "N5", category: "verb_forms",
    explanation_en: "The te-form connects multiple verbs, makes requests, and forms progressive tense. It's one of the most important forms in Japanese.",
    examples: [
      { sentence: "手を洗って、ご飯を食べます。", romaji: "Te wo aratte, gohan wo tabemasu.", translation: "I wash my hands and eat." },
      { sentence: "本を読んでいます。", romaji: "Hon wo yondeimasu.", translation: "I am reading a book." },
    ]
  },
  {
    pattern: "〜ない", meaning_en: "Negative form (plain)", level: "N5", category: "verb_forms",
    explanation_en: "The nai-form expresses negation in casual speech. Change the verb ending according to its group.",
    examples: [
      { sentence: "今日は学校に行かない。", romaji: "Kyou wa gakkou ni ikanai.", translation: "I won't go to school today." },
    ]
  },
  {
    pattern: "〜たい", meaning_en: "Want to (do)", level: "N5", category: "expressions",
    explanation_en: "Attach たい to the masu-stem of a verb to express desire to perform an action.",
    examples: [
      { sentence: "日本に行きたいです。", romaji: "Nihon ni ikitai desu.", translation: "I want to go to Japan." },
      { sentence: "寿司が食べたい。", romaji: "Sushi ga tabetai.", translation: "I want to eat sushi." },
    ]
  },
  {
    pattern: "〜てください", meaning_en: "Please (do)", level: "N5", category: "expressions",
    explanation_en: "Use te-form + ください to make a polite request.",
    examples: [
      { sentence: "ここに名前を書いてください。", romaji: "Koko ni namae wo kaite kudasai.", translation: "Please write your name here." },
    ]
  },
];