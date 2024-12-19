import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="flex flex-row justify-end px-64">
            <div className="inline-flex border-t border-neutral-500 w-full">
                <div className="w-1/2 p-4 flex flex-col gap-2">
                    <p className="">
                        <Link
                            className="hover:text-neutral-50 text-neutral-500"
                            href="/"
                        >
                            Home
                        </Link>
                    </p>
                    <p className="">
                        <Link
                            className="hover:text-neutral-50 text-neutral-500"
                            href="/about"
                        >
                            About
                        </Link>
                    </p>
                    <p className="">
                        <Link
                            className="hover:text-neutral-50 text-neutral-500"
                            href="/projecs"
                        >
                            Projects
                        </Link>
                    </p>
                </div>
                <div className="w-1/2 p-4 flex flex-col gap-2">
                    <p className="">
                        <Link
                            className="hover:text-neutral-50 text-neutral-500"
                            href="/"
                        >
                            Github
                        </Link>
                    </p>
                    <p className=" w-fit">
                        <Link
                            className="hover:text-neutral-50 text-neutral-500"
                            href="https://www.linkedin.com/in/jamesbstuckey/"
                        >
                            LinkedIn
                        </Link>
                    </p>
                    <p className=" w-fit">
                        <Link
                            className="hover:text-neutral-50 text-neutral-500"
                            href="/contact"
                        >
                            Contact Me
                        </Link>
                    </p>
                </div>
            </div>
        </footer>
    );
}
