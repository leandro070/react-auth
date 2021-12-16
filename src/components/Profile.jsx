import React, { useEffect, useState } from "react";
import { useProfile } from "../hooks/useProfile";

const Profile = () => {
  const { userProfile, getProfile } = useProfile();

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <section className="h-100">
      <div className="container h-100 d-flex justify-content-center">
        <div className="row justify-content-center">
          <div className="col"></div>
          <div
            className="col-auto justify-content-center"
            style={{ margin: "auto" }}
          >
            <div className="card text-center">
              <div className="card-header">Profile</div>
              <div className="card-body">
                {!userProfile ? (
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  <dl className="row">
                    <dt className="col-sm-3">Name</dt>
                    <dd className="col-sm-9">{userProfile.name}</dd>

                    <dt className="col-sm-3">Street</dt>
                    <dd className="col-sm-9">{userProfile.address?.street}</dd>
                    <dt className="col-sm-3">City</dt>
                    <dd className="col-sm-9">{userProfile.address?.city}</dd>
                    <dt className="col-sm-3">Country</dt>
                    <dd className="col-sm-9">{userProfile.address?.country}</dd>
                  </dl>
                )}
              </div>
            </div>
          </div>
          <div className="col"></div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
