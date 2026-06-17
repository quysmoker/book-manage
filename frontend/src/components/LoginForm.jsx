
import { useState } from "react";
import { login } from "../services/authService";

const LoginForm = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError("");

            await login(username, password);

            if (onLoginSuccess) {
                onLoginSuccess();
            }
        } catch (err) {
            setError("Sai tài khoản hoặc mật khẩu");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#f4f6f9",
            }}
        >
            <div
                style={{
                    width: "400px",
                    background: "#fff",
                    padding: "30px",
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
            >
                <h1
                    style={{
                        textAlign: "center",
                        marginBottom: "10px",
                    }}
                >
                    📚 Book Management
                </h1>

                <p
                    style={{
                        textAlign: "center",
                        color: "#666",
                        marginBottom: "25px",
                    }}
                >
                    Đăng nhập để sử dụng hệ thống
                </p>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: "15px" }}>
                        <label>Username</label>

                        <input
                            type="text"
                            placeholder="Nhập username"
                            value={username}
                            onChange={(e) =>
                                setUsername(e.target.value)
                            }
                            required
                            style={{
                                width: "100%",
                                padding: "10px",
                                marginTop: "5px",
                                borderRadius: "6px",
                                border: "1px solid #ccc",
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: "20px" }}>
                        <label>Password</label>

                        <input
                            type="password"
                            placeholder="Nhập mật khẩu"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            required
                            style={{
                                width: "100%",
                                padding: "10px",
                                marginTop: "5px",
                                borderRadius: "6px",
                                border: "1px solid #ccc",
                            }}
                        />
                    </div>

                    {error && (
                        <div
                            style={{
                                background: "#ffe5e5",
                                color: "#d32f2f",
                                padding: "10px",
                                borderRadius: "6px",
                                marginBottom: "15px",
                            }}
                        >
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: "100%",
                            padding: "12px",
                            border: "none",
                            borderRadius: "6px",
                            background: "#1976d2",
                            color: "#fff",
                            cursor: "pointer",
                            fontSize: "16px",
                            fontWeight: "bold",
                        }}
                    >
                        {loading
                            ? "Đang đăng nhập..."
                            : "Đăng nhập"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
