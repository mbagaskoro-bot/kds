import React from "react"

type Props = { pdf_url: string }

const PDFViewer = ({ pdf_url }: Props) => {
    return (
        <iframe
            src={`https://docs.google.com/gview?url=${pdf_url}&embedded=true`}
            className="w-full h-screen rounded-xl shadow-md shadow-slate-800 border-slate-600 border-2   "
        ></iframe>
    )
}

export default PDFViewer
