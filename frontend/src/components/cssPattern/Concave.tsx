import styles from "./concave.module.css";

function Concave() {
  return (
    <div className={styles.concave}>
    <div className="bottom-wave-container">
      <svg preserveAspectRatio="none" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
      <path className="shape-fill" d="M0,0 C300,120 900,120 1200,0 L1200,120 L0,120 Z" opacity="0.4" fill="rgb(252, 211, 77)"></path>
      <path className="shape-fill" d="M0,40 C300,140 900,140 1200,40 L1200,120 L0,120 Z" fill="rgb(252, 211, 77)"></path>
      </svg>
    </div>
    </div>
  );
}

export default Concave;