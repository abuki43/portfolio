import { motion } from "framer-motion";
import { SectionDivider } from "./Ornaments";

const About = () => {
  const skills = [
    "JavaScript", "TypeScript", "React", "Next.js", "React Native", "Expo",
    "Node.js", "Express", "NestJS", "MongoDB", "PostgreSQL",
    "Firebase", "Supabase", "REST APIs", "Tailwind CSS"
  ];

  return (
    <section id="about" className="py-20 px-6 section-alt">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="caption mb-4">About</p>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-tobacco letterpress">
            The Artisan
          </h2>
        </motion.div>

        <SectionDivider />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          {/* Main content with drop cap */}
          <p className="drop-cap font-body text-lg text-ink leading-relaxed mb-8">
            Hello, I'm Abubeker—a Full-Stack Developer and fourth-year Information Systems
            student at Addis Ababa University. My craft lies in weaving together web applications,
            mobile experiences, and automation tools that bridge the gap between elegant design
            and robust functionality. Each project I undertake is an opportunity to create
            something both innovative and enduring.
          </p>

          <p className="font-body text-lg text-ink/80 leading-relaxed mb-12">
            Whether building Telegram bots that serve thousands or crafting mobile applications
            that delight users, I approach every challenge with the same dedication to quality
            and attention to detail that defines true craftsmanship.
          </p>

          {/* Skills as elegant inline list */}
          <div className="border-t border-sepia/20 pt-8">
            <p className="caption mb-6 text-center">Areas of Expertise</p>
            <p className="font-body text-center text-sepia leading-loose">
              {skills.map((skill, index) => (
                <span key={skill}>
                  {skill}
                  {index < skills.length - 1 && (
                    <span className="mx-2 opacity-40">·</span>
                  )}
                </span>
              ))}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
