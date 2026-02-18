import "./Navbar.css"
import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const Navbar = () => {
  const [value, setValue] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault()
    navigate(`/?q=${encodeURIComponent(value)}`)
  }

  return (
    <>
      <header className="header">
        <div className="left">
          {/* hamburger button for future side menu */}
          <button
            className="hamburger-btn"
            aria-label="Abrir menú"
            onClick={() => {
              /* placeholder for side menu open - implement later */
            }}
          >
            <i className="fas fa-bars" aria-hidden></i>
          </button>

          <div className="logo">
            <Link to="/">
              <img src="/logo.png" alt="Con Cariño" />
            </Link>
          </div>

          <form className="search-form desktop-only" onSubmit={handleSubmit} role="search">
            <input
              type="search"
              placeholder="Buscar productos..."
              value={value}
              onChange={(e) => setValue(e.target.value)}
              aria-label="Buscar productos"
            />
            <button type="submit" aria-label="Buscar" className="search-submit">
              <i className="fas fa-search"></i>
            </button>
          </form>
        </div>

        <div className="right">

          <a
            href="https://wa.me/523121944320"
            target="_blank"
            rel="noreferrer"
            className="whatsapp-btn"
          >
            <i className="fab fa-whatsapp" aria-hidden></i>
            <span className="whatsapp-label desktop-only">Pedir en Whatsapp</span>
            <span className="whatsapp-label mobile-only">Pedir</span>
          </a>
        </div>
      </header>

      {/* Mobile search (not fixed) placed below the navbar */}
      <div className="mobile-search mobile-only">
        <form onSubmit={handleSubmit} role="search">
          <input
            type="search"
            placeholder="Buscar productos..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            aria-label="Buscar productos"
          />
          <button type="submit" aria-label="Buscar">
            <i className="fas fa-search"></i>
          </button>
        </form>
      </div>
    </>
  )
}

export default Navbar
