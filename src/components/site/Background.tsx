const Background = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
    <div className="absolute inset-0 grid-bg opacity-40" />
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-glow blur-3xl animate-pulse-glow" />
    <div className="absolute bottom-0 right-0 w-[800px] h-[600px] rounded-full blur-3xl opacity-30"
      style={{ background: 'radial-gradient(circle, hsl(280 95% 60% / 0.4), transparent 70%)' }} />
    <svg className="absolute bottom-0 left-0 w-[200%] opacity-20 animate-wave" viewBox="0 0 1440 320" preserveAspectRatio="none">
      <path fill="url(#wave-grad)" d="M0,160 C320,260 720,60 1440,180 L1440,320 L0,320 Z" />
      <defs>
        <linearGradient id="wave-grad" x1="0" x2="1">
          <stop offset="0%" stopColor="hsl(188 95% 55%)" />
          <stop offset="100%" stopColor="hsl(280 95% 60%)" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

export default Background;
