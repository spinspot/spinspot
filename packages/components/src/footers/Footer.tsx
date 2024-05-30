import Link from "next/link";
import { SpinSpotIcon } from "../extra-icons";
import { InstagramIcon } from "../extra-icons/InstagramIcon";
import { TwitterIcon } from "../extra-icons/TwitterIcon";
import { WebIcon } from "../extra-icons/WebIcon";

export function Footer() {
  return (
    <footer className="footer footer-center bg-base-200 p-10">
      {/* <aside>
        <ThemeController/>
      </aside> */}
      <aside>
        <div className="flex flex-col items-center justify-center gap-7">
          <Link
            href="/dashboard"
            tabIndex={0}
            role="button"
            className="btn btn-link btn-lg avatar"
          >
            <SpinSpotIcon />
          </Link>
          <p>Copyright © 2024 - All right reserved</p>
        </div>
      </aside>
      <nav>
        <div className="grid grid-flow-col gap-4">
          <Link
            href="https://x.com/unimet?s=21&t=bP3wcAZrAL4qsqlfoqd6YQ"
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle btn-sm avatar"
          >
            <TwitterIcon />
          </Link>
          <Link
            href="https://www.unimet.edu.ve/"
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle btn-sm avatar"
          >
            <WebIcon />
          </Link>
          <Link
            href="https://www.instagram.com/unimet?igsh=MWw2MjcwNWg2ZWhsNQ=="
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle btn-sm avatar"
          >
            <InstagramIcon />
          </Link>
        </div>
      </nav>
    </footer>
  );
}
