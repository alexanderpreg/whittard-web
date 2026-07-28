'use client';

import dynamic from 'next/dynamic';

const WhittardChatbot = dynamic(
  () => import('../WhittardChatbot').then((mod) => mod.WhittardChatbot),
  { ssr: false },
);

export function ChatbotWrapper() {
  return <WhittardChatbot />;
}
