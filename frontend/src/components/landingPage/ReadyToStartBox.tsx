import styles from "./readyToStartBox.module.css";
import GetStartedButton from "./GetStartedButton";

function ReadyToStartBox() {
  return (
    <div className={styles.container}>
        <h2 className={styles.title}>Ready to start?</h2>
        <p className={styles.description}>Join over 10 000+ projects using Trullo</p>
        <GetStartedButton size="small" />
    </div>
  );
}

export default ReadyToStartBox;