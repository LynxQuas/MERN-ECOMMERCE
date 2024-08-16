import { Link, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import InputError from "../components/form/InputError";
import { useMutation } from "@tanstack/react-query";
import { register as userRegister } from "../libs/user";
import { useForm } from "react-hook-form";
import { useState } from "react";
const Register = () => {
    const { register, handleSubmit, getValues, formState, reset } = useForm();
    const [registerError, setRegisterError] = useState("");
    const { errors } = formState;
    const navigate = useNavigate();

    const handleRegister = useMutation({
        mutationFn: (data) => userRegister(data),
        onSuccess: () => {
            navigate("/login");
            reset();
        },
        onError: (data) => {
            setRegisterError(data.message);
            reset();
        },
    });

    const onRegister = (data) => {
        handleRegister.mutate(data);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[70%] bg-gray-100 py-4 my-20">
            <div className="bg-white rounded-lg shadow-lg py-8 px-4 md:p-8 text-center md:w-[30rem] w-full">
                <h2 className="text-2xl font-semibold mb-4">Register</h2>
                {registerError && <InputError message={registerError} />}
                <form
                    className="flex flex-col gap-4"
                    onSubmit={handleSubmit(onRegister)}
                >
                    <div className="flex gap-5">
                        <input
                            type="text"
                            className="bg-gray-100 w-full px-4 py-3 rounded-md"
                            placeholder="First Name"
                            name="firstName"
                            {...register("firstName", {
                                required:
                                    "First name and last name are required",
                            })}
                        />

                        <input
                            type="text"
                            className="bg-gray-100 w-full px-4 py-3 rounded-md"
                            placeholder="Last Name"
                            name="lastName"
                            {...register("lastName", {
                                required:
                                    "First name and last name are required",
                            })}
                        />
                    </div>
                    {errors?.firstName?.message ? (
                        <InputError message={errors.firstName.message} />
                    ) : (
                        <InputError message={errors?.lastName?.message} />
                    )}

                    <input
                        type="text"
                        className="bg-gray-100 w-full px-4 py-3 rounded-md"
                        placeholder="Email"
                        name="email"
                        {...register("email", {
                            required: "Email is Required.",
                        })}
                    />
                    {errors?.email?.message && (
                        <InputError message={errors.email.message} />
                    )}

                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        className="bg-gray-100 w-full px-4 py-3 rounded-md"
                        {...register("password", {
                            required: "Password is Required.",
                            validate: (value) =>
                                value.length >= 6 ||
                                "Password should be at least 6 characters long.",
                        })}
                    />
                    {errors?.password?.message && (
                        <InputError message={errors.password.message} />
                    )}

                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className="bg-gray-100 w-full px-4 py-3 rounded-md"
                        name="confirmation"
                        {...register("confirmation", {
                            required: "This Field is Required.",
                            validate: (value) =>
                                value === getValues().password ||
                                "Password do not match",
                        })}
                    />
                    {errors?.confirmation?.message && (
                        <InputError message={errors.confirmation.message} />
                    )}

                    <div className="flex w-full justify-between gap-10">
                        <Link
                            to="/login"
                            className="rounded-md font-semibold text-black py-3 px-4"
                        >
                            <ArrowLeftIcon className="w-5 h-5 self-center mr-2 inline-block" />
                            Login
                        </Link>

                        <Button
                            type="submit"
                            className="bg-purple-500 grow shadow-md shadow-purple-500 rounded-md font-semibold text-white py-3 px-4"
                        >
                            Register
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
