import type { MetadataRoute } from "next";

import {
    getPublishedNotes,
} from "@/lib/data/published-notes";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl =
        process.env.NEXT_PUBLIC_APP_URL ??
        "http://localhost:3000";

    const notes =
        await getPublishedNotes();

    const staticRoutes: MetadataRoute.Sitemap =
        [
            {
                url: baseUrl,
                changeFrequency:
                    "weekly",
                priority: 1,
            },
            {
                url: `${baseUrl}/learn`,
                changeFrequency:
                    "daily",
                priority: 0.9,
            },
        ];

    const noteRoutes: MetadataRoute.Sitemap =
        notes.map((note) => ({
            url: `${baseUrl}/learn/${note.slug}`,
            lastModified: new Date(
                Number(
                    note.updatedAt
                        .epochMilliseconds,
                ),
            ),
            changeFrequency:
                "monthly" as const,
            priority: 0.7,
        }));

    return [
        ...staticRoutes,
        ...noteRoutes,
    ];
}