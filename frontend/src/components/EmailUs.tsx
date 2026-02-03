import styles from "./emailUs.module.css";

function EmailUs() {
  return (
    <form className={styles.container}>
        <h3 className={styles.title}>Send us a message</h3>
        <div className={styles.nameContainer}>
            <div className={styles.nameSection}>
                <label className={styles.label} htmlFor="firstname">First Name</label>
                <input className={`${styles.input} ${styles.name}`}   required placeholder="John" type="text" id="firstname" />
            </div>
            <div className={styles.nameSection}>
                <label className={styles.label} htmlFor="lastname">Last Name</label>
                <input className={`${styles.input} ${styles.name}`}  required placeholder="Star" type="text" id="lastname" />
            </div>
        </div>
        <label className={styles.label} htmlFor="email">Email</label>
        <input required placeholder="john@example.com" className={styles.input} type="email" id="email" />
        <label className={styles.label} htmlFor="message">Message</label>
        <textarea required placeholder="How can we help?" name="message" id="message" className={styles.textarea}></textarea>
        <button className={styles.button}>Send Message</button>
    </form>
  );
}

export default EmailUs;