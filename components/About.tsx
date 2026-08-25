'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Target, Monitor, TrendingUp, Heart, MessageCircle } from 'lucide-react'
import { DIFFERENTIATORS, WHATSAPP_URL } from '@/lib/constants'
import { trackLead } from '@/components/Analytics'

const iconMap = {
  Target,
  Monitor,
  TrendingUp,
  Heart,
}

export default function About() {
  return (
    <section id="about" className="section-padding bg-background-secondary">
      <div className="container-max">

        {/* HERO STORY */}
        <motion.div
          className="max-w-6xl mx-auto mb-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-section text-primary mb-12 text-center">
            הסיפור שלי
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">

            {/* IMAGE SIDE */}
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">

                {/* Glow */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/30 to-primary/20 blur-2xl opacity-70"></div>

                {/* Image */}
                <div className="relative w-72 h-80 md:w-80 md:h-[420px] rounded-3xl overflow-hidden border-4 border-accent/20 shadow-2xl">
                  <Image
                    src="/images/ben.jpg"
                    alt="בן כפיר - מורה פרטי למתמטיקה"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Badge */}
                <motion.div
                  className="absolute -bottom-4 -left-4 bg-accent text-gray-900 text-sm font-bold px-4 py-2 rounded-full shadow-xl"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, type: 'spring' }}
                >
                  100 בבגרות 🎯
                </motion.div>

              </div>
            </motion.div>

            {/* TEXT SIDE */}
            <div className="space-y-6 text-lg leading-relaxed text-text">

              {/* Highlight card */}
              <div>
                <p>
                  כשהייתי בתיכון, מתמטיקה הייתה השוביר שלי. 3 יחידות, ציונים בינוניים, ותחושה שזה פשוט לא בשבילי.
                </p>
              </div>

              <p>
                ואז הבנתי שאין לי עניין עם המתמטיקה - יש לי עניין עם הדרך שלימדו אותי אותה.
              </p>

              <p>
                התחלתי לפרק כל נושא לחתיכות קטנות שאפשר לעכל, מצאתי את הסדר הנכון, והצלחתי לעלות מ-3 ל-4 ל-5 יחידות תוך שנה.
                <span className="block mt-2 font-bold text-primary text-xl">
                  חודשיים לפני הבגרות עברתי ל-5 יחידות - וקיבלתי 100.
                </span>
              </p>

              <p>
                החוויה הזו שינתה לי את החיים. התאהבתי במתמטיקה והלכתי ללמוד מתמטיקה
                <span className="font-bold text-primary"> באוניברסיטה העברית בירושלים</span>,
                וסיימתי את התואר <span className="font-bold text-primary">בהצטיינות</span>.
              </p>

              <div className="bg-accent/5 border border-accent/10 rounded-2xl p-6">
                <p className="font-medium">
                  בזכות המסע הזה, אני מבין בדיוק מה עובר על תלמיד שמתקשה - פחד, לחץ, חוסר ביטחון.
                </p>
                <p className="mt-3 font-bold text-primary">
                  אני לא רק מלמד מתמטיקה - אני מלמד איך ללמוד בלי פחד.
                </p>
              </div>

              <a
                href={WHATSAPP_URL}
                onClick={trackLead}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-medium transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                דברו איתי בוואטסאפ
              </a>

            </div>
          </div>
        </motion.div>

        {/* DIFFERENTIATORS */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-section text-primary mb-4">
            למה מתמטיק?
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DIFFERENTIATORS.map((item, index) => {
            const Icon = iconMap[item.icon]
            return (
              <motion.div
                key={item.title}
                className="bg-white rounded-2xl p-8 text-center shadow-sm"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Icon className="w-8 h-8 text-accent" />
                </div>

                <h3 className="text-xl font-bold text-primary mb-3">
                  {item.title}
                </h3>

                <p className="text-text-light leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}