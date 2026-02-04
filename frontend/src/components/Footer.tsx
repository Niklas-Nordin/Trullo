import styles from "./footer.module.css"
import Link from "next/link";

function Footer() {

    const year = new Date().getFullYear()
    
  return (
    <footer className={styles.container}>
        <img className={styles.logo} src="./FlowLine.png" alt="FlowLine logo" />
        <div className={styles.linkContainer}>
            <Link className={styles.link} href="/">About</Link>
            <Link className={styles.link} href="/">Contact</Link>
            <Link className={styles.link} href="/">Support</Link>
            <Link className={styles.link} href="/">Privacy</Link>
            <Link className={styles.link} href="/">Terms</Link>
        </div>
        <div className={styles.contactInfoContainer}>
            <div className={styles.contactInfo}>
                <img className={styles.icon} src="./phone.svg" alt="Phone icon" />
                <span>073 098 22 21</span>
            </div>
            <div className={styles.contactInfo}>
                <img className={styles.icon} src="./mail.svg" alt="Email icon" />
                <span>niklas@nordindev.se</span>
            </div>
            <div className={styles.contactInfo}>
                <img className={styles.icon} src="./position.svg" alt="Position location icon" />
                <span>Sturevägen 1C, 13338 Saltsjöbaden</span>
            </div>
        </div>
        <p className={styles.copyright}>© {year} NordinDev</p>
    </footer>
  );
}

export default Footer;