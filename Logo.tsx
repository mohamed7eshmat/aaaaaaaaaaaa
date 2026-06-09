import logoAsset from "@/assets/mujeb-logo-v3.png.asset.json";

type Props = { className?: string; alt?: string; priority?: boolean };

const Logo = ({ className = "h-20 sm:h-28 w-auto", alt = "Mujeb logo", priority }: Props) => (
  <img
    src={logoAsset.url}
    alt={alt}
    className={className}
    loading={priority ? "eager" : "lazy"}
    decoding="async"
    width={1280}
    height={853}
  />
);

export default Logo;
