'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Download, Code, Brain, Calculator, Box, Cpu, Globe, Database, Container, type LucideIcon } from 'lucide-react';
import { resumeData } from '@/data/portfolio-data';
import { useNavigationStore } from '@/store/useNavigationStore';

const transition = { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const };

const iconMap: Record<string, LucideIcon> = {
  Code,
  Brain,
  Calculator,
  Box,
  Cpu,
  Globe,
  Database,
  Container,
};

function SkillIcon({ name }: { name: string }) {
  const Icon = iconMap[name] || Code;
  return <Icon className="h-4 w-4" style={{ color: '#0066FF' }} />;
}

function SectionCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={transition}
      className={className}
      style={{
        backgroundColor: '#0A1128',
        border: '1px solid #1C39BB25',
        borderRadius: '0.75rem',
        padding: '1.5rem',
      }}
    >
      {children}
    </motion.div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.h2
      ref={ref}
      initial={{ opacity: 0, x: 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
      transition={transition}
      className="text-2xl font-bold mb-8"
      style={{ color: '#F5F5F5' }}
    >
      {children}
    </motion.h2>
  );
}

export default function ResumePage() {
  const { goBack } = useNavigationStore();

  return (
    <div dir="rtl" className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transition}
        className="pt-8 pb-10 md:pt-12 md:pb-16"
      >
        <button
          onClick={goBack}
          data-cursor-hover
          className="flex items-center gap-2 mb-6 text-sm transition-colors duration-300"
          style={{
            color: '#B0B0B0',
            transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = '#0066FF';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = '#B0B0B0';
          }}
        >
          <ArrowRight className="h-4 w-4" />
          <span>بازگشت</span>
        </button>

        <h1
          className="text-3xl md:text-4xl font-bold mb-3"
          style={{ color: '#F5F5F5' }}
        >
          رزومه من
        </h1>
        <p
          className="text-lg md:text-xl"
          style={{ color: '#0066FF' }}
        >
          {resumeData.name}
        </p>
      </motion.div>

      {/* About / Bio Section */}
      <SectionCard className="mb-8">
        <p
          className="text-lg leading-relaxed max-w-3xl mb-6"
          style={{ color: '#B0B0B0' }}
        >
          {resumeData.bio}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {resumeData.languages.map((lang) => (
            <span
              key={lang}
              className="inline-flex items-center rounded-full px-3 py-1 text-xs"
              style={{
                backgroundColor: '#1C39BB20',
                color: '#B0B0B0',
                border: '1px solid #1C39BB30',
              }}
            >
              {lang}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {resumeData.interests.map((interest) => (
            <span
              key={interest}
              className="inline-flex items-center rounded-full px-3 py-1 text-xs"
              style={{
                backgroundColor: '#FF5E0015',
                color: '#FF5E00',
                border: '1px solid #FF5E0030',
              }}
            >
              {interest}
            </span>
          ))}
        </div>
      </SectionCard>

      {/* Education Timeline */}
      <section className="py-10 md:py-16">
        <div className="mb-8" style={{ borderRight: '3px solid #1C39BB', paddingRight: '1rem' }}>
          <SectionTitle>سوابق تحصیلی</SectionTitle>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div
            className="absolute top-0 bottom-0"
            style={{
              right: '5px',
              width: '2px',
              backgroundColor: '#1C39BB40',
            }}
          />

          <div className="flex flex-col gap-8">
            {resumeData.education.map((edu, index) => (
              <EducationTimelineItem key={index} edu={edu} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-10 md:py-16">
        <SectionTitle>مهارت‌ها</SectionTitle>

        <SectionCard className="mb-8">
          <div className="flex flex-col gap-6">
            {resumeData.skills.map((skill, index) => (
              <SkillBar key={index} skill={skill} index={index} />
            ))}
          </div>
        </SectionCard>
      </section>

      {/* Experience Section */}
      <section className="py-10 md:py-16">
        <div className="mb-8" style={{ borderRight: '3px solid #1C39BB', paddingRight: '1rem' }}>
          <SectionTitle>تجربیات</SectionTitle>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div
            className="absolute top-0 bottom-0"
            style={{
              right: '5px',
              width: '2px',
              backgroundColor: '#1C39BB40',
            }}
          />

          <div className="flex flex-col gap-8">
            {resumeData.experience.map((exp, index) => (
              <ExperienceTimelineItem key={index} exp={exp} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Download PDF Button */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={transition}
        className="flex justify-center py-10 md:py-16"
      >
        <button
          data-cursor-hover
          className="flex items-center gap-3 px-8 py-4 rounded-xl text-lg font-bold transition-all duration-300 cursor-pointer"
          style={{
            backgroundColor: '#0A1128',
            border: '2px solid #FF5E00',
            color: '#FF5E00',
            transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.backgroundColor = '#FF5E00';
            el.style.color = '#FFFFFF';
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.backgroundColor = '#0A1128';
            el.style.color = '#FF5E00';
          }}
          onClick={() => {
            // PDF download placeholder
          }}
        >
          <Download className="h-5 w-5" />
          <span>دانلود رزومه (PDF)</span>
        </button>
      </motion.div>
    </div>
  );
}

/* ─── Education Timeline Item ─── */
function EducationTimelineItem({ edu, index }: { edu: typeof resumeData.education[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
      transition={{ ...transition, delay: index * 0.15 }}
      className="relative pr-6"
    >
      {/* Timeline dot */}
      <div
        className="absolute top-1.5"
        style={{
          right: 0,
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: '#0066FF',
          border: '2px solid #0A1128',
          boxShadow: '0 0 8px #0066FF60',
        }}
      />

      <div
        className="rounded-xl p-5"
        style={{
          backgroundColor: '#0A1128',
          border: '1px solid #1C39BB25',
        }}
      >
        {/* Period badge */}
        <span
          className="inline-block rounded-full px-3 py-1 text-xs font-medium mb-3"
          style={{ backgroundColor: '#FF5E0015', color: '#FF5E00' }}
        >
          {edu.period}
        </span>

        {/* Degree + Field */}
        <h3 className="text-lg font-bold mb-1" style={{ color: '#F5F5F5' }}>
          {edu.degree} - {edu.field}
        </h3>

        {/* Institution */}
        <p className="text-sm mb-3" style={{ color: '#0066FF' }}>
          {edu.institution}
        </p>

        {/* GPA */}
        {edu.gpa && (
          <span
            className="inline-block rounded-full px-2.5 py-0.5 text-xs mb-3"
            style={{ backgroundColor: '#1C39BB20', color: '#0066FF', border: '1px solid #1C39BB30' }}
          >
            معدل: {edu.gpa}
          </span>
        )}

        {/* Description */}
        {edu.description && (
          <p className="text-sm leading-relaxed mt-2" style={{ color: '#B0B0B0' }}>
            {edu.description}
          </p>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Experience Timeline Item ─── */
function ExperienceTimelineItem({ exp, index }: { exp: typeof resumeData.experience[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
      transition={{ ...transition, delay: index * 0.15 }}
      className="relative pr-6"
    >
      {/* Timeline dot */}
      <div
        className="absolute top-1.5"
        style={{
          right: 0,
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: '#0066FF',
          border: '2px solid #0A1128',
          boxShadow: '0 0 8px #0066FF60',
        }}
      />

      <div
        className="rounded-xl p-5"
        style={{
          backgroundColor: '#0A1128',
          border: '1px solid #1C39BB25',
        }}
      >
        {/* Period badge */}
        <span
          className="inline-block rounded-full px-3 py-1 text-xs font-medium mb-3"
          style={{ backgroundColor: '#FF5E0015', color: '#FF5E00' }}
        >
          {exp.period}
        </span>

        {/* Title */}
        <h3 className="text-lg font-bold mb-1" style={{ color: '#F5F5F5' }}>
          {exp.title}
        </h3>

        {/* Company */}
        <p className="text-sm mb-3" style={{ color: '#0066FF' }}>
          {exp.company}
        </p>

        {/* Description */}
        <p className="text-sm leading-relaxed" style={{ color: '#B0B0B0' }}>
          {exp.description}
        </p>
      </div>
    </motion.div>
  );
}

/* ─── Skill Bar ─── */
function SkillBar({ skill, index }: { skill: typeof resumeData.skills[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ ...transition, delay: index * 0.08 }}
    >
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          {skill.icon && <SkillIcon name={skill.icon} />}
          <span className="text-sm font-medium" style={{ color: '#F5F5F5' }}>
            {skill.name}
          </span>
          <span className="text-xs" style={{ color: '#B0B0B0' }}>
            {skill.category}
          </span>
        </div>
        <span className="text-sm font-bold" style={{ color: '#0066FF' }}>
          {skill.level}%
        </span>
      </div>

      <div
        className="w-full h-2.5 rounded-full overflow-hidden"
        style={{ backgroundColor: '#0A1128' }}
      >
        <motion.div
          className="h-full rounded-full skill-bar-fill"
          style={{ backgroundColor: '#0066FF' }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: index * 0.08 + 0.3 }}
        />
      </div>
    </motion.div>
  );
}