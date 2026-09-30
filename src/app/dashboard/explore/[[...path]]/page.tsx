import Link from "next/link";

type ExplorePageProps = {
    params: Promise<{
        // path: string[];
        path?: string[];
    }>;
};

export default async function ExplorePage({
    params,
}: ExplorePageProps) {
    // const { path } = await params;
    const { path = [] } = await params;

    return (
        <div className="mx-auto max-w-5xl px-6 py-10">
            <h1 className="text-3xl font-bold">
                Knowledge Explorer
            </h1>

            <p className="mt-2 text-muted-foreground">
                Explore your developer knowledge hierarchy.
            </p>

            <div className="mt-8">
                <Breadcrumbs
                    path={path}
                />
            </div>

            <div className="mt-8 rounded-xl border p-6">
                <p className="text-sm text-muted-foreground">
                    Current knowledge path
                </p>

                <p className="mt-2 text-xl font-semibold">
                    {path.length === 0
                        ? "Explore"
                        : `Explore → ${path
                            .map((segment) =>
                                segment.replaceAll("-", " ")
                            )
                            .join(" → ")}`}
                </p>
            </div>
        </div>
    );
}

// function Breadcrumbs({
//     path,
// }: {
//     path: string[];
// }) {
//     return (
//         <nav className="flex flex-wrap items-center gap-2 text-sm">
//             <Link
//                 href="/dashboard"
//                 className="text-muted-foreground hover:underline"
//             >
//                 Dashboard
//             </Link>

//             {path.map((segment, index) => {
//                 // const href =
//                 //     "/dashboard/explore/" +
//                 //     path
//                 //         .slice(0, index + 1)
//                 //         .join("/");
//                 const href =
//                     "/dashboard/explore/" +
//                     path
//                         .slice(0, index + 1)
//                         .join("/");

//                 return (
//                     <div
//                         key={href}
//                         className="flex items-center gap-2"
//                     >
//                         <span className="text-muted-foreground">
//                             /
//                         </span>

//                         <Link
//                             href={href}
//                             className="capitalize hover:underline"
//                         >
//                             {segment.replaceAll(
//                                 "-",
//                                 " "
//                             )}
//                         </Link>
//                     </div>
//                 );
//             })}
//         </nav>
//     );
// }

function Breadcrumbs({
    path,
}: {
    path: string[];
}) {
    return (
        <nav className="flex flex-wrap items-center gap-2 text-sm">
            <Link
                href="/dashboard"
                className="text-muted-foreground hover:underline"
            >
                Dashboard
            </Link>

            <span className="text-muted-foreground">
                /
            </span>

            <Link
                href="/dashboard/explore"
                className="hover:underline"
            >
                Explore
            </Link>

            {path.map((segment, index) => {
                const href =
                    "/dashboard/explore/" +
                    path
                        .slice(0, index + 1)
                        .join("/");

                return (
                    <div
                        key={href}
                        className="flex items-center gap-2"
                    >
                        <span className="text-muted-foreground">
                            /
                        </span>

                        <Link
                            href={href}
                            className="capitalize hover:underline"
                        >
                            {segment.replaceAll(
                                "-",
                                " "
                            )}
                        </Link>
                    </div>
                );
            })}
        </nav>
    );
}