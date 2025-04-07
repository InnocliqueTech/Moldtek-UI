import { Tooltip } from "@mui/material";
import React, { useState } from "react";
import { LinkOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

interface RenderTooltipProps {
  content: string;
  strLength: number;
}

export const RenderTooltip: React.FC<RenderTooltipProps> = ({ content, strLength }) => {
  if (content && content.length > strLength) {
    return (
      <Tooltip title={content} arrow>
        <span>{content.slice(0, strLength)}...</span>
      </Tooltip>
    );
  }
  return <span>{content}</span>;
};



interface UENCellProps {
  value: string;
}

const UENCell: React.FC<UENCellProps> = ({ value }) => {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/viewMasterData`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "6px",
      }}
    >
      <span style={{ textDecoration: hovered ? "underline" : "none" }}>
        <RenderTooltip content={value} strLength={45} />
      </span>
      {hovered && <LinkOutlined style={{ color: "#172B4D" }} />}
    </div>
  );
};

export default UENCell;

