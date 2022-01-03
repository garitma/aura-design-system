import { useState } from "react";
import Image from "../atoms/Image";

const Gallery = ({ doc }) => {
  const [step, setStep] = useState(0);
  const hasNextPage = step < doc.length;

  return (
    <div className="anchor">
      <div className="centertxt">
        <Image src={doc[step].image.url} aspectRatio="1:1" width={400} />
      </div>
      <div className="aureole five fixed">
        {doc.map((item, index) => (
          <a
            key={index}
            onClick={() => setStep(index)}
            className="pre-disabled zoom"
          >
            <Image src={item.image.url} aspectRatio="1:1" width={400} />
          </a>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
