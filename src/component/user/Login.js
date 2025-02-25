import React, { useContext, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import "../../design/login.scss";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../util/AuthContext";
import { API_BASE_URL, USER } from "../../util/host-utils";
import KakaoSignin from "../kakao/KakaoSignin";
import { isLogin } from "../../util/login-utils";

// 캐러셀에 꼭 필요합니다. 지우지 말아주세요!
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { createTheme } from "@mui/material/styles";

export default function SignInSide() {
  const redirection = useNavigate();

  const { onLogin, isLoggedIn } = useContext(AuthContext);

  const REQUEST_URL = API_BASE_URL + USER;

  // 로그인 중일 시 메인으로
  useEffect(() => {
    if (isLoggedIn) {
      alert("이미 로그인 중입니다.");
      redirection("/");
    }
  });

  // 로그인 요청 함수
  const fetchLogin = async () => {
    const $id = document.getElementById("id");
    const $pw = document.getElementById("pw");

    if (!$id.value) {
      alert("아이디를 입력해주세요.");
      $id.focus();
      return;
    }
    if (!$pw.value) {
      alert("비밀번호를 입력해주세요.");
      $pw.focus();
      return;
    }

    const res = await fetch(`${REQUEST_URL}/signin`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        id: $id.value,
        pw: $pw.value,
      }),
    });

    if (res.status === 400) {
      const text = await res.text();
      alert(text);
      return;
    }

    const { token, nick, id, role } = await res.json();

    onLogin(token, nick, id, role);
    alert("환영합니다, " + nick + "님!");
    redirection("/");
  };

  // 로그인 버튼 클릭 이벤트
  const loginHandler = (e) => {
    e.preventDefault();
    fetchLogin();
  };

  const [showPassword, setShowPassword] = useState(false);

  // 눈 클릭 시 비밀번호 보여주는/숨기는 메서드
  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid item xs={12} sm={4} md={7} className="carouselGrid">
        <Carousel id="carousel" fade>
          <Carousel.Item>
            <img
              src={require("../../img/carousel_img/parasite.jpg")}
              alt="기생충"
              style={{ height: "100vh" }}
            />
            <Carousel.Caption>
              <img
                className="logo"
                src={require("../../img/carousel_logo/parasite.png")}
                alt="기생충"
                style={{ width: "100%", height: "auto", marginBottom: "20px" }}
              />
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              src={require("../../img/carousel_img/about_time.jpg")}
              alt="어바웃 타임"
              style={{ height: "100vh" }}
            />
            <Carousel.Caption>
              <img
                className="logo"
                src={require("../../img/carousel_logo/about_time.png")}
                alt="어바웃 타임"
                style={{ width: "100%", height: "auto", marginBottom: "20px" }}
              />
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              src={require("../../img/carousel_img/train_to_busan.jpg")}
              alt="부산행"
              style={{ height: "100vh" }}
            />
            <Carousel.Caption>
              <img
                className="logo"
                src={require("../../img/carousel_logo/train_to_busan.png")}
                alt="부산행"
                style={{ width: "100%", height: "auto", marginBottom: "20px" }}
              />
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              src={require("../../img/carousel_img/avatar.jpg")}
              alt="아바타2 물의 길"
              style={{ height: "100vh" }}
            />
            <Carousel.Caption>
              <img
                className="logo"
                src={require("../../img/carousel_logo/avatar.png")}
                alt="아바타"
                style={{ width: "100%", height: "auto", marginBottom: "20px" }}
              />
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="align_right"
              src={require("../../img/carousel_img/the_round_up.jpg")}
              alt="범죄도시3"
              style={{ height: "100vh" }}
            />
            <Carousel.Caption>
              <img
                className="logo"
                src={require("../../img/carousel_logo/the_round_up.png")}
                alt="범죄도시3"
                style={{ width: "100%", height: "auto", marginBottom: "20px" }}
              />
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              src={require("../../img/carousel_img/mission_impossible.jpg")}
              alt="미션 임파서블"
              style={{ height: "100vh" }}
            />
            <Carousel.Caption>
              <img
                className="logo"
                src={require("../../img/carousel_logo/mission_impossible.png")}
                alt="미션 임파서블"
                style={{ width: "100%", height: "auto", marginBottom: "20px" }}
              />
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              src={require("../../img/carousel_img/memories_of_murder.jpg")}
              alt="살인의 추억"
              style={{ height: "100vh" }}
            />
            <Carousel.Caption>
              <img
                className="logo"
                src={require("../../img/carousel_logo/memories_of_murder.png")}
                alt="살인의 추억"
                style={{ width: "100%", height: "auto", marginBottom: "20px" }}
              />
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              src={require("../../img/carousel_img/lala_land.jpg")}
              alt="라라랜드"
              style={{ height: "100vh" }}
            />
            <Carousel.Caption>
              <img
                className="logo"
                src={require("../../img/carousel_logo/lala_land.png")}
                alt="라라랜드"
                style={{ width: "100%", height: "auto", marginBottom: "20px" }}
              />
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              src={require("../../img/carousel_img/decision_to_leave.jpg")}
              alt="헤어질 결심"
              style={{ height: "100vh" }}
            />
            <Carousel.Caption>
              <img
                className="logo"
                src={require("../../img/carousel_logo/decision_to_leave.png")}
                alt="헤어질 결심"
                style={{ width: "100%", height: "auto", marginBottom: "20px" }}
              />
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Grid>
      <Grid item xs={12} sm={8} md={5} className="loginPage" component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon className="lockIcon" />
          </Avatar>
          <Typography component="h1" variant="h5">
            로그인
          </Typography>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={loginHandler}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              fullWidth
              id="id"
              label="아이디"
              name="id"
              autoFocus
            />
            <FormControl className="password" fullWidth variant="outlined" size="small">
              <InputLabel>비밀번호</InputLabel>
              <OutlinedInput
                autoComplete="off"
                id="pw"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      id="eyeIcon"
                      aria-label="toggle password visibility"
                      onClick={showPasswordHandler}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <Button
              id="loginBtn"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              로그인
            </Button>
            <Link href="/join" variant="body2">
              계정이 없으십니까? 회원가입하기
            </Link>
            <div className="division">
              <div className="line" />
              <p>or</p>
              <div className="line" />
            </div>
            <KakaoSignin />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
