import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Send, Volume2, VolumeX } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import MiyuAvatar from './MiyuAvatar';
import { speakLocalized } from '@/lib/speechUtils';

const MIYU_IMG = 'https://media.base44.com/images/public/69f421629a32baa29433f382/fd3148364_generated_image.png';

const PAGE_INFO = {
  en: `LIGHTHOUSE 橋 is a Japanese learning platform by Kioku Interactive. 
Pages: 
• Home - Overview and features
• Verb Study - Browse 500+ Japanese verbs with full conjugation tables, JLPT levels N5-N1, search/filter, tags, CSV export
• Grammar - Study Japanese grammar patterns with examples and explanations
• Game Hub - Memory Match, Typing Attack, Conjugation Quiz, Pronunciation, Listening Mode games
• Timed Quiz - Practice conjugation/meaning under time pressure, earn XP and coins
• Profile - View your mastery stats, verb progress, streaks, XP and coins`,

  ja: `LIGHTHOUSE 橋 は Kioku Interactive の日本語学習プラットフォームです。
ページ:
• ホーム - アプリの概要と機能
• 動詞学習 - N5〜N1レベルの500以上の動詞、活用表、タグ付け機能
• 文法 - 文法パターンと例文の学習
• ゲームハブ - マッチゲーム、タイピング、活用クイズ、発音、リスニング
• タイムドクイズ - 時間制限内で活用・意味を練習してXPとコインを獲得
• プロフィール - 習得状況、連続記録、XPとコインを確認`,

  fr: `LIGHTHOUSE 橋 est une plateforme d'apprentissage du japonais par Kioku Interactive.
Pages:
• Accueil - Vue d'ensemble et fonctionnalités
• Étude des verbes - Plus de 500 verbes japonais avec tableaux de conjugaison, niveaux JLPT N5-N1
• Grammaire - Étudiez les structures grammaticales avec exemples
• Hub de jeux - Memory Match, Frappe au clavier, Quiz de conjugaison, Prononciation, Mode Écoute
• Quiz chronométré - Pratiquez sous contrainte de temps pour gagner XP et pièces
• Profil - Consultez vos statistiques de maîtrise et votre progression`,

  zh: `LIGHTHOUSE 橋 是 Kioku Interactive 的日语学习平台。
页面:
• 首页 - 应用概述和功能介绍
• 动词学习 - 超过500个日语动词，含完整变位表，JLPT N5-N1级别
• 语法 - 学习语法结构和例句
• 游戏中心 - 记忆配对、打字攻击、变位测验、发音、听力模式
• 定时测验 - 在时间限制下练习，赚取XP和金币
• 个人资料 - 查看掌握度统计、连续学习记录、XP和金币`,

  ko: `LIGHTHOUSE 橋 는 Kioku Interactive의 일본어 학습 플랫폼입니다.
페이지:
• 홈 - 앱 개요 및 기능 소개
• 동사 학습 - 500개 이상의 일본어 동사, 완전한 활용표, JLPT N5-N1
• 문법 - 문법 패턴과 예문 학습
• 게임 허브 - 메모리 매치, 타이핑 어택, 활용 퀴즈, 발음, 듣기 모드
• 시간제한 퀴즈 - 시간 내에 연습하고 XP와 코인 획득
• 프로필 - 숙달도 통계, 연속 기록, XP 및 코인 확인`,

  es: `LIGHTHOUSE 橋 es una plataforma de aprendizaje de japonés de Kioku Interactive.
Páginas:
• Inicio - Descripción general y características
• Estudio de verbos - Más de 500 verbos japoneses con tablas de conjugación, niveles JLPT N5-N1
• Gramática - Estudia patrones gramaticales con ejemplos
• Hub de juegos - Memory Match, Ataque de escritura, Quiz de conjugación, Pronunciación, Modo Escucha
• Quiz cronometrado - Practica bajo presión de tiempo para ganar XP y monedas
• Perfil - Ve tus estadísticas de dominio, rachas, XP y monedas`,
};

