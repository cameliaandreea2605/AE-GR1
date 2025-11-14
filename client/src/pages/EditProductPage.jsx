import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import CreateEditProductForm from '../components/CreateEditProductForm';
import { getProductById, updateProduct } from '../api/product.routes';
import LoadingSpinner from '../components/LoadingSpinner';

export default function EditProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await getProductById(id);

        if (response?.success || response?.data) {
          setProduct(response.data || response);
        } else {
          setError(response?.message || 'Failed to load product');
          toast.error('Failed to load product');
          setTimeout(() => navigate('/products'), 2000);
        }
      } catch (err) {
        setError(err.message || 'An error occurred while fetching the product');
        toast.error('An error occurred while fetching the product');
        setTimeout(() => navigate('/products'), 2000);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id, navigate]);

  const handleSubmit = async (formData) => {
    try {
      const response = await updateProduct(id, formData);

      if (response?.success) {
        toast.success('Product updated successfully!');
        navigate('/products');
      } else {
        toast.error(response?.message || 'Failed to update product');
      }
    } catch (error) {
      toast.error(error.message || 'An error occurred while updating the product');
      throw error;
    }
  };

  if (error && !product) {
    return (
      <div className="bg-white h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  return <CreateEditProductForm product={product} onSubmit={handleSubmit} isLoading={loading} />;
}