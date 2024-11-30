import styles from "./LandPage.module.css";

export const LandPage = () => {
  return (
    <div
      className={`min-h-screen w-full flex justify-center items-center ${styles.habbo}`}
    >
      <h1 className="text-8xl">
        <span className={`${styles.letter} ${styles.l}`}>L</span>
        <span className={`${styles.letter} ${styles.a}`}>A</span>
        <span className={`${styles.letter} ${styles.b}`}>B</span>
        <span className={`${styles.letter} ${styles.o}`}>O</span>
        <span className={`${styles.letter} ${styles.r}`}>R</span>
        <span className={`${styles.letter} ${styles.a2}`}>A</span>
        <span className={`${styles.letter} ${styles.s}`}>S</span>
      </h1>
    </div>
  );
};

export default LandPage;
