import styles from "./getStartedButton.module.css";

type Props = {
  size?: "small" | "large";
};

function GetStartedButton({size = "small"}: Props) {

  return (
    <>
      <button className={`${styles.button} ${styles[size]}`}>Get started</button>
    </>
  );
}

export default GetStartedButton;