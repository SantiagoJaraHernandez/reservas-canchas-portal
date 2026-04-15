import { useState } from "react";
import authServices from "../../services/authServices"

function useLogin() {
    const { login } = authServices();
    const [loading, setLoading] = useState(false);
    const [errorsApi, setErrorsApi] = useState(null);

    async function useLoginUser(usuario) {
        try {
            setLoading(true)
            const { data } = await login(usuario);
            return { ok: true, data }
        } catch (error) {
            console.error(error);
            return { ok: false, mensaje: error.response || "Error in the registration" };
        } finally {
            setLoading(false)
        }
    }
    return { useLoginUser }
}

export default useLogin
