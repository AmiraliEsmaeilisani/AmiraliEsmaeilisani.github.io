'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Mail, Github, Linkedin, Send, MapPin, Phone } from 'lucide-react'
import { useNavigationStore } from '@/store/useNavigationStore'

export default function ContactPage() {
  const { goBack } = useNavigationStore()

  const contactItems = [
    {
      icon: Mail,
      label: 'ایمیل',
      value: 'mehdi.ahmadi@example.com',
      href: 'mailto:mehdi.ahmadi@example.com',
    },
    {
      icon: Github,
      label: 'گیت‌هاب',
      value: 'github.com/mehdi-ahmadi',
      href: 'https://github.com',
    },
    {
      icon: Linkedin,
      label: 'لینکدین',
      value: 'linkedin.com/in/mehdi-ahmadi',
      href: 'https://linkedin.com',
    },
    {
      icon: Send,
      label: 'تلگرام',
      value: '@mehdi_ahmadi',
      href: 'https://t.me/',
    },
    {
      icon: MapPin,
      label: 'موقعیت',
      value: 'تهران، ایران',
      href: undefined,
    },
    {
      icon: Phone,
      label: 'تلفن',
      value: '+۹۸ ۹۱۲ ۳۴۵ ۶۷۸۹',
      href: 'tel:+989123456789',
    },
  ]

  return (
    <div className="page-enter">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 pb-6">
        <motion.button
          onClick={goBack}
          className="flex items-center gap-2 text-[#B0B0B0] hover:text-[#0066FF] transition-colors mb-8"
          style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)' }}
          data-cursor-hover
        >
          <ArrowRight className="w-5 h-5" />
          <span>بازگشت</span>
        </motion.button>

        <motion.h1
          className="text-3xl md:text-4xl font-bold text-[#F5F5F5] mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          تماس با من
        </motion.h1>
        <motion.p
          className="text-[#B0B0B0] text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
        >
          خوشحال می‌شوم با شما در ارتباط باشم
        </motion.p>
      </div>

      {/* Contact Cards Grid */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {contactItems.map((item, index) => {
            const Icon = item.icon
            const Wrapper = item.href ? 'a' : 'div'
            const wrapperProps = item.href
              ? { href: item.href, target: item.href.startsWith('http') ? '_blank' : undefined, rel: item.href.startsWith('http') ? 'noopener noreferrer' : undefined }
              : {}

            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 + index * 0.08 }}
              >
                <Wrapper
                  {...wrapperProps}
                  className="block p-6 rounded-xl border border-[#1C39BB25] bg-[#0A1128] hover:border-[#0066FF50] transition-all duration-300 interactive"
                  style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)' }}
                  data-cursor-hover
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-[#0066FF15] flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#0066FF]" />
                    </div>
                    <span className="text-[#B0B0B0] text-sm">{item.label}</span>
                  </div>
                  <p className="text-[#F5F5F5] font-medium" dir="ltr">
                    {item.value}
                  </p>
                </Wrapper>
              </motion.div>
            )
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          className="mt-12 p-8 rounded-xl border border-[#1C39BB25] bg-[#0A1128] text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.6 }}
        >
          <h2 className="text-xl font-bold text-[#F5F5F5] mb-3">
            پروژه‌ای در ذهن دارید؟
          </h2>
          <p className="text-[#B0B0B0] mb-6 max-w-md mx-auto">
            اگر پروژه تحقیقاتی یا اجرایی دارید که می‌توانم در آن کمک کنم، خوشحال می‌شوم از طریق ایمیل با من در ارتباط باشید.
          </p>
          <a
            href="mailto:mehdi.ahmadi@example.com"
            className="inline-flex items-center gap-2 bg-[#FF5E00] text-white px-8 py-3 rounded-full font-medium hover:bg-[#FF7A33] transition-all duration-300"
            style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)' }}
            data-cursor-hover
          >
            <Mail className="w-5 h-5" />
            <span>ارسال ایمیل</span>
          </a>
        </motion.div>
      </div>
    </div>
  )
}