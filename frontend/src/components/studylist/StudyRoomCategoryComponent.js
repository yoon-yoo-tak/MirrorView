import axios from "axios";
import * as S from "./StudyStyledComponents";
import { useState, useEffect } from "react";
import useUpdateEffect from "../../lib/UseUpdateEffect";
import { useDispatch } from "react-redux";
import { getInterviewRoomByCategory } from "../../store/InterviewStore";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const StudyRoomCategory = () => {
    const [firstCategory, setFirstCategory] = useState([
        { id: 0, name: "선택하세요" },
    ]);
    const [secondCategory, setSecondCategory] = useState([
        { id: 0, name: "선택하세요" },
    ]);
    const [thirdCategory, setThirdCategory] = useState([
        { id: 0, name: "선택하세요" },
    ]);
    const defaultValue = [{ id: 0, name: "선택하세요" }];
    const [firstValue, setFirstValue] = useState("선택하세요");
    const [secondValue, setSecondValue] = useState("선택하세요");
    const [thirdValue, setThirdValue] = useState("선택하세요");
    const dispatch = useDispatch();

    useEffect(() => {
        axios
            .get("/api/category")
            .then(({ data }) => {
                setFirstCategory([...defaultValue, ...data.data]);
            })
            .catch((error) => {
                console.error(error);
            });
        return () => {
            setFirstCategory([...defaultValue]);
        };
    }, []);
    useUpdateEffect(() => {
        if (firstCategory.length != 1) {
            if (firstValue === "선택하세요") {
                setSecondCategory(defaultValue);
                setThirdCategory(defaultValue);
            } else {
                axios.get(`/api/category/${firstValue}`).then(({ data }) => {
                    setSecondCategory([...defaultValue, ...data.data]);
                });
            }
        }
    }, [firstValue]);
    useUpdateEffect(() => {
        if (secondCategory.length != 1) {
            if (secondValue === "선택하세요") {
                setThirdCategory(defaultValue);
            } else {
                axios.get(`/api/category/${secondValue}`).then(({ data }) => {
                    setThirdCategory([...defaultValue, ...data.data]);
                });
            }
        }
    }, [secondValue]);

    // const secondCategories = ["선택하세요", "first", "second", "third"];

    // const handleFirstCategory = (e) => {
    //     console.log(e.target.value);
    //     setFirstValue(e.target.value);
    //     // + 자식 카테고리 api 호출해서 지금 state에 자식 카테고리를 저장?
    // };
    // const handleSecondCategory = (e) => {
    //     setSecondValue(e.target.value);
    // };

    const handleSubmit = () => {
        dispatch(getInterviewRoomByCategory(thirdValue));
    };

    const style = {
        fontFamily: "HakgyoansimWoojuR",
    };

    return (
        <S.categoryPage>
            <S.categoryWrap>
                {/* <div>상위 카테고리</div> */}
                {/* <S.categorySelect
                            value={firstValue}
                            // onChange={handleFirstCategory}
                            >
                            {firstCategory.map((category) => (
                                <option key={category.id} value={category.name}>
                                {category.name}
                                </option>
                                ))}
                            </S.categorySelect> */}
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <S.categoryList>
                        {/* <InputLabel id="demo-simple-select-standard-label">
                        TITLE
                    </InputLabel> */}
                        <S.categoryDiv>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={firstValue}
                                style={style}
                                // label="TITLE"
                            >
                                {firstCategory.map((category) => (
                                    <MenuItem
                                        key={category.id}
                                        value={category.name}
                                        style={style}
                                    >
                                        {category.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </S.categoryDiv>
                        <S.categoryDiv>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={firstValue}
                                style={style}
                                // label="TITLE"
                            >
                                {secondCategory.map((category) => (
                                    <MenuItem
                                        key={category.id}
                                        value={category.name}
                                        style={style}
                                    >
                                        {category.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </S.categoryDiv>
                        <S.categoryDiv>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={firstValue}
                                style={style}
                                // label="TITLE"
                            >
                                {thirdCategory.map((category) => (
                                    <MenuItem
                                        key={category.id}
                                        value={category.name}
                                        style={style}
                                    >
                                        {category.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </S.categoryDiv>
                    </S.categoryList>
                </FormControl>
                <S.categoryButton onClick={handleSubmit}>조회</S.categoryButton>
            </S.categoryWrap>
        </S.categoryPage>
    );
};

export default StudyRoomCategory;
