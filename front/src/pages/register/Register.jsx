import { useState } from "react";
import { Link } from "react-router-dom";
import "./register.scss";
import axios from "axios";

const Register = () => {
    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: "",
        nickname: "",
    });
    const [err, setErr] = useState(null);

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value}));
    };

    const handleClick = async (e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:8800/server/auth/register", inputs);
        } catch (err) {
            setErr(err.response.data);
        }
    };

    console.log(err)

    return (
        <div className="register">
            <div className="card">
                <div className="left">
                    <h1>조대화친에 온 것을 환영하오</h1>
                    <span>백성이시오?</span>
                    <Link to="/login">
                        <button>신분인증</button>
                    </Link>
                </div>
                <div className="right">
                    <h1>호적등록</h1>
                    <form>
                        <input type="text" placeholder="이름(id)" name="username" onChange={handleChange}/>
                        <input type="email" placeholder="서찰주소(email)" name="email" onChange={handleChange}/>
                        <input type="password" placeholder="암호(password)" name="password" onChange={handleChange}/>
                        <input type="text" placeholder="호(nickname)" name="nickname" onChange={handleChange}/>
                        {err && err}
                        <button onClick={handleClick}>호적등록</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;