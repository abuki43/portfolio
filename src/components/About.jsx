import { motion } from "framer-motion";
import { FiCode, FiDatabase, FiLayout } from "react-icons/fi";
import { MdYard } from "react-icons/md";

const About = () => {
  const skills = [
    {
      icon: <FiCode className="w-6 h-6" />,
      title: "Frontend Development",
      description: "JavaScript, Typescript, React, Next.js, Tailwind CSS",
    },
    {
      icon: <FiDatabase className="w-6 h-6" />,
      title: "Backend Development",
      description: "Node.js, Express, NestJS, MongoDB, REST API, Postgres, Firebase, Supabase",
    },
    {
      icon: <FiLayout className="w-6 h-6" />,
      title: "Mobile App Development",
      description: "React Native, Expo",
    },
  ];

  return (
    <section id="about" className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-primary">
            About Me
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Hello, I'm Abubeker, Full-Stack Dev . I am a
            Fourth-year Information Systems student at Addis Ababa University.
            Combined with my skills to develop in web, mobile development and telegram bots,
            this allows me to create solutions that are both innovative and
            reliable.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-primary mb-4">{skill.icon}</div>
              <h3 className="text-xl dark:text-primary font-semibold mb-2">{skill.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {skill.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
