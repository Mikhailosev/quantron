import React from "react";
function button(props) {
  //! UI компонент для кнопок
  //! Получает props из компонента Main и запускает необходимую функцию для события OnClick
  return (
    <div
      className="buttons is-centered has-addons"
      style={{
        margin: "20px",
      }}
    >
      <button onClick={props.descending} className="button is-warning">
        Descending
      </button>
      <button onClick={props.ascending} className="button is-primary">
        Ascending
      </button>
    </div>
  );
}
export default button;