const SYSTEM_PROMPTS = {
  en: (name) => `You are MIYU, a cute, friendly and helpful customer service assistant for the LIGHTHOUSE 橋 Japanese learning platform. ${name ? `The user's name is ${name}` : 'Call the user by a friendly nickname if no name given'}. Be warm, helpful, use light Japanese expressions occasionally (like "ne~", "desu", "kawaii"), and keep answers concise and friendly. Use ♡ sparingly. Platform info: ${PAGE_INFO.en}`,
  ja: (name) => `あなたはMIYUです。LIGHTHOUSE 橋 日本語学習プラットフォームのかわいくて親切なカスタマーサービスアシスタントです。${name ? `ユーザーの名前は${name}さんです。` : 'お名前が分からない場合は親しみやすく接してください。'}明るく丁寧に短く答えてください。♡を時々使ってください。プラットフォーム情報: ${PAGE_INFO.ja}`,
  fr: (name) => `Tu es MIYU, une assistante service client mignonne et sympa pour la plateforme d'apprentissage du japonais LIGHTHOUSE 橋. ${name ? `Le prénom de l'utilisateur est ${name}.` : 'Utilise un surnom sympa si aucun nom fourni.'} Sois chaleureuse, utilise parfois des expressions japonaises légères, et garde tes réponses courtes. Info plateforme: ${PAGE_INFO.fr}`,
  zh: (name) => `你是MIYU，LIGHTHOUSE 橋 日语学习平台可爱友善的客服助手。${name ? `用户的名字是${name}。` : '如果没有提供名字，请用友好的方式称呼用户。'}请温暖、简洁地回答，偶尔使用轻松的日语表达。平台信息: ${PAGE_INFO.zh}`,
  ko: (name) => `당신은 MIYU입니다. LIGHTHOUSE 橋 일본어 학습 플랫폼의 귀엽고 친근한 고객 서비스 어시스턴트입니다. ${name ? `사용자의 이름은 ${name}입니다.` : '이름이 없으면 친근하게 대해주세요.'} 따뜻하고 간결하게 답변하고, 가끔 일본어 표현을 사용하세요. 플랫폼 정보: ${PAGE_INFO.ko}`,
  es: (name) => `Eres MIYU, una asistente de servicio al cliente linda y amigable para la plataforma de aprendizaje de japonés LIGHTHOUSE 橋. ${name ? `El nombre del usuario es ${name}.` : 'Usa un apodo amigable si no se da nombre.'} Sé cálida, usa expresiones japonesas ocasionalmente, y mantén respuestas cortas. Info plataforma: ${PAGE_INFO.es}`,
};



const WELCOME_MESSAGES = {
  en: (name) => name ? `Hi ${name}! I'm MIYU ♡ How can I help you today?` : `Hi there! I'm MIYU ♡ How can I help you today?`,
  ja: (name) => name ? `こんにちは、${name}さん！MIYUです ♡ 何かお手伝いできますか？` : `こんにちは！MIYUです ♡ 何かお手伝いできますか？`,
  fr: (name) => name ? `Bonjour ${name}! Je suis MIYU ♡ Comment puis-je t'aider?` : `Bonjour! Je suis MIYU ♡ Comment puis-je t'aider?`,
  zh: (name) => name ? `你好，${name}！我是MIYU ♡ 有什么可以帮您的吗？` : `你好！我是MIYU ♡ 有什么可以帮您的吗？`,
  ko: (name) => name ? `안녕하세요, ${name}님! MIYU예요 ♡ 무엇을 도와드릴까요?` : `안녕하세요! MIYU예요 ♡ 무엇을 도와드릴까요?`,
  es: (name) => name ? `¡Hola ${name}! Soy MIYU ♡ ¿Cómo puedo ayudarte?` : `¡Hola! Soy MIYU ♡ ¿Cómo puedo ayudarte?`,
};



