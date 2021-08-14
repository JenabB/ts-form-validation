import React from "react";
import { useForm } from "react-hook-form";

function later(delay: number) {
  return new Promise(function (resolve) {
    setTimeout(resolve, delay);
  });
}

type formInputs = {
  fullName: string;
  email: symbol;
  password: string;
  confirmPassword: string;
  agree: boolean;
  subscribe: boolean;
};

function Form() {
  const {
    register,
    formState: { errors },
    formState,
    reset,
    handleSubmit,
  } = useForm<formInputs>();

  const onSubmit = async (data: formInputs) => {
    console.log(data);
    await later(3000);
    alert("register succesful");
    reset();
  };
  return (
    <div>
      <h1>Create an Account</h1>
      <form>
        <label>Fullname *</label>
        <input type="text" {...register("fullName", { required: true })} />

        {errors.fullName && <p className="error">full name required</p>}

        <label>Email *</label>
        <input
          type="text"
          {...register("email", {
            required: true,
            pattern:
              // eslint-disable-next-line no-useless-escape
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })}
        />
        {errors.email?.type === "required" && (
          <p className="error">Email required</p>
        )}
        {errors.email?.type === "pattern" && (
          <p className="error">Email invalid</p>
        )}

        <label htmlFor="">Password *</label>
        <input
          {...register("password", { required: "Password required" })}
          type="password"
          autoComplete="new-password"
        />

        {errors.password && (
          <p className="error"> {errors.password.message} </p>
        )}

        <label htmlFor="">Confirm Password *</label>
        <input
          type="password"
          {...register("confirmPassword", {
            required: "Password required",
          })}
          autoComplete="news-password"
        />

        {errors.confirmPassword && (
          <p className="error"> {errors.confirmPassword.message} </p>
        )}

        <label className="row">
          <input {...register("agree", { required: true })} type="checkbox" />
          <span>I Agree to Term of Services and Privacy Policy *</span>
        </label>
        {errors.agree?.type === "required" && "agreement required"}

        <label className="row">
          <input type="checkbox" {...register("subscribe")} />
          <span>Subscribe to newsletter</span>
        </label>

        <button
          type="button"
          onClick={handleSubmit(onSubmit)}
          disabled={formState.isSubmitting}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Form;
