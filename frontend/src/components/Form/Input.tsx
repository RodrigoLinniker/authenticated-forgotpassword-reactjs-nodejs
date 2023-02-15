import { InputHTMLAttributes } from "react";
import { Path, UseFormRegister } from "react-hook-form";
import ICredentialsCreate from "../../interfaces/credentialsCreate";
import ICredentialsDev from "../../interfaces/credentialsDev";
import ICredentialsForgotPassword from "../../interfaces/credentialsForgotPassword";
import ICredentialsResetPassword from "../../interfaces/credentialsResetPassword";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name?: Path<ICredentialsCreate>;
  nameLogin?: Path<ICredentialsDev>;
  nameForgotPassword?: Path<ICredentialsForgotPassword>;
  nameResetPassword?: Path<ICredentialsResetPassword>;
  label?: string;
  errors?: string;
  register?: UseFormRegister<ICredentialsCreate>;
  registerLogin?: UseFormRegister<ICredentialsDev>;
  registerForgotPassword?: UseFormRegister<ICredentialsForgotPassword>;
  registerResetPassword?: UseFormRegister<ICredentialsResetPassword>;
}

export function Input({
  name,
  label,
  errors,
  register,
  nameLogin,
  nameForgotPassword,
  nameResetPassword,
  registerForgotPassword,
  registerResetPassword,
  registerLogin,
  ...rest
}: InputProps) {
  return (
    <div>
      {!!label && <label htmlFor="email">{label}</label>}
      {name && (
        <input
          name={name}
          id={name}
          {...(register && register(name))}
          className="w-full rounded-md bg-gray-700 border px-3 py-2 text-white  focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm md:text-md lg:text-lg"
          {...rest}
        />
      )}{" "}
      {nameLogin && (
        <input
          name={nameLogin}
          id={nameLogin}
          {...(registerLogin && registerLogin(nameLogin))}
          className="w-full rounded-md bg-gray-700 border px-3 py-2 text-white  focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm md:text-md lg:text-lg"
          {...rest}
        />
      )}
      {nameForgotPassword && (
        <input
          name={nameForgotPassword}
          id={nameForgotPassword}
          {...(registerForgotPassword &&
            registerForgotPassword(nameForgotPassword))}
          className="w-full rounded-md mt-2 bg-gray-700 border px-3 py-2 text-white  focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm md:text-md lg:text-lg"
          {...rest}
        />
      )}
      {nameResetPassword && (
        <input
          name={nameResetPassword}
          id={nameResetPassword}
          {...(registerResetPassword &&
            registerResetPassword(nameResetPassword))}
          className="w-full rounded-md bg-gray-700 border px-3 py-2 text-white  focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm md:text-md lg:text-lg"
          {...rest}
        />
      )}
      <span className="text-red-500">{errors}</span>
    </div>
  );
}
