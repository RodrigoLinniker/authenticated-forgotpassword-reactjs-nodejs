import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth";
import ICredentialsDev from "../../interfaces/credentialsDev";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { Eye, EyeSlash } from "phosphor-react";
import { Input } from "../../components/Form/Input";
import { toast } from "react-toastify";

const signInFormSchemaLogin = yup.object().shape({
  email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
  password: yup.string().required("Senha obrigatória"),
});

export function Login() {
  const { signInDev } = useContext(AuthContext);
  const [closed, setClosed] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      navigate("/dashboard");
    }
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICredentialsDev>({
    resolver: yupResolver(signInFormSchemaLogin),
  });

  const navigate = useNavigate();

  const onSubmit = async (data: ICredentialsDev) => {
    try {
      await signInDev(data);

      navigate("/dashboard");
      toast.success("Login Success", { autoClose: 2000 });
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
        <h1 className="text-center font-bold text-2xl text-green-500">Login</h1>
        <div className="grid gap-5 mt-3">
          <Input
            registerLogin={register}
            label="Email"
            nameLogin="email"
            type="email"
            errors={errors.email?.message}
            className="w-full rounded-md bg-gray-700 border px-3 py-2 text-white  focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm md:text-md lg:text-lg"
          />
          <div>
            <div className="relative">
              <div
                className="absolute right-2 top-9 cursor-pointer"
                onClick={() => setClosed(!closed)}
              >
                {closed ? <EyeSlash size={24} /> : <Eye size={24} />}
              </div>

              <Input
                registerLogin={register}
                label="Senha"
                nameLogin="password"
                errors={errors.password?.message}
                type={`${closed ? "password" : "text"}`}
                className="w-full rounded-md bg-gray-700 border px-3 py-2 text-white  focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm md:text-md lg:text-lg"
              />
            </div>
          </div>
        </div>
        <div className="text-end mt-2 ">
          <Link
            className="text-sm hover:text-green-500 transition-colors duration-75 hover:underline"
            to="/forgot-password"
          >
            esqueci a senha
          </Link>
        </div>
        <Button type="submit" title="Entrar" />
        <fieldset className="border-t-[1px] border-solid border-green-500 border-b-0 border-l-0 border-r-0 block text-center mt-3">
          <legend className="px-1 py-2">Ou</legend>
          <h1 className="text-gray-400 text-sm">
            Você não tem uma conta?
            <Link
              to="/signup"
              className="text-white font-semibold hover:text-green-500 transition-colors duration-75 text-center px-1 py-2"
            >
              Cadastre-se
            </Link>
          </h1>
        </fieldset>
      </form>
    </div>
  );
}
