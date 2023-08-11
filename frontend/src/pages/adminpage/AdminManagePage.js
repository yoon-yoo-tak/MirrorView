import React, { useState, useRef, useEffect } from "react";
import ReactPaginate from "react-paginate";
import * as S from "../../pages/adminpage/AdminComponent";
import { useSelector } from "react-redux";
import { admindata } from "./admindata";
import axios from "axios";

import Header from "../../components/common/HeaderComponent";
import Footer from "../../components/common/FooterComponent";

const AdminManagePage = () => {
  const perPage = 7;
  const paginationPos = 30 + perPage;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [reportUserList, setReportUserList] = useState([]);
  useEffect(() => {
    axios
      .get(`api/admin`)
      .then(({ data }) => {
        console.log(data);
        setReportUserList(data.data);
        // setTotalPages(data.data.totalPages);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber + 1);
  };

  const paginatedData = admindata.slice(
    currentPage * perPage,
    (currentPage + 1) * perPage
  );

  const [selectedNickName, setSelectedNickname] = useState(null);

  const handleContentClick = (reportUser) => {
    setSelectedNickname(reportUser.nickname);

    axios
      .get(`/api/admin/${reportUser.nickname}`)
      .then(({ data }) => {
        console.log(data);
        setReportData(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleModalClose = () => {
    setSelectedNickname(null);
  };

  const onClickBanMember=() => {
        axios.delete(`/api/admin/${selectedNickName}`)
        .then(({data})=>{
            console.log(data);
        }).catch((error)=>{
            console.log(error);
        })
        setSelectedNickname(null);
  };


  const handleModalBackgroundClick = (event) => {
    if (event.target === event.currentTarget) {
      handleModalClose();
    }
  };

  const scrollContainerRef = useRef(null);
  const [reportData, setReportData] = useState([]);
  useEffect(() => {
    const container = scrollContainerRef.current;
    const modalContainer = document.querySelector(".modalContainer");
    if (container && modalContainer) {
      if (
        selectedNickName !== null &&
        container.scrollHeight >= modalContainer.clientHeight
      ) {
        container.style.overflow = "auto";
      } else {
        container.style.overflow = "hidden";
      }
    }
  }, [selectedNickName]);

<<<<<<< frontend/src/pages/adminpage/AdminManagePage.js
  //   const selectedData = admindata.find((item) => item.id === selectedNickName);

  return (
    <S.Container>
      <S.Image
        src="/bground.png"
        alt="main_bg"
        onClick={handleModalBackgroundClick}
      />
      <S.TableWrapper>
        <table>
          <thead>
            <tr>
              <th style={{ width: "60%" }}>유저 NICKNAME</th>
              <th>신고 횟수</th>
              {/* <th style={{ width: "50%" }}>내용</th> */}
            </tr>
          </thead>
          <tbody>
            {reportUserList.map((reportUser, index) => (
              <tr
                style={{ width: "50%", cursor: "pointer" }}
                key={index}
                onClick={() => handleContentClick(reportUser)}
              >
                <td>{reportUser.nickname}</td>
                <td>{reportUser.cnt}</td>
                {/* <td>
                  <div>
                    {admindata1.content.length > 30
                      ? admindata1.content.substring(0, 30) + "..."
                      : admindata1.content}
                  </div>
                </td> */}
              </tr>
            ))}
          </tbody>
          </table>
      </S.TableWrapper>
          {selectedNickName !== null && (
            <S.modalContainer className="modalContainer">
              <S.modalScrollContent ref={scrollContainerRef}>
                <S.modalContent
                  style={{
                    top: "20px",
                    left: "0px",
                    fontSize: "18px",
                    color: "black",
                    fontFamily: "Imcre",
                    whiteSpace: "pre-line",
                    lineHeight: "2",
                  }}
                >
                  <S.modalButton
                    style={{
                      top: "0px",
                      right: "15px",
                      backgroundColor: "#E3F1F8",
                    }}
                    onClick={handleModalClose}
                  >
                    닫기
                  </S.modalButton>
                  <S.modalButton
                    style={{ top: "0px", left: "30px" }}
                    onClick={onClickBanMember}
                  >
                    정지
                  </S.modalButton>
                  <S.ModalTableWrapper>
                    <thead>
                      <tr>
                        <th>신고자</th>
                        <th>신고 내용</th>
                        <th style={{ width: "10%" }}>신고 시간</th>
                      </tr>
                    </thead>
                    <tbody>
                    {reportData.map((report, index) => {
                    return (
                      <tr key={index}>
                        <td>{report.reporter}</td>
                        <td>{report.content}</td>
                        <td style={{ width: "10%" }}>{report.reportedTime}</td>
                      </tr>
                    );
                  })}
                    </tbody>
                  </S.ModalTableWrapper>
                  
                </S.modalContent>
              </S.modalScrollContent>
            </S.modalContainer>
          )}
          <S.PaginationContainer style={{ top: "", left: paginationPos + "%" }}>
            <ReactPaginate
              previousLabel={"이전"}
              nextLabel={"다음"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={totalPages}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageChange}
              containerClassName={"pagination"}
              activeClassName={"active"}
            />
          </S.PaginationContainer>

    </S.Container>
  );
=======
    return (
        <div>
            <Header />
            <S.Container>
                <S.Image
                    src="/bground.png"
                    alt="main_bg"
                    onClick={handleModalBackgroundClick}
                />
                <S.TableWrapper>
                    <table>
                        <thead>
                            <tr>
                                <th style={{ width: "30%" }}>유저ID</th>
                                <th>신고 횟수</th>
                                <th style={{ width: "50%" }}>내용</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.map((admindata1) => (
                                <tr
                                    style={{ width: "50%", cursor: "pointer" }}
                                    key={admindata1.id}
                                    onClick={() =>
                                        handleContentClick(admindata1.id)
                                    }
                                >
                                    <td>{admindata1.userid}</td>
                                    <td>{admindata1.count}</td>
                                    <td
                                        style={{
                                            width: "50%",
                                            cursor: "pointer",
                                        }}
                                    >
                                        <div
                                            onClick={() =>
                                                handleContentClick(
                                                    admindata1.id
                                                )
                                            }
                                        >
                                            {admindata1.content.length > 30
                                                ? admindata1.content.substring(
                                                      0,
                                                      30
                                                  ) + "..."
                                                : admindata1.content}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        {selectedId !== null && (
                            <S.modalContainer className="modalContainer">
                                <S.modalScrollContent ref={scrollContainerRef}>
                                    <S.modalContent
                                        style={{
                                            top: "20px",
                                            left: "0px",
                                            fontSize: "18px",
                                            color: "black",
                                            fontFamily: "Imcre",
                                            whiteSpace: "pre-line",
                                            lineHeight: "2",
                                        }}
                                    >
                                        <S.modalButton
                                            style={{
                                                top: "0px",
                                                right: "15px",
                                                backgroundColor: "#E3F1F8",
                                            }}
                                            onClick={handleModalClose}
                                        >
                                            닫기
                                        </S.modalButton>
                                        <S.modalButton
                                            style={{ top: "0px", left: "30px" }}
                                            onClick={handleModalClose}
                                        >
                                            정지
                                        </S.modalButton>
                                        {selectedData &&
                                            Object.keys(selectedData).map(
                                                (key, index) => {
                                                    if (
                                                        key.startsWith(
                                                            "content"
                                                        )
                                                    ) {
                                                        return (
                                                            <div key={index}>
                                                                {
                                                                    selectedData[
                                                                        key
                                                                    ]
                                                                }{" "}
                                                                <br /> <br />
                                                            </div>
                                                        );
                                                    }
                                                    return null;
                                                }
                                            )}
                                    </S.modalContent>
                                </S.modalScrollContent>
                            </S.modalContainer>
                        )}
                        <S.PaginationContainer
                            style={{ top: "", left: paginationPos + "%" }}
                        >
                            <ReactPaginate
                                previousLabel={"이전"}
                                nextLabel={"다음"}
                                breakLabel={"..."}
                                breakClassName={"break-me"}
                                pageCount={totalPages}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={handlePageChange}
                                containerClassName={"pagination"}
                                activeClassName={"active"}
                            />
                        </S.PaginationContainer>
                    </table>
                </S.TableWrapper>
            </S.Container>
            <Footer />
        </div>
    );
>>>>>>> frontend/src/pages/adminpage/AdminManagePage.js
};

export default AdminManagePage;
