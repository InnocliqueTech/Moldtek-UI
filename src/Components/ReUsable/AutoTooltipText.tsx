import React from 'react';
import { 
  Tooltip, 
  Typography, 
  TooltipProps, 
  TypographyProps, 
  SxProps 
} from '@mui/material';

interface AutoTooltipTextProps {
  /** The text content to display */
  content: string;
  /** Maximum length before truncation occurs */
  maxLength: number;
  /** MUI Typography variant */
  variant?: TypographyProps['variant'];
  /** Root component type */
  component?: React.ElementType;
  /** Custom class name */
  className?: string;
  /** Tooltip position relative to text */
  tooltipPlacement?: TooltipProps['placement'];
  /** Show tooltip arrow */
  tooltipArrow?: boolean;
  /** Custom styles */
  sx?: SxProps;
  /** Tooltip additional props */
  TooltipProps?: Partial<TooltipProps>;
}

const AutoTooltipText: React.FC<AutoTooltipTextProps> = ({
  content,
  maxLength,
  variant = 'body1',
  component = 'span',
  className,
  tooltipPlacement = 'top',
  tooltipArrow = true,
  sx,
  TooltipProps,
}) => {
  const needsTruncation = content.length > maxLength;
  const displayText = needsTruncation 
    ? `${content.substring(0, maxLength)}...` 
    : content;

  return (
    <Tooltip
      title={needsTruncation ? content : ''}
      placement={tooltipPlacement}
      arrow={tooltipArrow}
      disableHoverListener={!needsTruncation}
      {...TooltipProps}
    >
      <Typography
        variant={variant}
        component={component}
        className={className}
        sx={{
          display: 'inline-block',
          maxWidth: '100%',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          verticalAlign: 'middle',
          mb:0.5,
          ...sx,
        }}
      >
        {displayText}
      </Typography>
    </Tooltip>
  );
};

export default AutoTooltipText;