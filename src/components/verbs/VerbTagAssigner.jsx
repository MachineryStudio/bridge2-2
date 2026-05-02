import React, { useState, useRef, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Tag, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function VerbTagAssigner({ verb }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const qc = useQueryClient();

  const { data: tags = [] } = useQuery({
    queryKey: ['verbTags'],
    queryFn: () => base44.entities.VerbTag.list(),
  });

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const toggleTag = useMutation({
    mutationFn: async (tag) => {
      const ids = tag.verb_ids || [];
      const hasVerb = ids.includes(verb.id);
      const newIds = hasVerb ? ids.filter(id => id !== verb.id) : [...ids, verb.id];
      return base44.entities.VerbTag.update(tag.id, { verb_ids: newIds });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['verbTags'] }),
  });

  const assignedCount = tags.filter(t => (t.verb_ids || []).includes(verb.id)).length;

  return (
    <div className="relative" ref={ref}>
      <Button
        variant="ghost"
        size="sm"
        className={`shrink-0 h-8 w-8 p-0 relative ${assignedCount > 0 ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
        onClick={(e) => { e.stopPropagation(); setOpen(o => !o); }}
        title="Assign tags"
      >
        <Tag className="w-4 h-4" />
        {assignedCount > 0 && (
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-primary text-primary-foreground text-[9px] flex items-center justify-center font-bold">
            {assignedCount}
          </span>
        )}
      </Button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.95 }}
            className="absolute right-0 top-9 z-50 bg-popover border border-border/60 rounded-xl shadow-xl p-2 min-w-[180px]"
            onClick={(e) => e.stopPropagation()}
          >
            {tags.length === 0 ? (
              <p className="text-xs text-muted-foreground px-2 py-1">No tags yet. Create tags first.</p>
            ) : (
              tags.map(tag => {
                const assigned = (tag.verb_ids || []).includes(verb.id);
                return (
                  <button
                    key={tag.id}
                    className="flex items-center gap-2 w-full px-2 py-1.5 rounded-lg hover:bg-secondary/60 transition-colors text-left"
                    onClick={() => toggleTag.mutate(tag)}
                    disabled={toggleTag.isPending}
                  >
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: tag.color || '#6366f1' }} />
                    <span className="text-sm text-foreground flex-1">{tag.name}</span>
                    {assigned && <Check className="w-3.5 h-3.5 text-primary shrink-0" />}
                  </button>
                );
              })
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}