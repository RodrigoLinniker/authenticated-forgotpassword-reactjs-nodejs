import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { Input } from "../../components/Form/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { Eye, EyeSlash } from "phosphor-react";
import { Button } from "../../components/Button";

import api from "../../services/api";
import * as yup from "yup";
import ICredentialsResetPassword from "../../interfaces/credentialsResetPassword";
import { toast } from "react-toastify";

const signInFormSchemaSignup = yup.object().shape({
  password: yup.string().required("Senha obrigatória"),
  passwordConfirm: yup.string().required("Campo obrigatório"),
});

export function ResetPassword({}) {
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [closed, setClosed] = useState(true);
  const [confirmClosed, setConfirmClosed] = useState(true);

  let location = useLocation();
  let params = new URLSearchParams(location.search);
  let token = params.get("token");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICredentialsResetPassword>({
    defaultValues: {
      token: token,
    },
    resolver: yupResolver(signInFormSchemaSignup),
  });

  const navigate = useNavigate();

  useEffect(() => {
    async function verifyToken() {
      await api
        .get(`/reset-password/${token}`)
        .then(() => {
          setIsTokenValid(true);
        })
        .catch((error) => {
          console.log(error);
          setIsTokenValid(false);
        });
    }

    verifyToken();
  }, []);

  const onSubmit = async ({
    token,
    password,
    passwordConfirm,
  }: ICredentialsResetPassword) => {
    try {
      await api.post("/new-password", { token, password, passwordConfirm });
      navigate("/");

      toast.success("Password changed successfully", { autoClose: 2000 });
    } catch (error: any) {
      const { data } = error.response;

      console.log(error);
      toast.error(data, { autoClose: 2000 });
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      {isTokenValid ? (
        <>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex max-w-[360px] bg-gray-800 p-8 rounded-lg flex-col"
          >
            <h1 className="text-center font-bold text-2xl text-green-500">
              Redefinir Senha
            </h1>
            <div className="grid gap-5 mt-3">
              <div className="relative">
                <div
                  className="absolute right-2 top-9 cursor-pointer"
                  onClick={() => setClosed(!closed)}
                >
                  {closed ? <EyeSlash size={24} /> : <Eye size={24} />}
                </div>
                <Input
                  registerResetPassword={register}
                  label="Senha"
                  nameResetPassword="password"
                  errors={errors.password?.message}
                  type={`${closed ? "password" : "text"}`}
                />
              </div>
              <div className="relative">
                <div
                  className="absolute right-2 top-9 cursor-pointer"
                  onClick={() => setConfirmClosed(!confirmClosed)}
                >
                  {confirmClosed ? <EyeSlash size={24} /> : <Eye size={24} />}
                </div>
                <Input
                  registerResetPassword={register}
                  label="Confirme a Senha"
                  nameResetPassword="passwordConfirm"
                  errors={errors.password?.message}
                  type={`${closed ? "password" : "text"}`}
                />
              </div>
            </div>
            <Button type="submit" title="Redefinir senha" />
          </form>
        </>
      ) : (
        <>
          <div>
            <h1>Token expirou, envie outro E-mail</h1>
          </div>
        </>
      )}
    </div>
  );
}
