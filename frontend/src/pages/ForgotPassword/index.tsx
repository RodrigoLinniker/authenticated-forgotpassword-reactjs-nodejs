import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import api from "../../services/api";
import * as yup from "yup";
import { Input } from "../../components/Form/Input";
import { toast } from "react-toastify";

interface ICredentialsForgotPassword {
  email: string;
}

const signInFormSchemaReset = yup.object().shape({
  email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
});

export function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICredentialsForgotPassword>({
    resolver: yupResolver(signInFormSchemaReset),
  });

  const navigate = useNavigate();

  const onSubmit = async ({ email }: ICredentialsForgotPassword) => {
    try {
      await api.post("/reset-password", { email });
      navigate("/");

      toast.success("Email sent successfully", { autoClose: 2000 });
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
        <Input
          registerForgotPassword={register}
          label="Insira seu email"
          nameForgotPassword="email"
          type="email"
          errors={errors.email?.message}
        />

        <Button type="submit" title="Enviar" />
      </form>
    </div>
  );
}
