import styles from "./infoCard.module.css";
import {steps} from "@/lib/data";

function Card() {
  return (
<section className={styles.container}>
  <h2 className={styles.title}>How It Works</h2>
  <p className={styles.description}>Trullo helps teams organize and manage their work efficiently.</p>

  <ol className={styles.stepsList}>
    {steps.map(step => (
      <li key={step.step} className={styles.card}>
        <div className={styles.stepCircle}>{step.step}</div>
        <h3 className={styles.stepTitle}>{step.title}</h3>
        <p className={styles.stepDescription}>{step.description}</p>
      </li>
    ))}
  </ol>
</section>

  );
}

export default Card;