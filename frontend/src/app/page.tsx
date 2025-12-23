"use client";

import styles from "./landingpage.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <svg
        className={styles.wave}
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="rgba(255,255,255,0.12)"
          d="M0,96L80,112C160,128,320,160,480,170.7C640,181,800,171,960,154.7C1120,139,1280,117,1360,106.7L1440,96L1440,0L0,0Z"
        />
      </svg>
      <h1 className={styles.title}>Keep your team together by organizing projects and tasks in one place</h1>
    </div>
  );
}
