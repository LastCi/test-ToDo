import { Auth } from '../components/Auth/Auth';
import { AuthForm } from '../components/AuthForm/AuthForm';

const AuthPage = ({ setRole }) => {
    return (
        <Auth>
            <AuthForm setRole={setRole}></AuthForm>
        </Auth>
    );
};

export default AuthPage;
