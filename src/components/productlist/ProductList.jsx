import { useState, useEffect } from "react"
import "./ProductList.css"
import { useNavigate, useLocation } from "react-router-dom";

const ProductList = () => {
	const [productos, setProductos] = useState([]);
	const [error, setError] = useState(null);
	const [ orden, setOrden ] = useState("Relevante");
	const [filtros, setFiltros] = useState({categorias: []});
	const [filtrosOpen, setFiltrosOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		// read q param from URL and keep in state so filtering updates when user navigates to /search?q=...
		const params = new URLSearchParams(location.search);
		const q = params.get('q') || '';
		setSearchQuery(q);
	}, [location.search]);

	useEffect(() => {
	const fetchProductos = async () => {
		try {
		const res = await fetch(import.meta.env.VITE_PRODUCTS_URL);
		if (!res.ok) throw new Error("Error al cargar productos");
		const data = await res.json();
		setProductos(data);
		} catch (err) {
		setError(err.message);
		}
	};

	fetchProductos();
	}, []);


	const toggleFiltros = (tipoFiltro, valor) => {
		setFiltros((prev) => ({
			...prev,
			[tipoFiltro]: prev[tipoFiltro].includes(valor)
			? prev[tipoFiltro].filter((item) => item !== valor)
			: [...prev[tipoFiltro], valor],
		}))
	}

	const productosFiltrados = productos.filter((producto) => {
		const matchCategoria =
		filtros.categorias.length === 0 ||
		filtros.categorias.includes(producto.tipo);
		const matchSearch = searchQuery.trim() === '' || (producto.nombre && producto.nombre.toLowerCase().includes(searchQuery.toLowerCase()));
		return matchCategoria && matchSearch;
	});

	const handleOrdenChange = (e) => {
		setOrden(e.target.value)
	}

	const productosOrdenados = [...productosFiltrados].sort((a,b) => {
		if(orden === "Precio: Menor a Mayor"){
			return a.precio - b.precio;
		} if (orden === "Precio: Mayor a Menor"){
			return b.precio - a.precio;
		}
		return 0;
	});

	const handleImageClick = (id) => {
		navigate(`/producto/${id}`);
	}

	return (
	<section className="product-list">
		<aside className="filters">
		<h2>Filtros</h2>
		<div className="filters-category">
			<div className="filter-category">
			<h3>Categorias</h3>
			<label>
				<input type="checkbox"
					onChange={() => toggleFiltros("categorias", "Tazas")}
				/>
				<span>Tazas</span>
			</label>
			<label>
				<input type="checkbox"
					onChange={() => toggleFiltros("categorias", "Dulceria")}
				/>
				<span>Dulcería</span>
			</label>
			<label>
				<input type="checkbox"
					onChange={() => toggleFiltros("categorias", "Peluches")}
				/>
				<span>Peluches</span>
			</label>
			<label>
				<input type="checkbox"
					onChange={() => toggleFiltros("categorias", "Accesorios")}
				/>
				<span>Accesorios</span>
			</label>
			</div>
		</div>
		</aside>
		<main className="collections">
			<div className="options">
				<h2>TODAS LAS COLECCIONES</h2>

				<div className="sort-options">
					<label>
					Ordenar por:
					<select onChange={handleOrdenChange} value={orden}>
						<option>Relevante</option>
						<option>Precio: Menor a Mayor</option>
						<option>Precio: Mayor a Menor</option>
					</select>
					</label>

					{/* 🔽 BOTÓN FILTROS (solo móvil) */}
					<button
					className="filters-toggle mobile-only"
					onClick={() => setFiltrosOpen(v => !v)}
					aria-label="Filtros"
					>
					<i className="fas fa-sliders-h"></i>
					</button>
				</div>
			</div>
			{filtrosOpen && (
				<div className="mobile-filters-dropdown">
					<h4>Categorías</h4>

					{["Tazas", "Dulceria", "Peluches", "Accesorios"].map(cat => (
					<label key={cat}>
						<input
						type="checkbox"
						checked={filtros.categorias.includes(cat)}
						onChange={() => toggleFiltros("categorias", cat)}
						/>
						<span>{cat}</span>
					</label>
					))}
				</div>
			)}



			<div className="products">
				{error ? (
					<p className="error-message">{error}</p>
				): productosFiltrados.length > 0 ? (
					productosOrdenados.map((producto) => ((
						<div className="product-card" key={producto.id}>
							<img
							  src={producto.images?.[0] || ""}
							  alt={producto.nombre}
							  className="product-image"
							  onClick={() => handleImageClick(producto.id)}
							/>

							<h3>{producto.nombre}</h3>
							<p>${producto.precio} MXN</p>
						</div>
					)))
				) : (
					<p className="no-results">
						No se encontraron productos que coincidan con los filtros seleccionados.
					</p>
				) }
			</div>

		</main>
	</section>
	);
}

export default ProductList;