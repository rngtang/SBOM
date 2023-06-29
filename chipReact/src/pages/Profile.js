import React from 'react';
import styles from './GenerateSBOMs.module.css';
import user1 from '../data/user.json';

const Profile = () => {
  const { username, netid, platformSettings, profileInformation } = user1;

  return (
    <div className={styles.section}>
      <div className={styles.profileContainer}>
        <div className={styles.leftHeader}>
          <h2>{username}</h2>
          <p>{netid}</p>
          
        </div>

        <div className={styles.profileSection}>
          <div className={styles.leftSection}>
            <h4>Platform Settings</h4>
            <div className={styles.toggleContainer}>
              <label>
                Email Updates
                <input type="checkbox" checked={platformSettings.emailUpdates} readOnly />
              </label>
              <label>
                Text Updates
                <input type="checkbox" checked={platformSettings.textUpdates} readOnly />
              </label>
              <label>
                Monthly Newsletter
                <input type="checkbox" checked={platformSettings.monthlyNewsletter} readOnly />
              </label>
            </div>
          </div>

          <div className={styles.rightSection}>
            <h4>Profile Information</h4>
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
