import { useAppSelector } from "../../redux/app/hooks";
import styles from "./profile.module.css";

type ProfileProps = {
  name: string;
  email: string;
  phone: string;
  userGroupName: string;
};

const Profile = () => {
  const userObj: ProfileProps = useAppSelector(
    (state) => state?.users?.user?.message
  );
  return (
    <div className={styles["profile-body"]}>
      <div className={styles["profile-container"]}>
        <h1>Profile</h1>
        <div className={styles["profile-item"]}>
          <strong>Name:</strong> {userObj?.name}
        </div>
        <div className={styles["profile-item"]}>
          <strong>Email:</strong> {userObj?.email}
        </div>
        <div className={styles["profile-item"]}>
          <strong>Phone:</strong> {userObj?.phone}
        </div>
        <div className={styles["profile-item"]}>
          <strong>Role:</strong> {userObj?.userGroupName}
        </div>
      </div>
    </div>
  );
};

export default Profile;
