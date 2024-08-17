import React from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

const OwnerForm = () => {
  const navigate = useNavigate();
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
      <Form>
        <Form.Group className="mb-4" controlId="ownerName">
          <Form.Label>您的稱呼</Form.Label>
          <Form.Control type="text" placeholder="請輸入您的稱呼" />
          <Form.Text>
            稱呼將用於顯示在揪團表單中，建議填寫揪團成員認識的稱呼
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-4" controlId="ownerEmail">
          <Form.Label>您的信箱</Form.Label>
          <Form.Control type="email" placeholder="請輸入您的信箱" />
          <Form.Text>信箱將用於接收揪團結果，請務必確認信箱填寫正確</Form.Text>
        </Form.Group>
        <Form.Group className="mb-4" controlId="endDateTime">
          <Form.Label>截止時間</Form.Label>
          <Form.Control type="datetime-local" />
          <Form.Text>超過截止時間送出的回覆將不會出現於揪團結果中</Form.Text>
        </Form.Group>
        <Form.Group className="mb-4" controlId="aboutEvent">
          <Form.Label>揪團備註</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="請輸入您的備註"
            maxLength={150}
          />
          <Form.Text>
            限150字以內，給揪團成員的訊息。如：不能指定甜度冰塊的飲料就直接做正常喔、飲料錢請於下午3點前給OOO
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-4" controlId="menu">
          <Form.Label>上傳菜單</Form.Label>
          <Form.Control type="file" accept="image/jpeg, image/png" />
          <Form.Text>
            請上傳本次揪團的菜單，格式為jpg或png，大小限制為10MB
          </Form.Text>
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
