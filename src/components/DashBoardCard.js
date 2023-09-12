import React from "react";
import "../styles/DashBoardCardStyle.css";
import HOD_Signature_Icon from "../res/HOD_Signature.png";
import styled from "styled-components";

function DashBoardCard() {
  return (
    <div className="row w-row">
      <div className="basic-column w-col w-col-3">
        <div className="tag-wrapper">
          <div className="number-card number-card-content2">
            <h1 className="number-card-number">
              {window.localStorage.getItem("pending") || "0"}
            </h1>

            <div className="number-card-divider"></div>
            <div className="number-card-progress-wrapper">
              <div className="tagline number-card-currency">Pending</div>
            </div>
          </div>
          <div className="divider"></div>
        </div>
      </div>
      <div className="basic-column w-col w-col-3">
        <div className="tag-wrapper">
          <div className="number-card number-card-content3">
            <h1 className="number-card-number">
              {window.localStorage.getItem("rejected") || "0"}
            </h1>

            <div className="number-card-divider"></div>
            <div className="number-card-progress-wrapper">
              <div className="tagline number-card-currency">Rejected</div>
            </div>
          </div>
          <div className="divider"></div>
        </div>
      </div>
      <div className="basic-column w-col w-col-3">
        <div className="tag-wrapper">
          <div className="number-card number-card-content4">
            <h1 className="number-card-number">
              {window.localStorage.getItem("accepted") || "0"}
            </h1>
            <div className="number-card-divider"></div>
            <div className="number-card-progress-wrapper">
              <div className="tagline number-card-currency">Accepted</div>
            </div>
          </div>
          <div className="divider"></div>
        </div>
      </div>
      <div className="basic-column w-col w-col-3">
        <div className="tag-wrapper">
          <a href="/HODSignature">
            <div className="number-card number-card-content1">
              <Icon src={HOD_Signature_Icon} alt="Folder_Icon" />
              <div className="divider"></div>
              <p className="text-light tagline number-card-currency">
                Change Signatures
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default DashBoardCard;

const Icon = styled.img`
  height: 43px;
  width: 43px;
`;
