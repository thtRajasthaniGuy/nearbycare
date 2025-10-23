"use client";

import { motion } from "framer-motion";
import { type ReactElement } from "react";

interface FeatureCardProps {
  icon: ReactElement;
  title: string;
  description: string;
  iconBgColor: string;
  index: number;
}

export default function FeatureCard({
  icon,
  title,
  description,
  iconBgColor,
  index,
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group relative bg-[var(--background)] rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
    >
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "linear-gradient(to bottom right, rgba(242, 89, 18, 0.05), rgba(92, 62, 148, 0.05))",
        }}
      />

      <div className="relative z-10">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
          className={`inline-flex items-center justify-center w-16 h-16 rounded-xl ${iconBgColor} mb-6 shadow-sm`}
        >
          {icon}
        </motion.div>

        <h3
          className="text-2xl font-bold text-[var(--text-dark)] mb-3 transition-colors duration-300"
          style={{
            color: "var(--text-dark)",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "var(--secondary-color)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "var(--text-dark)")
          }
        >
          {title}
        </h3>

        <p className="text-gray-600 leading-relaxed text-base">{description}</p>
      </div>

      <div
        className="absolute top-0 right-0 w-20 h-20 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "linear-gradient(to bottom right, rgba(242, 89, 18, 0.1), transparent)",
        }}
      />
    </motion.div>
  );
}
