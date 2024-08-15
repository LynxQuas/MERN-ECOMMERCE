import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const Register = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70%] bg-gray-100 py-4 my-20">
            <div className="bg-white rounded-lg shadow-lg py-8 px-4 md:p-8 text-center md:w-[30rem] w-full">
                <h2 className="text-2xl font-semibold  mb-4">Register</h2>
                <form className="flex flex-col gap-4">
                    <div className="flex gap-5">
                        <input
                            type="text"
                            className="bg-gray-100 w-full px-4 py-3 rounded-md"
                            placeholder="First Name"
                        />

                        <input
                            type="text"
                            className="bg-gray-100 w-full px-4 py-3 rounded-md"
                            placeholder="Last Name"
                        />
                    </div>
                    <input
                        type="text"
                        className="bg-gray-100 w-full px-4 py-3 rounded-md"
                        placeholder="Email"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="bg-gray-100 w-full px-4 py-3 rounded-md"
                    />

                    <input
                        type="password"
                        placeholder="Conrim Password"
                        className="bg-gray-100 w-full px-4 py-3 rounded-md"
                    />
                    <div className="flex w-full justify-between gap-10">
                        <Link
                            to="/login"
                            className="rounded-md font-semibold text-black py-3 px-4"
                        >
                            <ArrowLeftIcon className="w-5 h-5 self-center mr-2 inline-block" />
                            Login
                        </Link>

                        <Button className="bg-purple-500 grow shadow-md shadow-purple-500 rounded-md font-semibold text-white py-3 px-4">
                            Register
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
