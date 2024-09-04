import React from "react";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import { useParams } from "react-router-dom";

// http://localhost:3000/invite/14
const ClientForm = (props) => {
  // const { eventDetail } = props.eventDetail;
  console.log(props.eventDetail); // undefined??????

  // const { eid } = useParams();
  return (
    <Container>
      {/* <div>
        <h1>歡迎來到{eventDetail.user_name}的揪團訂單</h1>
        <h3>
          在收單時間{eventDetail.deadline}之前完成填單並送出就能成功跟團囉!
        </h3>
        <p>來自團主的訊息：{eventDetail.remark}</p>
        <div>
          <h4>本次揪團菜單：</h4>
          <img src="#" alt="揪團菜單" />
        </div>
      </div> */}
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>您的稱呼</Form.Label>
          <Form.Control
            name="client_name"
            type="text"
            placeholder="請輸入10字以內稱呼"
          />
          <Form.Text>
            稱呼將用於顯示在團主的表單中，建議填寫團主認識的稱呼
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>訂購品項名稱</Form.Label>
          <Form.Control
            name="item_name"
            type="text"
            placeholder="請輸入20字以內品名"
          />
          <Form.Text>建議填寫完整品項名稱方便團主確認</Form.Text>
        </Form.Group>
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>甜度</Form.Label>
            <Form.Select name="sugar">
              <option>請選擇甜度</option>
              <option value="standard">正常甜</option>
              <option value="less">少糖(7-8分)</option>
              <option value="half">半糖(5分)</option>
              <option value="low">微糖(3分)</option>
              <option value="lower">一分糖(如果有)</option>
              <option value="no">無糖</option>
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>冰塊</Form.Label>
            <Form.Select name="ice">
              <option>請選擇冰量</option>
              <option value="normal">正常冰</option>
              <option value="less">少冰(7-8分)</option>
              <option value="half">半冰(5分)</option>
              <option value="low">微冰(3分)</option>
              <option value="no">去冰</option>
              <option value="room">常溫</option>
              <option value="hot">熱</option>
            </Form.Select>
          </Form.Group>
        </Row>
      </Form>
    </Container>
  );
};

export default ClientForm;
