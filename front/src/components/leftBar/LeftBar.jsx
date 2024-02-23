import Friends from "../../assets/1.png";
import Groups from "../../assets/2.png";
import Market from "../../assets/3.png";
import Watch from "../../assets/4.png";
import Memories from "../../assets/5.png";
import Events from "../../assets/6.png";
import Gaming from "../../assets/7.png";
import Gallery from "../../assets/8.png";
import Videos from "../../assets/9.png";
import Messages from "../../assets/10.png";
import Tutorials from "../../assets/11.png";
import Courses from "../../assets/12.png";
import Fund from "../../assets/13.png";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import "./leftBar.scss";

const LeftBar = () => {
    const { currentUser } = useContext(AuthContext);

    return (
        <div className="leftBar">
            <div className="container">
                <div className="menu">
                    <div className="user">
                        <img src={"/upload/" +currentUser.profilePic} alt=""/>
                        <span>{currentUser.name}</span>
                    </div>
                    <div className="item">
                        <img src={Friends} alt="" />
                        <span>친우들</span>
                    </div>
                    <div className="item">
                        <img src={Groups} alt=""/>
                        <span>모임들</span>
                    </div>
                    <div className="item">
                        <img src={Market} alt=""/>
                        <span>장터</span>
                    </div>
                    <div className="item">
                        <img src={Watch} alt=""/>
                        <span>영상 예술 감상</span>
                    </div>
                    <div className="item">
                        <img src={Memories} alt=""/>
                        <span>저장소</span>
                    </div>
                </div>
                <hr />
                <div className="menu">
                    <span>백성의 단축키들</span>
                    <div className="item">
                        <img src={Events} alt=""/>
                        <span>기념일</span>
                    </div>
                    <div className="item">
                        <img src={Gaming} alt=""/>
                        <span>놀이</span>
                    </div>
                    <div className="item">
                        <img src={Gallery} alt=""/>
                        <span>화첩</span>
                    </div>
                    <div className="item">
                        <img src={Videos} alt=""/>
                        <span>영상 모음</span>
                    </div>
                    <div className="item">
                        <img src={Messages} alt=""/>
                        <span>간찰(쪽지)</span>
                    </div>
                </div>
                <hr />
                <div className="menu">
                    <span>다른 것들</span>
                    <div className="item">
                        <img src={Fund} alt="" />
                        <span>기금 모금 행사</span>
                    </div>
                    <div className="item">
                        <img src={Tutorials} alt="" />
                        <span>안내서</span>
                    </div>
                    <div className="item">
                        <img src={Courses} alt="" />
                        <span>교과목</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeftBar;