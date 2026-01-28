import styles from './wave.module.css';

function Wave() {
  return (
    <div className={styles.reviewsSection}>
        <div className={styles.waveTop}>
            <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
                <path d="M0,40 C240,10 480,10 720,40 C960,70 1200,70 1440,40 L1440,120 L0,120 Z" fill="#ffffff"/>
            </svg>
        </div>
    </div>
  );
}

export default Wave;