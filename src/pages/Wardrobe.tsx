
import Navigation from "@/components/Navigation";
import WardrobeManager from "@/components/WardrobeManager";

const Wardrobe = () => {
  return (
    <div className="min-h-screen bg-outfy-light">
      <Navigation />
      <main className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Wardrobe</h1>
            <p className="text-gray-600">Organize and manage your clothing collection</p>
          </div>
          <WardrobeManager />
        </div>
      </main>
    </div>
  );
};

export default Wardrobe;
