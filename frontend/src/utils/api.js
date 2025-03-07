const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5001/api";
console.log("API URL:", process.env.REACT_APP_API_URL);

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };
};

// Helper function to handle API errors
const handleApiResponse = async (response) => {
    if (!response.ok) {
        if (response.status === 401) {
            console.error("Unauthorized request, redirecting to login...");
            localStorage.removeItem("token"); // Clear invalid token
            window.location.href = "/login"; // Force login redirect
        }
        const errorData = await response.json();
        throw new Error(errorData.message || "API request failed");
    }
    return response.json();
};

const api = {
    login: async (username, password) => {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        return handleApiResponse(response);
    },

    getWorkoutLogs: async (date) => {
        const formattedDate = new Date(date).toISOString().split("T")[0];
        const response = await fetch(`${API_URL}/workout-logs?date=${formattedDate}`, {
            headers: getAuthHeaders(),
        });

        return handleApiResponse(response);
    },

    addWorkoutLog: async (log) => {
        const response = await fetch(`${API_URL}/workout-logs`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(log),
        });

        return handleApiResponse(response);
    },

    updateWorkoutLog: async (log) => {
        const response = await fetch(`${API_URL}/workout-logs`, {
            method: "PUT",
            headers: getAuthHeaders(),
            body: JSON.stringify({
                member_name: log.member_name,
                workout_name: log.workout_name,
                date: log.date,
                duration: log.duration,
            }),
        });

        return handleApiResponse(response);
    },

    deleteWorkoutLog: async (log) => {
        const response = await fetch(`${API_URL}/workout-logs`, {
            method: "DELETE",
            headers: getAuthHeaders(),
            body: JSON.stringify({
                member_name: log.member_name,
                workout_name: log.workout_name,
                date: log.date,
            }),
        });

        return handleApiResponse(response);
    },

    getMembers: async () => {
        const response = await fetch(`${API_URL}/members`, {
            headers: getAuthHeaders(),
        });

        return handleApiResponse(response);
    },

    addMember: async (member) => {
        const response = await fetch(`${API_URL}/members`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(member),
        });

        return handleApiResponse(response);
    },

    updateMember: async (member_name, updatedMember) => {
        const response = await fetch(`${API_URL}/members/${member_name}`, {
            method: "PUT",
            headers: getAuthHeaders(),
            body: JSON.stringify(updatedMember),
        });

        return handleApiResponse(response);
    },

    deleteMember: async (member_name) => {
        const response = await fetch(`${API_URL}/members/${member_name}`, {
            method: "DELETE",
            headers: getAuthHeaders(),
        });

        return handleApiResponse(response);
    },

    getWorkouts: async () => {
        const response = await fetch(`${API_URL}/workouts`, {
            headers: getAuthHeaders(),
        });

        return handleApiResponse(response);
    },

    addWorkout: async (workout) => {
        const response = await fetch(`${API_URL}/workouts`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(workout),
        });

        return handleApiResponse(response);
    },

    updateWorkout: async (workout_name, updatedWorkout) => {
        const response = await fetch(`${API_URL}/workouts/${workout_name}`, {
            method: "PUT",
            headers: getAuthHeaders(),
            body: JSON.stringify(updatedWorkout),
        });

        return handleApiResponse(response);
    },

    deleteWorkout: async (workout_name) => {
        const response = await fetch(`${API_URL}/workouts/${workout_name}`, {
            method: "DELETE",
            headers: getAuthHeaders(),
        });

        return handleApiResponse(response);
    },
};

export default api;
