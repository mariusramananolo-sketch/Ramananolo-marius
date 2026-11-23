
import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  Mail,
  MapPin,
  MessageCircle,
  AlertCircle,
  Copy,
  Check,
  ExternalLink,
} from 'lucide-react';
import { PORTFOLIO_CONTENT, REAL_CONTACT } from '../data/portfolio';
import { useLanguage } from '../context/LanguageContext';
import {
  EASE_EDITORIAL,
  SectionHeader,
  VIEWPORT_CONFIG,
} from './MotionPrimitives';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: boolean;
  email?: boolean;
  subject?: boolean;
  message?: boolean;
}

const FORMSUBMIT_ENDPOINT = 'https://formsubmit.app/f/6ctbaa59ax';

export function ContactSection() {
  const { language } = useLanguage();
  const content = PORTFOLIO_CONTENT[language];
  const contact = content.contact;
  const languagesList = content.about.languages;

  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle');
  const [submitError, setSubmitError] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const prefersReducedMotion = useReducedMotion();

  // Validation du formulaire
  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};

    if (!form.name.trim() || form.name.trim().length < 2) {
      nextErrors.name = true;
    }

    if (
      !form.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
    ) {
      nextErrors.email = true;
    }

    if (!form.subject.trim() || form.subject.trim().length < 3) {
      nextErrors.subject = true;
    }

    if (!form.message.trim() || form.message.trim().length < 10) {
      nextErrors.message = true;
    }

    return nextErrors;
  };

  // Vérification avant l'envoi
  const validateForm = (): boolean => {
    const validationErrors = validate();

    setErrors(validationErrors);
    setSubmitError('');

    if (Object.keys(validationErrors).length > 0) {
      setStatus('error');
      return false;
    }

    setStatus('idle');
    return true;
  };

  // Préparation du contenu du message
  const getMessageContent = () => {
    return `Bonjour Marius,

Vous avez reçu un nouveau message depuis votre portfolio.

Nom : ${form.name.trim()}
Email : ${form.email.trim()}
Sujet : ${form.subject.trim()}

Message :
${form.message.trim()}

---
Message envoyé depuis votre portfolio.`;
  };

  // Envoi réel par email avec FormSubmit.app
  const handleEmailSubmit = async (
    e?: React.FormEvent<HTMLFormElement>
  ) => {
    e?.preventDefault();

    if (status === 'submitting') return;
    if (!validateForm()) return;

    setStatus('submitting');
    setSubmitError('');

    try {
      const response = await fetch(FORMSUBMIT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          subject: form.subject.trim(),
          message: form.message.trim(),

          // Configuration FormSubmit
          _subject: `Portfolio - ${form.subject.trim()}`,
          _replyto: form.email.trim(),
          _gotcha: '',
          _ts: Date.now(),
          _format: 'json',
        }),
      });

      const data = await response.json();

      if (!response.ok || data.ok !== true) {
        throw new Error(
          data.error?.message ||
          'Unable to send your message. Please try again.'
        );
      }

      // Succès confirmé par FormSubmit
      setStatus('success');
      setForm({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      setErrors({});
      setSubmitError('');
    } catch (error) {
      console.error('Contact form error:', error);

      setStatus('error');
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'Unable to send your message. Please try again.'
      );
    }
  };

  // Envoi par WhatsApp
  const handleWhatsAppSubmit = () => {
    if (!validateForm()) return;

    const whatsappNumber = REAL_CONTACT.phone.replace(/\D/g, '');
    const message = encodeURIComponent(getMessageContent());

    const whatsappUrl =
      `https://wa.me/${whatsappNumber}?text=${message}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  // Copier l'adresse email
  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(REAL_CONTACT.email);
      setCopiedEmail(true);

      window.setTimeout(() => {
        setCopiedEmail(false);
      }, 3000);
    } catch (error) {
      console.error('Unable to copy email:', error);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-20 sm:py-28 bg-[#EAE5DB]/65"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeader
          index="06"
          kicker={contact.kicker}
          title={contact.title}
          subtitle={contact.subtitle}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">

          {/* Real Contact Details */}
          <motion.div
            initial={
              prefersReducedMotion
                ? false
                : { opacity: 0, y: 18 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_CONFIG}
            transition={{
              duration: 0.55,
              ease: EASE_EDITORIAL,
            }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="rounded-2xl bg-[#FAF8F4] border border-[#111827]/10 p-6 sm:p-7 space-y-5">

              <div>
                <h3 className="font-identity text-lg font-bold text-[#111827]">
                  {contact.directChannelsTitle}
                </h3>

                <p className="mt-1 text-sm font-medium text-[#4B5563]">
                  {REAL_CONTACT.name}
                </p>
              </div>

              <div className="space-y-3 pt-2 border-t border-[#111827]/10">

                {/* Real Email */}
                <div className="flex items-center justify-between gap-2 p-3.5 rounded-xl bg-[#F4F1EA] border border-[#111827]/10">

                  <a
                    href={`mailto:${REAL_CONTACT.email}`}
                    className="flex items-center gap-3 min-w-0 flex-1 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2878F0] rounded"
                  >
                    <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#111827] text-[#F4F1EA] shrink-0">
                      <Mail className="w-4 h-4" aria-hidden="true" />
                    </span>

                    <div className="min-w-0">
                      <span className="block text-xs font-semibold uppercase tracking-wider text-[#858585]">
                        {contact.emailLabel}
                      </span>

                      <span className="block text-sm font-medium text-[#111827] group-hover:text-[#2878F0] transition-colors truncate">
                        {REAL_CONTACT.email}
                      </span>
                    </div>
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    aria-label={contact.copyEmailAria}
                    className="inline-flex items-center justify-center w-9 h-9 rounded-lg hover:bg-[#111827]/5 text-[#4B5563] hover:text-[#111827] transition-colors cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2878F0]"
                  >
                    {copiedEmail ? (
                      <Check className="w-4 h-4 text-[#2878F0]" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Real Phone / WhatsApp */}
                <a
                  href={`https://wa.me/${REAL_CONTACT.phone.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center gap-3 p-3.5 rounded-xl bg-[#F4F1EA] border border-[#111827]/10 hover:border-[#25D366]/60 transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
                >
                  <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#25D366] text-white shrink-0">
                    <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  </span>

                  <div className="min-w-0">
                    <span className="block text-xs font-semibold uppercase tracking-wider text-[#858585]">
                      WhatsApp
                    </span>

                    <span className="block text-sm font-medium text-[#111827] group-hover:text-[#25D366] transition-colors tabular-nums">
                      {REAL_CONTACT.phone}
                    </span>
                  </div>
                </a>

                {/* Real Location */}
                <div className="w-full flex items-center gap-3 p-3.5 rounded-xl bg-[#F4F1EA] border border-[#111827]/10">

                  <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#F07855] text-white shrink-0">
                    <MapPin className="w-4 h-4" aria-hidden="true" />
                  </span>

                  <div className="min-w-0">
                    <span className="block text-xs font-semibold uppercase tracking-wider text-[#858585]">
                      {contact.locationLabel}
                    </span>

                    <span className="block text-sm font-medium text-[#111827]">
                      {REAL_CONTACT.location}
                    </span>
                  </div>
                </div>

                {/* Real LinkedIn */}
                <a
                  href={REAL_CONTACT.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-between gap-3 p-3.5 rounded-xl bg-[#F4F1EA] border border-[#111827]/10 hover:border-[#2878F0]/45 transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2878F0]"
                >
                  <div className="flex items-center gap-3 min-w-0">

                    <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#2878F0] text-white font-identity text-xs font-bold shrink-0">
                      in
                    </span>

                    <div className="min-w-0">
                      <span className="block text-xs font-semibold uppercase tracking-wider text-[#858585]">
                        {contact.linkedinTitle}
                      </span>

                      <span className="block text-sm font-medium text-[#111827] group-hover:text-[#2878F0] transition-colors truncate">
                        {contact.linkedinAction}
                      </span>
                    </div>
                  </div>

                  <ExternalLink className="w-4 h-4 text-[#858585] group-hover:text-[#2878F0] shrink-0" />
                </a>
              </div>

              {/* Copied Email Notice */}
              {copiedEmail && (
                <div
                  role="status"
                  className="p-3 rounded-lg bg-[#2878F0]/10 border border-[#2878F0]/25 text-xs font-medium text-[#111827]"
                >
                  {contact.copiedEmailNotice}
                </div>
              )}

              {/* Languages Summary */}
              <div className="pt-4 border-t border-[#111827]/10">

                <span className="block text-xs font-semibold uppercase tracking-wider text-[#858585] mb-2">
                  {contact.languagesTitle}
                </span>

                <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-[#111827]">
                  {languagesList.map((lang) => (
                    <span key={lang.name} className="font-medium">
                      {lang.name}{' '}
                      <span className="text-[#4B5563] font-normal">
                        — {lang.level}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={
              prefersReducedMotion
                ? false
                : { opacity: 0, y: 18 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_CONFIG}
            transition={{
              duration: 0.55,
              delay: 0.08,
              ease: EASE_EDITORIAL,
            }}
            className="lg:col-span-7"
          >
            <form
              onSubmit={handleEmailSubmit}
              noValidate
              className="rounded-2xl bg-[#FAF8F4] border border-[#111827]/10 p-6 sm:p-8 shadow-[0_14px_34px_rgba(17,24,39,0.04)] space-y-5"
            >

              {/* Name and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#111827] mb-2"
                  >
                    {contact.form.nameLabel}
                  </label>

                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={(e) => {
                      setForm({ ...form, name: e.target.value });
                      if (errors.name) {
                        setErrors({ ...errors, name: undefined });
                      }
                    }}
                    placeholder={contact.form.namePlaceholder}
                    aria-invalid={Boolean(errors.name)}
                    className={`w-full min-h-[44px] px-4 py-2.5 rounded-lg bg-[#F4F1EA] border text-sm text-[#111827] placeholder:text-[#858585] focus:outline-none focus:ring-2 focus:ring-[#2878F0] transition-colors ${errors.name
                        ? 'border-[#DC2626]'
                        : 'border-[#111827]/15'
                      }`}
                  />

                  {errors.name && (
                    <p className="mt-1.5 text-xs font-medium text-[#DC2626]">
                      {contact.form.errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#111827] mb-2"
                  >
                    {contact.form.emailLabel}
                  </label>

                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => {
                      setForm({ ...form, email: e.target.value });
                      if (errors.email) {
                        setErrors({ ...errors, email: undefined });
                      }
                    }}
                    placeholder={contact.form.emailPlaceholder}
                    aria-invalid={Boolean(errors.email)}
                    className={`w-full min-h-[44px] px-4 py-2.5 rounded-lg bg-[#F4F1EA] border text-sm text-[#111827] placeholder:text-[#858585] focus:outline-none focus:ring-2 focus:ring-[#2878F0] transition-colors ${errors.email
                        ? 'border-[#DC2626]'
                        : 'border-[#111827]/15'
                      }`}
                  />

                  {errors.email && (
                    <p className="mt-1.5 text-xs font-medium text-[#DC2626]">
                      {contact.form.errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="contact-subject"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#111827] mb-2"
                >
                  {contact.form.subjectLabel}
                </label>

                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  value={form.subject}
                  onChange={(e) => {
                    setForm({ ...form, subject: e.target.value });
                    if (errors.subject) {
                      setErrors({ ...errors, subject: undefined });
                    }
                  }}
                  placeholder={contact.form.subjectPlaceholder}
                  aria-invalid={Boolean(errors.subject)}
                  className={`w-full min-h-[44px] px-4 py-2.5 rounded-lg bg-[#F4F1EA] border text-sm text-[#111827] placeholder:text-[#858585] focus:outline-none focus:ring-2 focus:ring-[#2878F0] transition-colors ${errors.subject
                      ? 'border-[#DC2626]'
                      : 'border-[#111827]/15'
                    }`}
                />

                {errors.subject && (
                  <p className="mt-1.5 text-xs font-medium text-[#DC2626]">
                    {contact.form.errors.subject}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#111827] mb-2"
                >
                  {contact.form.messageLabel}
                </label>

                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={(e) => {
                    setForm({ ...form, message: e.target.value });
                    if (errors.message) {
                      setErrors({ ...errors, message: undefined });
                    }
                  }}
                  placeholder={contact.form.messagePlaceholder}
                  aria-invalid={Boolean(errors.message)}
                  className={`w-full px-4 py-3 rounded-lg bg-[#F4F1EA] border text-sm text-[#111827] placeholder:text-[#858585] focus:outline-none focus:ring-2 focus:ring-[#2878F0] transition-colors resize-y ${errors.message
                      ? 'border-[#DC2626]'
                      : 'border-[#111827]/15'
                    }`}
                />

                {errors.message && (
                  <p className="mt-1.5 text-xs font-medium text-[#DC2626]">
                    {contact.form.errors.message}
                  </p>
                )}
              </div>

              {/* Validation Error */}
              {status === 'error' &&
                Object.keys(errors).length > 0 && (
                  <div
                    role="alert"
                    className="flex items-center gap-2.5 p-3.5 rounded-lg bg-[#FEE2E2] border border-[#DC2626]/30 text-sm text-[#991B1B]"
                  >
                    <AlertCircle
                      className="w-4 h-4 shrink-0"
                      aria-hidden="true"
                    />

                    <span>{contact.form.errorBanner}</span>
                  </div>
                )}

              {/* Submission Error */}
              {submitError && (
                <div
                  role="alert"
                  className="flex items-center gap-2.5 p-3.5 rounded-lg bg-[#FEE2E2] border border-[#DC2626]/30 text-sm text-[#991B1B]"
                >
                  <AlertCircle
                    className="w-4 h-4 shrink-0"
                    aria-hidden="true"
                  />
                  <span>{submitError}</span>
                </div>
              )}

              {/* Submission Success */}
              {status === 'success' && (
                <div
                  role="status"
                  className="flex items-center gap-2.5 p-3.5 rounded-lg bg-[#DCFCE7] border border-[#16A34A]/30 text-sm text-[#166534]"
                >
                  <Check
                    className="w-4 h-4 shrink-0"
                    aria-hidden="true"
                  />
                  <span>
                    Message envoyé avec succès ! Merci de m'avoir contacté.
                  </span>
                </div>
              )}

              {/* Email and WhatsApp Actions */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">

                {/* Send Email */}
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="inline-flex items-center justify-center gap-2 min-h-[46px] px-5 py-3 rounded-lg bg-[#2878F0] text-white text-sm sm:text-base font-semibold hover:bg-[#1e63cf] transition-colors duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2878F0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAF8F4]"
                >
                  <Mail className="w-4 h-4" aria-hidden="true" />
                  <span>
                    {status === 'submitting'
                      ? 'Sending...'
                      : 'Envoyer le message'}
                  </span>
                </button>

              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
