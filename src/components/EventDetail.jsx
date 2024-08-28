import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import moment from "moment";
import "moment/locale/zh-tw";
import ClipboardJS from "clipboard";

function detectImgType(uint8Array) {
  const jpeg = [0xff, 0xd8, 0xff];
  const png = [0x89, 0x50, 0x4e, 0x47];

  if (jpeg.every((byte, index) => uint8Array[index] === byte)) {
    return "image/jpeg";
  }
  if (png.every((byte, index) => uint8Array[index] === byte)) {
    return "image/png";
  }
  return "image/jpeg";
}

const EventDetail = (props) => {
  const { eventDetail } = props.eventDetail;
  // console.log(eventDetail);

  moment.locale("zh-tw");
  const formattedDeadline = moment(eventDetail.deadline).format(
    "YYYY年MM月DD日 HH:mm"
  );

  const [menuImg, setMenuImg] = useState("");

  useEffect(() => {
    if (eventDetail.menu && eventDetail.menu.data) {
      const uint8Array = new Uint8Array(eventDetail.menu.data);
      const imgType = detectImgType(uint8Array);
      const blob = new Blob([uint8Array], { type: imgType });
      const reader = new FileReader();
      reader.onloadend = () => {
        setMenuImg(reader.result);
      };
      reader.readAsDataURL(blob);
    }
  }, [eventDetail.menu]);

  const [inviteLink, setInviteLink] = useState(
    `http:localhost:3000/invite/${eventDetail.eid}`
  );
  const [copySuccess, setCopySuccess] = useState("");

  useEffect(() => {
    const clipboard = new ClipboardJS("#copy-button");
    clipboard.on("success", () => {
      setCopySuccess("複製成功！");
      setTimeout(() => setCopySuccess(""), 2000);
    });
    clipboard.on("error", () => {
      setCopySuccess("複製失敗，請手動複製");
    });
    return () => clipboard.destroy();
  }, []);

  return (
    <Container>
      {eventDetail ? (
        <>
          <div>
            <h1>感謝您使用【揪愛喝手搖】，以下是您的揪團資訊：</h1>
          </div>
          <div className="py-2 px-5">
            <p>團主名稱：{eventDetail.user_name}</p>
            <p>截止日期：{formattedDeadline}</p>
            <p>備註資訊：{eventDetail.remark || "無"}</p>
            <p>揪團菜單：</p>
            {menuImg && (
              <img src={menuImg} alt="揪團菜單" style={{ width: "25%" }} />
            )}
            <br />
            <br />
            <p>截止時間過後，揪團結果明細將寄送至：{eventDetail.email}</p>
          </div>
        </>
      ) : (
        <p>載入中......</p>
      )}
      <br />
      <br />
      <div>
        <h2>將以下連結傳送給大家就可以開始點餐囉!</h2>
        <InputGroup className="mb-3">
          <Form.Control type="text" value={inviteLink} readOnly />
          <Button
            id="copy-button"
            data-clipboard-text={inviteLink}
            variant="outline-secondary"
          >
            複製網址
          </Button>
        </InputGroup>
        {copySuccess && (
          <div class="alert alert-info" role="alert">
            {copySuccess}
          </div>
        )}
      </div>
    </Container>
  );
};

export default EventDetail;
