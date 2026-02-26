import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";



export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error: any) => {
      toast.error(error.message)
    },
  }),
  mutationCache: new MutationCache({
    onError: (error: any) => {
      toast.error(error.message)
    }
  }),
})