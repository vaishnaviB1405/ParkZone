import axios from "axios";
import { createUrl } from "../Utils";

export const fetchSessions = async (setSessions, setLoading) => {
    setLoading(true);
    try {
        const currentDate = new Date().toLocaleDateString("en-CA", { 
            timeZone: "Asia/Kolkata" 
        });
          console.log(currentDate); // Output: DD/MM/YYYY (Indian Format)
          
        console.log(currentDate)
        const url = createUrl(`session/${currentDate}`);
        const token = sessionStorage.getItem("jwt");
        const { data } = await axios.get(url, {
            headers: { Authorization: token || "" },
        });
        setSessions(data);
    } catch (error) {
        console.error("Error fetching sessions:", error);
    } finally {
        setLoading(false);
    }
};

export const markSessionComplete = async (sessionId) => {
    try {
        const url = createUrl(`session/${sessionId}`);
        const token = sessionStorage.getItem("jwt");

        const response = await axios.put(url, null, {
            headers: { Authorization: token || "" },
        });
        console.log(response);
        return response;
    } catch (error) {
        console.error("Error updating session:", error.message || error);
    }
};
