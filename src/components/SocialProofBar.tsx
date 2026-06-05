import React from 'react';
import { motion } from 'motion/react';
import { useIsMobile } from '../hooks/useIsMobile';

const logos = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD4PWdTAR-KwgQMaYzSSr7ow0tnlpGgK784Ozamqv5etOnmmst2qQKv3n3xziMahZrJZkLk_ryDK5u7UoEKSf6O-3APWteR2uRspefBCnGVrD8gv4qutoPhZg-HaIIiczPdLTanvgMqdB2dlZz1NjKdzA2bFEdr_SWMmKKd9uLgh-LlA5vPBk8Hhh1X4AfheWptkciczjb9I9YsqcShgl3KDl9mgibz-FF1vPa7FYjS2fQVSC4GPdNVWNFNLMHufzYz6HEjAFKrCeo',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAGufSWcb7ibJ8EKPJrVhKY70nDu868pSX-HYkdYtnR7b0mYx7KoKbQLczXD-Me8lEomHARe2jppYn4xfRcY_HeQZqldEQfohGPEG2hUeme6cqWBnFMoNQVW9_8D_7QBDzNfNyXAE1-MSDZDwB5hCnLWBhZyBO7E8qeArnowX8gTKXQTK1kn1EPieTdgmx77Za0igbUgN0ZCc8HqCwLKOSjQcC-kHTmtrGbyXnsOXIDzhHL42KvqJ-8NSDE9PqWqqLn1mv6xo2EWlo',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCglN_a8tr0ZYgHbRy8ZxzhkHgtC_swHsSXlXH_c1aybl2G6e34rp52Rl26JKW9MQDayyPDlbhAdkPQDAih8U1FahF3TpQL455XyasxjiqO4Ya-X38Zsmh0Am2QbJara9T0nViLJiZmVYH67ffnLJk1KzxJnH59n2RjMG1J_Y7bJR5oL9ULzqQ46s5g1QS1D4FGzP8Ql-EAydhuFsZQSgokjBjZ4_3z71Y9rvCnuhVGcNh-3NENxzIc2cWYvEHxFrO8D5eIRHWiQ64',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAnl10OXwLsCd67TVqjdXt-eOVV9BLB17b3d9RRkUexX0YA2L2dNO_G-jndsiLmw8_E6UzlRxkafiD8aFwS20inp_V5Jpu0mrRCmUO0wdkkhext8wG_6UL-Df7IjGCoq9mygZ5KcBJz6nbonygySy7DIxJgvS5BmAASJJAIE8cDJTnX5p78u4qRgAVtYg5h-vz_osKALHqppg1lK5QAEoiQEtYonOMD0tE2ur_-LO1W8hE5Necvn5Qad3DekPeXrCuBRnTr7FIVhWY',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuALvKA-wYd63q8-Ilk7n9tEB34uI8yQ6Q1GGvxB5iILUe-ZosFxD8tQ857TnTe7Y9jDmSg-m4gNAppBqhepbaDm1WSKlciyXr0qdeJYs73x4T8oBMKb-xCOTtp3er_At8CuA4-5uhkq3TQXtUUzuj5fylh4-fSI4igR94X4Pi0MOXm0zhTXULjeO6QEqI3iuxJH8BadxpVZd7SSJcc0bK-tq-BM2vPLtsrG00nNKB4nPj_bpmi9vW_CUmRnvVe4oq9hYo-veb0zenk',
];

export const SocialProofBar: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <section className="bg-surface-container-lowest py-16 border-y border-outline-variant">
      <div className="max-w-container-max mx-auto px-margin-desktop">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.7 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center font-label-md text-label-md text-on-surface-variant mb-10 tracking-widest uppercase"
        >
          Trusted by industry leaders in tech & logistics
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: isMobile ? 15 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap justify-center items-center gap-12 md:gap-20 invert opacity-40"
        >
          {logos.map((src, i) => (
            <img
              key={i}
              alt="Client Logo"
              className="h-8 w-auto"
              src={src}
              loading="lazy"
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
