import { Document, Page, pdfjs } from "react-pdf";
import { useState, useCallback, useRef } from "react";
import Draggable from "react-draggable";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export const fakeUser = {
  id: 1,
  name: "Nguyễn Văn A",
  role: "Trưởng phòng",
  signature: "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg",
};

const Home: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [isDragging, setIsDragging] = useState(false);
  const [isDraggingSig, setIsDraggingSig] = useState(false);
  const [sigHovered, setSigHovered] = useState(false);
  const [signaturePosition, setSignaturePosition] = useState({ x: 100, y: 100 });
  const dragRef = useRef<HTMLDivElement>(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setCurrentPage(1);
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile?.type === "application/pdf") {
      setFile(selectedFile);
    } else {
      alert("Vui lòng chọn file PDF");
    }
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files?.[0];
    if (dropped?.type === "application/pdf") setFile(dropped);
  }, []);

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="max-w-[1400px] mx-auto px-10 py-8 font-sans">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">PDF Viewer</h1>
        <p className="text-sm text-gray-400 mt-1">Upload và ký file PDF trực tiếp trên trình duyệt</p>
      </div>

      {!file && (
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => document.getElementById("pdf-input")?.click()}
          className={`
            border-2 border-dashed rounded-2xl p-16 text-center cursor-pointer
            transition-all duration-200 select-none
            ${isDragging
              ? "border-indigo-400 bg-indigo-50"
              : "border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100"}
          `}
        >
          <div className="text-5xl mb-4">📄</div>
          <p className="text-base font-semibold text-gray-800 mb-1">Kéo thả file PDF vào đây</p>
          <p className="text-sm text-gray-400 mb-5">hoặc</p>
          <button className="bg-indigo-500 hover:bg-indigo-600 active:scale-95 transition-all text-white text-sm font-medium px-6 py-2.5 rounded-lg">
            Chọn file PDF
          </button>
          <input id="pdf-input" type="file" accept="application/pdf" onChange={handleFileChange} className="hidden" />
        </div>
      )}

      {file && (
        <div className="flex gap-5 items-start">

          <div className="flex-1 flex flex-col gap-3 min-w-0">

            <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl">
              <span className="text-xl">📄</span>
              <span className="text-sm font-medium text-gray-800 flex-1 truncate">{file.name}</span>
              <span className="text-xs text-gray-400 whitespace-nowrap">
                {formatFileSize(file.size)} · {numPages} trang
              </span>
              <button
                onClick={() => { setFile(null); setNumPages(0); setCurrentPage(1); }}
                className="text-xs text-gray-500 hover:text-red-500 border border-gray-200 hover:border-red-200 rounded-md px-3 py-1.5 transition-colors"
              >
                ✕ Đóng
              </button>
            </div>

            <div className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl shadow-sm">
              <button
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >‹</button>
              <span className="text-xs text-gray-500 bg-gray-100 rounded-lg px-3 py-1.5 min-w-[90px] text-center">
                Trang {currentPage} / {numPages}
              </span>
              <button
                disabled={currentPage >= numPages}
                onClick={() => setCurrentPage((p) => Math.min(numPages, p + 1))}
                className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >›</button>

              <div className="flex-1" />
              <div className="w-px h-5 bg-gray-200" />

              <button
                onClick={() => setScale((s) => Math.max(0.5, +(s - 0.25).toFixed(2)))}
                className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
              >−</button>
              <span className="text-xs text-gray-500 bg-gray-100 rounded-lg px-3 py-1.5 min-w-[52px] text-center">
                {Math.round(scale * 100)}%
              </span>
              <button
                onClick={() => setScale((s) => Math.min(3, +(s + 0.25).toFixed(2)))}
                className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
              >+</button>

              <div className="w-px h-5 bg-gray-200" />
              <button
                onClick={() => setScale(1)}
                className="border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-500 hover:bg-gray-50 transition-colors"
              >Reset</button>
            </div>

            <div className="relative border border-gray-200 rounded-2xl overflow-auto bg-gray-100 p-8 flex justify-center min-h-[600px]">
              <Document
                file={file}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={
                  <div className="flex items-center gap-2 text-gray-400 text-sm mt-8">
                    <span className="animate-spin">⏳</span> Đang tải PDF...
                  </div>
                }
                error={<p className="text-red-400 text-sm mt-8">Không thể tải file PDF.</p>}
              >
                <div className="relative">
                  <Page
                    pageNumber={currentPage}
                    scale={scale}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    className="shadow-xl rounded-lg overflow-hidden"
                    loading={<div className="w-[600px] h-[800px] bg-white rounded-lg animate-pulse" />}
                  />

                  <Draggable
                    nodeRef={dragRef}
                    position={signaturePosition}
                    onStart={() => setIsDraggingSig(true)}
                    onStop={(_, data) => {
                      setIsDraggingSig(false);
                      setSignaturePosition({ x: data.x, y: data.y });
                    }}
                  >
                    <div
                      ref={dragRef}
                      onMouseEnter={() => setSigHovered(true)}
                      onMouseLeave={() => setSigHovered(false)}
                      className={`
                        absolute cursor-move select-none bg-white/90 backdrop-blur-sm
                        rounded-lg px-3 py-2 transition-all duration-150
                        ${sigHovered || isDraggingSig
                          ? "border-2 border-dashed border-indigo-400 shadow-lg"
                          : "border-2 border-transparent shadow-md"}
                      `}
                    >
                      <img src={fakeUser.signature} alt="Chữ ký" className="w-28 h-auto block" />
                      <p className="text-[11px] text-center text-gray-500 mt-1">{fakeUser.name}</p>
                      <p className="text-[10px] text-center text-gray-400">{fakeUser.role}</p>

                      {(sigHovered || isDraggingSig) && (
                        <div className="absolute -top-6 left-1/2 whitespace-nowrap bg-gray-800 text-white text-[10px] rounded px-2 py-0.5">
                          Kéo để di chuyển
                        </div>
                      )}
                    </div>
                  </Draggable>
                </div>
              </Document>
            </div>

            <div className="flex justify-center gap-1 flex-wrap">
              {Array.from({ length: numPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  className={`w-7 h-7 text-xs rounded-md transition-colors
                    ${p === currentPage
                      ? "bg-indigo-500 text-white font-semibold"
                      : "text-gray-400 hover:bg-gray-100"}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="w-72 shrink-0 flex flex-col gap-4 sticky top-8">

            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Người ký</p>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold text-sm shrink-0">
                  {fakeUser.name.split(" ").pop()?.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">{fakeUser.name}</p>
                  <p className="text-xs text-gray-400">{fakeUser.role}</p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                <p className="text-[11px] text-gray-400 mb-2 text-center">Chữ ký</p>
                <img src={fakeUser.signature} alt="signature preview" className="w-full h-auto rounded-lg" />
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Hướng dẫn</p>
              <ol className="flex flex-col gap-2.5">
                {[
                  "Kéo chữ ký đến vị trí mong muốn trên PDF",
                  "Hover vào chữ ký để xem viền và di chuyển",
                  "Tọa độ sẽ được lưu sau khi thả",
                ].map((text, i) => (
                  <li key={i} className="flex gap-2.5 items-start">
                    <span className="shrink-0 w-5 h-5 rounded-full bg-indigo-50 text-indigo-500 text-[11px] font-semibold flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-xs text-gray-500 leading-relaxed">{text}</span>
                  </li>
                ))}
              </ol>
            </div>

            <button className="w-full bg-indigo-500 hover:bg-indigo-600 active:scale-95 transition-all text-white text-sm font-medium py-3 rounded-xl">
              ✓ Xác nhận ký
            </button>
          </div>

        </div>
      )}
    </div>
  );
};

export default Home;