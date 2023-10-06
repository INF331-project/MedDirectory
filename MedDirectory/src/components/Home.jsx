import React from "react";
import home from '../assets/home.svg';
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    const handleClick = () =>{
        navigate("/")
    }
    return (
        <div>
            <button>
                <img src={home} onClick={() => handleClick()} alt="logo"/>
            </button>
        </div>
    )
}

export default Home;
