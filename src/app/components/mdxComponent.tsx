import { PreWithCopy } from "./preWithCopy";

export const components = {
  h1: (props: any) => (
    <h1
      style={{
        color: "#cf7d25",
        marginTop: "2.5rem",
        marginBottom: "1.5rem",
        fontSize: "2rem",
        lineHeight: 1.2,
      }}
      {...props}
    />
  ),
  h2: (props: any) => (
    <h2
      style={{
        color: "#cf7d25",
        marginTop: "2rem",
        marginBottom: "1.25rem",
        fontSize: "1.5rem",
        lineHeight: 1.3,
      }}
      {...props}
    />
  ),
  p: (props: any) => (
    <p
      style={{
        color: "#e0e0e0",
        marginTop: "1rem",
        marginBottom: "1.25rem",
        lineHeight: 1.7,
      }}
      {...props}
    />
  ),
  ul: (props: any) => (
    <ul
      style={{
        color: "#e0e0e0",
        paddingLeft: "1.5rem",
        marginTop: "1rem",
        marginBottom: "1.5rem",
        lineHeight: 1.6,
      }}
      {...props}
    />
  ),
  li: (props: any) => (
    <li
      style={{
        marginBottom: "0.5rem",
      }}
      {...props}
    />
  ),
  code: (props: any) => {
    const isInline =
      !props.children?.some ||
      !props.children.some((child: any) => child?.type === "pre");

    const isBlock = props.className && props.className.startsWith("language-");

    if (isBlock) {
      return (
        <code
          style={{
            display: "block",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            backgroundColor: "#1e1e1e",
            color: "#cf7d25",
            padding: "1rem",
            borderRadius: "8px",
            fontFamily: "monospace",
            fontSize: "0.9rem",
            maxWidth: "100%",
          }}
          {...props}
        />
      );
    } else {
      return (
        <code
          style={{
            backgroundColor: "#1e1e1e",
            color: "#cf7d25",
            padding: "2px 6px",
            borderRadius: "4px",
            fontFamily: "monospace",
            fontSize: "0.9rem",
            whiteSpace: "nowrap",
            maxWidth: "100%",
            wordBreak: "break-word",
          }}
          {...props}
        />
      );
    }
  },
  pre: (props: any) => <PreWithCopy {...props} />,
  a: (props: any) => (
    <a
      style={{
        color: "#cf7d25",
        textDecoration: "underline",
        cursor: "pointer",
      }}
      {...props}
    />
  ),
};
