import React, { useRef, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Username Required"),
  password: Yup.string().required("Password required"),
});

const initialFormState = {
  username: "",
  password: "",
};
const Login = () => {
  const { values, errors, touched, ...formik } = useFormik({
    initialValues: initialFormState,
    validationSchema: LoginSchema,
    onSubmit: handleSubmit,
  });

  const [formSubmitting, setFormSubmitting] = useState(false);
  const { login } = useAuth();
  let navigate = useNavigate();

  async function handleSubmit(values) {
    setFormSubmitting(true);
    try {
      await login({
        username: values.username.trim(),
        password: values.password.trim(),
      });
      navigate("/profile");
    } catch (error) {
      formik.resetForm(initialFormState);
      setFormSubmitting(false);
    }
  }

  const usernameError =
    errors?.username && touched?.username ? errors?.username : null;

  const passwordError =
    errors?.password && touched?.password ? errors?.password : null;

  return (
    <section className="h-100">
      <div className="container h-100 d-flex justify-content-center">
        <div className="row justify-content-center">
          <div className="col"></div>
          <div
            className="col-auto justify-content-center"
            style={{ margin: "auto" }}
          >
            <form onSubmit={formik.handleSubmit}>
              <div className="card text-center">
                <div className="card-header">Log in</div>
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
                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={formSubmitting}
                  >
                    {!formSubmitting ? (
                      "Submit"
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
                      to="/register"
                      className="btn btn-outline-primary btn-block mt-3"
                    >
                      Register me
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

export default Login;
