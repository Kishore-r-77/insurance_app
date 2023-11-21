import styles from "./aboutPage.module.css";

function AboutPage() {
  return (
    <div className={styles["about-main"]}>
      <section className={styles["office-group"]}>
        <h1>About</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia itaque
          dolor placeat iure alias ipsa voluptate labore iste nam asperiores!
          Necessitatibus, dolor? Ad, nostrum? Delectus illum consequatur
          exercitationem repudiandae adipisci.
        </p>
      </section>
      <section>
        <h1 id={styles["submenu-title"]}>About Insurance</h1>
        <article className={styles.submenu}>
          <section className={styles.box}>
            <h1>Lorem ipsum dolor sit amet.</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Reprehenderit consequatur ad rem! Ipsa excepturi quidem blanditiis
              vero, sed sit tempora.
            </p>
          </section>
          <section className={styles.box}>
            <h1>Lorem ipsum dolor sit amet.</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Reprehenderit consequatur ad rem! Ipsa excepturi quidem blanditiis
              vero, sed sit tempora.
            </p>
          </section>
          <section className={styles.box}>
            <h1>Lorem ipsum dolor sit amet.</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Reprehenderit consequatur ad rem! Ipsa excepturi quidem blanditiis
              vero, sed sit tempora.
            </p>
          </section>
        </article>
        <article className={styles.submenu}>
          <section className={styles.box}>
            <h1>Lorem ipsum dolor sit amet.</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Reprehenderit consequatur ad rem! Ipsa excepturi quidem blanditiis
              vero, sed sit tempora.
            </p>
          </section>
          <section className={styles.box}>
            <h1>Lorem ipsum dolor sit amet.</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Reprehenderit consequatur ad rem! Ipsa excepturi quidem blanditiis
              vero, sed sit tempora.
            </p>
          </section>
          <section className={styles.box}>
            <h1>Lorem ipsum dolor sit amet.</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Reprehenderit consequatur ad rem! Ipsa excepturi quidem blanditiis
              vero, sed sit tempora.
            </p>
          </section>
        </article>
      </section>
      <br />
    </div>
  );
}

export default AboutPage;
