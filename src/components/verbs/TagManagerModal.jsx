import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Plus, Trash2, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PRESET_COLORS = [
  '#6366f1', '#ec4899', '#f59e0b', '#10b981',
  '#3b82f6', '#ef4444', '#8b5cf6', '#14b8a6',
];

export default function TagManagerModal({ onClose }) {
  const qc = useQueryClient();
  const [newName, setNewName] = useState('');
  const [newColor, setNewColor] = useState(PRESET_COLORS[0]);

  const { data: tags = [] } = useQuery({
    queryKey: ['verbTags'],
    queryFn: () => base44.entities.VerbTag.list(),
  });

  const createTag = useMutation({
    mutationFn: (data) => base44.entities.VerbTag.create(data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['verbTags'] }); setNewName(''); },
  });

  const deleteTag = useMutation({
    mutationFn: (id) => base44.entities.VerbTag.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['verbTags'] }),
  });

  const handleCreate = () => {
    if (!newName.trim()) return;
    createTag.mutate({ name: newName.trim(), color: newColor, verb_ids: [] });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-card border border-border/50 rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Tag className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">Manage Tags</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}><X className="w-4 h-4" /></Button>
        </div>

        {/* Create new tag */}
        <div className="flex gap-2 mb-5">
          <Input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
            placeholder="New tag name..."
            className="bg-secondary border-border/50 flex-1"
          />
          <div className="flex gap-1">
            {PRESET_COLORS.map(c => (
              <button
                key={c}
                className={`w-6 h-6 rounded-full border-2 transition-all ${newColor === c ? 'border-white scale-110' : 'border-transparent'}`}
                style={{ backgroundColor: c }}
                onClick={() => setNewColor(c)}
              />
            ))}
          </div>
          <Button size="sm" onClick={handleCreate} disabled={!newName.trim()} className="bg-primary text-primary-foreground shrink-0">
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {/* Tag list */}
        <div className="space-y-2 max-h-64 overflow-y-auto">
          <AnimatePresence>
            {tags.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">No tags yet. Create one above!</p>
            )}
            {tags.map(tag => (
              <motion.div
                key={tag.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="flex items-center justify-between px-3 py-2 rounded-lg bg-secondary/50"
              >
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: tag.color || '#6366f1' }} />
                  <span className="text-sm font-medium text-foreground">{tag.name}</span>
                  <span className="text-xs text-muted-foreground">({(tag.verb_ids || []).length} verbs)</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-muted-foreground hover:text-destructive"
                  onClick={() => deleteTag.mutate(tag.id)}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}