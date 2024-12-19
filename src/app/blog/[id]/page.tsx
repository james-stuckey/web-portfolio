export async function generateStaticParams() {
    // const posts = await fetch('https://api.vercel.app/blog', {
    //     cache: 'force-cache',
    // }).then((res) => res.json());

    const ids = [1, 2, 3, 4];

    // return needs to be iterable
    return ids.map((id) => ({
        id: String(id),
    }));
}

export default async function BlogPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    return (
        <>
            
            <p className="text-4xl">Page for {id}</p>
        </>
    );
}
