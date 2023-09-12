import React from "react";
import "../styles/ContainerWithButtonStyles.css";

function ContainerWithButton({ Title, Details, URL, ButtonDesc }) {
  return (
    <div class="main-container">
      <div id="inner-container">
        <h3>{Title}</h3>
        <p>{Details}</p>
        <a href={URL} target="_blank">
          {ButtonDesc}
        </a>
      </div>
    </div>
  );
}

export default ContainerWithButton;
