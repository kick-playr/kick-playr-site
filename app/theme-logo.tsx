import Image from 'next/image';

export default function ThemeLogo({alt = '', width, height, priority = false}: {
    alt?: string;
    width: number;
    height: number;
    priority?: boolean;
}) {
    return <>
        <Image className="theme-logo-dark" src="/kick-playr-logo-white.png" alt={alt}
               width={width} height={height} priority={priority}/>
        <Image className="theme-logo-light" src="/kick-playr-logo-black.png" alt={alt}
               width={width} height={height} priority={priority}/>
    </>;
}
