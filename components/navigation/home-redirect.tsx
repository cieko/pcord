"use client";

import { ActionTooltip } from "@/components/action-tooltip";
import Image from "next/image";
import { useRouter } from "next/navigation";

const HomeRedirect = () => {
  const router = useRouter();
  return (
    <div>
      <ActionTooltip side="right" align="center" label="Home page">
        <button
          onClick={() => router.push("/")}
          className="group flex items-center"
        >
          <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-amber-500">
            <Image
              width={35}
              height={35}
              className="group-hover:text-white transition rounded-full text-amber-500"
              priority
              sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
              style={{ objectFit: "contain" }}
              quality={100}
              loading="eager"
              unoptimized
              placeholder="blur"
              blurDataURL={"/logo.svg"}
              alt="logo"
              src={"/logo.svg"}
            />
          </div>
        </button>
      </ActionTooltip>
    </div>
  );
};

export default HomeRedirect;
