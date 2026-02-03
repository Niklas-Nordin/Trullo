import styles from "./accordion.module.css";
import { faqItems } from "@/lib/data";
import { useState } from "react";
import {motion, AnimatePresence} from "framer-motion";
import { div } from "framer-motion/client";


function Accordion() {
    const [openId, setOpenId] = useState<number[]>([]);

    const toggleAccordion = (id: number) => {
        setOpenId(prev => {
            if (prev.includes(id)) {
                return prev.filter(item => item !== id);
            } else {
                return [...prev, id];
            }
        });
    };

  return (
    <div className={styles.accordionContainer}>
        {/* <div className={styles.div}></div> */}
        <h2 className={styles.accordionTitle}>Frequently Asked Questions</h2>
        <ul className={styles.accordionList}>
            {faqItems.map((item) => (
                <li key={item.id} className={styles.accordionItem}>
                    <button onClick={() => toggleAccordion(item.id)} className={styles.accordionQuestion}>
                        {item.title}
                        <span className={styles.icon}>{openId.includes(item.id) ? "−" : "+"}</span>
                    </button>
                    <motion.div
                    initial={false}
                    animate={{
                        maxHeight: openId.includes(item.id) ? 500 : 0,
                        opacity: openId.includes(item.id) ? 1 : 0,
                    }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className={styles.accordionAnswer}
                    >
                    <div className={styles.accordionInner}>
                        {item.content}
                    </div>
                    </motion.div>
                </li>
            ))}
        </ul>
    </div>
  );
}

export default Accordion;