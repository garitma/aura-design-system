import { useNotice } from "../utils/use-notice";
import Notice from "./notice";

const NoticeBox = () => {
  const { notices } = useNotice();
  if (notices.length > 0) {
    return (
      <div className="hold left right top centertxt">
        <div className="aureole one">
          {notices.map((item: any, index: any) => (
            <Notice doc={item} index={index} key={item.id} />
          ))}
        </div>
      </div>
    );
  }
  return <></>;
};

export default NoticeBox;
