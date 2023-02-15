export default interface ICredentialsResetPassword{
    password: string;
    passwordConfirm: string;
    token: string | null;
}