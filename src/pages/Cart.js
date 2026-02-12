import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { enrollInCourse } from "../api/enrollmentsApi";
import { useNavigate, Link } from "react-router-dom";

export default function Cart() {
    const { cart, removeFromCart, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const totalPrice = cart.reduce((sum, c) => {
        if (!c.price || c.price === "Free") return sum;
        return sum + Number(c.price);
    }, 0);

    const handleCheckout = async () => {
        for (const course of cart) {
            await enrollInCourse(course.id, user.id);
        }
        clearCart();
        navigate("/my-courses");
    };

    return (
        <div className="min-vh-100 bg-light py-4">
            <div className="container">
                <h1 className="mb-4">Shopping Cart</h1>

                {cart.length === 0 ? (
                    <div className="card shadow-sm border-0 rounded-3 p-4 text-center course-detail-page d-flex flex-column gap-2 align-items-center">
                        <h5>Your cart is empty</h5>
                        <p className="text-secondary mb-3">
                            Browse courses and add them to your cart.
                        </p>
                        <Link to="/courses" className="btn btn-learnify-primary w-50 ">
                            Explore Courses
                        </Link>
                    </div>
                ) : (
                    <div className="row g-4">
                        {/* LEFT SIDE — CART ITEMS */}
                        <div className="col-lg-8">
                            {cart.map((c) => (
                                <div
                                    key={c.id}
                                    className="card shadow-sm border-0 rounded-3 mb-3"
                                >
                                    <div className="card-body d-flex justify-content-between align-items-center">
                                        <div>
                                            <h5 className="mb-1">{c.title}</h5>
                                            <p className="text-secondary small mb-0">
                                                {c.level} • {c.duration}
                                            </p>
                                        </div>

                                        <div className="d-flex align-items-center gap-3">
                                            <span className="fw-semibold">
                                                {c.price === "Free" || !c.price
                                                    ? "Free"
                                                    : `$${c.price}`}
                                            </span>

                                            <button
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() => removeFromCart(c.id)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* RIGHT SIDE — SUMMARY */}
                        <div className="col-lg-4 course-detail-page">
                            <div className="card shadow-sm border-0 rounded-3 sticky-lg-top">
                                <div className="card-body">
                                    <h5 className="mb-3">Order Summary</h5>

                                    <div className="d-flex justify-content-between mb-2">
                                        <span>Total items</span>
                                        <strong>{cart.length}</strong>
                                    </div>

                                    <div className="d-flex justify-content-between mb-3">
                                        <span>Total price</span>
                                        <strong>
                                            {totalPrice === 0 ? "Free" : `$${totalPrice}`}
                                        </strong>
                                    </div>

                                    <button
                                        className="btn btn-learnify-primary w-100"
                                        onClick={handleCheckout}
                                    >
                                        Complete Purchase
                                    </button>

                                    <Link
                                        to="/courses"
                                        className="btn btn-outline-secondary w-100 mt-2"
                                    >
                                        Continue Shopping
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
