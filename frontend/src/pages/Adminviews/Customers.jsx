import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { deleteUser, getAllUsers } from "../../libs/user";
import Error from "../../components/ui/Error";
import Spinner from "../../components/ui/Spinner";
import toast from "react-hot-toast";

const Customers = () => {
    const {
        data: users,
        error,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["users"],
        queryFn: getAllUsers,
    });

    const queryClient = useQueryClient();

    const [sortOrder, setSortOrder] = useState("asc");

    const sortedUsers = users?.sort((a, b) => {
        if (sortOrder === "asc") {
            return a.role.localeCompare(b.role);
        } else {
            return b.role.localeCompare(a.role);
        }
    });

    const toggleSortOrder = () => {
        setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    };

    const { mutate, isPending } = useMutation({
        mutationFn: (userId) => deleteUser(userId),
        onSuccess: () => {
            toast.success("User delete successfully.");
            queryClient.invalidateQueries({
                queryKey: ["users"],
            });
        },
        onError: (err) => {
            console.log(err);
            toast.error("User could not be deleted.");
        },
    });

    const handleDelete = (userId) => {
        mutate(userId);
    };

    if (isError) {
        return <Error text={error.message} />;
    }

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div className="md:p-4 bg-gray-50 min-h-screen">
            <div className="bg-white shadow-lg rounded-lg overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gradient-to-r from-purple-700 to-purple-500 text-white">
                        <tr className="text-left text-xs md:text-sm font-semibold">
                            <th className="py-4 px-6">Name</th>
                            <th className="py-3 px-4 md:py-4 md:px-6">Email</th>
                            <th
                                className="py-3 px-4 md:py-4 md:px-6 cursor-pointer"
                                onClick={toggleSortOrder}
                            >
                                Role
                                {sortOrder === "asc" ? " ↑" : " ↓"}
                            </th>
                            <th className="py-3 px-4 md:py-4 md:px-6 text-right">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700 text-xs md:text-sm divide-y divide-gray-200">
                        {sortedUsers?.map((user) => (
                            <tr
                                key={user._id}
                                className="hover:bg-gray-100 transition-colors"
                            >
                                <td className="p-2 md:py-4 md:px-6">
                                    {user.firstName} {user.lastName}
                                </td>
                                <td className="py-3 px-4 md:py-4 md:px-6">
                                    {user.email}
                                </td>
                                <td className="py-3 px-4 md:py-4 md:px-6 capitalize">
                                    {user.role}
                                </td>
                                <td className="py-3 px-4 md:py-4 md:px-6 text-right">
                                    <button
                                        onClick={() => handleDelete(user._id)}
                                        disabled={isPending}
                                        className="bg-red-500 text-white text-xs md:text-sm px-3 py-2 md:px-4 md:py-2 rounded-lg hover:bg-red-600 transition duration-300"
                                    >
                                        {isPending ? "Deleteing..." : "Delete"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Customers;
