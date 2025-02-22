// types/ui.ts
import { ReactNode } from 'react';

export interface FilterButtonProps {
  children: ReactNode;
  active: boolean;
  onClick: () => void;
}

export interface FileIconProps {
  type: string;
  size?: number;
}

export interface TableBaseProps {
  children: ReactNode;
  className?: string;
}

export interface TableRowProps extends TableBaseProps {
  'data-state'?: string | boolean;
}

export interface TableCellProps extends TableBaseProps {
  colSpan?: number;
  style?: React.CSSProperties;
}