import React from "react";

export function Oppg2() {
  return (
    <div className="oppg-main">
      <h1>Oppgave 2</h1>
      <video controls autoPlay width={1024} height={768}>
        <source src={require("../videos/2023-09-29 14-18-59.mp4")} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
