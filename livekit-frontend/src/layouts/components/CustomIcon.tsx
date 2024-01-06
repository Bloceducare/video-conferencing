import {FC} from "react";
import Image from "next/image";

export type IconProps = {
    src: string;
    onClick: () => void;
    bgColor?: `#${string}`;
}

export const RoundIcon: FC<IconProps> = ({src, bgColor = '#ffffff', onClick}) => <button onClick={onClick} className={`w-10 h-10 p-2 rounded-full bg-[${bgColor}]`}><Image src={src} alt={""} width={24} height={24} /></button>;
