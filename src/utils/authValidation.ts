import * as yup from "yup";

export const loginSchema = yup.object().shape({
    email: yup
        .string()
        .email("Digite um e-mail válido")
        .required("E-mail é obrigatório"),
    password: yup
        .string()
        .min(6, "A senha deve ter no mínimo 6 caracteres")
        .required("Senha é obrigatória"),
});

export const registerSchema = yup.object().shape({
    name: yup
        .string()
        .min(2, "Nome deve ter no mínimo 2 caracteres")
        .required("Nome é obrigatório"),
    email: yup
        .string()
        .email("Digite um e-mail válido")
        .required("E-mail é obrigatório"),
    password: yup
        .string()
        .min(6, "A senha deve ter no mínimo 6 caracteres")
        .required("Senha é obrigatória"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "As senhas devem ser iguais")
        .required("Confirmação de senha é obrigatória"),
});

export const forgotPasswordSchema = yup.object().shape({
    email: yup
        .string()
        .email("Digite um e-mail válido")
        .required("E-mail é obrigatório"),
});