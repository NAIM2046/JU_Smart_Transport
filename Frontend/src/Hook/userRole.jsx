import React from "react";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";

const userRole = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: Role, isLoading: isRole } = useQuery({
    queryKey: ["userRole", user?.email], // Add a more descriptive query key
    queryFn: async () => {
      if (!user?.email) {
        // If no user email, return a default value
        return null;
      }
      try {
        const res = await axiosSecure.get(`/user/${user.email}`);
        console.log(res.data);
        return res.data?.role ?? null; // Return role or null if undefined
      } catch (error) {
        console.error("Error fetching user role:", error);
        return null; // Return a fallback value
      }
    },
    enabled: !!user?.email, // Disable query if user email is not available
    retry: 1, // Retry once if the request fails
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
    refetchOnWindowFocus: false, // Do not refetch on window focus
  });

  return [Role, isRole];
};

export default userRole;
