import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { fetchSessions, markSessionComplete } from "../services/session";

export default function SessionList() {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadSessions();
    }, []);

    const loadSessions = async () => {
        try {
            await fetchSessions(setSessions, setLoading);
        } catch (error) {
            toast.error("Network error, please try again.");
        }
    };

    const onMarkComplete = async (sessionId) => {
        try {
            const result = await markSessionComplete(sessionId);
            if (result.status === 200) {
                const extraCharge = result.data;
                console.log(extraCharge);
                if (extraCharge > 0) {
                    toast.warning(`Extra charge applied: ₹${extraCharge}`);
                } else {
                    toast.success("Session marked as complete.");
                }
                
                await loadSessions();
            } else {
                toast.error("Failed to mark session as complete.");
            }
        } catch (error) {
            toast.error("Error updating session.");
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Session List</h2>

            <button className="btn btn-primary mb-3" onClick={loadSessions} disabled={loading}>
                {loading ? "Loading..." : "Refresh"}
            </button>

            <table className="table table-bordered table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>Session ID</th>
                        <th>Reservation ID</th>
                        <th>Entry Time</th>
                        <th>End Time</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {sessions.map((session, index) => (
                        <tr key={session.sessionId || index}>
                            <td>{session.sessionId}</td>
                            <td>{session.reservationId}</td>
                            <td>{new Date(session.entryTime).toLocaleString()}</td>
                            <td>{session.endTime ? new Date(session.endTime).toLocaleString() : "Ongoing"}</td>
                            <td>{session.status}</td>
                            <td>
                                <button
                                    className="btn btn-success btn-sm"
                                    onClick={() => onMarkComplete(session.sessionId)}
                                    disabled={session.status === "COMPLETED"}
                                >
                                    {session.status === "COMPLETED" ? "Completed" : "Mark as Complete"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}