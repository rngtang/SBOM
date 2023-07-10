import React from 'react';
import styles from './Profile.module.css';
import boxStyles from './GenerateSBOMs.module.css';
import user1 from '../data/user.json';

const Profile = () => {
  const { username, netid, platformSettings, profileInformation } = user1;

  return (
    <div className={boxStyles.section}>
      <div className={styles.profileContainer}>
        <div className={styles.leftHeader}>
          <h2>{username}</h2>
          {/* <p>{netid}</p> */}
          
        </div>

        <div className={styles.profileSection}>
          <div className={styles.leftSection}>
            <h5>Platform Settings</h5>
            <div className={styles.toggleContainer}>
              <label>
                Email Updates
                <input type="checkbox" />
              </label>
              <label>
                Text Updates
                <input type="checkbox" />
              </label>
              <label>
                Monthly Newsletter
                <input type="checkbox" />
              </label>
            </div>
          </div>

          <div className={styles.rightSection}>
            <h5>Profile Information</h5>
            <p>
              <strong>Full Name: </strong>
              {profileInformation.fullName}
            </p>
            <p>
              <strong>Mobile Number: </strong>
              {profileInformation.mobileNumber}
            </p>
            <p>
              <strong>Email: </strong>
              {profileInformation.email}
            </p>
            <p>
              <strong> Position: </strong>
              {profileInformation.position}
            </p>
            <p>
              <strong> # of SBOMs made: </strong>
              {profileInformation.sbomCounter}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
