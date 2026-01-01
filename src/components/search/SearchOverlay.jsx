import "./SearchOverlay.css"
import { useEffect, useRef } from "react"

const SearchOverlay = ({ open, value, onChange, onSubmit, onClose }) => {
  const inputRef = useRef(null)

  useEffect(() => {
    if (!open) return

    const handleKey = (e) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [open, onClose])

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus()
    }
  }, [open])

  if (!open) return null

  return (
    <>
      <div className="search-backdrop" onClick={onClose} />

      <div className="search-overlay">
        <form
          className="search-overlay-form"
          onSubmit={(e) => {
            e.preventDefault()
            onSubmit()
            onClose()
          }}
        >
          <input
            ref={inputRef}
            type="search"
            placeholder="Buscar productos..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
          <button type="button" onClick={onClose}>✕</button>
        </form>
      </div>
    </>
  )
}

export default SearchOverlay
