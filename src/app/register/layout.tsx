export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-blue-50 flex justify-center items-center h-screen">
      <div className="bg-white shadow-lg rounded p-6">
        {children}
      </div>
    </main>
  );
}
