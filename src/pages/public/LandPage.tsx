import styles from "./LandPage.module.css";

export const LandPage = () => {
  return (
    <div className="flex flex-col justify-center min-h-screen w-full items-center">
      <h1 className={`text-8xl ${styles.habbo}`}>
        <span className={`${styles.letter} ${styles.l}`}>L</span>
        <span className={`${styles.letter} ${styles.a}`}>A</span>
        <span className={`${styles.letter} ${styles.b}`}>B</span>
        <span className={`${styles.letter} ${styles.o}`}>O</span>
        <span className={`${styles.letter} ${styles.r}`}>R</span>
        <span className={`${styles.letter} ${styles.a2}`}>A</span>
        <span className={`${styles.letter} ${styles.s}`}>S</span>
      </h1>
      <div className={`${styles.loader}`}>
        <p>Feito por</p>
        <div className={`${styles.words}`}>
          <span className={`${styles.word}`}>Ryan Faustino</span>
          <span className={`${styles.word}`}>Bianca Bezerra</span>
          <span className={`${styles.word}`}>Ruan Macedo</span>
          <span className={`${styles.word}`}>Antonio Meireles</span>
          <span className={`${styles.word}`}>Hermínio Neto</span>
        </div>
      </div>
    </div>
  );
};

export default LandPage;
