import { useCallback } from "react";
import { useDropzone } from 'react-dropzone'

// @ts-ignore
function Upload({ onUpload }) {
  // @ts-ignore
  const onDrop = useCallback(acceptedFiles => {
    onUpload(acceptedFiles)
  }, [])
  const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: false, accept: { 'image/jpg': ['.jpg'] } })
  const files = acceptedFiles.map(file => (
    // @ts-ignore
    <li key={file.path} className="text-gray-900 font-medium text-sm">{file.path} - {file.size} bytes</li>
  ));

  return (
    <div {...getRootProps()} className="bg-slate-300 p-7">
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Solte um arquivo aqui ...</p> :
          <p>Solte um arquivo aqui, ou clique para selecionar</p>
      }
      <ul>{files}</ul>
    </div>
  )
}

export { Upload }