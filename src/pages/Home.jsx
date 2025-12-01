// import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div>
      {/* <Navbar /> */}

      {/* Hero Section */}
      <div className="w-full h-[500px] bg-gray-200 flex items-center px-20">
        <div>
          <h1 className="text-5xl font-bold mb-4">Shop The Best Products</h1>
          <p className="text-lg mb-6">Get amazing deals on top products.</p>
          <button className="bg-black text-white px-6 py-3 rounded">Shop Now</button>
        </div>
      </div>

      {/* Popular Categories */}
      <div className="p-10">
        <h2 className="text-3xl font-semibold mb-4">Popular Categories</h2>
        <div className="grid grid-cols-3 gap-6">
          <div className="p-6 border rounded">Toys</div>
          <div className="p-6 border rounded">Electronics</div>
          <div className="p-6 border rounded">Automotive</div>
        </div>
      </div>

      {/* Top Products */}
      <div className="p-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-semibold">Top Products</h2>
          <a href="/products" className="text-blue-600">View All</a>
        </div>

        <div className="grid grid-cols-5 gap-6">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="border p-4 rounded text-center">Product {item}</div>
          ))}
        </div>
      </div>
    </div>
  );
}