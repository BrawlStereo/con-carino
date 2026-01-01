import "./Navbar.css"
import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import SearchOverlay from "../search/SearchOverlay"

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false)
  const [value, setValue] = useState("")
  const navigate = useNavigate()

  const handleSubmit = () => {
    navigate(`/?q=${encodeURIComponent(value)}`)
  }

  useEffect(() => {
    if (searchOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [searchOpen])

  return (
    <>
      <header className="header">
        {/* IZQUIERDA */}
        <div className="left">
          <button
            className="icon-btn"
            onClick={() => setSearchOpen(true)}
            aria-label="Buscar"
          >
            <i className="fas fa-search"></i>
          </button>
        </div>

        {/* CENTRO */}
        <div className="logo">
          <Link to="/">
            <img src="/logo.png" alt="Con Cariño" />
          </Link>
        </div>

        {/* DERECHA */}
        <div className="right">
          <a
            href="https://wa.me/523121944320"
            target="_blank"
            rel="noreferrer"
            className="whatsapp-btn mobile-only"
          >
            <i className="fab fa-whatsapp"></i>
            <span>Pedir</span>
          </a>

          <a
            href="https://wa.me/523121944320"
            target="_blank"
            rel="noreferrer"
            className="whatsapp-btn desktop-only"
          >
            <i className="fab fa-whatsapp"></i>
            <span>Pedir en Whatsapp</span>
          </a>
        </div>
      </header>


      <SearchOverlay
        open={searchOpen}
        value={value}
        onChange={setValue}
        onSubmit={handleSubmit}
        onClose={() => setSearchOpen(false)}
      />
    </>
  )
}

export default Navbar
