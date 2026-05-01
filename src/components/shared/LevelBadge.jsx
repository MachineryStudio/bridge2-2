import React from 'react';
import { Badge } from '@/components/ui/badge';

const levelColors = {
  N5: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  N4: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  N3: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  N2: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  N1: 'bg-red-500/20 text-red-400 border-red-500/30',
};

export default function LevelBadge({ level, className = '' }) {
  return (
    <Badge
      variant="outline"
      className={`${levelColors[level] || 'bg-muted text-muted-foreground'} text-xs font-bold ${className}`}
    >
      {level}
    </Badge>
  );
}