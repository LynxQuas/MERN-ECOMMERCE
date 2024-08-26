import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useCustomMutation = ({
    mutationFn,
    onSuccessMessage,
    onErrorMessage,
    queryKey,
}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn,
        onSuccess: (data) => {
            console.log(data);
            if (onSuccessMessage) {
                toast.success(onSuccessMessage);
            }

            if (queryKey) {
                queryClient.invalidateQueries({ queryKey });
            }
        },

        onError: (err) => {
            if (onErrorMessage) {
                toast.error(err.message || onErrorMessage);
            }
        },
    });
};

export default useCustomMutation;
