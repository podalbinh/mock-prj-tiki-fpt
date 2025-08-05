import "./App.css";
import LoadingDemo from "@/components/examples/LoadingDemo";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          React Loading Context System
        </h1>

        <LoadingDemo />
      </div>
    </div>
  );
}

export default App;
