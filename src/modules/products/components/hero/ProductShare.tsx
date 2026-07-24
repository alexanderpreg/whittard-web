'use client';

import { useMounted } from '@/lib/hooks/useMounted';
import {
  Facebook,
  Instagram,
  LinkedIn,
  TikTok,
  WhatsApp,
} from '@/shared/components/custom-ui/social-icons';
import { Check, Link } from 'lucide-react';
import { useState } from 'react';

interface ShareNetwork {
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
  getShareUrl: (url: string, title?: string) => string;
}

const shareNetworks: ShareNetwork[] = [
  {
    label: 'Facebook',
    Icon: Facebook,
    getShareUrl: (url) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    label: 'Instagram',
    Icon: Instagram,
    getShareUrl: () => 'https://instagram.com',
  },
  {
    label: 'LinkedIn',
    Icon: LinkedIn,
    getShareUrl: (url) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
  // {
  //   label: 'Twitter / X',
  //   Icon: Twitter,
  //   getShareUrl: (url, title) =>
  //     `https://twitter.com/intent/tweet?text=${encodeURIComponent(title ?? '')}&url=${encodeURIComponent(url)}`,
  // },
  {
    label: 'WhatsApp',
    Icon: WhatsApp,
    getShareUrl: (url) => `https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`,
  },

  {
    label: 'TikTok',
    Icon: TikTok,
    getShareUrl: () => 'https://tiktok.com',
  },
];

interface ProductShareProps {
  url?: string;
  title?: string;
}

export function ProductShare({ url, title }: ProductShareProps) {
  const mounted = useMounted();
  const shareUrl = url ?? (mounted ? window.location.href : '');
  const [copied, setCopied] = useState(false);

  return (
    <div className="flex items-end gap-4">
      <span className="text-brand-primary leading-none uppercase">Compartir:</span>
      <div className="flex items-center gap-2.5">
        <div className="flex items-center gap-2.5">
          {shareNetworks.map(({ label, Icon, getShareUrl }) => (
            <a
              key={label}
              href={getShareUrl(shareUrl, title)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-secondary hover:text-brand-primary transition-colors"
              aria-label={`Compartir en ${label}`}
            >
              <Icon className="h-5.5 w-5.5" />
            </a>
          ))}
        </div>
        <button
          type="button"
          onClick={() => {
            navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
          className="text-brand-secondary hover:text-brand-primary cursor-pointer transition-colors"
          aria-label="Copiar enlace"
        >
          {copied ? (
            <Check className="h-5.5 w-5.5 text-green-600" />
          ) : (
            <Link className="h-5.5 w-5.5" />
          )}
        </button>
      </div>
    </div>
  );
}
