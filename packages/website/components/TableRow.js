import * as prismicH from "@prismicio/helpers";

const TableRow = ({ isHeadline, isFooter, doc }) => {
  return (
    <>
      {doc.items[0].column && (
        <div className={`halo ${isHeadline ? "teal-green" : "snow"}`}>
          {doc.items.map((item, index) => (
            <div
              key={index}
              className={`layer small-${Math.ceil(12 / doc.items.length)}`}
            >
              <div className="aura">{prismicH.asText(item.column)}</div>
            </div>
          ))}
        </div>
      )}
      {isFooter && <div className="aura" />}
    </>
  );
};

export default TableRow;
