import { Link } from 'react-router'

export default function HomePage() {
  return (
    <div className="h-screen bg-linear-to-br from-blue-50 to-indigo-100 px-4 sm:px-6 lg:px-8 flex items-center justify-center overflow-hidden">
      <div className="max-w-4xl text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Our Store!
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Discover the best products at competitive prices
        </p>
        <Link
          to="/products"
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition duration-200"
        >
          View Products
        </Link>
      </div>
    </div>
  )
}