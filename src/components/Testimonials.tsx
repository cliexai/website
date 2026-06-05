import React from 'react';
import { motion } from 'motion/react';
import { useIsMobile } from '../hooks/useIsMobile';

export const Testimonials: React.FC = () => {
  const isMobile = useIsMobile();

  const reviews = [
    {
      quote: "ClieX AI has completely revolutionized our tier-1 support. We've seen a 60% reduction in wait times within the first month.",
      name: 'Sarah Miller',
      role: 'Head of IT, TechFlow',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLcyVA__nh6rMNDiQujAC1iFU7_meFT-RQaa5nB_ZVXiuFBn8qjUaOFSrt7cHvgqvt0y5goDSj8J52FQRe0KPwbijhI3Io7Lg7WWPdDX8-U9LkP1uq14Kd5CjkDCif82ZuKgxcIAmFDyGq1dHCC_fDQFOy0C4RvGjISckCBu5KiLd-_w0Q3-quLMacuukZAird6NWCZad_kbrWGX6PH2s2vKBE7oNZfLtxY0CtK0XK8q-AT6RkeBK2BAsTsXSz7EGl5BHsFIZzpfM',
    },
    {
      quote: "The multilingual support is flawless. We expanded to the LATAM market overnight without hiring a single new agent.",
      name: 'Marcus Chen',
      role: 'COO, GlobalLogix',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPYxsCI4hsBvi3NyqO3RTg0Pk389QRMRYLrPdTjXB9oInyiYrXHD_W8tkRN7oVfGBFCjnGOeYyTfYb_laoVkbW2WBY8gVPtb3q7KTXKlISkuQnBZpHf5NQMSsQCPoWTztE47CpaIMkj894leipjFWuLxyAPhZhtZNLsNtRh25_vra_UFY5eO8nZUuvtsS_hN5sg8yR40-wRKdbq8Co0nO-XjtSEKm7pYPzEnHuqo_RC0rtIAy0rCFTNJBKu18WAzhwi0I3dzGSX20',
    },
    {
      quote: "Seamless CRM integration. The fact that all call transcripts are automatically logged into Salesforce is a game changer for us.",
      name: 'Elena Rodriguez',
      role: 'Director of CX, FinServe',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjfogQXurfgubDUdJWfUkZQlge9pQQgn_nCJFDIEvynaZJAPknJb2MAo379qI234QXWXJ0uQBe5gOMrQEUvBgWF5vk267yfbtcYGbLVuHsI4OYRD3P_eFEAkkJnZZC8XVPykzIspO8C5pJ2fZB77oorFvTPkjtRA-CmZLM4JJTNpKcauA98xqfS2ujWntMenuPMgp7JDt2NSmEl0tSb_CsCqS-CWuzQkqp2tSLw5nIgjnYP3EZ4Ab8Tur8muXxLjeywW2LgNkB5S8',
    },
  ];

  return (
    <section id="about" className="bg-surface-container-high py-stack-xl">
      <div className="max-w-container-max mx-auto px-margin-desktop">
        <motion.div
          initial={{ opacity: 0, y: isMobile ? 20 : 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="font-headline text-headline-lg text-on-surface">Loved by operations teams</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: isMobile ? 25 : 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="bg-surface p-8 rounded-2xl border border-outline-variant shadow-lg"
            >
              {/* Star Rating */}
              <div className="flex text-tertiary-fixed mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                ))}
              </div>

              <p className="text-body-md text-on-surface-variant mb-8 italic">
                "{rev.quote}"
              </p>

              <div className="flex items-center gap-4">
                <img
                  alt={rev.name}
                  className="w-12 h-12 rounded-full object-cover border border-outline-variant"
                  src={rev.avatar}
                  loading="lazy"
                />
                <div>
                  <div className="font-bold text-label-md text-on-surface">{rev.name}</div>
                  <div className="text-caption text-on-surface-variant">{rev.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
