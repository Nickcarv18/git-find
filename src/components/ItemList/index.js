import "./styles.css";

function ItemList({title, description, url}){
  return (
    <div className="itemList">
      <strong>
        <a href={url}rel="noreferrer" target="_blank">
          {title}
        </a>
      </strong>

      <p>{description}</p>

      <hr />
    </div>
  );
}

export default ItemList;