interface DotBackgroundProps {
  isDarkMode: boolean;
}

export default function DotBackground({ isDarkMode }: DotBackgroundProps) {
  return (
    <div 
      className="absolute inset-0 z-0"
      style={{
        backgroundImage: `radial-gradient(circle, ${
          isDarkMode 
            ? 'rgba(148, 163, 184, 0.2) 1px' 
            : 'rgba(180, 83, 9, 0.3) 1px'
        }, transparent 1px)`,
        backgroundSize: '20px 20px',
        backgroundPosition: '10px 10px'
      }}
    />
  );
}