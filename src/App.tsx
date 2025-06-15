import { useState, useRef, useEffect, useCallback } from 'react'
import JsBarcode from 'jsbarcode'
import './App.css'

function App() {
  const [text, setText] = useState('123456789012')
  const [format, setFormat] = useState('CODE128')
  const [width, setWidth] = useState(2)
  const [height, setHeight] = useState(100)
  const [displayValue, setDisplayValue] = useState(true)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const barcodeFormats = [
    'CODE128', 'EAN13', 'EAN8', 'UPC', 'CODE39', 'ITF14', 'ITF', 'MSI',
    'pharmacode', 'codabar'
  ]

  const generateBarcode = useCallback(() => {
    if (canvasRef.current && text.trim()) {
      try {
        JsBarcode(canvasRef.current, text, {
          format: format,
          width: width,
          height: height,
          displayValue: displayValue,
          fontSize: 14,
          textMargin: 5,
          margin: 10
        })
      } catch (error) {
        console.error('바코드 생성 오류:', error)
        // 에러 발생 시 캔버스 초기화
        const ctx = canvasRef.current.getContext('2d')
        if (ctx) {
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
        }
      }
    }
  }, [text, format, width, height, displayValue])

  useEffect(() => {
    generateBarcode()
  }, [generateBarcode])

  const downloadBarcode = () => {
    if (canvasRef.current) {
      const link = document.createElement('a')
      link.download = `barcode-${text}.png`
      link.href = canvasRef.current.toDataURL()
      link.click()
    }
  }

  return (
    <div className="barcode-generator">
      <header className="header">
        <h1>🏷️ 바코드 생성기</h1>
        <p>다양한 형식의 바코드를 생성하고 다운로드하세요</p>
      </header>

      <div className="container">
        <div className="controls">
          <div className="control-group">
            <label htmlFor="text">바코드 텍스트:</label>
            <input
              id="text"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="바코드로 변환할 텍스트를 입력하세요"
            />
          </div>

          <div className="control-group">
            <label htmlFor="format">바코드 형식:</label>
            <select
              id="format"
              value={format}
              onChange={(e) => setFormat(e.target.value)}
            >
              {barcodeFormats.map((fmt) => (
                <option key={fmt} value={fmt}>
                  {fmt}
                </option>
              ))}
            </select>
          </div>

          <div className="control-row">
            <div className="control-group">
              <label htmlFor="width">선 두께:</label>
              <input
                id="width"
                type="range"
                min="1"
                max="5"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
              />
              <span>{width}px</span>
            </div>

            <div className="control-group">
              <label htmlFor="height">높이:</label>
              <input
                id="height"
                type="range"
                min="50"
                max="200"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
              />
              <span>{height}px</span>
            </div>
          </div>

          <div className="control-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={displayValue}
                onChange={(e) => setDisplayValue(e.target.checked)}
              />
              텍스트 표시
            </label>
          </div>

          <button className="download-btn" onClick={downloadBarcode}>
            📥 바코드 다운로드
          </button>
        </div>

        <div className="barcode-display">
          <h3>미리보기</h3>
          <div className="canvas-container">
            <canvas ref={canvasRef} />
          </div>
          {!text.trim() && (
            <p className="empty-message">텍스트를 입력하면 바코드가 생성됩니다</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
