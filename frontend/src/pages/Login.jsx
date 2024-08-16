import { Link, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useUser } from "../context/UserContext";
import InputError from "../components/form/InputError";
import { useMutation } from "@tanstack/react-query";
import { login } from "../libs/user";
import { useForm } from "react-hook-form";
import { useState } from "react";

const Login = () => {
    const { register, handleSubmit, formState, reset } = useForm();
    const { errors } = formState;
    const [loginError, setLoginError] = useState("");
    const { setAuth } = useUser();

    const navigate = useNavigate();

    const handleLogin = useMutation({
        mutationFn: (data) => login(data),
        onSuccess: (data) => {
            localStorage.setItem("userData", JSON.stringify(data));
            setAuth(data);
            reset();
            navigate("/");
        },
        onError: (data) => {
            setLoginError(data.message);
        },
    });

    const onLogin = (data) => {
        handleLogin.mutate(data);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[70%] bg-gray-100 py-4 my-20">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center md:w-[30rem] w-full">
                <h2 className="text-2xl font-semibold  mb-4">Login</h2>
                {loginError && <InputError message={loginError} />}
                <form
                    className="flex flex-col gap-6"
                    onSubmit={handleSubmit(onLogin)}
                >
                    <input
                        type="text"
                        className="bg-gray-100 w-full px-4 py-3 rounded-md"
                        placeholder="Email"
                        {...register("email", {
                            required: "Email is required.",
                        })}
                    />
                    {errors?.email?.message && (
                        <InputError message={errors.email.message} />
                    )}

                    <input
                        type="password"
                        placeholder="Password"
                        className="bg-gray-100 w-full px-4 py-3 rounded-md"
                        {...register("password", {
                            required: "Password is required.",
                            validate: (value) =>
                                value.length >= 6 ||
                                "Password must be at least 6 characters.",
                        })}
                    />
                    {errors?.password?.message && (
                        <InputError message={errors.password.message} />
                    )}

                    <div className="flex w-full justify-between gap-10">
                        <Button
                            type="submit"
                            className="bg-purple-500 grow shadow-md shadow-purple-500 rounded-md font-semibold text-white py-3 px-4"
                        >
                            Login
                        </Button>
                        <Link
                            to="/register"
                            className="rounded-md font-semibold text-black py-3 px-4"
                        >
                            Register
                            <ArrowRightIcon className="w-5 h-5 self-center ml-2 inline-block" />
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
