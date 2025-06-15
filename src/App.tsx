import { useState, useRef, useEffect, useCallback } from 'react'
import JsBarcode from 'jsbarcode'
import './App.css'

function App() {
  const [inputMode, setInputMode] = useState<'text' | 'pattern'>('text')
  const [text, setText] = useState('123456789012')
  const [format, setFormat] = useState('CODE128')
  const [width, setWidth] = useState(2)
  const [height, setHeight] = useState(100)
  const [displayValue, setDisplayValue] = useState(true)
  
  // 패턴 모드용 상태
  const [patternDate, setPatternDate] = useState(new Date())
  const [amount, setAmount] = useState('12345678')
  const [storeCode] = useState('34')
  
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const barcodeFormats = [
    'CODE128', 'EAN13', 'EAN8', 'UPC', 'CODE39', 'ITF14', 'ITF', 'MSI',
    'pharmacode', 'codabar'
  ]

  // 패턴 텍스트 생성 함수
  const generatePatternText = useCallback(() => {
    const dateStr = patternDate.toISOString().slice(0, 19).replace(/[-:T]/g, '').slice(0, 14)
    const amountStr = amount.padStart(8, '0').slice(0, 8)
    return `${dateStr}${amountStr}${storeCode}`
  }, [patternDate, amount, storeCode])

  // 실제 바코드 생성에 사용할 텍스트
  const finalText = inputMode === 'pattern' ? generatePatternText() : text

  const generateBarcode = useCallback(() => {
    if (canvasRef.current && finalText.trim()) {
      try {
        JsBarcode(canvasRef.current, finalText, {
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
  }, [finalText, format, width, height, displayValue])

  useEffect(() => {
    generateBarcode()
  }, [generateBarcode])

  const downloadBarcode = () => {
    if (canvasRef.current) {
      const link = document.createElement('a')
      const filename = inputMode === 'pattern' ? 'parking-barcode' : `barcode-${text}`
      link.download = `${filename}.png`
      link.href = canvasRef.current.toDataURL()
      link.click()
    }
  }

  // 날짜/시간을 input datetime-local 형식으로 변환
  const formatDateTimeLocal = (date: Date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${year}-${month}-${day}T${hours}:${minutes}`
  }

  const handleDateTimeChange = (dateTimeString: string) => {
    const newDate = new Date(dateTimeString)
    setPatternDate(newDate)
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
            <label>입력 방식:</label>
            <div className="input-mode-tabs">
              <label className={`tab ${inputMode === 'text' ? 'active' : ''}`}>
                <input
                  type="radio"
                  value="text"
                  checked={inputMode === 'text'}
                  onChange={(e) => setInputMode(e.target.value as 'text' | 'pattern')}
                />
                텍스트 직접 입력
              </label>
              <label className={`tab ${inputMode === 'pattern' ? 'active' : ''}`}>
                <input
                  type="radio"
                  value="pattern"
                  checked={inputMode === 'pattern'}
                  onChange={(e) => setInputMode(e.target.value as 'text' | 'pattern')}
                />
                주차 할인 바코드
              </label>
            </div>
          </div>

          {inputMode === 'text' ? (
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
          ) : (
            <>
              <div className="pattern-info">
                <h4>🅿️ 주차 할인 바코드 (총 24자리)</h4>
                <p>날짜시간(14자리) + 금액(8자리) + 가맹점코드(2자리)</p>
                <div className="pattern-preview">
                  <strong>생성될 패턴: {finalText}</strong>
                </div>
              </div>
              
              <div className="control-group">
                <label htmlFor="datetime">날짜 및 시간:</label>
                <input
                  id="datetime"
                  type="datetime-local"
                  value={formatDateTimeLocal(patternDate)}
                  onChange={(e) => handleDateTimeChange(e.target.value)}
                />
              </div>

              <div className="control-group">
                <label htmlFor="amount">할인 금액 (원):</label>
                <input
                  id="amount"
                  type="number"
                  min="0"
                  max="99999999"
                  value={parseInt(amount) || 0}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="12345678"
                />
                <small>8자리로 자동 변환됩니다 (예: 1234 → 00001234)</small>
              </div>

              <div className="control-group">
                <label>가맹점 코드:</label>
                <input
                  type="text"
                  value={storeCode}
                  disabled
                  style={{ backgroundColor: '#f0f0f0', color: '#666' }}
                />
                <small>고정값: 34</small>
              </div>
            </>
          )}

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
          {!finalText.trim() && (
            <p className="empty-message">
              {inputMode === 'text' 
                ? '텍스트를 입력하면 바코드가 생성됩니다' 
                : '패턴이 설정되면 바코드가 생성됩니다'}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
