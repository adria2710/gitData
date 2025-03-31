import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./userSlice";

const GitHubUserSearch = () => {
    const [username, setUsername] = useState("");
    const dispatch = useDispatch();
    const { user, status, error } = useSelector((state) => state.user);

    const handleSearch = () => {
        if (username.trim()) {
            dispatch(fetchUser(username));
        }
    };

    return (
        <div className="flex flex-col items-center p-4">
            <h1 className="text-2xl font-bold mb-4">GitHub User Search</h1>
            <input
                type="text"
                placeholder="Enter GitHub username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="p-2 border rounded w-64 mb-2"
            />
            <button
                onClick={handleSearch}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Search
            </button>
            {status === "loading" && <p>Loading...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}
            {user && (
                <div className="mt-4 p-4 border rounded text-center">
                    <img
                        src={user.avatar_url}
                        alt="avatar"
                        className="w-20 h-20 rounded-full mx-auto"
                    />
                    <h2 className="text-lg font-bold">{user.name}</h2>
                    <p>@{user.login}</p>
                    <p>Followers: {user.followers}</p>
                    <p>Public Repos: {user.public_repos}</p>
                </div>
            )}
        </div>
    );
};

export default GitHubUserSearch;
