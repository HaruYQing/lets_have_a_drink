import { useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";

const OwnerForm = (props) => {
  const { handleEid } = props;

  const [inputData, setInputData] = useState({
    user_name: "",
    email: "",
    deadline: "",
    remark: "",
    menu: "",
  });

  const navigate = useNavigate();

  // TODO: 驗證函數
  const [validated, setValidated] = useState(false);
  const [user_nameErr, setUser_nameErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [deadlineErr, setDeadlineErr] = useState(false);
  const [menuErr, setMenuErr] = useState(false);

  const validateUserName = (user_name) => {
    return user_name.trim().length < 10;
  };
  const validateEmail = (email) => {
    const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})*$/;
    return emailRegex.test(email);
  };
  const validateDeadline = (deadlineString) => {
    const deadline = new Date(deadlineString);
    const now = new Date();

    // 添加一分鐘的緩衝時間，避免驗證時間過於嚴格
    now.setMinutes(now.getMinutes() + 1);

    // 允許今天和未來的日期
    return deadline >= now;
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "menu" && files[0].size > 3145728) {
      setMenuErr(true);
    } else if (name === "menu" && files && files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setInputData((prevData) => ({
          ...prevData,
          [name]: e.target.result, // base64 編碼的圖片
        }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setInputData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

    if (name === "user_name") {
      setUser_nameErr(!validateUserName(value));
    }
    if (name === "email") {
      setEmailErr(!validateEmail(value));
    }
    if (name === "deadline") {
      setDeadlineErr(!validateDeadline(value));
    }
  };

  // TODO: handleSubmit
  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("inputData: ", inputData);

    let isValid = true;

    if (inputData.user_name && !validateUserName(inputData.user_name)) {
      setUser_nameErr(true);
      isValid = false;
    }
    if (inputData.email && !validateEmail(inputData.email)) {
      setEmailErr(true);
      isValid = false;
    }
    if (inputData.deadline && !validateDeadline(inputData.deadline)) {
      setDeadlineErr(true);
      isValid = false;
    }
    if (!isValid) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      const formData = new FormData();
      Object.keys(inputData).forEach((key) => {
        if (key === "menu" && inputData[key] instanceof File) {
          formData.append(key, inputData[key]);
        } else {
          formData.append(key, inputData[key]);
        }
      });

      // console.log("新增揪團資料如下:", formData);
      // 檢查 inputData 中的 menu 字段是否包含 Base64 數據
      // console.log("Menu data:", inputData.menu.substring(0, 100));

      const response = await axios.post(
        "http://localhost:8000/createEvent",
        formData,
        // inputData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log("response資訊如下:", response);

      if (response.status === 200) {
        const eid = response.data.eid;
        console.log("揪團資料已成功儲存:", response.data.message);
        console.log("eid: ", eid);

        alert("揪團活動建立成功!");

        // 把 eid 傳遞給父層
        handleEid(eid);
        setTimeout(() => {
          navigate("/details");
        }, 1000);
      } else {
        console.log("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("完整錯誤對象:", error);
      if (error.response) {
        console.log("Error response:", error.response.data);
        console.log("Error status:", error.response.status);
      }
    }
  };

  const getMinDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  };

  return (
    <Container>
      <Row>
        <Col className="d-flex align-items-center">
          <h1 className="font-special fs-larger fw-bold c-primary my-5 me-3">
            建立揪團活動
          </h1>
          <Button
            type="button"
            variant="light"
            size="lg"
            onClick={() => navigate(-1)}
          >
            <i className="bi bi-house fs-medium"></i>
          </Button>
        </Col>
      </Row>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-4" controlId="ownerName">
          <Form.Label>您的稱呼</Form.Label>
          <Form.Control
            name="user_name"
            type="text"
            placeholder="請輸入10字以內稱呼"
            maxLength={10}
            value={inputData.name}
            onChange={handleInputChange}
            isInvalid={user_nameErr}
            required
          />
          <Form.Text>
            稱呼將用於顯示在揪團表單中，建議填寫揪團成員認識的稱呼
          </Form.Text>
          <Form.Control.Feedback type="invalid">
            名稱太長囉~限10個字以內
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-4" controlId="ownerEmail">
          <Form.Label>您的信箱</Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder="請輸入您的信箱"
            onChange={handleInputChange}
            isInvalid={emailErr}
            required
          />
          <Form.Text>信箱將用於接收揪團結果，請務必確認信箱填寫正確</Form.Text>
          <Form.Control.Feedback type="invalid">
            信箱格式怪怪的，要不要再檢查一下呢?
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-4" controlId="endDateTime">
          <Form.Label>截止時間</Form.Label>
          <Form.Control
            name="deadline"
            type="datetime-local"
            onChange={handleInputChange}
            value={inputData.deadline}
            min={getMinDateTime()}
            isInvalid={deadlineErr}
            required
          />
          <Form.Text>超過截止時間送出的回覆將不會出現於揪團結果中</Form.Text>
          <Form.Control.Feedback type="invalid">
            時間好像不太對，要不要再次確認呢
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-4" controlId="aboutEvent">
          <Form.Label>揪團備註</Form.Label>
          <Form.Control
            name="remark"
            as="textarea"
            rows={3}
            placeholder="請輸入您的備註"
            maxLength={150}
            onChange={handleInputChange}
          />
          <Form.Text>
            限150字以內，給揪團成員的訊息。如：不能指定甜度冰塊的飲料就直接做正常喔、飲料錢請於下午3點前給OOO
          </Form.Text>
          <Form.Control.Feedback type="invalid">
            備註太長囉~限150個字以內
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-4" controlId="menu">
          <Form.Label>上傳菜單</Form.Label>
          <Form.Control
            name="menu"
            type="file"
            accept="image/jpeg, image/png"
            isInvalid={menuErr}
            onChange={handleInputChange}
            required
          />
          <Form.Text>
            請上傳本次揪團的菜單，格式為jpg或png，大小限制為3MB
          </Form.Text>
          <Form.Control.Feedback type="invalid">
            檔案太大囉~
          </Form.Control.Feedback>
        </Form.Group>
        <Row>
          <Col className="d-flex justify-content-center">
            <Button
              className="font-special mx-2 my-5 d-inline-block"
              variant="secondary"
              size="lg"
              type="reset"
            >
              清除重填
            </Button>
            <Button
              className="font-special mx-2 my-5 d-inline-block"
              variant="success"
              size="lg"
              type="submit"
            >
              確認送出
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default OwnerForm;
