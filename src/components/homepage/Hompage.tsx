import styles from "./homepage.module.css";
import GroupsIcon from "@mui/icons-material/Groups";
import DevicesIcon from "@mui/icons-material/Devices";
import PsychologyIcon from "@mui/icons-material/Psychology";

//Homepage
function Hompage() {
  return (
    <div className={styles.main}>
      <section className={styles["insurance-image"]}>
        <h1>Insurance</h1>
        <p>
          With the advent of modern modes of transportation of merchandise and
          mortals by air, water, road or rail, there is a quantum surge in their
          transit for commercial as well as entertainment objective. During the
          freightage, there is an inherent vulnerability of “loss” ascribed to
          natural as well as man made conflicts. The trades and commerce of the
          21st century takes cognizant of the “calamity” and tries to
          financially “redress” the loss to ensure unhindered trade. “Insurance”
          is the only magic wand which could indemnify the adversity and
          guarantee unbridled business.
        </p>
        <br />
        <p>
          Every business is instituted on a concept. For example, Banks are
          based on the doctrine of “regulated monetary flow” under the purview
          of a Regulatory Authority. Similarly, Insurance is instituted on the
          principle of “fear of loss of goods or lives”. It is nonchalant to
          place a price tag on merchandise but very excruciating to do so on
          human lives as each life is priceless. The financial compensation of
          assets both moveable and immovable are rendered by “General Insurance”
          while that of human lives which solicits a delicate handling is
          administered by “Life and Health Insurance” companies.
        </p>
      </section>
      <section>
        <span className={styles["sub-sections"]}>
          <article className={styles.plan}>
            <PsychologyIcon style={{ width: "40px", height: "40px" }} />
            <h1>Planning and Consulting</h1>
            <p>
              FuturaInsTech is an ensemble of a handful of doyens of the
              Insurance and Information Technology (IT) industry with
              accomplished track record in the Insurance sector globally. We
              administer consultancy service for Insurance client based on the
              exigency of the Client. We gauge the stipulations to its relevance
              as per the prevalent global business practices. Our dexterity
              hinges on efficacious Product Configuration, revamp of legacy
              systems, Business Solutions and Technical protocols in addition to
              unblemished Post Production Services.
            </p>
          </article>
          <article className={styles.tech}>
            <DevicesIcon style={{ width: "40px", height: "40px" }} />
            <h1>Technologies</h1>
            <p>
              Possessing cutting edge Technology in the IT sector, we provide
              unrestrained migration across Business Platforms. We also
              administer Business Process Re-Engineering services to Insurance
              Companies with an endeavour to achieve their Business objectives.
            </p>
          </article>
          <article className={styles.collab}>
            <GroupsIcon style={{ width: "40px", height: "40px" }} />
            <h1>Collaboration</h1>
            <p>
              With our robust User Acceptance Testing (UAT) / Modal Office
              Testing (MOT) and Mock Stimulated Business Environment Testing we
              ensure that the Client Products continue to work hassle free.
            </p>
          </article>
        </span>
      </section>
    </div>
  );
}

export default Hompage;
