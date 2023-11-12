import { apiSlice } from "./apiSlice";

const USERS_URL = '/api/users';
const ADMIN_URL = '/api/admin';

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data
            })
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: 'POST',
                body: data
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST'
            })
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method: 'PUT',
                body: data
            })
        }),
        searchVoter: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/voter`,
                method: 'POST',
                body: data
            })
        }),
        changeVote: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/changevote`,
                method: 'PUT',
                body: data
            })
        }),
        getUserProfile: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method: 'GET',
                body: data
            })
        }),
        /* ADMIN */
        getVoteCount: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URL}/votecount`,
                method: 'GET',
                body: data
            })
        }),
        getVoteCountByBox: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URL}/votecountbybox`,
                method: 'POST',
                body: data
            })
        }),
        getVoteCountByLocation: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URL}/votecountbylocation`,
                method: 'POST',
                body: data
            })
        }),
        getAllUsers: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URL}/getusers`,
                method: 'POST',
                body: data
            })
        }),
        deleteUser: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URL}/deleteuser`,
                method: 'POST',
                body: data
            })
        }),
        getAllLocations: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URL}/alllocations`,
                method: 'POST',
                body: data
            })
        }),
    })
})

export const { useLoginMutation, useLogoutMutation, useRegisterMutation,
            useUpdateUserMutation, useSearchVoterMutation, useChangeVoteMutation,
            useGetUserProfileMutation, useGetVoteCountMutation, useGetVoteCountByBoxMutation,
            useGetVoteCountByLocationMutation, useGetAllUsersMutation, useDeleteUserMutation,
            useGetAllLocationsMutation
        } = usersApiSlice;