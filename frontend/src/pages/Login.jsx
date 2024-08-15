import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

const Login = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70%] bg-gray-100 py-4 my-20">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center md:w-[30rem] w-full">
                <h2 className="text-2xl font-semibold  mb-4">Login</h2>
                <form className="flex flex-col gap-6">
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
                    <div className="flex w-full justify-between gap-10">
                        <Button className="bg-purple-500 grow shadow-md shadow-purple-500 rounded-md font-semibold text-white py-3 px-4">
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
