import styles from "./hero.module.css";

function Hero() {
  return (
    <div className={styles.container}>
        <h1 className={styles.title}>Simplify Your Workflow</h1>
        <img className={styles.kanbanImage} src="./kanban-image.png" alt="A kanban image" />
        <h2 className={styles.subtitle}>Keep your team together by organizing projects and tasks in one place</h2>
        <button className={`${styles.getStartedButton} ${styles.button}`}>Get started</button>
        
    </div>
  );
}

export default Hero;