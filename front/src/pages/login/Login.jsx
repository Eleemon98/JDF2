import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import { AuthContext } from "../../context/authContext";

const Login = () => {
    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    });
    const [err, setErr] = useState(null);

    const navigate = useNavigate()

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.tartet.name]: e.tartet.value}));
    };
    const { login } = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(inputs);
            navigate("/")
        } catch (err) {
            setErr(err.response.data);
        }
    };

    return (
        <div className="login">
            <div className="card">
                <div className="left">
                    <h1>환영하오</h1>
                    <span>백성이 아니시오?</span>
                    <Link to="/register">
                        <button>호적등록</button>
                    </Link>
                </div>
                <div className="right">
                    <h1>신분인증</h1>
                    <form>
                        <input type="text" placeholder="이름(id)" name="username" onChange={handleChange}/>
                        <input type="password" placeholder="암호(password)" name="password" onChange={handleChange}/>
                        {err && err}
                        <button onClick={handleLogin}>신분인증</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;