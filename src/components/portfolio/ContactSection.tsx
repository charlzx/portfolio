"use client";

import { motion } from "framer-motion";
import TerminalWindow from "./TerminalWindow";
import AnimatedSection from "./AnimatedSection";
import { Github, Mail } from "lucide-react";
import XLogo from "@/components/icons/XLogo";

const ContactSection = () => {
  return (
    <section id="contact" className="px-6 md:px-12 lg:px-24 py-20 bg-card/50">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <div className="text-muted-foreground text-sm mb-6">
            <span className="text-primary">charlz@portfolio</span>
            <span>:</span>
            <span className="text-blue-400">~</span>
            <span>$ ./contact.sh</span>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <TerminalWindow title="contact.sh">
            <div className="space-y-6">
              <div>
                <p className="text-foreground mb-4">
                  <span className="text-primary">&gt;</span> If you want to collaborate or talk shop, you can contact me.
                </p>
                
                <p className="text-muted-foreground text-sm">
                  I'm always interested in hearing about new projects, opportunities, 
                  or just connecting with fellow developers.
                </p>
              </div>

              <div className="space-y-3">
                <motion.a 
                  href="https://github.com/charlzx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-secondary hover:bg-secondary/80 transition-colors group"
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
                  href="mailto:hello@charlz.dev"
                  className="flex items-center gap-3 p-3 bg-secondary hover:bg-secondary/80 transition-colors group"
                  whileHover={{ x: 5 }}
                >
                  <Mail className="text-primary" size={20} />
                  <div>
                    <p className="text-foreground font-medium group-hover:text-primary transition-colors">
                      hello@charlz.dev
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
          </TerminalWindow>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ContactSection;
