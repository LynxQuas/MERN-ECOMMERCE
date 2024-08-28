import { Link, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useUser } from "../context/UserContext";
import InputError from "../components/form/InputError";
import { useMutation } from "@tanstack/react-query";
import { login as fetchLogin } from "../libs/user";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Input from "../components/form/Input";

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            email: "admin@test.com",
            password: "123456",
        },
    });
    const [loginError, setLoginError] = useState("");
    const { login } = useUser();

    const navigate = useNavigate();

    const handleLogin = useMutation({
        mutationFn: (data) => fetchLogin(data),
        onSuccess: (data) => {
            login(data);
            reset();
            navigate(data.user.role === "admin" ? "/admin" : "/");
            return;
        },
        onError: (data) => {
            setLoginError(data.message || "something went wrong");
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
                    <Input
                        type="email"
                        name="email"
                        placeholder="Email"
                        register={register}
                        registerOptions={{
                            required: "Email is required.",
                        }}
                        errors={errors}
                    />

                    <Input
                        type="password"
                        placeholder="Password"
                        register={register}
                        registerOptions={{
                            required: "Password is required",
                        }}
                        errors={errors}
                        name="password"
                    />

                    <div className="flex w-full justify-between gap-10">
                        <Button
                            type="submit"
                            disabled={handleLogin.isPending}
                            className="bg-purple-500 grow shadow-md shadow-purple-500 rounded-md font-semibold text-white py-3 px-4"
                        >
                            {handleLogin.isPending ? "Logging in..." : "Login"}
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
