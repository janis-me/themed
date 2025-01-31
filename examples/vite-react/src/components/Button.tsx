import "./Button.scss";

export default function Button({
  children,
  className,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button {...props} className={`my-button ${className}`}>
      {children}
    </button>
  );
}
