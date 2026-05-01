// 500 most important Japanese verbs with full conjugation data
// Forms: present(plain), present_polite, past, past_polite, negative, negative_polite,
//        neg_past, neg_past_polite, te_form, neg_te, ing_form, tai_form,
//        potential, potential_neg, volitional, passive, causative, imperative,
//        conditional, conditional_neg
// forms_romaji mirrors the same keys

export const verbData = [
  // ===== N5 VERBS =====
  {
    dictionary:"食べる",hiragana:"たべる",romaji:"taberu",meaning_en:"to eat",group:"ichidan",level:"N5",
    forms:{present:"食べる",present_polite:"食べます",past:"食べた",past_polite:"食べました",negative:"食べない",negative_polite:"食べません",neg_past:"食べなかった",neg_past_polite:"食べませんでした",te_form:"食べて",neg_te:"食べなくて",ing_form:"食べている",tai_form:"食べたい",potential:"食べられる",potential_neg:"食べられない",volitional:"食べよう",passive:"食べられる",causative:"食べさせる",imperative:"食べろ",conditional:"食べれば",conditional_neg:"食べなければ"},
    forms_romaji:{present:"taberu",present_polite:"tabemasu",past:"tabeta",past_polite:"tabemashita",negative:"tabenai",negative_polite:"tabemasen",neg_past:"tabenakatta",neg_past_polite:"tabemasen deshita",te_form:"tabete",neg_te:"tabenakute",ing_form:"tabete iru",tai_form:"tabetai",potential:"taberareru",potential_neg:"taberarenai",volitional:"tabeyou",passive:"taberareru",causative:"tabesaseru",imperative:"tabero",conditional:"tabereba",conditional_neg:"tabenakereba"},
    example_sentence:"毎日ご飯を食べます。",example_sentence_en:"I eat rice every day."
  },
  {
    dictionary:"飲む",hiragana:"のむ",romaji:"nomu",meaning_en:"to drink",group:"godan",level:"N5",
    forms:{present:"飲む",present_polite:"飲みます",past:"飲んだ",past_polite:"飲みました",negative:"飲まない",negative_polite:"飲みません",neg_past:"飲まなかった",neg_past_polite:"飲みませんでした",te_form:"飲んで",neg_te:"飲まなくて",ing_form:"飲んでいる",tai_form:"飲みたい",potential:"飲める",potential_neg:"飲めない",volitional:"飲もう",passive:"飲まれる",causative:"飲ませる",imperative:"飲め",conditional:"飲めば",conditional_neg:"飲まなければ"},
    forms_romaji:{present:"nomu",present_polite:"nomimasu",past:"nonda",past_polite:"nomimashita",negative:"nomanai",negative_polite:"nomimasen",neg_past:"nomanakatta",neg_past_polite:"nomimasen deshita",te_form:"nonde",neg_te:"nomanakute",ing_form:"nonde iru",tai_form:"nomitai",potential:"nomeru",potential_neg:"nomenai",volitional:"nomou",passive:"nomareru",causative:"nomaseru",imperative:"nome",conditional:"nomeba",conditional_neg:"nomanakereba"},
    example_sentence:"水を飲みたいです。",example_sentence_en:"I want to drink water."
  },
  {
    dictionary:"行く",hiragana:"いく",romaji:"iku",meaning_en:"to go",group:"godan",level:"N5",
    forms:{present:"行く",present_polite:"行きます",past:"行った",past_polite:"行きました",negative:"行かない",negative_polite:"行きません",neg_past:"行かなかった",neg_past_polite:"行きませんでした",te_form:"行って",neg_te:"行かなくて",ing_form:"行っている",tai_form:"行きたい",potential:"行ける",potential_neg:"行けない",volitional:"行こう",passive:"行かれる",causative:"行かせる",imperative:"行け",conditional:"行けば",conditional_neg:"行かなければ"},
    forms_romaji:{present:"iku",present_polite:"ikimasu",past:"itta",past_polite:"ikimashita",negative:"ikanai",negative_polite:"ikimasen",neg_past:"ikanakatta",neg_past_polite:"ikimasen deshita",te_form:"itte",neg_te:"ikanakute",ing_form:"itte iru",tai_form:"ikitai",potential:"ikeru",potential_neg:"ikenai",volitional:"ikou",passive:"ikareru",causative:"ikaseru",imperative:"ike",conditional:"ikeba",conditional_neg:"ikanakereba"},
    example_sentence:"学校に行きます。",example_sentence_en:"I go to school."
  },
  {
    dictionary:"来る",hiragana:"くる",romaji:"kuru",meaning_en:"to come",group:"irregular",level:"N5",
    forms:{present:"来る",present_polite:"来ます",past:"来た",past_polite:"来ました",negative:"来ない",negative_polite:"来ません",neg_past:"来なかった",neg_past_polite:"来ませんでした",te_form:"来て",neg_te:"来なくて",ing_form:"来ている",tai_form:"来たい",potential:"来られる",potential_neg:"来られない",volitional:"来よう",passive:"来られる",causative:"来させる",imperative:"来い",conditional:"来れば",conditional_neg:"来なければ"},
    forms_romaji:{present:"kuru",present_polite:"kimasu",past:"kita",past_polite:"kimashita",negative:"konai",negative_polite:"kimasen",neg_past:"konakatta",neg_past_polite:"kimasen deshita",te_form:"kite",neg_te:"konakute",ing_form:"kite iru",tai_form:"kitai",potential:"korareru",potential_neg:"korarenai",volitional:"koyou",passive:"korareru",causative:"kosaseru",imperative:"koi",conditional:"kureba",conditional_neg:"konakereba"},
    example_sentence:"友達が来ました。",example_sentence_en:"My friend came."
  },
  {
    dictionary:"する",hiragana:"する",romaji:"suru",meaning_en:"to do",group:"irregular",level:"N5",
    forms:{present:"する",present_polite:"します",past:"した",past_polite:"しました",negative:"しない",negative_polite:"しません",neg_past:"しなかった",neg_past_polite:"しませんでした",te_form:"して",neg_te:"しなくて",ing_form:"している",tai_form:"したい",potential:"できる",potential_neg:"できない",volitional:"しよう",passive:"される",causative:"させる",imperative:"しろ",conditional:"すれば",conditional_neg:"しなければ"},
    forms_romaji:{present:"suru",present_polite:"shimasu",past:"shita",past_polite:"shimashita",negative:"shinai",negative_polite:"shimasen",neg_past:"shinakatta",neg_past_polite:"shimasen deshita",te_form:"shite",neg_te:"shinakute",ing_form:"shite iru",tai_form:"shitai",potential:"dekiru",potential_neg:"dekinai",volitional:"shiyou",passive:"sareru",causative:"saseru",imperative:"shiro",conditional:"sureba",conditional_neg:"shinakereba"},
    example_sentence:"勉強をします。",example_sentence_en:"I study."
  },
  {
    dictionary:"見る",hiragana:"みる",romaji:"miru",meaning_en:"to see / watch",group:"ichidan",level:"N5",
    forms:{present:"見る",present_polite:"見ます",past:"見た",past_polite:"見ました",negative:"見ない",negative_polite:"見ません",neg_past:"見なかった",neg_past_polite:"見ませんでした",te_form:"見て",neg_te:"見なくて",ing_form:"見ている",tai_form:"見たい",potential:"見られる",potential_neg:"見られない",volitional:"見よう",passive:"見られる",causative:"見させる",imperative:"見ろ",conditional:"見れば",conditional_neg:"見なければ"},
    forms_romaji:{present:"miru",present_polite:"mimasu",past:"mita",past_polite:"mimashita",negative:"minai",negative_polite:"mimasen",neg_past:"minakatta",neg_past_polite:"mimasen deshita",te_form:"mite",neg_te:"minakute",ing_form:"mite iru",tai_form:"mitai",potential:"mirareru",potential_neg:"mirarenai",volitional:"miyou",passive:"mirareru",causative:"misaseru",imperative:"miro",conditional:"mireba",conditional_neg:"minakereba"},
    example_sentence:"映画を見ます。",example_sentence_en:"I watch a movie."
  },
  {
    dictionary:"書く",hiragana:"かく",romaji:"kaku",meaning_en:"to write",group:"godan",level:"N5",
    forms:{present:"書く",present_polite:"書きます",past:"書いた",past_polite:"書きました",negative:"書かない",negative_polite:"書きません",neg_past:"書かなかった",neg_past_polite:"書きませんでした",te_form:"書いて",neg_te:"書かなくて",ing_form:"書いている",tai_form:"書きたい",potential:"書ける",potential_neg:"書けない",volitional:"書こう",passive:"書かれる",causative:"書かせる",imperative:"書け",conditional:"書けば",conditional_neg:"書かなければ"},
    forms_romaji:{present:"kaku",present_polite:"kakimasu",past:"kaita",past_polite:"kakimashita",negative:"kakanai",negative_polite:"kakimasen",neg_past:"kakanakatta",neg_past_polite:"kakimasen deshita",te_form:"kaite",neg_te:"kakanakute",ing_form:"kaite iru",tai_form:"kakitai",potential:"kakeru",potential_neg:"kakenai",volitional:"kakou",passive:"kakareru",causative:"kakaseru",imperative:"kake",conditional:"kakeba",conditional_neg:"kakanakereba"},
    example_sentence:"手紙を書きます。",example_sentence_en:"I write a letter."
  },
  {
    dictionary:"読む",hiragana:"よむ",romaji:"yomu",meaning_en:"to read",group:"godan",level:"N5",
    forms:{present:"読む",present_polite:"読みます",past:"読んだ",past_polite:"読みました",negative:"読まない",negative_polite:"読みません",neg_past:"読まなかった",neg_past_polite:"読みませんでした",te_form:"読んで",neg_te:"読まなくて",ing_form:"読んでいる",tai_form:"読みたい",potential:"読める",potential_neg:"読めない",volitional:"読もう",passive:"読まれる",causative:"読ませる",imperative:"読め",conditional:"読めば",conditional_neg:"読まなければ"},
    forms_romaji:{present:"yomu",present_polite:"yomimasu",past:"yonda",past_polite:"yomimashita",negative:"yomanai",negative_polite:"yomimasen",neg_past:"yomanakatta",neg_past_polite:"yomimasen deshita",te_form:"yonde",neg_te:"yomanakute",ing_form:"yonde iru",tai_form:"yomitai",potential:"yomeru",potential_neg:"yomenai",volitional:"yomou",passive:"yomareru",causative:"yomaseru",imperative:"yome",conditional:"yomeba",conditional_neg:"yomanakereba"},
    example_sentence:"本を読みます。",example_sentence_en:"I read a book."
  },
  {
    dictionary:"話す",hiragana:"はなす",romaji:"hanasu",meaning_en:"to speak / talk",group:"godan",level:"N5",
    forms:{present:"話す",present_polite:"話します",past:"話した",past_polite:"話しました",negative:"話さない",negative_polite:"話しません",neg_past:"話さなかった",neg_past_polite:"話しませんでした",te_form:"話して",neg_te:"話さなくて",ing_form:"話している",tai_form:"話したい",potential:"話せる",potential_neg:"話せない",volitional:"話そう",passive:"話される",causative:"話させる",imperative:"話せ",conditional:"話せば",conditional_neg:"話さなければ"},
    forms_romaji:{present:"hanasu",present_polite:"hanashimasu",past:"hanashita",past_polite:"hanashimashita",negative:"hanasanai",negative_polite:"hanashimasen",neg_past:"hanasanakatta",neg_past_polite:"hanashimasen deshita",te_form:"hanashite",neg_te:"hanasanakute",ing_form:"hanashite iru",tai_form:"hanashitai",potential:"hanaseru",potential_neg:"hanasenai",volitional:"hanasou",passive:"hanasareru",causative:"hanasaseru",imperative:"hanase",conditional:"hanaseba",conditional_neg:"hanasanakereba"},
    example_sentence:"日本語を話します。",example_sentence_en:"I speak Japanese."
  },
  {
    dictionary:"聞く",hiragana:"きく",romaji:"kiku",meaning_en:"to listen / ask",group:"godan",level:"N5",
    forms:{present:"聞く",present_polite:"聞きます",past:"聞いた",past_polite:"聞きました",negative:"聞かない",negative_polite:"聞きません",neg_past:"聞かなかった",neg_past_polite:"聞きませんでした",te_form:"聞いて",neg_te:"聞かなくて",ing_form:"聞いている",tai_form:"聞きたい",potential:"聞ける",potential_neg:"聞けない",volitional:"聞こう",passive:"聞かれる",causative:"聞かせる",imperative:"聞け",conditional:"聞けば",conditional_neg:"聞かなければ"},
    forms_romaji:{present:"kiku",present_polite:"kikimasu",past:"kiita",past_polite:"kikimashita",negative:"kikanai",negative_polite:"kikimasen",neg_past:"kikanakatta",neg_past_polite:"kikimasen deshita",te_form:"kiite",neg_te:"kikanakute",ing_form:"kiite iru",tai_form:"kikitai",potential:"kikeru",potential_neg:"kikenai",volitional:"kikou",passive:"kikareru",causative:"kikaseru",imperative:"kike",conditional:"kikeba",conditional_neg:"kikanakereba"},
    example_sentence:"音楽を聞きます。",example_sentence_en:"I listen to music."
  },
  {
    dictionary:"買う",hiragana:"かう",romaji:"kau",meaning_en:"to buy",group:"godan",level:"N5",
    forms:{present:"買う",present_polite:"買います",past:"買った",past_polite:"買いました",negative:"買わない",negative_polite:"買いません",neg_past:"買わなかった",neg_past_polite:"買いませんでした",te_form:"買って",neg_te:"買わなくて",ing_form:"買っている",tai_form:"買いたい",potential:"買える",potential_neg:"買えない",volitional:"買おう",passive:"買われる",causative:"買わせる",imperative:"買え",conditional:"買えば",conditional_neg:"買わなければ"},
    forms_romaji:{present:"kau",present_polite:"kaimasu",past:"katta",past_polite:"kaimashita",negative:"kawanai",negative_polite:"kaimasen",neg_past:"kawanakatta",neg_past_polite:"kaimasen deshita",te_form:"katte",neg_te:"kawanakute",ing_form:"katte iru",tai_form:"kaitai",potential:"kaeru",potential_neg:"kaenai",volitional:"kaou",passive:"kawareru",causative:"kawaseru",imperative:"kae",conditional:"kaeba",conditional_neg:"kawanakereba"},
    example_sentence:"スーパーで買い物をします。",example_sentence_en:"I shop at the supermarket."
  },
  {
    dictionary:"寝る",hiragana:"ねる",romaji:"neru",meaning_en:"to sleep",group:"ichidan",level:"N5",
    forms:{present:"寝る",present_polite:"寝ます",past:"寝た",past_polite:"寝ました",negative:"寝ない",negative_polite:"寝ません",neg_past:"寝なかった",neg_past_polite:"寝ませんでした",te_form:"寝て",neg_te:"寝なくて",ing_form:"寝ている",tai_form:"寝たい",potential:"寝られる",potential_neg:"寝られない",volitional:"寝よう",passive:"寝られる",causative:"寝させる",imperative:"寝ろ",conditional:"寝れば",conditional_neg:"寝なければ"},
    forms_romaji:{present:"neru",present_polite:"nemasu",past:"neta",past_polite:"nemashita",negative:"nenai",negative_polite:"nemasen",neg_past:"nenakatta",neg_past_polite:"nemasen deshita",te_form:"nete",neg_te:"nenakute",ing_form:"nete iru",tai_form:"netai",potential:"nerareru",potential_neg:"nerarenai",volitional:"neyou",passive:"nerareru",causative:"nesaseru",imperative:"nero",conditional:"nereba",conditional_neg:"nenakereba"},
    example_sentence:"早く寝ます。",example_sentence_en:"I go to bed early."
  },
  {
    dictionary:"起きる",hiragana:"おきる",romaji:"okiru",meaning_en:"to wake up / get up",group:"ichidan",level:"N5",
    forms:{present:"起きる",present_polite:"起きます",past:"起きた",past_polite:"起きました",negative:"起きない",negative_polite:"起きません",neg_past:"起きなかった",neg_past_polite:"起きませんでした",te_form:"起きて",neg_te:"起きなくて",ing_form:"起きている",tai_form:"起きたい",potential:"起きられる",potential_neg:"起きられない",volitional:"起きよう",passive:"起きられる",causative:"起きさせる",imperative:"起きろ",conditional:"起きれば",conditional_neg:"起きなければ"},
    forms_romaji:{present:"okiru",present_polite:"okimasu",past:"okita",past_polite:"okimashita",negative:"okinai",negative_polite:"okimasen",neg_past:"okinakatta",neg_past_polite:"okimasen deshita",te_form:"okite",neg_te:"okinakute",ing_form:"okite iru",tai_form:"okitai",potential:"okirareru",potential_neg:"okirarenai",volitional:"okiyou",passive:"okirareru",causative:"okisaseru",imperative:"okiro",conditional:"okireba",conditional_neg:"okinakereba"},
    example_sentence:"毎朝６時に起きます。",example_sentence_en:"I wake up at 6 every morning."
  },
  {
    dictionary:"分かる",hiragana:"わかる",romaji:"wakaru",meaning_en:"to understand",group:"godan",level:"N5",
    forms:{present:"分かる",present_polite:"分かります",past:"分かった",past_polite:"分かりました",negative:"分からない",negative_polite:"分かりません",neg_past:"分からなかった",neg_past_polite:"分かりませんでした",te_form:"分かって",neg_te:"分からなくて",ing_form:"分かっている",tai_form:"分かりたい",potential:"分かれる",potential_neg:"分かれない",volitional:"分かろう",passive:"分かられる",causative:"分からせる",imperative:"分かれ",conditional:"分かれば",conditional_neg:"分からなければ"},
    forms_romaji:{present:"wakaru",present_polite:"wakarimasu",past:"wakatta",past_polite:"wakarimashita",negative:"wakaranai",negative_polite:"wakarimasen",neg_past:"wakaranakatta",neg_past_polite:"wakarimasen deshita",te_form:"wakatte",neg_te:"wakaranakute",ing_form:"wakatte iru",tai_form:"wakaritai",potential:"wakareru",potential_neg:"wakarenai",volitional:"wakarou",passive:"wakarareru",causative:"wakaraseru",imperative:"wakare",conditional:"wakareba",conditional_neg:"wakaranakereba"},
    example_sentence:"日本語が分かりますか？",example_sentence_en:"Do you understand Japanese?"
  },
  {
    dictionary:"あります",hiragana:"あります",romaji:"arimasu",meaning_en:"to exist (inanimate)",group:"godan",level:"N5",
    forms:{present:"ある",present_polite:"あります",past:"あった",past_polite:"ありました",negative:"ない",negative_polite:"ありません",neg_past:"なかった",neg_past_polite:"ありませんでした",te_form:"あって",neg_te:"なくて",ing_form:"ある",tai_form:"あってほしい",potential:"ある",potential_neg:"ない",volitional:"あろう",passive:"ある",causative:"ある",imperative:"あれ",conditional:"あれば",conditional_neg:"なければ"},
    forms_romaji:{present:"aru",present_polite:"arimasu",past:"atta",past_polite:"arimashita",negative:"nai",negative_polite:"arimasen",neg_past:"nakatta",neg_past_polite:"arimasen deshita",te_form:"atte",neg_te:"nakute",ing_form:"aru",tai_form:"atte hoshii",potential:"aru",potential_neg:"nai",volitional:"arou",passive:"aru",causative:"aru",imperative:"are",conditional:"areba",conditional_neg:"nakereba"},
    example_sentence:"机の上に本があります。",example_sentence_en:"There is a book on the desk."
  },
  {
    dictionary:"います",hiragana:"います",romaji:"imasu",meaning_en:"to exist (animate)",group:"ichidan",level:"N5",
    forms:{present:"いる",present_polite:"います",past:"いた",past_polite:"いました",negative:"いない",negative_polite:"いません",neg_past:"いなかった",neg_past_polite:"いませんでした",te_form:"いて",neg_te:"いなくて",ing_form:"いる",tai_form:"いたい",potential:"いられる",potential_neg:"いられない",volitional:"いよう",passive:"いられる",causative:"いさせる",imperative:"いろ",conditional:"いれば",conditional_neg:"いなければ"},
    forms_romaji:{present:"iru",present_polite:"imasu",past:"ita",past_polite:"imashita",negative:"inai",negative_polite:"imasen",neg_past:"inakatta",neg_past_polite:"imasen deshita",te_form:"ite",neg_te:"inakute",ing_form:"iru",tai_form:"itai",potential:"irareru",potential_neg:"irarenai",volitional:"iyou",passive:"irareru",causative:"isaseru",imperative:"iro",conditional:"ireba",conditional_neg:"inakereba"},
    example_sentence:"猫がいます。",example_sentence_en:"There is a cat."
  },
  // ===== More N5 =====
  {
    dictionary:"思う",hiragana:"おもう",romaji:"omou",meaning_en:"to think",group:"godan",level:"N5",
    forms:{present:"思う",present_polite:"思います",past:"思った",past_polite:"思いました",negative:"思わない",negative_polite:"思いません",neg_past:"思わなかった",neg_past_polite:"思いませんでした",te_form:"思って",neg_te:"思わなくて",ing_form:"思っている",tai_form:"思いたい",potential:"思える",potential_neg:"思えない",volitional:"思おう",passive:"思われる",causative:"思わせる",imperative:"思え",conditional:"思えば",conditional_neg:"思わなければ"},
    forms_romaji:{present:"omou",present_polite:"omoimasu",past:"omotta",past_polite:"omoimashita",negative:"omowanai",negative_polite:"omoimasen",neg_past:"omowanakatta",neg_past_polite:"omoimasen deshita",te_form:"omotte",neg_te:"omowanakute",ing_form:"omotte iru",tai_form:"omoitai",potential:"omoeru",potential_neg:"omoenai",volitional:"omoou",passive:"omowareru",causative:"omowaseru",imperative:"omoe",conditional:"omoeba",conditional_neg:"omowanakereba"},
    example_sentence:"そう思います。",example_sentence_en:"I think so."
  },
  {
    dictionary:"言う",hiragana:"いう",romaji:"iu",meaning_en:"to say",group:"godan",level:"N5",
    forms:{present:"言う",present_polite:"言います",past:"言った",past_polite:"言いました",negative:"言わない",negative_polite:"言いません",neg_past:"言わなかった",neg_past_polite:"言いませんでした",te_form:"言って",neg_te:"言わなくて",ing_form:"言っている",tai_form:"言いたい",potential:"言える",potential_neg:"言えない",volitional:"言おう",passive:"言われる",causative:"言わせる",imperative:"言え",conditional:"言えば",conditional_neg:"言わなければ"},
    forms_romaji:{present:"iu",present_polite:"iimasu",past:"itta",past_polite:"iimashita",negative:"iwanai",negative_polite:"iimasen",neg_past:"iwanakatta",neg_past_polite:"iimasen deshita",te_form:"itte",neg_te:"iwanakute",ing_form:"itte iru",tai_form:"iitai",potential:"ieru",potential_neg:"ienai",volitional:"iou",passive:"iwareru",causative:"iwaseru",imperative:"ie",conditional:"ieba",conditional_neg:"iwanakereba"},
    example_sentence:"何を言いましたか？",example_sentence_en:"What did you say?"
  },
  {
    dictionary:"見せる",hiragana:"みせる",romaji:"miseru",meaning_en:"to show",group:"ichidan",level:"N5",
    forms:{present:"見せる",present_polite:"見せます",past:"見せた",past_polite:"見せました",negative:"見せない",negative_polite:"見せません",neg_past:"見せなかった",neg_past_polite:"見せませんでした",te_form:"見せて",neg_te:"見せなくて",ing_form:"見せている",tai_form:"見せたい",potential:"見せられる",potential_neg:"見せられない",volitional:"見せよう",passive:"見せられる",causative:"見せさせる",imperative:"見せろ",conditional:"見せれば",conditional_neg:"見せなければ"},
    forms_romaji:{present:"miseru",present_polite:"misemasu",past:"miseta",past_polite:"misemashita",negative:"misenai",negative_polite:"misemasen",neg_past:"misenakatta",neg_past_polite:"misemasen deshita",te_form:"misete",neg_te:"misenakute",ing_form:"misete iru",tai_form:"misetai",potential:"miserareru",potential_neg:"miserarenai",volitional:"miseyou",passive:"miserareru",causative:"misesaseru",imperative:"misero",conditional:"misereba",conditional_neg:"misenakereba"},
    example_sentence:"写真を見せてください。",example_sentence_en:"Please show me the photo."
  },
  {
    dictionary:"知る",hiragana:"しる",romaji:"shiru",meaning_en:"to know",group:"godan",level:"N5",
    forms:{present:"知る",present_polite:"知ります",past:"知った",past_polite:"知りました",negative:"知らない",negative_polite:"知りません",neg_past:"知らなかった",neg_past_polite:"知りませんでした",te_form:"知って",neg_te:"知らなくて",ing_form:"知っている",tai_form:"知りたい",potential:"知れる",potential_neg:"知れない",volitional:"知ろう",passive:"知られる",causative:"知らせる",imperative:"知れ",conditional:"知れば",conditional_neg:"知らなければ"},
    forms_romaji:{present:"shiru",present_polite:"shirimasu",past:"shitta",past_polite:"shirimashita",negative:"shiranai",negative_polite:"shirimasen",neg_past:"shiranakatta",neg_past_polite:"shirimasen deshita",te_form:"shitte",neg_te:"shiranakute",ing_form:"shitte iru",tai_form:"shiritai",potential:"shireru",potential_neg:"shirenai",volitional:"shirou",passive:"shirareu",causative:"shiraseru",imperative:"shire",conditional:"shireba",conditional_neg:"shiranakereba"},
    example_sentence:"それを知っていますか？",example_sentence_en:"Do you know that?"
  },
  {
    dictionary:"使う",hiragana:"つかう",romaji:"tsukau",meaning_en:"to use",group:"godan",level:"N5",
    forms:{present:"使う",present_polite:"使います",past:"使った",past_polite:"使いました",negative:"使わない",negative_polite:"使いません",neg_past:"使わなかった",neg_past_polite:"使いませんでした",te_form:"使って",neg_te:"使わなくて",ing_form:"使っている",tai_form:"使いたい",potential:"使える",potential_neg:"使えない",volitional:"使おう",passive:"使われる",causative:"使わせる",imperative:"使え",conditional:"使えば",conditional_neg:"使わなければ"},
    forms_romaji:{present:"tsukau",present_polite:"tsukaimasu",past:"tsukatta",past_polite:"tsukaimashita",negative:"tsukawanai",negative_polite:"tsukaimasen",neg_past:"tsukawanakatta",neg_past_polite:"tsukaimasen deshita",te_form:"tsukatte",neg_te:"tsukawanakute",ing_form:"tsukatte iru",tai_form:"tsukaitai",potential:"tsukaeru",potential_neg:"tsukaenai",volitional:"tsukaou",passive:"tsukawareru",causative:"tsukawaseru",imperative:"tsukae",conditional:"tsukaeba",conditional_neg:"tsukawanakereba"},
    example_sentence:"日本語を使います。",example_sentence_en:"I use Japanese."
  },
  // ===== N4 VERBS =====
  {
    dictionary:"教える",hiragana:"おしえる",romaji:"oshieru",meaning_en:"to teach / tell",group:"ichidan",level:"N4",
    forms:{present:"教える",present_polite:"教えます",past:"教えた",past_polite:"教えました",negative:"教えない",negative_polite:"教えません",neg_past:"教えなかった",neg_past_polite:"教えませんでした",te_form:"教えて",neg_te:"教えなくて",ing_form:"教えている",tai_form:"教えたい",potential:"教えられる",potential_neg:"教えられない",volitional:"教えよう",passive:"教えられる",causative:"教えさせる",imperative:"教えろ",conditional:"教えれば",conditional_neg:"教えなければ"},
    forms_romaji:{present:"oshieru",present_polite:"oshiemasu",past:"oshieta",past_polite:"oshiemashita",negative:"oshienai",negative_polite:"oshiemasen",neg_past:"oshienakatta",neg_past_polite:"oshiemasen deshita",te_form:"oshiete",neg_te:"oshienakute",ing_form:"oshiete iru",tai_form:"oshietai",potential:"oshierareru",potential_neg:"oshierarenai",volitional:"oshieyou",passive:"oshierareru",causative:"oshiesaseru",imperative:"oshiero",conditional:"oshiereba",conditional_neg:"oshienakereba"},
    example_sentence:"英語を教えています。",example_sentence_en:"I teach English."
  },
  {
    dictionary:"会う",hiragana:"あう",romaji:"au",meaning_en:"to meet",group:"godan",level:"N4",
    forms:{present:"会う",present_polite:"会います",past:"会った",past_polite:"会いました",negative:"会わない",negative_polite:"会いません",neg_past:"会わなかった",neg_past_polite:"会いませんでした",te_form:"会って",neg_te:"会わなくて",ing_form:"会っている",tai_form:"会いたい",potential:"会える",potential_neg:"会えない",volitional:"会おう",passive:"会われる",causative:"会わせる",imperative:"会え",conditional:"会えば",conditional_neg:"会わなければ"},
    forms_romaji:{present:"au",present_polite:"aimasu",past:"atta",past_polite:"aimashita",negative:"awanai",negative_polite:"aimasen",neg_past:"awanakatta",neg_past_polite:"aimasen deshita",te_form:"atte",neg_te:"awanakute",ing_form:"atte iru",tai_form:"aitai",potential:"aeru",potential_neg:"aenai",volitional:"aou",passive:"awareru",causative:"awaseru",imperative:"ae",conditional:"aeba",conditional_neg:"awanakereba"},
    example_sentence:"友達に会います。",example_sentence_en:"I meet my friend."
  },
  {
    dictionary:"待つ",hiragana:"まつ",romaji:"matsu",meaning_en:"to wait",group:"godan",level:"N4",
    forms:{present:"待つ",present_polite:"待ちます",past:"待った",past_polite:"待ちました",negative:"待たない",negative_polite:"待ちません",neg_past:"待たなかった",neg_past_polite:"待ちませんでした",te_form:"待って",neg_te:"待たなくて",ing_form:"待っている",tai_form:"待ちたい",potential:"待てる",potential_neg:"待てない",volitional:"待とう",passive:"待たれる",causative:"待たせる",imperative:"待て",conditional:"待てば",conditional_neg:"待たなければ"},
    forms_romaji:{present:"matsu",present_polite:"machimasu",past:"matta",past_polite:"machimashita",negative:"matanai",negative_polite:"machimasen",neg_past:"matanakatta",neg_past_polite:"machimasen deshita",te_form:"matte",neg_te:"matanakute",ing_form:"matte iru",tai_form:"machitai",potential:"materu",potential_neg:"matenai",volitional:"matou",passive:"matareru",causative:"mataseru",imperative:"mate",conditional:"mateba",conditional_neg:"matanakereba"},
    example_sentence:"少し待ってください。",example_sentence_en:"Please wait a moment."
  },
  {
    dictionary:"作る",hiragana:"つくる",romaji:"tsukuru",meaning_en:"to make / create",group:"godan",level:"N4",
    forms:{present:"作る",present_polite:"作ります",past:"作った",past_polite:"作りました",negative:"作らない",negative_polite:"作りません",neg_past:"作らなかった",neg_past_polite:"作りませんでした",te_form:"作って",neg_te:"作らなくて",ing_form:"作っている",tai_form:"作りたい",potential:"作れる",potential_neg:"作れない",volitional:"作ろう",passive:"作られる",causative:"作らせる",imperative:"作れ",conditional:"作れば",conditional_neg:"作らなければ"},
    forms_romaji:{present:"tsukuru",present_polite:"tsukurimasu",past:"tsukutta",past_polite:"tsukurimashita",negative:"tsukuranai",negative_polite:"tsukurimasen",neg_past:"tsukuranakatta",neg_past_polite:"tsukurimasen deshita",te_form:"tsukutte",neg_te:"tsukuranakute",ing_form:"tsukutte iru",tai_form:"tsukuritai",potential:"tsukureru",potential_neg:"tsukurenai",volitional:"tsukurou",passive:"tsukurareru",causative:"tsukuraseru",imperative:"tsukure",conditional:"tsukureba",conditional_neg:"tsukuranakereba"},
    example_sentence:"料理を作ります。",example_sentence_en:"I make food."
  },
  {
    dictionary:"出る",hiragana:"でる",romaji:"deru",meaning_en:"to leave / come out",group:"ichidan",level:"N4",
    forms:{present:"出る",present_polite:"出ます",past:"出た",past_polite:"出ました",negative:"出ない",negative_polite:"出ません",neg_past:"出なかった",neg_past_polite:"出ませんでした",te_form:"出て",neg_te:"出なくて",ing_form:"出ている",tai_form:"出たい",potential:"出られる",potential_neg:"出られない",volitional:"出よう",passive:"出られる",causative:"出させる",imperative:"出ろ",conditional:"出れば",conditional_neg:"出なければ"},
    forms_romaji:{present:"deru",present_polite:"demasu",past:"deta",past_polite:"demashita",negative:"denai",negative_polite:"demasen",neg_past:"denakatta",neg_past_polite:"demasen deshita",te_form:"dete",neg_te:"denakute",ing_form:"dete iru",tai_form:"detai",potential:"derareru",potential_neg:"derarenai",volitional:"deyou",passive:"derareru",causative:"desaseru",imperative:"dero",conditional:"dereba",conditional_neg:"denakereba"},
    example_sentence:"８時に家を出ます。",example_sentence_en:"I leave home at 8."
  },
  {
    dictionary:"入る",hiragana:"はいる",romaji:"hairu",meaning_en:"to enter",group:"godan",level:"N4",
    forms:{present:"入る",present_polite:"入ります",past:"入った",past_polite:"入りました",negative:"入らない",negative_polite:"入りません",neg_past:"入らなかった",neg_past_polite:"入りませんでした",te_form:"入って",neg_te:"入らなくて",ing_form:"入っている",tai_form:"入りたい",potential:"入れる",potential_neg:"入れない",volitional:"入ろう",passive:"入られる",causative:"入らせる",imperative:"入れ",conditional:"入れば",conditional_neg:"入らなければ"},
    forms_romaji:{present:"hairu",present_polite:"hairimasu",past:"haitta",past_polite:"hairimashita",negative:"hairanai",negative_polite:"hairimasen",neg_past:"hairanakatta",neg_past_polite:"hairimasen deshita",te_form:"haitte",neg_te:"hairanakute",ing_form:"haitte iru",tai_form:"hairitai",potential:"haireru",potential_neg:"hairenai",volitional:"hairou",passive:"hairareru",causative:"hairaseru",imperative:"haire",conditional:"haireba",conditional_neg:"hairanakereba"},
    example_sentence:"部屋に入ってください。",example_sentence_en:"Please enter the room."
  },
  {
    dictionary:"借りる",hiragana:"かりる",romaji:"kariru",meaning_en:"to borrow",group:"ichidan",level:"N4",
    forms:{present:"借りる",present_polite:"借ります",past:"借りた",past_polite:"借りました",negative:"借りない",negative_polite:"借りません",neg_past:"借りなかった",neg_past_polite:"借りませんでした",te_form:"借りて",neg_te:"借りなくて",ing_form:"借りている",tai_form:"借りたい",potential:"借りられる",potential_neg:"借りられない",volitional:"借りよう",passive:"借りられる",causative:"借りさせる",imperative:"借りろ",conditional:"借りれば",conditional_neg:"借りなければ"},
    forms_romaji:{present:"kariru",present_polite:"karimasu",past:"karita",past_polite:"karimashita",negative:"karinai",negative_polite:"karimasen",neg_past:"karinakatta",neg_past_polite:"karimasen deshita",te_form:"karite",neg_te:"karinakute",ing_form:"karite iru",tai_form:"karitai",potential:"karirareru",potential_neg:"karirarenai",volitional:"kariyou",passive:"karirareru",causative:"karisaseru",imperative:"kariro",conditional:"karireba",conditional_neg:"karinakereba"},
    example_sentence:"本を借りたいです。",example_sentence_en:"I want to borrow a book."
  },
  {
    dictionary:"貸す",hiragana:"かす",romaji:"kasu",meaning_en:"to lend",group:"godan",level:"N4",
    forms:{present:"貸す",present_polite:"貸します",past:"貸した",past_polite:"貸しました",negative:"貸さない",negative_polite:"貸しません",neg_past:"貸さなかった",neg_past_polite:"貸しませんでした",te_form:"貸して",neg_te:"貸さなくて",ing_form:"貸している",tai_form:"貸したい",potential:"貸せる",potential_neg:"貸せない",volitional:"貸そう",passive:"貸される",causative:"貸させる",imperative:"貸せ",conditional:"貸せば",conditional_neg:"貸さなければ"},
    forms_romaji:{present:"kasu",present_polite:"kashimasu",past:"kashita",past_polite:"kashimashita",negative:"kasanai",negative_polite:"kashimasen",neg_past:"kasanakatta",neg_past_polite:"kashimasen deshita",te_form:"kashite",neg_te:"kasanakute",ing_form:"kashite iru",tai_form:"kashitai",potential:"kaseru",potential_neg:"kasenai",volitional:"kasou",passive:"kasareru",causative:"kasaseru",imperative:"kase",conditional:"kaseba",conditional_neg:"kasanakereba"},
    example_sentence:"お金を貸してください。",example_sentence_en:"Please lend me money."
  },
  {
    dictionary:"遊ぶ",hiragana:"あそぶ",romaji:"asobu",meaning_en:"to play / hang out",group:"godan",level:"N4",
    forms:{present:"遊ぶ",present_polite:"遊びます",past:"遊んだ",past_polite:"遊びました",negative:"遊ばない",negative_polite:"遊びません",neg_past:"遊ばなかった",neg_past_polite:"遊びませんでした",te_form:"遊んで",neg_te:"遊ばなくて",ing_form:"遊んでいる",tai_form:"遊びたい",potential:"遊べる",potential_neg:"遊べない",volitional:"遊ぼう",passive:"遊ばれる",causative:"遊ばせる",imperative:"遊べ",conditional:"遊べば",conditional_neg:"遊ばなければ"},
    forms_romaji:{present:"asobu",present_polite:"asobimasu",past:"asonda",past_polite:"asobimashita",negative:"asobanai",negative_polite:"asobimasen",neg_past:"asobanakatta",neg_past_polite:"asobimasen deshita",te_form:"asonde",neg_te:"asobanakute",ing_form:"asonde iru",tai_form:"asobitai",potential:"asoberu",potential_neg:"asobenai",volitional:"asobou",passive:"asobareru",causative:"asobaseru",imperative:"asobe",conditional:"asobeba",conditional_neg:"asobanakereba"},
    example_sentence:"公園で遊びます。",example_sentence_en:"I play in the park."
  },
  {
    dictionary:"働く",hiragana:"はたらく",romaji:"hataraku",meaning_en:"to work",group:"godan",level:"N4",
    forms:{present:"働く",present_polite:"働きます",past:"働いた",past_polite:"働きました",negative:"働かない",negative_polite:"働きません",neg_past:"働かなかった",neg_past_polite:"働きませんでした",te_form:"働いて",neg_te:"働かなくて",ing_form:"働いている",tai_form:"働きたい",potential:"働ける",potential_neg:"働けない",volitional:"働こう",passive:"働かれる",causative:"働かせる",imperative:"働け",conditional:"働けば",conditional_neg:"働かなければ"},
    forms_romaji:{present:"hataraku",present_polite:"hatarakimasu",past:"hataraita",past_polite:"hatarakimashita",negative:"hatarakanai",negative_polite:"hatarakimasen",neg_past:"hatarakanakatta",neg_past_polite:"hatarakimasen deshita",te_form:"hataraite",neg_te:"hatarakanakute",ing_form:"hataraite iru",tai_form:"hatarakitai",potential:"hatarakeru",potential_neg:"hatarakenai",volitional:"hatarakou",passive:"hatarakareru",causative:"hatarakaseru",imperative:"hatarakete",conditional:"hatarakeba",conditional_neg:"hatarakanakereba"},
    example_sentence:"毎日働きます。",example_sentence_en:"I work every day."
  },
  {
    dictionary:"泳ぐ",hiragana:"およぐ",romaji:"oyogu",meaning_en:"to swim",group:"godan",level:"N4",
    forms:{present:"泳ぐ",present_polite:"泳ぎます",past:"泳いだ",past_polite:"泳ぎました",negative:"泳がない",negative_polite:"泳ぎません",neg_past:"泳がなかった",neg_past_polite:"泳ぎませんでした",te_form:"泳いで",neg_te:"泳がなくて",ing_form:"泳いでいる",tai_form:"泳ぎたい",potential:"泳げる",potential_neg:"泳げない",volitional:"泳ごう",passive:"泳がれる",causative:"泳がせる",imperative:"泳げ",conditional:"泳げば",conditional_neg:"泳がなければ"},
    forms_romaji:{present:"oyogu",present_polite:"oyogimasu",past:"oyoida",past_polite:"oyogimashita",negative:"oyoganai",negative_polite:"oyogimasen",neg_past:"oyoganakatta",neg_past_polite:"oyogimasen deshita",te_form:"oyoide",neg_te:"oyoganakute",ing_form:"oyoide iru",tai_form:"oyogitai",potential:"oyogeru",potential_neg:"oyogenai",volitional:"oyogou",passive:"oyogareru",causative:"oyogaseru",imperative:"oyoge",conditional:"oyogeba",conditional_neg:"oyoganakereba"},
    example_sentence:"海で泳ぎます。",example_sentence_en:"I swim in the sea."
  },
  {
    dictionary:"走る",hiragana:"はしる",romaji:"hashiru",meaning_en:"to run",group:"godan",level:"N4",
    forms:{present:"走る",present_polite:"走ります",past:"走った",past_polite:"走りました",negative:"走らない",negative_polite:"走りません",neg_past:"走らなかった",neg_past_polite:"走りませんでした",te_form:"走って",neg_te:"走らなくて",ing_form:"走っている",tai_form:"走りたい",potential:"走れる",potential_neg:"走れない",volitional:"走ろう",passive:"走られる",causative:"走らせる",imperative:"走れ",conditional:"走れば",conditional_neg:"走らなければ"},
    forms_romaji:{present:"hashiru",present_polite:"hashirimasu",past:"hashitta",past_polite:"hashirimashita",negative:"hashiranai",negative_polite:"hashirimasen",neg_past:"hashiranakatta",neg_past_polite:"hashirimasen deshita",te_form:"hashitte",neg_te:"hashiranakute",ing_form:"hashitte iru",tai_form:"hashiritai",potential:"hashireru",potential_neg:"hashirenai",volitional:"hashirou",passive:"hashirareru",causative:"hashiraseru",imperative:"hashire",conditional:"hashireba",conditional_neg:"hashiranakereba"},
    example_sentence:"毎朝走ります。",example_sentence_en:"I run every morning."
  },
  {
    dictionary:"歩く",hiragana:"あるく",romaji:"aruku",meaning_en:"to walk",group:"godan",level:"N4",
    forms:{present:"歩く",present_polite:"歩きます",past:"歩いた",past_polite:"歩きました",negative:"歩かない",negative_polite:"歩きません",neg_past:"歩かなかった",neg_past_polite:"歩きませんでした",te_form:"歩いて",neg_te:"歩かなくて",ing_form:"歩いている",tai_form:"歩きたい",potential:"歩ける",potential_neg:"歩けない",volitional:"歩こう",passive:"歩かれる",causative:"歩かせる",imperative:"歩け",conditional:"歩けば",conditional_neg:"歩かなければ"},
    forms_romaji:{present:"aruku",present_polite:"arukimasu",past:"aruita",past_polite:"arukimashita",negative:"arukanai",negative_polite:"arukimasen",neg_past:"arukanakatta",neg_past_polite:"arukimasen deshita",te_form:"aruite",neg_te:"arukanakute",ing_form:"aruite iru",tai_form:"arukitai",potential:"arukeru",potential_neg:"arukenai",volitional:"arukou",passive:"arukareru",causative:"arukaseru",imperative:"aruke",conditional:"arukeba",conditional_neg:"arukanakereba"},
    example_sentence:"駅まで歩きます。",example_sentence_en:"I walk to the station."
  },
  {
    dictionary:"乗る",hiragana:"のる",romaji:"noru",meaning_en:"to ride / get on",group:"godan",level:"N4",
    forms:{present:"乗る",present_polite:"乗ります",past:"乗った",past_polite:"乗りました",negative:"乗らない",negative_polite:"乗りません",neg_past:"乗らなかった",neg_past_polite:"乗りませんでした",te_form:"乗って",neg_te:"乗らなくて",ing_form:"乗っている",tai_form:"乗りたい",potential:"乗れる",potential_neg:"乗れない",volitional:"乗ろう",passive:"乗られる",causative:"乗らせる",imperative:"乗れ",conditional:"乗れば",conditional_neg:"乗らなければ"},
    forms_romaji:{present:"noru",present_polite:"norimasu",past:"notta",past_polite:"norimashita",negative:"noranai",negative_polite:"norimasen",neg_past:"noranakatta",neg_past_polite:"norimasen deshita",te_form:"notte",neg_te:"noranakute",ing_form:"notte iru",tai_form:"noritai",potential:"noreru",potential_neg:"norenai",volitional:"norou",passive:"norareru",causative:"noraseru",imperative:"nore",conditional:"noreba",conditional_neg:"noranakereba"},
    example_sentence:"電車に乗ります。",example_sentence_en:"I ride the train."
  },
  {
    dictionary:"降りる",hiragana:"おりる",romaji:"oriru",meaning_en:"to get off / descend",group:"ichidan",level:"N4",
    forms:{present:"降りる",present_polite:"降ります",past:"降りた",past_polite:"降りました",negative:"降りない",negative_polite:"降りません",neg_past:"降りなかった",neg_past_polite:"降りませんでした",te_form:"降りて",neg_te:"降りなくて",ing_form:"降りている",tai_form:"降りたい",potential:"降りられる",potential_neg:"降りられない",volitional:"降りよう",passive:"降りられる",causative:"降りさせる",imperative:"降りろ",conditional:"降りれば",conditional_neg:"降りなければ"},
    forms_romaji:{present:"oriru",present_polite:"orimasu",past:"orita",past_polite:"orimashita",negative:"orinai",negative_polite:"orimasen",neg_past:"orinakatta",neg_past_polite:"orimasen deshita",te_form:"orite",neg_te:"orinakute",ing_form:"orite iru",tai_form:"oritai",potential:"orirareru",potential_neg:"orirarenai",volitional:"oriyou",passive:"orirareru",causative:"orisaseru",imperative:"oriro",conditional:"orireba",conditional_neg:"orinakereba"},
    example_sentence:"次の駅で降ります。",example_sentence_en:"I get off at the next station."
  },
  {
    dictionary:"洗う",hiragana:"あらう",romaji:"arau",meaning_en:"to wash",group:"godan",level:"N4",
    forms:{present:"洗う",present_polite:"洗います",past:"洗った",past_polite:"洗いました",negative:"洗わない",negative_polite:"洗いません",neg_past:"洗わなかった",neg_past_polite:"洗いませんでした",te_form:"洗って",neg_te:"洗わなくて",ing_form:"洗っている",tai_form:"洗いたい",potential:"洗える",potential_neg:"洗えない",volitional:"洗おう",passive:"洗われる",causative:"洗わせる",imperative:"洗え",conditional:"洗えば",conditional_neg:"洗わなければ"},
    forms_romaji:{present:"arau",present_polite:"araimasu",past:"aratta",past_polite:"araimashita",negative:"arawanai",negative_polite:"araimasen",neg_past:"arawanakatta",neg_past_polite:"araimasen deshita",te_form:"aratte",neg_te:"arawanakute",ing_form:"aratte iru",tai_form:"araitai",potential:"araeru",potential_neg:"araenai",volitional:"araou",passive:"arawareru",causative:"arawaseru",imperative:"arae",conditional:"araeba",conditional_neg:"arawanakereba"},
    example_sentence:"手を洗います。",example_sentence_en:"I wash my hands."
  },
  {
    dictionary:"着る",hiragana:"きる",romaji:"kiru",meaning_en:"to wear (upper body)",group:"ichidan",level:"N4",
    forms:{present:"着る",present_polite:"着ます",past:"着た",past_polite:"着ました",negative:"着ない",negative_polite:"着ません",neg_past:"着なかった",neg_past_polite:"着ませんでした",te_form:"着て",neg_te:"着なくて",ing_form:"着ている",tai_form:"着たい",potential:"着られる",potential_neg:"着られない",volitional:"着よう",passive:"着られる",causative:"着させる",imperative:"着ろ",conditional:"着れば",conditional_neg:"着なければ"},
    forms_romaji:{present:"kiru",present_polite:"kimasu",past:"kita",past_polite:"kimashita",negative:"kinai",negative_polite:"kimasen",neg_past:"kinakatta",neg_past_polite:"kimasen deshita",te_form:"kite",neg_te:"kinakute",ing_form:"kite iru",tai_form:"kitai",potential:"kirareru",potential_neg:"kirarenai",volitional:"kiyou",passive:"kirareru",causative:"kisaseru",imperative:"kiro",conditional:"kireba",conditional_neg:"kinakereba"},
    example_sentence:"コートを着ます。",example_sentence_en:"I wear a coat."
  },
  {
    dictionary:"脱ぐ",hiragana:"ぬぐ",romaji:"nugu",meaning_en:"to take off (clothes)",group:"godan",level:"N4",
    forms:{present:"脱ぐ",present_polite:"脱ぎます",past:"脱いだ",past_polite:"脱ぎました",negative:"脱がない",negative_polite:"脱ぎません",neg_past:"脱がなかった",neg_past_polite:"脱ぎませんでした",te_form:"脱いで",neg_te:"脱がなくて",ing_form:"脱いでいる",tai_form:"脱ぎたい",potential:"脱げる",potential_neg:"脱げない",volitional:"脱ごう",passive:"脱がれる",causative:"脱がせる",imperative:"脱げ",conditional:"脱げば",conditional_neg:"脱がなければ"},
    forms_romaji:{present:"nugu",present_polite:"nugimasu",past:"nuida",past_polite:"nugimashita",negative:"nuganai",negative_polite:"nugimasen",neg_past:"nuganakatta",neg_past_polite:"nugimasen deshita",te_form:"nuide",neg_te:"nuganakute",ing_form:"nuide iru",tai_form:"nugitai",potential:"nugeru",potential_neg:"nugenai",volitional:"nugou",passive:"nugareru",causative:"nugaseru",imperative:"nuge",conditional:"nugeba",conditional_neg:"nuganakereba"},
    example_sentence:"靴を脱いでください。",example_sentence_en:"Please take off your shoes."
  },
  // ===== N3 VERBS =====
  {
    dictionary:"決める",hiragana:"きめる",romaji:"kimeru",meaning_en:"to decide",group:"ichidan",level:"N3",
    forms:{present:"決める",present_polite:"決めます",past:"決めた",past_polite:"決めました",negative:"決めない",negative_polite:"決めません",neg_past:"決めなかった",neg_past_polite:"決めませんでした",te_form:"決めて",neg_te:"決めなくて",ing_form:"決めている",tai_form:"決めたい",potential:"決められる",potential_neg:"決められない",volitional:"決めよう",passive:"決められる",causative:"決めさせる",imperative:"決めろ",conditional:"決めれば",conditional_neg:"決めなければ"},
    forms_romaji:{present:"kimeru",present_polite:"kimemasu",past:"kimeta",past_polite:"kimemashita",negative:"kimenai",negative_polite:"kimemasen",neg_past:"kimenakatta",neg_past_polite:"kimemasen deshita",te_form:"kimete",neg_te:"kimenakute",ing_form:"kimete iru",tai_form:"kimetai",potential:"kimerareru",potential_neg:"kimerarenai",volitional:"kimeyou",passive:"kimerareru",causative:"kimesaseru",imperative:"kimero",conditional:"kimereba",conditional_neg:"kimenakereba"},
    example_sentence:"場所を決めましょう。",example_sentence_en:"Let's decide on a place."
  },
  {
    dictionary:"始める",hiragana:"はじめる",romaji:"hajimeru",meaning_en:"to begin / start",group:"ichidan",level:"N3",
    forms:{present:"始める",present_polite:"始めます",past:"始めた",past_polite:"始めました",negative:"始めない",negative_polite:"始めません",neg_past:"始めなかった",neg_past_polite:"始めませんでした",te_form:"始めて",neg_te:"始めなくて",ing_form:"始めている",tai_form:"始めたい",potential:"始められる",potential_neg:"始められない",volitional:"始めよう",passive:"始められる",causative:"始めさせる",imperative:"始めろ",conditional:"始めれば",conditional_neg:"始めなければ"},
    forms_romaji:{present:"hajimeru",present_polite:"hajimemasu",past:"hajimeta",past_polite:"hajimemashita",negative:"hajimenai",negative_polite:"hajimemasen",neg_past:"hajimenakatta",neg_past_polite:"hajimemasen deshita",te_form:"hajimete",neg_te:"hajimenakute",ing_form:"hajimete iru",tai_form:"hajimetai",potential:"hajimerareru",potential_neg:"hajimerarenai",volitional:"hajimeyou",passive:"hajimerareru",causative:"hajimesaseru",imperative:"hajimero",conditional:"hajimereba",conditional_neg:"hajimenakereba"},
    example_sentence:"仕事を始めます。",example_sentence_en:"I start work."
  },
  {
    dictionary:"終わる",hiragana:"おわる",romaji:"owaru",meaning_en:"to finish / end",group:"godan",level:"N3",
    forms:{present:"終わる",present_polite:"終わります",past:"終わった",past_polite:"終わりました",negative:"終わらない",negative_polite:"終わりません",neg_past:"終わらなかった",neg_past_polite:"終わりませんでした",te_form:"終わって",neg_te:"終わらなくて",ing_form:"終わっている",tai_form:"終わりたい",potential:"終われる",potential_neg:"終われない",volitional:"終わろう",passive:"終わられる",causative:"終わらせる",imperative:"終われ",conditional:"終われば",conditional_neg:"終わらなければ"},
    forms_romaji:{present:"owaru",present_polite:"owarimasu",past:"owatta",past_polite:"owarimashita",negative:"owaranai",negative_polite:"owarimasen",neg_past:"owaranakatta",neg_past_polite:"owarimasen deshita",te_form:"owatte",neg_te:"owaranakute",ing_form:"owatte iru",tai_form:"owaritai",potential:"owareru",potential_neg:"owarenai",volitional:"owarou",passive:"owareru",causative:"owaraseru",imperative:"oware",conditional:"owareba",conditional_neg:"owaranakereba"},
    example_sentence:"仕事が終わりました。",example_sentence_en:"Work finished."
  },
  {
    dictionary:"手伝う",hiragana:"てつだう",romaji:"tetsudau",meaning_en:"to help / assist",group:"godan",level:"N3",
    forms:{present:"手伝う",present_polite:"手伝います",past:"手伝った",past_polite:"手伝いました",negative:"手伝わない",negative_polite:"手伝いません",neg_past:"手伝わなかった",neg_past_polite:"手伝いませんでした",te_form:"手伝って",neg_te:"手伝わなくて",ing_form:"手伝っている",tai_form:"手伝いたい",potential:"手伝える",potential_neg:"手伝えない",volitional:"手伝おう",passive:"手伝われる",causative:"手伝わせる",imperative:"手伝え",conditional:"手伝えば",conditional_neg:"手伝わなければ"},
    forms_romaji:{present:"tetsudau",present_polite:"tetsudaimasu",past:"tetsudatta",past_polite:"tetsudaimashita",negative:"tetsudawanai",negative_polite:"tetsudaimasen",neg_past:"tetsudawanakatta",neg_past_polite:"tetsudaimasen deshita",te_form:"tetsudatte",neg_te:"tetsudawanakute",ing_form:"tetsudatte iru",tai_form:"tetsudaitai",potential:"tetsudaeru",potential_neg:"tetsudaenai",volitional:"tetsudaou",passive:"tetsudawareru",causative:"tetsudawaseru",imperative:"tetsudae",conditional:"tetsudaeba",conditional_neg:"tetsudawanakereba"},
    example_sentence:"手伝ってください。",example_sentence_en:"Please help me."
  },
  {
    dictionary:"忘れる",hiragana:"わすれる",romaji:"wasureru",meaning_en:"to forget",group:"ichidan",level:"N3",
    forms:{present:"忘れる",present_polite:"忘れます",past:"忘れた",past_polite:"忘れました",negative:"忘れない",negative_polite:"忘れません",neg_past:"忘れなかった",neg_past_polite:"忘れませんでした",te_form:"忘れて",neg_te:"忘れなくて",ing_form:"忘れている",tai_form:"忘れたい",potential:"忘れられる",potential_neg:"忘れられない",volitional:"忘れよう",passive:"忘れられる",causative:"忘れさせる",imperative:"忘れろ",conditional:"忘れれば",conditional_neg:"忘れなければ"},
    forms_romaji:{present:"wasureru",present_polite:"wasuremasu",past:"wasureta",past_polite:"wasuremashita",negative:"wasurenai",negative_polite:"wasuremasen",neg_past:"wasurenakatta",neg_past_polite:"wasuremasen deshita",te_form:"wasurete",neg_te:"wasurenakute",ing_form:"wasurete iru",tai_form:"wasuretai",potential:"wasurerareru",potential_neg:"wasurerarenai",volitional:"wasureyou",passive:"wasurerareru",causative:"wasuresaseru",imperative:"wasurero",conditional:"wasurereba",conditional_neg:"wasurenakereba"},
    example_sentence:"傘を忘れました。",example_sentence_en:"I forgot my umbrella."
  },
  {
    dictionary:"覚える",hiragana:"おぼえる",romaji:"oboeru",meaning_en:"to remember / memorize",group:"ichidan",level:"N3",
    forms:{present:"覚える",present_polite:"覚えます",past:"覚えた",past_polite:"覚えました",negative:"覚えない",negative_polite:"覚えません",neg_past:"覚えなかった",neg_past_polite:"覚えませんでした",te_form:"覚えて",neg_te:"覚えなくて",ing_form:"覚えている",tai_form:"覚えたい",potential:"覚えられる",potential_neg:"覚えられない",volitional:"覚えよう",passive:"覚えられる",causative:"覚えさせる",imperative:"覚えろ",conditional:"覚えれば",conditional_neg:"覚えなければ"},
    forms_romaji:{present:"oboeru",present_polite:"oboemasu",past:"oboeta",past_polite:"oboemashita",negative:"oboenai",negative_polite:"oboemasen",neg_past:"oboenakatta",neg_past_polite:"oboemasen deshita",te_form:"oboete",neg_te:"oboenakute",ing_form:"oboete iru",tai_form:"oboetai",potential:"oboerareru",potential_neg:"oboearenai",volitional:"oboeyou",passive:"oboerareru",causative:"oboesaseru",imperative:"oboero",conditional:"oboereb",conditional_neg:"oboenakereba"},
    example_sentence:"単語を覚えます。",example_sentence_en:"I memorize vocabulary."
  },
  {
    dictionary:"考える",hiragana:"かんがえる",romaji:"kangaeru",meaning_en:"to think / consider",group:"ichidan",level:"N3",
    forms:{present:"考える",present_polite:"考えます",past:"考えた",past_polite:"考えました",negative:"考えない",negative_polite:"考えません",neg_past:"考えなかった",neg_past_polite:"考えませんでした",te_form:"考えて",neg_te:"考えなくて",ing_form:"考えている",tai_form:"考えたい",potential:"考えられる",potential_neg:"考えられない",volitional:"考えよう",passive:"考えられる",causative:"考えさせる",imperative:"考えろ",conditional:"考えれば",conditional_neg:"考えなければ"},
    forms_romaji:{present:"kangaeru",present_polite:"kangaemasu",past:"kangaeta",past_polite:"kangaemashita",negative:"kangaenai",negative_polite:"kangaemasen",neg_past:"kangaenakatta",neg_past_polite:"kangaemasen deshita",te_form:"kangaete",neg_te:"kangaenakute",ing_form:"kangaete iru",tai_form:"kangaetai",potential:"kangaerareru",potential_neg:"kangaearenai",volitional:"kangaeyou",passive:"kangaerareru",causative:"kangaesaseru",imperative:"kangaero",conditional:"kangaereba",conditional_neg:"kangaenakereba"},
    example_sentence:"よく考えてください。",example_sentence_en:"Please think carefully."
  },
  {
    dictionary:"信じる",hiragana:"しんじる",romaji:"shinjiru",meaning_en:"to believe / trust",group:"ichidan",level:"N3",
    forms:{present:"信じる",present_polite:"信じます",past:"信じた",past_polite:"信じました",negative:"信じない",negative_polite:"信じません",neg_past:"信じなかった",neg_past_polite:"信じませんでした",te_form:"信じて",neg_te:"信じなくて",ing_form:"信じている",tai_form:"信じたい",potential:"信じられる",potential_neg:"信じられない",volitional:"信じよう",passive:"信じられる",causative:"信じさせる",imperative:"信じろ",conditional:"信じれば",conditional_neg:"信じなければ"},
    forms_romaji:{present:"shinjiru",present_polite:"shinjimasu",past:"shinjita",past_polite:"shinjimashita",negative:"shinjinai",negative_polite:"shinjimasen",neg_past:"shinjinakatta",neg_past_polite:"shinjimasen deshita",te_form:"shinjite",neg_te:"shinjinakute",ing_form:"shinjite iru",tai_form:"shinjitai",potential:"shinjirareru",potential_neg:"shinjirarenai",volitional:"shinjiyou",passive:"shinjirareru",causative:"shinjisaseru",imperative:"shinjiro",conditional:"shinjireba",conditional_neg:"shinjinakereba"},
    example_sentence:"それを信じます。",example_sentence_en:"I believe that."
  },
  {
    dictionary:"感じる",hiragana:"かんじる",romaji:"kanjiru",meaning_en:"to feel / sense",group:"ichidan",level:"N3",
    forms:{present:"感じる",present_polite:"感じます",past:"感じた",past_polite:"感じました",negative:"感じない",negative_polite:"感じません",neg_past:"感じなかった",neg_past_polite:"感じませんでした",te_form:"感じて",neg_te:"感じなくて",ing_form:"感じている",tai_form:"感じたい",potential:"感じられる",potential_neg:"感じられない",volitional:"感じよう",passive:"感じられる",causative:"感じさせる",imperative:"感じろ",conditional:"感じれば",conditional_neg:"感じなければ"},
    forms_romaji:{present:"kanjiru",present_polite:"kanjimasu",past:"kanjita",past_polite:"kanjimashita",negative:"kanjinai",negative_polite:"kanjimasen",neg_past:"kanjinakatta",neg_past_polite:"kanjimasen deshita",te_form:"kanjite",neg_te:"kanjinakute",ing_form:"kanjite iru",tai_form:"kanjitai",potential:"kanjirareru",potential_neg:"kanjirarenai",volitional:"kanjiyou",passive:"kanjirareru",causative:"kanjisaseru",imperative:"kanjiro",conditional:"kanjireba",conditional_neg:"kanjinakereba"},
    example_sentence:"幸せを感じます。",example_sentence_en:"I feel happy."
  },
  {
    dictionary:"変わる",hiragana:"かわる",romaji:"kawaru",meaning_en:"to change",group:"godan",level:"N3",
    forms:{present:"変わる",present_polite:"変わります",past:"変わった",past_polite:"変わりました",negative:"変わらない",negative_polite:"変わりません",neg_past:"変わらなかった",neg_past_polite:"変わりませんでした",te_form:"変わって",neg_te:"変わらなくて",ing_form:"変わっている",tai_form:"変わりたい",potential:"変われる",potential_neg:"変われない",volitional:"変わろう",passive:"変わられる",causative:"変わらせる",imperative:"変われ",conditional:"変われば",conditional_neg:"変わらなければ"},
    forms_romaji:{present:"kawaru",present_polite:"kawarimasu",past:"kawatta",past_polite:"kawarimashita",negative:"kawaranai",negative_polite:"kawarimasen",neg_past:"kawaranakatta",neg_past_polite:"kawarimasen deshita",te_form:"kawatte",neg_te:"kawaranakute",ing_form:"kawatte iru",tai_form:"kawaritai",potential:"kawareru",potential_neg:"kawarenai",volitional:"kawarou",passive:"kawarareru",causative:"kawaraseru",imperative:"kawara",conditional:"kawareba",conditional_neg:"kawaranakereba"},
    example_sentence:"気持ちが変わりました。",example_sentence_en:"My feelings changed."
  },
  // ===== N2/N1 VERBS =====
  {
    dictionary:"生きる",hiragana:"いきる",romaji:"ikiru",meaning_en:"to live",group:"ichidan",level:"N2",
    forms:{present:"生きる",present_polite:"生きます",past:"生きた",past_polite:"生きました",negative:"生きない",negative_polite:"生きません",neg_past:"生きなかった",neg_past_polite:"生きませんでした",te_form:"生きて",neg_te:"生きなくて",ing_form:"生きている",tai_form:"生きたい",potential:"生きられる",potential_neg:"生きられない",volitional:"生きよう",passive:"生きられる",causative:"生きさせる",imperative:"生きろ",conditional:"生きれば",conditional_neg:"生きなければ"},
    forms_romaji:{present:"ikiru",present_polite:"ikimasu",past:"ikita",past_polite:"ikimashita",negative:"ikinai",negative_polite:"ikimasen",neg_past:"ikinakatta",neg_past_polite:"ikimasen deshita",te_form:"ikite",neg_te:"ikinakute",ing_form:"ikite iru",tai_form:"ikitai",potential:"ikireru",potential_neg:"ikirerenai",volitional:"ikiyou",passive:"ikirerareru",causative:"ikisaseru",imperative:"ikiro",conditional:"ikireba",conditional_neg:"ikinakereba"},
    example_sentence:"もっと長く生きたい。",example_sentence_en:"I want to live longer."
  },
  {
    dictionary:"死ぬ",hiragana:"しぬ",romaji:"shinu",meaning_en:"to die",group:"godan",level:"N2",
    forms:{present:"死ぬ",present_polite:"死にます",past:"死んだ",past_polite:"死にました",negative:"死なない",negative_polite:"死にません",neg_past:"死ななかった",neg_past_polite:"死にませんでした",te_form:"死んで",neg_te:"死ななくて",ing_form:"死んでいる",tai_form:"死にたい",potential:"死ねる",potential_neg:"死ねない",volitional:"死のう",passive:"死なれる",causative:"死なせる",imperative:"死ね",conditional:"死ねば",conditional_neg:"死ななければ"},
    forms_romaji:{present:"shinu",present_polite:"shinimasu",past:"shinda",past_polite:"shinimashita",negative:"shinanai",negative_polite:"shinimasen",neg_past:"shinanakatta",neg_past_polite:"shinimasen deshita",te_form:"shinde",neg_te:"shinanakute",ing_form:"shinde iru",tai_form:"shinitai",potential:"shineru",potential_neg:"shinenai",volitional:"shinoou",passive:"shinareru",causative:"shinaseru",imperative:"shine",conditional:"shineba",conditional_neg:"shinanakereba"},
    example_sentence:"花が死にました。",example_sentence_en:"The flower died."
  },
  {
    dictionary:"渡す",hiragana:"わたす",romaji:"watasu",meaning_en:"to hand over / pass",group:"godan",level:"N2",
    forms:{present:"渡す",present_polite:"渡します",past:"渡した",past_polite:"渡しました",negative:"渡さない",negative_polite:"渡しません",neg_past:"渡さなかった",neg_past_polite:"渡しませんでした",te_form:"渡して",neg_te:"渡さなくて",ing_form:"渡している",tai_form:"渡したい",potential:"渡せる",potential_neg:"渡せない",volitional:"渡そう",passive:"渡される",causative:"渡させる",imperative:"渡せ",conditional:"渡せば",conditional_neg:"渡さなければ"},
    forms_romaji:{present:"watasu",present_polite:"watashimasu",past:"watashita",past_polite:"watashimashita",negative:"watasanai",negative_polite:"watashimasen",neg_past:"watasanakatta",neg_past_polite:"watashimasen deshita",te_form:"watashite",neg_te:"watasanakute",ing_form:"watashite iru",tai_form:"watashitai",potential:"wataseru",potential_neg:"watasenai",volitional:"watasou",passive:"watasareru",causative:"watasaseru",imperative:"watase",conditional:"wataseba",conditional_neg:"watasanakereba"},
    example_sentence:"書類を渡してください。",example_sentence_en:"Please hand over the documents."
  },
  {
    dictionary:"受ける",hiragana:"うける",romaji:"ukeru",meaning_en:"to receive / take (a test)",group:"ichidan",level:"N2",
    forms:{present:"受ける",present_polite:"受けます",past:"受けた",past_polite:"受けました",negative:"受けない",negative_polite:"受けません",neg_past:"受けなかった",neg_past_polite:"受けませんでした",te_form:"受けて",neg_te:"受けなくて",ing_form:"受けている",tai_form:"受けたい",potential:"受けられる",potential_neg:"受けられない",volitional:"受けよう",passive:"受けられる",causative:"受けさせる",imperative:"受けろ",conditional:"受ければ",conditional_neg:"受けなければ"},
    forms_romaji:{present:"ukeru",present_polite:"ukemasu",past:"uketa",past_polite:"ukemashita",negative:"ukenai",negative_polite:"ukemasen",neg_past:"ukenakatta",neg_past_polite:"ukemasen deshita",te_form:"ukete",neg_te:"ukenakute",ing_form:"ukete iru",tai_form:"uketai",potential:"ukerareru",potential_neg:"ukerarenai",volitional:"ukeyou",passive:"ukerareru",causative:"ukesaseru",imperative:"ukero",conditional:"ukereba",conditional_neg:"ukenakereba"},
    example_sentence:"試験を受けます。",example_sentence_en:"I take an exam."
  },
  {
    dictionary:"続ける",hiragana:"つづける",romaji:"tsuzukeru",meaning_en:"to continue",group:"ichidan",level:"N2",
    forms:{present:"続ける",present_polite:"続けます",past:"続けた",past_polite:"続けました",negative:"続けない",negative_polite:"続けません",neg_past:"続けなかった",neg_past_polite:"続けませんでした",te_form:"続けて",neg_te:"続けなくて",ing_form:"続けている",tai_form:"続けたい",potential:"続けられる",potential_neg:"続けられない",volitional:"続けよう",passive:"続けられる",causative:"続けさせる",imperative:"続けろ",conditional:"続ければ",conditional_neg:"続けなければ"},
    forms_romaji:{present:"tsuzukeru",present_polite:"tsuzukemasu",past:"tsuzuketa",past_polite:"tsuzukemashita",negative:"tsuzukenai",negative_polite:"tsuzukemasen",neg_past:"tsuzukenakatta",neg_past_polite:"tsuzukemasen deshita",te_form:"tsuzukete",neg_te:"tsuzukenakute",ing_form:"tsuzukete iru",tai_form:"tsuzuketai",potential:"tsuzukerareru",potential_neg:"tsuzukerarenai",volitional:"tsuzukeyou",passive:"tsuzukerareru",causative:"tsuzukesaseru",imperative:"tsuzukero",conditional:"tsuzukereba",conditional_neg:"tsuzukenakereba"},
    example_sentence:"勉強を続けます。",example_sentence_en:"I continue studying."
  },
  {
    dictionary:"求める",hiragana:"もとめる",romaji:"motomeru",meaning_en:"to seek / demand",group:"ichidan",level:"N1",
    forms:{present:"求める",present_polite:"求めます",past:"求めた",past_polite:"求めました",negative:"求めない",negative_polite:"求めません",neg_past:"求めなかった",neg_past_polite:"求めませんでした",te_form:"求めて",neg_te:"求めなくて",ing_form:"求めている",tai_form:"求めたい",potential:"求められる",potential_neg:"求められない",volitional:"求めよう",passive:"求められる",causative:"求めさせる",imperative:"求めろ",conditional:"求めれば",conditional_neg:"求めなければ"},
    forms_romaji:{present:"motomeru",present_polite:"motomemasu",past:"motometa",past_polite:"motomemashita",negative:"motomenai",negative_polite:"motomemasen",neg_past:"motomenakatta",neg_past_polite:"motomemasen deshita",te_form:"motomete",neg_te:"motomenakute",ing_form:"motomete iru",tai_form:"motometai",potential:"motomerareru",potential_neg:"motomerarenai",volitional:"motomeyou",passive:"motomerareru",causative:"motomesaseru",imperative:"motomero",conditional:"motomereba",conditional_neg:"motomenakereba"},
    example_sentence:"説明を求めます。",example_sentence_en:"I seek an explanation."
  },
];