import { useEffect } from "react";
import { logout, selectedUser } from "../features/auth/authSlice";
import AuthLayout from "../features/auth/components/AuthLayout";
import HeaderComponent from "../features/products/components/Header.component";
import ProcuctComponent from "../features/products/components/Product.component";
import { useAppDispatch, useAppSelector } from "../hooks/redux/hooks";
import { getProducts } from "../features/products/productSlice";
const HomePage = () => {
  const dispatch = useAppDispatch();

  const { cart, products } = useAppSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts());
  }, []);
  return (
    <div>
      <HeaderComponent />

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "48px",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "48px",
        }}>
        {products.length > 0 &&
          products.map((product) => (
            <ProcuctComponent
              key={product._id}
              product={product}
            />
          ))}
      </div>
    </div>
  );
};
export default HomePage;
