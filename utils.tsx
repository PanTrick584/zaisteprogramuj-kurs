import {MDXRemoteSerializeResult} from "next-mdx-remote";

export type MarkdownResult =  MDXRemoteSerializeResult<Record<string, unknown>>

export const validCardDate = (value: string) => {
    const [month, year] = value.split("/")

    // można dopracować walidację

    if(value.length !== 5) return "Błędny rok";
    if(Number(month) > 12) return "Błędny miesiąc"

    return true;
}