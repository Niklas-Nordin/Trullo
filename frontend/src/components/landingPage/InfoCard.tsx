import styles from "./infoCard.module.css";

function Card() {
  return (
<section className={styles.reviewsSection}>
  <div className={styles.waveTop}>
    <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
      <path
        d="M0,40 Q360,0 720,40 T1440,40 L1440,120 L0,120 Z"
        fill="#ffffff"
      />
    </svg>
  </div>

  <h2>Made for Humans</h2>
  <p>Collaboration doesn't have to be clinical…</p>
</section>

  );
}

export default Card;