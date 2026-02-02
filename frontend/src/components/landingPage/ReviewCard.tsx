import { reviews } from "@/lib/data";
import styles from "./reviewCard.module.css";

function ReviewCard() {
  return (
    <section className={styles.container}>
        <h2 className={styles.title}>What our users say</h2>
        <ul className={styles.cardContainer}>
            {reviews.map(review => (
                <li key={review.id} className={styles.card}>
                    <img className={styles.stars} src="./stars.svg" alt="5 rating stars" />
                    <p className={styles.reviewText}>{review.review}</p>
                    <div className={styles.reviewerInfo}>
                        <div className={styles.avatar}></div>
                        <div className={styles.reviewerDetails}>
                            <h3 className={styles.reviewerName}>{review.name}</h3>
                            <p className={styles.reviewerRole}>{review.role}</p>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    </section>
  );
}

export default ReviewCard;