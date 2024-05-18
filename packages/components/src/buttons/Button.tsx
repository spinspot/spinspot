import { cn } from "@spin-spot/utils";

interface ButtonProps {
  label?: string;
  className?: string;
  onClick?: () => void;
  leftIcon?: string; // Propiedad para el ícono izquierdo
  rightIcon?: string; // Propiedad para el ícono derecho
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
      {leftIcon && <img src={leftIcon} alt="left-icon" className="mr-2" />}
      {/* Aplicar clases de estilo adicionales al texto del botón si se proporciona */}
      {label && <span className={labelSize}>{label}</span>}
      {/* Renderizar el ícono derecho si la prop está presente */}
      {rightIcon && <img src={rightIcon} alt="right-icon" className="ml-2" />}
    </button>
  );
}
