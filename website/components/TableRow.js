import { RichText } from "prismic-reactjs";

const TableRow = ({ isHeadline, isFooter, doc }) => {
  return (
    <>
      {doc.fields[0].column && (
        <div className={`halo ${isHeadline ? "teal-green" : "snow"}`}>
          {doc.fields.map((item, index) => (
            <div
              key={index}
              className={`layer small-${Math.ceil(12 / doc.fields.length)}`}
            >
              <div className="aura">{RichText.asText(item.column)}</div>
            </div>
          ))}
        </div>
      )}
      {isFooter && <div className="aura" />}
    </>
  );
};

export default TableRow;
