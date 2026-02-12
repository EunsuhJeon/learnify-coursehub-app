import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { enrollInCourse } from "../api/enrollmentsApi";
import { useNavigate } from "react-router-dom";

export default function Cart() {
    const { cart, removeFromCart, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleCheckout = async () => {
        for (const course of cart) {
            await enrollInCourse(course.id, user.id);
        }
        clearCart();
        navigate("/my-courses");
    };

    if (cart.length === 0) {
        return <h2>Your cart is empty</h2>;
    }

    return (
        <div className="container py-4">
            <h1>Cart</h1>

            {cart.map((c) => (
                <div key={c.id}>
                    {c.title}
                    <button onClick={() => removeFromCart(c.id)}>
                        Remove
                    </button>
                </div>
            ))}

            <button onClick={handleCheckout}>
                Complete Purchase
            </button>
        </div>
    );
}
