import { redirect } from "next/navigation";
import { getSortedPostsData } from "@/utils/blog";

export function generateStaticParams() {
    const posts = getSortedPostsData('en');
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

type BlogPostRedirectProps = {
    params: { slug: string };
};

export default function BlogPostRedirect({ params }: BlogPostRedirectProps) {
    redirect(`/en/blog/${params.slug}`);
}
