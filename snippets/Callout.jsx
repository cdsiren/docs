export const Callout = ({ type = "info", children }) => {
  const borderColor = {
    info: "#007acc",
    warning: "#e6a700",
    danger: "#d9534f",
  }[type] || "#ccc";

  const bgColor = {
    info: "#f3f9ff",   
    warning: "#f8f6e7",
    danger: "#f7f2f1",
    note: "#f8f8f8",
    tip: "#f1f1f8",
    success: "#eff3ef",
  }[type] || "#f3f9ff";

  return (
    <div
      style={{
        borderLeft: `4px solid ${borderColor}`,
        backgroundColor: bgColor,
        padding: "0.5rem",
        borderRadius: "8px",
        margin: "1rem 0",
        fontSize: '14px'
      }}
    >
      {children}
    </div>
  );
}
