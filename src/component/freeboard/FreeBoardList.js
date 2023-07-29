import React, { useEffect, useState } from "react";

import { API_BASE_URL } from "../../util/host-utils";
import { getLoginUserInfo } from "../../util/login-utils";
import { Link, useNavigate, useParams } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Title } from "@mui/icons-material";

//sns형식 날짜 바꾸는 함수
function formatDateToSNS(dateString) {
  const inputDate = new Date(dateString);
  const now = new Date();

  const diffInMilliseconds = now - inputDate;
  const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays > 0) {
    return `${diffInDays} 일 전`;
  } else if (diffInHours > 0) {
    return `${diffInHours} 시간 전`;
  } else if (diffInMinutes > 0) {
    return `${diffInMinutes} 분 전`;
  } else {
    return "방금 전";
  }
}

const FreeBoardList = () => {
  //url에서 호텔id 얻어오기
  const hotel = useParams();
  const id = hotel.id;
  // 로그인 인증 토큰 얻어오기
  const token = getLoginUserInfo().token;
  const nick = getLoginUserInfo().username;

  const [freeBoardList, setFreeBoardList] = useState([]);

  const redirection = useNavigate();

  const requestHeader = {
    "content-type": "application/json",
    Authorization: "Bearer " + token,
  };

  useEffect(() => {
    //페이지가 렌더링 되면 후기목록 보여주기.
    fetch(`${API_BASE_URL}/freeBoard/${id}`, {
      method: "GET",
      headers: requestHeader,
    })
      .then((res) => {
        if (res.status === 200) return res.json();
        else if (res.status === 403) {
          alert("로그인이 필요한 서비스 입니다.");
          redirection("/login");
          return;
        } else {
          alert("관리자에게 문의하세요!");
        }
        return;
      })
      .then((json) => {
        console.log(json);
        console.log(json.freeBoards);

        //fetch를 통해 받아온 데이터를 상태 변수에 할당.
        if (json) setFreeBoardList(json.freeBoards);
      });
  }, []);

  return (
    <React.Fragment>
      <Title>호텔 후기</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>날짜</TableCell>
            <TableCell>제목</TableCell>
            <TableCell>호텔이름</TableCell>
            {/* <TableCell>호텔사진</TableCell> */}
            <TableCell>작성자</TableCell>
            <TableCell align="right">평점</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {freeBoardList.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{formatDateToSNS(row.uploadDate)}</TableCell>
              <TableCell>
                <Link
                  style={{ color: "black" }}
                  to={`/freeBoardDetail/${row.id}`}
                >
                  {row.title}
                </Link>
              </TableCell>
              <TableCell>{row.hotel.name}</TableCell>
              {/* <TableCell>{row.hotel.image}</TableCell> */}
              <TableCell>{row.userNick}</TableCell>
              <TableCell align="right">{row.star}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
};

export default FreeBoardList;
