import React, { Fragment, useState, useEffect } from "react";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import FormInput from "../components/FormInput";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../redux/apiCalls";
import styled from "styled-components";
const Button = styled.button`
  cursor: pointer;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Error = styled.span`
  color: red;
`;
const SignIn = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    UserEmail: "",
    PasswordHash: "",
  });
  useEffect(() => {
    document.title = "Sign in";
    if (currentUser) {
      return navigate("/");
    }
  }, [currentUser, navigate]);

  const inputs = [
    {
      id: 1,
      name: "UserEmail",
      placeholder: "Email",
      errorMessage: "Enter your email!",
      label: "Email",
      required: true,
    },
    {
      id: 2,
      name: "PasswordHash",
      type: "password",
      placeholder: "Password",
      errorMessage: "Enter your password!",
      label: "Password",
      required: true,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    signin(
      dispatch,
      { UserEmail: values.UserEmail, PasswordHash: values.PasswordHash },
      location.state?.previousPage
    );
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <Fragment>
      <Header />
      <section className="section section-header-offset">
        <div className="signin-container container">
          <form onSubmit={handleSubmit}>
            <h1 className="title">Sign in</h1>
            {inputs.map((input) => (
              <FormInput
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={onChange}
              />
            ))}
            <Button className="btn btn-primary">Submit</Button>
            <div className="signin-bottom">
              <a href="/recover_password" className="forgot">
                Forgot your password?
              </a>
              <span className="new">
                Don't have an account yet?
                <Link
                  to="/signup"
                  state={{ previousPage: location.state?.previousPage }}
                >
                  Sign up!
                </Link>
              </span>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </Fragment>
  );
};

export default SignIn;
