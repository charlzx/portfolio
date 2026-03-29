"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import TerminalWindow from "./TerminalWindow";
import AnimatedSection from "./AnimatedSection";
import { Github, Mail, Send } from "lucide-react";
import XLogo from "@/components/icons/XLogo";

const ContactSection = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (status !== 'success') return;
    const timer = setTimeout(() => setStatus('idle'), 3000);
    return () => clearTimeout(timer);
  }, [status]);

  const FORMSPREE_ID = 'mandvdpe';
  const endpoint = `https://formspree.io/f/${FORMSPREE_ID}`;
  const isValidEmail = (value: string) => /[^\s@]+@[^\s@]+\.[^\s@]+/.test(value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedMessage || !isValidEmail(trimmedEmail) || trimmedMessage.length < 10) {
      setStatus('error');
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          message: trimmedMessage,
        })
      });
      if (res.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="px-4 md:px-12 lg:px-24 py-16 md:py-20">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <div className="text-muted-foreground text-sm mb-6">
            <span className="text-primary">charlz@portfolio</span>
            <span>:</span>
            <span className="text-blue-400">~</span>
            <span>$ ./contact.sh</span>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Contact Info */}
          <AnimatedSection delay={0.1}>
            <div className="space-y-6 flex flex-col justify-center h-full">
              <div>
                <p className="text-foreground mb-4">
                  <span className="text-primary">&gt;</span> If you want to collaborate or talk shop, you can contact me.
                </p>
                
                <p className="text-muted-foreground text-sm">
                  I&apos;m always interested in hearing about new projects, opportunities, 
                  or just connecting with fellow developers.
                </p>
              </div>

              <div className="space-y-3">
                <motion.a 
                  href="https://github.com/charlzx"
                  target="_blank"
                  rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors group"
                  whileHover={{ x: 5 }}
                >
                  <Github className="text-primary" size={20} />
                  <div>
                    <p className="text-foreground font-medium group-hover:text-primary transition-colors">
                      @charlzx
                    </p>
                    <p className="text-muted-foreground text-xs">
                      Check out my projects and contributions
                    </p>
                  </div>
                </motion.a>

                <motion.a 
                  href="https://x.com/charlzObuzor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-secondary hover:bg-secondary/80 transition-colors group"
                  whileHover={{ x: 5 }}
                >
                  <XLogo size={20} className="text-primary" />
                  <div>
                    <p className="text-foreground font-medium group-hover:text-primary transition-colors">
                      @charlzObuzor
                    </p>
                    <p className="text-muted-foreground text-xs">
                      Follow me on X
                    </p>
                  </div>
                </motion.a>

                <motion.a 
                  href="mailto:charlesobuzor@outlook.com"
                  className="flex items-center gap-3 p-3 bg-secondary hover:bg-secondary/80 transition-colors group"
                  whileHover={{ x: 5 }}
                >
                  <Mail className="text-primary" size={20} />
                  <div>
                    <p className="text-foreground font-medium group-hover:text-primary transition-colors">
                      charlesobuzor@outlook.com
                    </p>
                    <p className="text-muted-foreground text-xs">
                      Send me an email
                    </p>
                  </div>
                </motion.a>
              </div>

              <div className="pt-4 border-t border-border">
                <p className="text-muted-foreground text-xs">
                  <span className="text-primary">&gt;</span> Response time: Usually within 24-48 hours
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Right Column - Contact Form */}
          <AnimatedSection delay={0.2}>
            <TerminalWindow title="send-message.sh">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="text-muted-foreground text-xs mb-2 block">
                    <span className="text-primary">&gt;</span> Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-secondary border border-border rounded-md focus:outline-none focus:border-primary transition-colors text-foreground placeholder:text-muted-foreground"
                    required
                    data-cursorvariant="hover"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="text-muted-foreground text-xs mb-2 block">
                    <span className="text-primary">&gt;</span> Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 bg-secondary border border-border rounded-md focus:outline-none focus:border-primary transition-colors text-foreground placeholder:text-muted-foreground"
                    required
                    data-cursorvariant="hover"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="text-muted-foreground text-xs mb-2 block">
                    <span className="text-primary">&gt;</span> Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-2.5 bg-secondary border border-border rounded-md focus:outline-none focus:border-primary transition-colors text-foreground placeholder:text-muted-foreground resize-none"
                    required
                    data-cursorvariant="hover"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-md bg-primary text-background font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  data-cursorvariant="hover"
                >
                  <Send size={16} />
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </button>

                {status === 'success' && (
                  <p className="text-green-500 text-sm">
                    <span className="text-primary">&gt;</span> Message sent successfully!
                  </p>
                )}
                {status === 'error' && (
                  <p className="text-red-500 text-sm">
                    <span className="text-primary">&gt;</span> Error sending message. Please try again.
                  </p>
                )}
              </form>
            </TerminalWindow>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
