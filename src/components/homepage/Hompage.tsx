import styles from "./homepage.module.css";
import GroupsIcon from "@mui/icons-material/Groups";
import DevicesIcon from "@mui/icons-material/Devices";
import PsychologyIcon from "@mui/icons-material/Psychology";

//Homepage
function Hompage() {
  return (
    <div className={styles.main}>
      <section className={styles["insurance-image"]}>
        <h1>Futura Insurance</h1>
        <h1>Flexible Business Insurance that Grows with You.</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
          expedita sit impedit quaerat praesentium repudiandae aliquid similique
          quo magnam minima odio ducimus sequi reprehenderit, incidunt, eius
          quae, quia odit repellat veniam illum reiciendis. Vero itaque,
          quibusdam corporis eaque delectus ea error voluptatem ad magni, totam,
          sequi debitis. Expedita aut quaerat, ipsam, voluptas temporibus,
          voluptates tenetur harum culpa quibusdam pariatur placeat.
        </p>
      </section>
      <section>
        <span className={styles["sub-sections"]}>
          <article className={styles.plan}>
            <PsychologyIcon style={{ width: "40px", height: "40px" }} />
            <h1>Planning and Consulting</h1>
            <p>
              We provide support to insurance companies in planning and
              implementing Product configuration, modernization of legacy
              applications, Technical and Business Solutions, and Post
              Production services
            </p>
          </article>
          <article className={styles.tech}>
            <DevicesIcon style={{ width: "40px", height: "40px" }} />
            <h1>Technologies</h1>
            <p>
              Having the core technology expertise we provide hassle-free
              Migration, Transformation and Business Process Re-engineering
              services to insurance companies to achieve their business
              objectives{" "}
            </p>
          </article>
          <article className={styles.collab}>
            <GroupsIcon style={{ width: "40px", height: "40px" }} />
            <h1>Collaboration</h1>
            <p>
              Bridging Insurance and Product Software companies in the areas of
              Migration of data from legacy system to target system, Product
              Configuration, UAT support and Product implementation{" "}
            </p>
          </article>
        </span>
      </section>
    </div>
  );
}

export default Hompage;
