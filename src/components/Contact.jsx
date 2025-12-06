import { motion } from "framer-motion";
import { MailOrnament, SectionDivider } from "./Ornaments";

const Contact = () => {
  return (
    <section id="contact" className="py-20 px-6 section-alt">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="caption mb-4">Contact</p>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-tobacco letterpress mb-6">
            Let's Create Together
          </h2>
        </motion.div>

        <SectionDivider />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Intro text with drop cap */}
          <p className="drop-cap font-body text-lg text-ink/80 leading-relaxed max-w-xl mx-auto mb-12">
            Have a project in mind? I'm always open to discussing new
            opportunities, creative ideas, or partnerships. Let's bring your
            vision to life.
          </p>

          {/* Email with ornament */}
          <div className="flex flex-col items-center gap-6">
            <MailOrnament size={40} className="text-sepia opacity-60" />

            <a
              href="mailto:abubeker4310@gmail.com"
              className="font-heading text-2xl md:text-3xl text-tobacco hover:text-olive transition-colors editorial-link"
            >
              Abubeker4310@gmail.com
            </a>
          </div>

          {/* Availability note */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            viewport={{ once: true }}
            className="font-body text-sepia italic mt-12"
          >
            Available for freelance opportunities and exciting projects
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
