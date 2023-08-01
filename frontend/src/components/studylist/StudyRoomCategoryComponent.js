import axios from "axios";
import * as S from "./StudyStyledComponents";
import { useState, useEffect } from "react";
import useUpdateEffect from "../../lib/UseUpdateEffect";
import { useDispatch } from "react-redux";

const StudyRoomCategory = () => {
    const [firstCategory, setFirstCategory] = useState([{id:0,name:"선택하세요"}]);
    const [secondCategory, setSecondCategory] = useState([{id:0,name:"선택하세요"}]);
    const defaultValue = [{id:0,name:"선택하세요"}];
    const [firstValue,setFirstValue] = useState("선택하세요");
    const [secondValue,setSecondValue] = useState("선택하세요");
    const dispatch = useDispatch();

    useEffect(()=>{
        axios.get("http://localhost:8080/api/category")
        .then(({data})=>{
            console.log(data);
            setFirstCategory([...defaultValue,...data.data]);
            console.log(firstCategory);
            
        })
        .catch((error)=>{
            console.error(error);
        })
    },[])
    useUpdateEffect(()=>{
        axios.get(`http://localhost:8080/api/category/${firstValue}`)
        .then(({data})=>{
            setSecondCategory([...defaultValue,...data.data]);
        })
        
    },[firstValue])
    
    const secondCategories = ["선택하세요", "first", "second", "third"];

    const handleFirstCategory = (e) => {
        console.log(e.target.value);
        setFirstValue(e.target.value);
        // + 자식 카테고리 api 호출해서 지금 state에 자식 카테고리를 저장?
    };
    const handleSecondCategory = (e) =>{
        setSecondValue(e.target.value);
    }

    const handleSubmit = () => {
        // dispatch(setRooms(secondValue));
    };

    return (
        <S.categoryPage>
            <S.categoryWrap>
                <S.categoryList>
                    <S.categoryDiv>
                        <div>상위 카테고리</div>
                        <S.categorySelect
                            value={firstValue}
                            onChange={handleFirstCategory}
                        >
                            {firstCategory.map((category) => (
                                <option key={category.id} value={category.name}>
                                    {category.name}
                                </option>
                            ))}
                        </S.categorySelect>
                    </S.categoryDiv>
                    <S.categoryDiv>
                        <div>하위 카테고리</div>
                        <S.categorySelect
                            value={secondValue}
                            onChange={handleSecondCategory}
                        >
                            {secondCategory.map((category) => (
                                <option key={category.id} value={category.name}>
                                    {category.name}
                                </option>
                            ))}
                        </S.categorySelect>
                    </S.categoryDiv>
                </S.categoryList>
                <S.categoryButton onChange={handleSubmit}>
                    조회
                </S.categoryButton>
            </S.categoryWrap>
        </S.categoryPage>
    );
};

export default StudyRoomCategory;
