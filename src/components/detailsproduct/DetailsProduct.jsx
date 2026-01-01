import { useParams } from "react-router-dom"
import "./DetailsProduct.css"
import { useState, useEffect } from "react"

const DetailsProduct = () => {
    const {id} = useParams();
    const [producto, setProducto] = useState(null);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState("");
    const whatsappMessage = producto
      ? `Hola 😊
    Me interesa este producto:

    🛍️ ${producto.nombre}
    💰 $${producto.precio}

    🔗 ${window.location.href}`
    : "";
    const whatsappLink = `https://wa.me/523121944320?text=${encodeURIComponent(whatsappMessage)}`;


    useEffect(() => {
    const fetchProducto = async () => {
        try {
        const res = await fetch(import.meta.env.VITE_PRODUCTS_URL);
        if (!res.ok) throw new Error("Error al cargar productos");
        const data = await res.json();

        const found = data.find(p => String(p.id) === id);
        if (!found) throw new Error("Producto no encontrado");

        // NORMALIZAR IMÁGENES
        const normalizedImages = found.images
        ? found.images
        : found.image
            ? [found.image]
            : [];

        // SETEAR PRODUCTO YA NORMALIZADO
        setProducto({
        ...found,
        images: normalizedImages
        });

        // MOSTRAR SIEMPRE LA PRIMERA IMAGEN
        setSelectedImage(normalizedImages[0] || "");
        } catch (err) {
        setError(err.message);
        }
    };

    fetchProducto();
    }, [id]);


    if (error) {
        return <h2 className="error-message">{error}</h2>;
    }

    return (
        <div className="product-details">
            {producto ? (
                <>
                {/* GALERÍA */}
                <div className="image-gallery">
                    <div className="thumbnails">
                    {producto.images.map((img, index) => (
                        <img
                        key={index}
                        src={img}
                        alt={`${producto.nombre} ${index + 1}`}
                        className={`thumbnail ${
                            selectedImage === img ? "active" : ""
                        }`}
                        onClick={() => setSelectedImage(img)}
                        />
                    ))}
                    </div>

                    <img
                    src={selectedImage}
                    alt={producto.nombre}
                    className="main-image"
                    />
                </div>

                {/* INFO */}
                <div className="product-info">
                    <h1>{producto.nombre}</h1>
                    <p className="price">${producto.precio} MXN</p>
                    <p className="description">{producto.descripcion}</p>

                    <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ask-button whatsapp-style"
                    >
                    <i className="fab fa-whatsapp"></i>
                    Preguntar por este producto
                    </a>

                    <p className="note">
                    Envío a todo Colima y Villa de Álvarez.
                    </p>
                </div>
                </>
            ) : (
                <p>Cargando producto...</p>
            )}
        </div>
    )
}

export default DetailsProduct;