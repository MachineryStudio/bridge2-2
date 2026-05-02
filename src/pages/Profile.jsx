import React, { useMemo } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { User, Zap, Trophy, Flame, BookOpen, AlertTriangle, Star, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import LevelBadge from '@/components/shared/LevelBadge';
import SpeakButton from '@/components/shared/SpeakButton';

function MasteryBar({ correct, wrong }) {
  const total = correct + wrong;
  if (total === 0) return <div className="w-full h-2 bg-secondary rounded-full" />;
  const pct = Math.round((correct / total) * 100);
  const color =
    pct >= 80 ? 'bg-emerald-500' :
    pct >= 60 ? 'bg-blue-500' :
    pct >= 40 ? 'bg-orange-500' :
    'bg-destructive';
  return (
    <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
      <motion.div
        className={`h-full rounded-full ${color}`}
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />
    </div>
  );
}

function MasteryLabel({ correct, wrong }) {
  const total = correct + wrong;
  if (total === 0) return <span className="text-xs text-muted-foreground">Unseen</span>;
  const pct = Math.round((correct / total) * 100);
  if (pct >= 80) return <span className="text-xs text-emerald-400 font-bold">Mastered</span>;
  if (pct >= 60) return <span className="text-xs text-blue-400 font-bold">Practiced</span>;
  if (pct >= 40) return <span className="text-xs text-orange-400 font-bold">Learning</span>;
  return <span className="text-xs text-destructive font-bold">Struggling</span>;
}

export default function Profile() {
  const { data: progressList = [] } = useQuery({
    queryKey: ['playerProgress'],
    queryFn: async () => {
      const user = await base44.auth.me();
      return base44.entities.PlayerProgress.filter({ created_by: user.email });
    },
    initialData: [],
  });

  const { data: verbProgressList = [], isLoading } = useQuery({
    queryKey: ['verbProgress'],
    queryFn: async () => {
      const user = await base44.auth.me();
      return base44.entities.VerbProgress.filter({ created_by: user.email }, '-updated_date', 500);
    },
    initialData: [],
  });

  const { data: user } = useQuery({
    queryKey: ['me'],
    queryFn: () => base44.auth.me(),
  });

  const stats = progressList[0] || null;

  const { mastered, practiced, struggling, challenging } = useMemo(() => {
    const practiced = verbProgressList.filter(v => v.correct + v.wrong > 0);
    const mastered = practiced.filter(v => (v.correct / (v.correct + v.wrong)) >= 0.8);
    const struggling = practiced.filter(v => (v.correct / (v.correct + v.wrong)) < 0.4);
    const challenging = [...practiced]
      .filter(v => v.wrong > 0)
      .sort((a, b) => {
        const rateA = a.wrong / (a.correct + a.wrong);
        const rateB = b.wrong / (b.correct + b.wrong);
        return rateB - rateA;
      })
      .slice(0, 8);
    return { mastered, practiced, struggling, challenging };
  }, [verbProgressList]);

  const levelXP = stats ? Math.floor((stats.xp || 0) / 100) + 1 : 1;
  const xpInLevel = stats ? (stats.xp || 0) % 100 : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-1">
          <User className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">My Profile</h1>
        </div>
        <p className="text-muted-foreground text-sm">Your learning journey at a glance</p>
      </motion.div>

      {/* Player card */}
      <Card className="p-6 bg-card border-border/50">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-12 h-12 rounded-full bg-primary/20 border-2 border-primary/40 flex items-center justify-center">
                <span className="font-jp font-bold text-primary text-xl">
                  {user?.full_name?.[0] || '?'}
                </span>
              </div>
              <div>
                <h2 className="font-bold text-foreground text-lg">{user?.full_name || 'Learner'}</h2>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <div className="text-center">
              <div className="flex items-center gap-1 text-primary font-bold text-xl">
                <Zap className="w-4 h-4" /> {stats?.xp || 0}
              </div>
              <div className="text-xs text-muted-foreground">XP</div>
            </div>
            <div className="text-center">
              <div className="flex items-center gap-1 text-yellow-400 font-bold text-xl">
                <Trophy className="w-4 h-4" /> {stats?.coins || 0}
              </div>
              <div className="text-xs text-muted-foreground">Coins</div>
            </div>
            <div className="text-center">
              <div className="flex items-center gap-1 text-orange-400 font-bold text-xl">
                <Flame className="w-4 h-4" /> {stats?.streak_days || 0}
              </div>
              <div className="text-xs text-muted-foreground">Streak</div>
            </div>
            <div className="text-center">
              <div className="flex items-center gap-1 text-blue-400 font-bold text-xl">
                <BookOpen className="w-4 h-4" /> {stats?.games_played || 0}
              </div>
              <div className="text-xs text-muted-foreground">Quizzes</div>
            </div>
          </div>
        </div>

        {/* XP bar */}
        <div className="mt-5">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
            <span>Level {levelXP}</span>
            <span>{xpInLevel} / 100 XP to next level</span>
          </div>
          <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${xpInLevel}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
        </div>
      </Card>

      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Verbs Practiced', value: practiced.length, color: 'text-blue-400', icon: BookOpen },
          { label: 'Mastered', value: mastered.length, color: 'text-emerald-400', icon: Star },
          { label: 'Struggling', value: struggling.length, color: 'text-destructive', icon: AlertTriangle },
          { label: 'Best Streak', value: stats?.best_streak || 0, color: 'text-orange-400', icon: Flame },
        ].map(s => (
          <Card key={s.label} className="p-4 bg-card border-border/50 text-center">
            <s.icon className={`w-5 h-5 mx-auto mb-1.5 ${s.color}`} />
            <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
          </Card>
        ))}
      </div>

      {/* Most Challenging Verbs */}
      {challenging.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-orange-400" />
            <h2 className="font-bold text-foreground">Most Challenging Verbs</h2>
            <span className="text-xs text-muted-foreground ml-1">— focus your practice here</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {challenging.map(vp => {
              const total = vp.correct + vp.wrong;
              const pct = Math.round((vp.correct / total) * 100);
              return (
                <Card key={vp.id} className="p-4 bg-card border-orange-500/20 border">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-jp text-xl font-bold text-foreground">{vp.verb_dictionary}</span>
                      <SpeakButton text={vp.verb_dictionary} size="sm" />
                      {vp.verb_level && <LevelBadge level={vp.verb_level} />}
                    </div>
                    <span className={`text-sm font-bold ${pct < 40 ? 'text-destructive' : 'text-orange-400'}`}>{pct}%</span>
                  </div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-jp text-xs text-primary">{vp.verb_hiragana}</span>
                    <span className="text-xs text-muted-foreground">{vp.verb_meaning}</span>
                  </div>
                  <MasteryBar correct={vp.correct} wrong={vp.wrong} />
                  <div className="flex items-center justify-between mt-1.5 text-xs text-muted-foreground">
                    <span className="text-emerald-400">✓ {vp.correct}</span>
                    <MasteryLabel correct={vp.correct} wrong={vp.wrong} />
                    <span className="text-destructive">✗ {vp.wrong}</span>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* All Verb Progress */}
      {verbProgressList.length > 0 ? (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="font-bold text-foreground">All Verb Progress</h2>
            <span className="text-xs text-muted-foreground ml-1">— {verbProgressList.length} verbs practiced</span>
          </div>
          {isLoading ? (
            <div className="flex items-center justify-center py-10">
              <div className="w-7 h-7 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
          ) : (
            <div className="space-y-2">
              {[...verbProgressList]
                .sort((a, b) => {
                  const rateA = (a.correct + a.wrong) > 0 ? a.correct / (a.correct + a.wrong) : 0;
                  const rateB = (b.correct + b.wrong) > 0 ? b.correct / (b.correct + b.wrong) : 0;
                  return rateA - rateB; // struggling first
                })
                .map(vp => {
                  const total = vp.correct + vp.wrong;
                  const pct = total > 0 ? Math.round((vp.correct / total) * 100) : 0;
                  return (
                    <div key={vp.id} className="flex items-center gap-3 px-4 py-3 rounded-lg bg-card border border-border/40 hover:border-primary/20 transition-all">
                      <div className="w-20 shrink-0">
                        <span className="font-jp text-lg font-bold text-foreground">{vp.verb_dictionary}</span>
                      </div>
                      <div className="hidden sm:block w-24 shrink-0">
                        <span className="font-jp text-xs text-primary">{vp.verb_hiragana}</span>
                      </div>
                      <div className="hidden md:block w-32 shrink-0 text-xs text-muted-foreground truncate">{vp.verb_meaning}</div>
                      <div className="flex-1 min-w-0">
                        <MasteryBar correct={vp.correct} wrong={vp.wrong} />
                      </div>
                      <div className="w-10 text-right shrink-0">
                        <span className="text-xs font-bold text-foreground">{pct}%</span>
                      </div>
                      <div className="w-16 shrink-0 text-right">
                        <MasteryLabel correct={vp.correct} wrong={vp.wrong} />
                      </div>
                      {vp.verb_level && <LevelBadge level={vp.verb_level} className="shrink-0 hidden sm:flex" />}
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      ) : (
        !isLoading && (
          <Card className="p-10 text-center border-border/50 bg-card">
            <BookOpen className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
            <p className="font-jp text-muted-foreground/50 text-lg mb-1">練習しましょう！</p>
            <p className="text-muted-foreground text-sm">Complete a Timed Quiz to start tracking your verb progress.</p>
          </Card>
        )
      )}
    </div>
  );
}