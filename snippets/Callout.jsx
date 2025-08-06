export const Callout = ({ type = "info", children }) => {
  const borderColor = {
    info: "#007acc",
    warning: "#FFC263",
    danger: "#d9534f",
    success: "#00C256"
  }[type] || "#ccc";

  const bgColor = {
    info: "#f3f9ff",   
    warning: "#FFF2DE",
    danger: "#f7f2f1",
    note: "#f8f8f8",
    tip: "#f1f1f8",
    success: "#E0FFEE",
  }[type] || "#f3f9ff";

  return (
    <div
      style={{
        borderLeft: `4px solid ${borderColor}`,
        backgroundColor: bgColor,
        padding: "0.5rem",
        borderRadius: "12px",
        margin: "1rem 0",
        fontSize: '14px'
      }}
    >
      {children}
    </div>
  );
}
