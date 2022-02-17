import { createContext, ReactNode, useEffect, useState } from "react";
import api from "../services/api";

interface ProductsProviderProps {
  children: ReactNode;
}

export type Product = {
  id: string;
  name: string;
  price: number;
  status: string;
}

type CreateProductProps = {
  paymentMethod: string;
  name: string;
  price: number;
}

interface IProductsContext {
  isFetching: boolean;
  products: Product[];
  getProducts: () => void;
  createProduct: (productInfo: CreateProductProps) => void;
}

const ProductsContext = createContext({} as IProductsContext);

function ProductsProvider({ children }: ProductsProviderProps) {
  const [isFetching, setIsFetching] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      await getProducts();
    })();
  }, [])

  async function getProducts() {
    setIsFetching(true);
    const { data } = await api.get('/products')
    setProducts(data);
    setIsFetching(false);
  }

  async function createProduct(productInfo: CreateProductProps) {
    await api.post('/products', productInfo);
    getProducts();
  }

  const context = { getProducts, products, isFetching, createProduct }
  return (
    <ProductsContext.Provider value={context}>
      { children }
    </ProductsContext.Provider>
  )
}

export { ProductsContext, ProductsProvider }
