export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-400/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl animate-pulse delay-2000" />
    </div>
  );
}
