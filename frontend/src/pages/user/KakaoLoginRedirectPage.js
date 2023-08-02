import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { kakaoLogin, getUserInfo } from "store/AuthStore";


const KakaoLoginRedirect = () => {
    
    const {search} = useLocation();
    const code = search.substring(6);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(()=>{
        
        const grantType = "authorization_code";
        const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
        const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
        console.log(REST_API_KEY);
        const bodyData = {
            grant_type: grantType,
            client_id : REST_API_KEY,
            REDIRECT_URI : REDIRECT_URI,
            code : code
        }
        const queryStringBody = Object.keys(bodyData)
            .map(k=> encodeURIComponent(k)+"="+encodeURI(bodyData[k]))
        .join("&");
        fetch("https://kauth.kakao.com/oauth/token",{
            method : "POST",
            headers : {
                'content-type' : 'application/x-www-form-urlencoded;charset=utf-8',
            },
            body : queryStringBody
        })
        .then(res => res.json())
        .then((data)=>{
            dispatch(kakaoLogin(data["id_token"]))
                .unwrap()
                .then(({data})=>{
                    dispatch(getUserInfo(data["access-token"]));
                    
                }).catch((error)=>{
                console.log(error);
            alert("카카오 로그인 오류."); //todo 이쁜 거로 바꾸기 sweetalert (?)
        });
        })
        // console.log(kakaoinfo);
        
            
        navigate("/");
        return(()=>{
            
        })
        },[])    

        return <></>;
}

export default KakaoLoginRedirect;