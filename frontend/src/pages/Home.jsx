export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <header className="w-full max-w-4xl mb-10">
        <h1 className="text-4xl font-bold text-center text-blue-600">
          IOSS Assessment Dashboard
        </h1>
        <p className="text-center text-gray-600 mt-2">
          Welcome to your assessment frontend
        </p>
      </header>

      <main className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Section 1</h2>
          <p className="text-gray-600">This is a sample card using Tailwind.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Section 2</h2>
          <p className="text-gray-600">You can add more components here.</p>
        </div>
      </main>
    </div>
  );
}
