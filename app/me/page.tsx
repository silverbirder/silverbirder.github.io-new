import { NotebookLayout } from "@/components/notebook-layout";
import { Github, Twitter, Coffee, IceCream, Candy } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EnhancedImage } from "@/components/enhanced-image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getPngFilesWithSize } from "@/lib/photo";

export const metadata = {
  title: "自己紹介",
  description: "@silverbirderについて紹介します",
};

const SweetIcon = ({ icon: Icon, color, style }) => (
  <div className={`absolute ${color}`} style={style}>
    <Icon className="w-6 h-6 opacity-30" />
  </div>
);

const StickerAvatar = () => (
  <div className="relative w-28 h-28 transform rotate-12">
    <div className="absolute inset-0 bg-blue-500 rounded-full shadow-lg"></div>
    <div className="absolute inset-0 bg-blue-500 rounded-full shadow-inner animate-pulse"></div>
    <div className="absolute inset-1 bg-white rounded-full flex items-center justify-center overflow-hidden">
      <Avatar className="w-24 h-24">
        <AvatarImage src="/favicon.svg" alt="silverbirder" />
        <AvatarFallback>S</AvatarFallback>
      </Avatar>
    </div>
    <div
      className="absolute inset-0 rounded-full border-4 border-white opacity-50"
      style={{
        clipPath: "polygon(0% 0%, 100% 0%, 100% 75%, 75% 100%, 0% 100%)",
      }}
    ></div>
  </div>
);

export default async function Page() {
  const photos = (await getPngFilesWithSize()) ?? [];
  return (
    <NotebookLayout title={"自己紹介"} pathname={"/me"}>
      <div className="relative mx-auto p-6">
        <SweetIcon
          icon={Coffee}
          color="text-brown-500"
          style={{ top: "5%", left: "5%", transform: "rotate(15deg)" }}
        />
        <SweetIcon
          icon={Candy}
          color="text-pink-500"
          style={{ top: "15%", right: "10%", transform: "rotate(-10deg)" }}
        />
        <SweetIcon
          icon={IceCream}
          color="text-blue-300"
          style={{ bottom: "20%", left: "8%", transform: "rotate(5deg)" }}
        />
        <SweetIcon
          icon={Coffee}
          color="text-yellow-500"
          style={{ bottom: "10%", right: "5%", transform: "rotate(-20deg)" }}
        />
        <div className="space-y-6">
          <div className="flex flex-col items-center space-y-6 pb-6">
            <div className="relative">
              <Avatar className="w-36 h-36 border-4 border-blue-500 bg-white">
                <AvatarImage src="/favicon.svg" alt="silverbirder" />
                <AvatarFallback>S</AvatarFallback>
              </Avatar>
              <div className="absolute -top-6 -right-10 text-blue-500 font-bold text-2xl">
                <div className="[writing-mode:vertical-rl]">よろしくね！</div>
              </div>
            </div>
            <div className="text-center">
              <h2 className="text-2xl leading-[3rem] font-bold">
                @silverbirder
              </h2>
              <p className="text-base text-foreground">
                Webソフトウェアエンジニア
              </p>
            </div>
          </div>
          <div>
            <p className="text-base">
              Webのフロントエンド開発とテストが得意なソフトウェアエンジニアです。
              わくわくするWeb開発が楽しくて仕方がないです。
            </p>
            <p className="text-base">
              穏やかな風景や音を体験したり、美味しいたべものを共有するのが好きです。
              下に私のお気に入りの写真を載せていますので、ぜひご覧ください。
            </p>
          </div>
          <div className="relative w-full max-w-md mx-auto">
            <Carousel
              className="relative"
              opts={{
                loop: true,
              }}
            >
              <CarouselContent>
                {photos.map((photo, index) => (
                  <CarouselItem key={index}>
                    <div className="relative rounded-lg h-60 flex items-center justify-center overflow-hidden">
                      <EnhancedImage
                        src={photo.src}
                        alt=""
                        width={photo.width}
                        height={photo.height}
                        className="rounded-lg w-full h-full object-contain"
                        href=""
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="h-6 w-6 text-blue-500 bg-white hover:bg-blue-500 border-blue-500" />
              <CarouselNext className="h-6 w-6 text-blue-500 bg-white hover:bg-blue-500 border-blue-500" />
            </Carousel>
          </div>
          <div className="pt-6">
            <h3 className="text-xl font-semibold leading-[3rem] text-center">
              ふぉろーみー！
            </h3>
            <div className="flex justify-center space-x-6">
              <a
                href="https://github.com/silverbirder"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-blue-500 hover:underline"
              >
                <Github className="mr-2 w-6 h-6" />
                <span>GitHub</span>
              </a>
              <a
                href="https://x.com/silverbirder"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-blue-500 hover:underline"
              >
                <Twitter className="mr-2 w-6 h-6" />
                <span>Twitter</span>
              </a>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-10 -left-10">
          <StickerAvatar />
        </div>
      </div>
    </NotebookLayout>
  );
}
