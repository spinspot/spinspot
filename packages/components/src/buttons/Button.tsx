import { cn } from "@spin-spot/utils";
import React from "react";

interface ButtonProps {
  label?: string;
  className?: string;
  onClick?: () => void;
  leftIcon?: React.ReactNode; // Propiedad para el ícono izquierdo como componente
  rightIcon?: React.ReactNode; // Propiedad para el ícono derecho como componente
  labelSize?: string; // Clase CSS para el texto del botón
}

export function Button({
  label,
  className,
  onClick,
  leftIcon,
  rightIcon,
  labelSize,
}: ButtonProps) {
  return (
    <button className={cn("btn", className)} onClick={onClick}>
      {/* Renderizar el ícono izquierdo si la prop está presente */}
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      {/* Aplicar clases de estilo adicionales al texto del botón si se proporciona */}
      {label && <span className={labelSize}>{label}</span>}
      {/* Renderizar el ícono derecho si la prop está presente */}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
}
