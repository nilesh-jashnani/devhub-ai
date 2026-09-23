import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
    return (
        <main className="mx-auto max-w-6xl px-6 py-10 w-full">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

                <p className="mt-2 text-muted-foreground">
                    Your developer learning workspace.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <Card className="min-w-3">
                    <CardHeader>
                        <CardTitle>Notes</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <p className="text-3xl font-bold">0</p>
                    </CardContent>
                </Card>

                <Card className="min-w-3">
                    <CardHeader>
                        <CardTitle>Topics</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <p className="text-3xl font-bold">0</p>
                    </CardContent>
                </Card>

                <Card className="min-w-3">
                    <CardHeader>
                        <CardTitle>AI Sessions</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <p className="text-3xl font-bold">0</p>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}