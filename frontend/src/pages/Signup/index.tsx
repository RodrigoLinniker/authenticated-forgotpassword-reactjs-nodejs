import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import api from "../../services/api";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ICredentialsCreate from "../../interfaces/credentialsCreate";
import { Eye, EyeSlash } from "phosphor-react";
import { Input } from "../../components/Form/Input";
import { toast } from "react-toastify";

const signInFormSchemaSignup = yup.object().shape({
  email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
  password: yup.string().required("Senha obrigatória"),
  confirmPassword: yup.string().required("Campo obrigatório"),
});

export function Signup() {
  const [closed, setClosed] = useState(true);
  const [confirmClosed, setConfirmClosed] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICredentialsCreate>({
    resolver: yupResolver(signInFormSchemaSignup),
  });

  const navigate = useNavigate();

  const onSubmit = async ({
    email,
    password,
    confirmPassword,
  }: ICredentialsCreate) => {
    try {
      await api.post("/users", { email, password, confirmPassword });
      navigate("/");

      toast.success("User create Success", { autoClose: 2000 });
    } catch (error: any) {
      const { data } = error.response;

      console.log(error);
      toast.error(data, { autoClose: 2000 });
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <form
        className="w-full flex max-w-[360px] bg-gray-800 p-8 rounded-lg flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-center font-bold text-2xl text-green-500">
          Cadastre-se
        </h1>
        <div className="grid gap-5 mt-3">
          <Input
            register={register}
            label="Email"
            name="email"
            type="email"
            errors={errors.email?.message}
          />

          <div className="relative">
            <div
              className="absolute right-2 top-9 cursor-pointer"
              onClick={() => setClosed(!closed)}
            >
              {closed ? <EyeSlash size={24} /> : <Eye size={24} />}
            </div>
            <Input
              register={register}
              label="Senha"
              name="password"
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
              register={register}
              label="Confirme a senha"
              name="confirmPassword"
              errors={errors.confirmPassword?.message}
              type={`${confirmClosed ? "password" : "text"}`}
            />
          </div>
        </div>
        <Button type="submit" title="Cadastrar" />
      </form>
    </div>
  );
}