export default function MiyuChat({ customerName, lang, onClose }) {
  const displayName = customerName || 'MIYU';
  const welcome = WELCOME_MESSAGES[lang]?.(customerName) || WELCOME_MESSAGES.en(customerName);

  const [messages, setMessages] = useState([
    { role: 'assistant', content: welcome, id: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [voiceOn, setVoiceOn] = useState(true);
  const [speaking, setSpeaking] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (voiceOn) {
      setSpeaking(true);
      speakLocalized(welcome, lang, () => setSpeaking(false));
    }
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: 'user', content: input.trim(), id: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const history = [...messages, userMsg].map(m => ({ role: m.role, content: m.content }));
    const systemPrompt = SYSTEM_PROMPTS[lang]?.(customerName) || SYSTEM_PROMPTS.en(customerName);

    const res = await base44.integrations.Core.InvokeLLM({
      prompt: `System: ${systemPrompt}\n\nConversation:\n${history.map(m => `${m.role === 'user' ? 'User' : 'MIYU'}: ${m.content}`).join('\n')}\nMIYU:`,
    });

    const reply = typeof res === 'string' ? res : res?.text || '...';
    const assistantMsg = { role: 'assistant', content: reply, id: Date.now() + 1 };
    setMessages(prev => [...prev, assistantMsg]);
    setLoading(false);

    if (voiceOn) {
      setSpeaking(true);
      speakLocalized(reply, lang, () => setSpeaking(false));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const langLabels = { en: 'EN', ja: '日', fr: 'FR', zh: '中', ko: '한', es: 'ES' };

  return (
    <div className="flex flex-col" style={{ height: '560px' }}>
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 py-3 border-b border-border/40 shrink-0"
        style={{ background: 'linear-gradient(135deg, hsl(260,30%,20%), hsl(225,25%,18%))' }}
      >
        <MiyuAvatar size="sm" speaking={speaking} />
        <div className="flex-1 min-w-0">
          <div className="font-bold text-foreground text-sm flex items-center gap-1.5">
            MIYU
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" title="Online" />
          </div>
          <div className="text-xs text-muted-foreground truncate">Customer Service Friend</div>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs px-1.5 py-0.5 rounded bg-primary/20 text-primary font-bold">{langLabels[lang]}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground hover:text-primary"
            onClick={() => {
              setVoiceOn(v => !v);
              if (voiceOn) window.speechSynthesis?.cancel();
            }}
            title={voiceOn ? 'Mute voice' : 'Enable voice'}
          >
            {voiceOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Character strip */}
      <div
        className="relative shrink-0 overflow-hidden flex justify-center"
        style={{ height: '120px', background: 'linear-gradient(180deg, hsl(260,30%,18%) 0%, transparent 100%)' }}
      >
        <motion.img
          src={MIYU_IMG}
          alt="MIYU"
          className="h-36 object-contain absolute -bottom-4"
          style={{ filter: 'drop-shadow(0 4px 20px hsla(43,55%,52%,0.3))' }}
          animate={speaking
            ? { y: [0, -4, 0], rotate: [0, 1, -1, 0] }
            : { y: [0, -4, 0] }
          }
          transition={{ duration: speaking ? 0.4 : 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3" style={{ scrollbarWidth: 'thin' }}>
        <AnimatePresence initial={false}>
          {messages.map(msg => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'rounded-br-sm bg-primary/90 text-primary-foreground'
                    : 'rounded-bl-sm text-foreground'
                }`}
                style={msg.role === 'assistant' ? {
                  background: 'linear-gradient(135deg, hsl(260,30%,26%), hsl(225,25%,22%))',
                  border: '1px solid hsla(260,30%,40%,0.4)',
                } : {}}
              >
                {msg.content}
              </div>
            </motion.div>
          ))}
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div
                className="px-4 py-3 rounded-2xl rounded-bl-sm text-sm"
                style={{ background: 'linear-gradient(135deg, hsl(260,30%,26%), hsl(225,25%,22%))', border: '1px solid hsla(260,30%,40%,0.4)' }}
              >
                <span className="flex gap-1 items-center">
                  <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0 }} className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
                  <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
                  <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-3 pb-3 pt-2 shrink-0 border-t border-border/30 flex gap-2">
        <Input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={lang === 'ja' ? 'メッセージを入力...' : lang === 'fr' ? 'Écrivez un message...' : lang === 'zh' ? '输入消息...' : lang === 'ko' ? '메시지를 입력하세요...' : lang === 'es' ? 'Escribe un mensaje...' : 'Type a message...'}
          className="flex-1 bg-secondary/40 border-border/50 text-sm h-9"
          disabled={loading}
        />
        <Button
          size="icon"
          className="h-9 w-9 bg-primary text-primary-foreground shrink-0"
          onClick={sendMessage}
          disabled={loading || !input.trim()}
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}