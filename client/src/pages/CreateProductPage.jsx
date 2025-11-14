import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import CreateEditProductForm from '../components/CreateEditProductForm';
import { createProduct } from '../api/product.routes';

export default function CreateProductPage() {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      const response = await createProduct(formData);

      if (response?.success) {
        toast.success('Product created successfully!');
        navigate('/products');
      } else {
        toast.error(response?.message || 'Failed to create product');
      }
    } catch (error) {
      toast.error(error.message || 'An error occurred while creating the product');
      throw error;
    }
  };

  return <CreateEditProductForm onSubmit={handleSubmit} />;
}