import { Dayjs } from "dayjs"
import { ReactNode } from "react"

export interface articleType {
    jsx: ReactNode,
    title: string,
    date: Dayjs,
    author?: string,
    tag?: string[],
    _filePath?: string,
    _textContent?: string,
}
