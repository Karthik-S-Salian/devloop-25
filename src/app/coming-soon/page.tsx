import Link from "next/link";

export default function ComingSoon() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800 px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">🚧 Coming Soon 🚧</h1>
            <p className="text-lg md:text-xl max-w-xl">
                We’re cooking up something awesome 🍳👨‍💻  
            </p>
            <p className="text-lg md:text-xl max-w-xl mt-2">
                Wanna be part of the hype? 🚀  <br/>
                Register for <span className="font-semibold">Devloop</span> 👉{" "}
                <Link
                    href="https://finiteloop.co.in/events/48"
                    className="text-blue-600 hover:underline underline-offset-4"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    over here!
                </Link> 🎉
            </p>
        </main>
    );
}
