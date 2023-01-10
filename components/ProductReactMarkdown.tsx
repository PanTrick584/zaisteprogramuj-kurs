import ReactMarkdown from "react-markdown";
import Link from "next/link";

export const ProductReactMarkdown = ({ children }: { children: string }) => {
    return (
        <ReactMarkdown
            components={{
              a: ({href, ...props}) => !href ? <a {...props}></a> : <Link href={href} {...props}></Link>
            }}
            >{children}
        </ReactMarkdown>
    )
  }