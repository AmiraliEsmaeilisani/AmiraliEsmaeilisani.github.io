'use client';

import { Github, Linkedin, Mail, Send } from 'lucide-react';

const socialLinks = [
  { href: 'https://github.com', icon: Github, label: 'GitHub' },
  { href: 'https://linkedin.com', icon: Linkedin, label: 'LinkedIn' },
  { href: 'mailto:mehdi@example.com', icon: Mail, label: 'Email' },
  { href: 'https://t.me/', icon: Send, label: 'Telegram' },
]

const techStack = ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion']

export default function Footer() {
  return (
    <footer
      className="mt-auto w-full"
      style={{
        backgroundColor: '#060D1A',
        borderTop: '1px solid #1C39BB30',
        padding: '2rem 1rem',
      }}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5">
        {/* Social Icons */}
        <div className="flex items-center gap-5">
          {socialLinks.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              data-cursor-hover
              className="transition-colors duration-300"
              style={{
                color: '#808080',
                transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = '#0066FF';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = '#B0B0B0';
              }}
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>

        {/* Separator + Copyright */}
        <div className="flex flex-col items-center gap-2">
          <div
            className="w-12"
            style={{ height: '1px', backgroundColor: '#1C39BB20' }}
          />
          <p className="text-sm" style={{ color: '#808080' }}>
            طراحی و توسعه با <span>❤</span> توسط مهدی احمدی
          </p>
          <p className="text-xs" style={{ color: '#505050' }}>
            © ۱۴۰۵ تمامی حقوق محفوظ است
          </p>
        </div>

        {/* Tech Stack Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full px-3 py-1 text-xs"
              style={{
                backgroundColor: '#1C39BB10',
                color: '#808080',
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}