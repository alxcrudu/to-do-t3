import React from "react";

interface Props {
  color: string
}

const Blob: React.FC<Props> = ({color}) => {
  return (
    <div className="relative w-48 h-48">
      <div className="absolute left-0 w-full">
        <BlobBase color={color} />
      </div>
      <div className="absolute blur-3xl w-full">
        <BlobBase color={color} />
      </div>
    </div>
  );
};

export default Blob;

const BlobBase: React.FC<Props> = ({color}) => (
  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <path fill={color} transform="translate(100 100)">
      <animate
        attributeName="d"
        repeatCount="indefinite"
        dur="10s"
        values="
          M37.2,-57.8C45,-52.9,45.9,-37.1,52,-23.7C58.2,-10.3,69.7,0.7,73.5,14.3C77.4,28,73.7,44.3,64.7,57.9C55.8,71.4,41.5,82.2,25.4,87.2C9.3,92.2,-8.7,91.5,-23.5,84.9C-38.3,78.3,-49.8,65.8,-60.2,52.8C-70.5,39.7,-79.5,26.2,-79.1,12.8C-78.8,-0.6,-69.1,-13.8,-60.4,-25.3C-51.6,-36.8,-43.9,-46.6,-34,-50.5C-24.1,-54.5,-12.1,-52.7,1.3,-54.7C14.7,-56.8,29.4,-62.8,37.2,-57.8Z;
          M43,-68.6C56.5,-58.2,68.7,-47.6,77.6,-33.8C86.4,-20,91.8,-3,88.5,11.9C85.1,26.8,72.9,39.7,61.3,53.3C49.8,67,39,81.4,26.2,81.7C13.5,81.9,-1.2,68,-14.5,59.5C-27.8,51,-39.6,47.8,-52.2,40.9C-64.8,34.1,-78.1,23.6,-81.3,10.8C-84.4,-2,-77.4,-17.1,-70.7,-32.5C-63.9,-47.8,-57.4,-63.5,-45.7,-74.7C-33.9,-86,-17,-92.8,-1.1,-91C14.7,-89.3,29.5,-79,43,-68.6Z;
          M43.6,-61.5C57.4,-58.9,70.2,-48.4,79,-34.5C87.8,-20.6,92.5,-3.3,87.7,10.8C82.9,25,68.6,36,56.6,48C44.6,60,34.9,73,21.5,79.9C8.2,86.9,-8.9,87.7,-22.9,81.9C-36.9,76,-47.8,63.4,-54,50.2C-60.3,36.9,-62,23,-65.9,8.3C-69.8,-6.4,-75.8,-21.9,-72.6,-34.9C-69.4,-47.9,-56.8,-58.4,-43.2,-61.1C-29.5,-63.8,-14.8,-58.7,0,-58.7C14.9,-58.8,29.7,-64.1,43.6,-61.5Z;
          M37.2,-57.8C45,-52.9,45.9,-37.1,52,-23.7C58.2,-10.3,69.7,0.7,73.5,14.3C77.4,28,73.7,44.3,64.7,57.9C55.8,71.4,41.5,82.2,25.4,87.2C9.3,92.2,-8.7,91.5,-23.5,84.9C-38.3,78.3,-49.8,65.8,-60.2,52.8C-70.5,39.7,-79.5,26.2,-79.1,12.8C-78.8,-0.6,-69.1,-13.8,-60.4,-25.3C-51.6,-36.8,-43.9,-46.6,-34,-50.5C-24.1,-54.5,-12.1,-52.7,1.3,-54.7C14.7,-56.8,29.4,-62.8,37.2,-57.8Z;">
        </animate>
    </path>
  </svg>
);
