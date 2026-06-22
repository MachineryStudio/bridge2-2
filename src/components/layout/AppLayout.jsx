import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import MiyuChatbot from '@/components/chatbot/MiyuChatbot';

export default function AppLayout() {
  const { data: progressList } = useQuery({
    queryKey: ['playerProgress'],
    queryFn: async () => {
      const user = await base44.auth.me();
      return base44.entities.PlayerProgress.filter({ created_by: user.email });
    },
    initialData: [],
  });

  const playerStats = progressList?.[0] || null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar playerStats={playerStats} />
      <main className="pt-16">
        <Outlet />
      </main>
      <MiyuChatbot />
    </div>
  );
}