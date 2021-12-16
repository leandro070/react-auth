import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useAuth } from "../hooks/useAuth";
import { useGeneral } from "../hooks/useGeneral";

const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Username too short")
    .max(100, "Username too long")
    .required("Username Required"),
  password: Yup.string()
    .min(8, "Password too short")
    .required("Password required"),
  name: Yup.string()
    .min(2, "Name too short")
    .max(100, "Name too long")
    .required("Name required"),
  address: Yup.string()
    .min(2, "Name too short")
    .max(100, "Name too long")
    .required("Name required"),
  cityId: Yup.string().required("City required"),
});

const initialFormState = {
  username: "",
  password: "",
  name: "",
  address: "",
  cityId: "",
};

const Register = () => {
  const { values, errors, touched, ...formik } = useFormik({
    initialValues: initialFormState,
    validationSchema: RegisterSchema,
    onSubmit: handleSubmit,
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [countrySelected, setCountrySelected] = useState(null);
  const { countries, getCountries, cities, getCitiesByCountryId } =
    useGeneral();
  const { register } = useAuth();
  let navigate = useNavigate();

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    if (countrySelected) {
      getCitiesByCountryId(countrySelected);
    }
  }, [countrySelected]);

  async function handleSubmit(values) {
    setFormSubmitting(true);
    try {
      await register({
        username: values.username.trim(),
        password: values.password.trim(),
        name: values.name.trim(),
        address: values.address.trim(),
        cityId: Number(values.cityId),
      });
      navigate("/login");
    } catch (error) {
      setFormSubmitting(false);
    }
  }

  const usernameError =
    errors?.username && touched?.username ? errors?.username : null;

  const passwordError =
    errors?.password && touched?.password ? errors?.password : null;

  const nameError = errors?.name && touched?.name ? errors?.name : null;

  const addressError =
    errors?.address && touched?.address ? errors?.address : null;

  const cityIdError = errors?.cityId && touched?.cityId ? errors?.cityId : null;

  return (
    <section className="h-100">
      <div className="container h-100 d-flex justify-content-center">
        <div className="row justify-content-center">
          <div className="col"></div>
          <div
            className="col-auto justify-content-center"
            style={{ margin: "auto" }}
          >
            <form onSubmit={formik.handleSubmit} className="needs-validation">
              <div className="card text-center">
                <div className="card-header">Register</div>
                <div className="card-body">
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Username
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        usernameError ? "is-invalid" : ""
                      }`}
                      name="username"
                      value={values.username}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {usernameError ? (
                      <div className="invalid-feedback d-block">
                        {usernameError}
                      </div>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className={`form-control ${
                        passwordError ? "is-invalid" : ""
                      }`}
                      name="password"
                      value={values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {passwordError ? (
                      <div className="invalid-feedback d-block">
                        {passwordError}
                      </div>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        nameError ? "is-invalid" : ""
                      }`}
                      name="name"
                      value={values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {nameError ? (
                      <div className="invalid-feedback d-block">
                        {nameError}
                      </div>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">
                      Address
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        addressError ? "is-invalid" : ""
                      }`}
                      name="address"
                      value={values.address}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {addressError ? (
                      <div className="invalid-feedback d-block">
                        {addressError}
                      </div>
                    ) : null}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="country" className="form-label">
                      Country
                    </label>
                    <select
                      className="form-select"
                      onChange={(e) => setCountrySelected(e.target.value)}
                      onBlur={formik.handleBlur}
                    >
                      <option selected disabled>
                        Select a country
                      </option>
                      {countries.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="city" className="form-label">
                      City
                    </label>
                    <select
                      className={`form-control ${
                        cityIdError ? "is-invalid" : ""
                      }`}
                      name="cityId"
                      disabled={!countrySelected}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option selected disabled>
                        Select a city
                      </option>
                      {cities.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                    {cityIdError ? (
                      <div className="invalid-feedback d-block">
                        {cityIdError}
                      </div>
                    ) : null}
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={formSubmitting}
                  >
                    {!formSubmitting ? (
                      "Register"
                    ) : (
                      <>
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Submitting...
                      </>
                    )}
                  </button>
                  <p className="text-center">
                    <Link
                      to="/login"
                      className="btn btn-outline-primary btn-block mt-3"
                    >
                      Login
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
          <div className="col"></div>
        </div>
      </div>
    </section>
  );
};

export default Register;
