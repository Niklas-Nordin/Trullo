import styles from "./trustedBySection.module.css";
import {trustedByLogos} from "@/lib/data";
import {useEffect, useRef, useState} from "react";

function TrustedBySection() {
  const marqueeRef = useRef<HTMLDivElement | null>(null);
  const sequenceRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [copies, setCopies] = useState(2);

  useEffect(() => {
    const marquee = marqueeRef.current;
    const seq = sequenceRef.current;
    const track = trackRef.current;
    if (!marquee || !seq || !track) return;

    const marqueeW = marquee.offsetWidth;
    const seqW = seq.scrollWidth;

    const needed = Math.max(2, Math.ceil((marqueeW * 2) / seqW));
    setCopies(needed);

    track.style.setProperty("--seq-width", `${seqW}px`);
    const speed = 80;
    const duration = Math.max(6, seqW / speed);
    track.style.setProperty("--duration", `${duration}s`);
  }, []);

  return (
    <section className={styles.container}>
        <h2 className={styles.sectionTitle}>Trusted by leading companies I've made up</h2>
        <div className={styles.marquee} ref={marqueeRef}>
            <div className={styles.track} ref={trackRef}>
                {Array.from({length: copies}).map((_, copyIdx) => (
                    <div
                        key={`seq-${copyIdx}`}
                        className={styles.sequence}
                        ref={copyIdx === 0 ? sequenceRef : null}
                        aria-hidden={copyIdx === 0 ? undefined : true}
                    >
                        {trustedByLogos.map((logo, index) => (
                            <span key={`logo-${copyIdx}-${index}`} className={styles.logoItem}>{logo.name}</span>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
}

export default TrustedBySection;