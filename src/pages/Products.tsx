import { useState, useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";
import Pagination from "@/utils/pagination";
import ShowProducts from "@/components/common/ShowProducts";
import smoothScrollToTop from "@/utils/smoothScrollToTop";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts, selectSearchProducts, setSearchProducts } from "@/Slices/productsSlice";
import { backendUrl } from "@/utils/staticDataAndVariable";
import axios, { isAxiosError } from "axios";
import { toast } from "react-toastify";
import NoResults from "@/components/product/NoResults";

export interface ProductInterface {
  id?: number;
  name: string;
  quantity: number;
  price: number;
  description?: string;
  productUrl: string;
  loading?: boolean;
  category?: string;
}


const Products = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState(1);

  const { keyword } = useParams();
  const itemsPerPage = 8;

  const allProducts = useSelector(selectProducts);
  const searchedProduct = useSelector(selectSearchProducts);
  const dispatch = useDispatch();

  // Fetch products when the keyword changes
  useEffect(() => {
    const fetchProductsForKeyword = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${backendUrl}/products?keyword=${keyword}`);
        dispatch(setSearchProducts(response.data.data));
      } catch (error) {
        toast(isAxiosError(error) ? error.response?.data.errorMessage : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    smoothScrollToTop();
    if (keyword) fetchProductsForKeyword();
  }, [keyword, dispatch,page]);

  // Determine which product list to use
  const products = useMemo(() => {
    if (keyword) return searchedProduct;
    return allProducts;
  }, [keyword, searchedProduct, allProducts]);


  // Pagination setup
  const pagination = useMemo(() => new Pagination(products, itemsPerPage), [products]);
  const currentProducts = pagination.getCurrentPageItems();

  const handlePageChange = (newPage: number) => {
    setLoading(true);
    setTimeout(() => {
      pagination.setPage(newPage);
      setPage(newPage);
      setLoading(false);
    }, 500);
  };

  // If no results found for keyword, show message
  if (keyword && products.length === 0) {
    return <NoResults title={keyword} />;
  }

  return (
    <div className="p-4">
      {/* Keyword Heading */}
      {keyword && (
        <div className="flex justify-center items-center">
          <h1 className="text-xl font-bold mb-4">Showing results for: {keyword}</h1>
        </div>
      )}


      {/* Product List */}
      <ShowProducts products={currentProducts} loading={loading} btnType="add to cart" path="/product/productDetails" />

      {/* Pagination Controls */}
      <div className="flex justify-center mt-10 space-x-2">
        <button
          className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50 hover:cursor-pointer"
          onClick={() => handlePageChange(page - 1)}
          disabled={!pagination.hasPrevPage()}
        >
          Prev
        </button>

        {Array.from({ length: Math.min(3, pagination.getTotalPages()) }).map((_, index) => {
          const pageNumber = Math.max(1, page - 1) + index;
          return (
            <button
              key={pageNumber}
              className={`px-4 py-2 hover:cursor-pointer ${
                page === pageNumber ? "bg-black hover:bg-gray-800 text-white" : "bg-gray-200"
              } rounded-md`}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}

        <button
          className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50 hover:cursor-pointer"
          onClick={() => handlePageChange(page + 1)}
          disabled={!pagination.hasNextPage()}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Products;
