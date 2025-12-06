import { motion } from "framer-motion";

const Cursor = ({ mousePosition }) => {
  return (
    <>
      {/* Ink dot - small refined dot */}
      {/* Fountain Pen Nib - Old School Cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] text-tobacco mix-blend-multiply"
        animate={{
          x: mousePosition.x - 10,
          y: mousePosition.y - 10,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          className="transform -rotate-45"
        >
          <path d="M12.0002 2.00024C12.0002 2.00024 5.00024 12.0002 5.00024 15.0002C5.00024 18.8662 8.13424 22.0002 12.0002 22.0002C15.8662 22.0002 19.0002 18.8662 19.0002 15.0002C19.0002 12.0002 12.0002 2.00024 12.0002 2.00024ZM12.0002 20.0002C9.23882 20.0002 7.00024 17.7617 7.00024 15.0002C7.00024 13.0002 12.0002 4.00024 12.0002 4.00024C12.0002 4.00024 17.0002 13.0002 17.0002 15.0002C17.0002 17.7617 14.7617 20.0002 12.0002 20.0002Z" />
          <rect x="11.5" y="10" width="1" height="8" rx="0.5" fill="currentColor" opacity="0.8" />
        </svg>
      </motion.div>
      {/* Quill ring - vintage circular outline */}
      <motion.div
        className="cursor-ring"
        animate={{
          x: mousePosition.x - 18,
          y: mousePosition.y - 18,
        }}
        transition={{
          type: "spring",
          stiffness: 250,
          damping: 20,
          mass: 0.8,
        }}
      />
    </>
  );
};

export default Cursor;