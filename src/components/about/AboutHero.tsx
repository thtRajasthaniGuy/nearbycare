"use client";

import { motion } from "framer-motion";

export default function AboutHero() {
  return (
    <div className="mb-20">
      <motion.div
        className="relative overflow-hidden rounded-3xl mb-12 h-[400px] md:h-[400px] lg:h-[480px]"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <img
          src="https://images.unsplash.com/photo-1694005891538-a0f40dc0954e?w=1920&q=80"
          alt="Community volunteers"
          className="w-full h-full object-cover"
        />
      </motion.div>

      <div className="text-center max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-[#f25912] font-semibold text-sm md:text-base uppercase tracking-wider mb-4">
            What We Do
          </p>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2d2d2d] mb-6 leading-tight">
            Connecting Communities
            <span className="block text-[#5c3e94] mt-2">With Changemakers</span>
          </h2>

          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Every community has unsung heroes working to create positive change.
            KarunaHub helps you discover verified NGOs making real impact near
            you, so you can contribute to causes that matter.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
