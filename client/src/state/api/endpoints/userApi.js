import { api } from "../api";

export const userApi = api.injectEndpoints({
	endpoints: (build) => ({
		registerUser: build.mutation({
			query: (newUser) => ({
				url: "auth/register",
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: newUser,
			}),
			invalidatesTags: ["User"],
		}),
		loginUser: build.mutation({
			query: (userCredentials) => ({
				url: "auth/login",
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: userCredentials,
			}),
			invalidatesTags: ["User"],
		}),
		getUser: build.query({
			query: (id) => `general/user/${id}`,
			providesTags: ["User"],
		}),
	}),
});

export const {
	useGetUserQuery,
	useRegisterUserMutation,
	useLoginUserMutation,
} = userApi;
