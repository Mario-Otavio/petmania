import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PawPrint, Users, CalendarDays, TrendingUp } from "lucide-react"

export default function DashboardPage() {
    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Visão Geral</h1>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="border-gray-100 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total de Pets</CardTitle>
                        <PawPrint className="h-4 w-4 text-indigo-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">128</div>
                        <p className="text-xs text-muted-foreground">
                            +4 novos este mês
                        </p>
                    </CardContent>
                </Card>
                <Card className="border-gray-100 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Clientes Ativos</CardTitle>
                        <Users className="h-4 w-4 text-indigo-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">84</div>
                        <p className="text-xs text-muted-foreground">
                            +2 novos esta semana
                        </p>
                    </CardContent>
                </Card>
                <Card className="border-gray-100 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Agendamentos</CardTitle>
                        <CalendarDays className="h-4 w-4 text-indigo-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground">
                            Para hoje
                        </p>
                    </CardContent>
                </Card>
                <Card className="border-gray-100 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Receita Mensal</CardTitle>
                        <TrendingUp className="h-4 w-4 text-indigo-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">R$ 12.450</div>
                        <p className="text-xs text-muted-foreground">
                            +15% em relação ao mês anterior
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Placeholder for more content */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 border-gray-100 shadow-sm">
                    <CardHeader>
                        <CardTitle>Atividades Recentes</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <div className="h-9 w-9 rounded-full bg-indigo-50 flex items-center justify-center">
                                        <PawPrint className="h-4 w-4 text-indigo-600" />
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <p className="text-sm font-medium leading-none">
                                            Banho e Tosa concluído
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            Pet: Thor (Golden Retriever)
                                        </p>
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Há {i * 2} min
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-3 border-gray-100 shadow-sm">
                    <CardHeader>
                        <CardTitle>Próximos Agendamentos</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4 text-sm">
                            <p className="text-muted-foreground">Você tem 12 agendamentos para hoje.</p>
                            <div className="rounded-lg border p-3 hover:bg-gray-50 transition-colors cursor-pointer border-indigo-100 bg-indigo-50/30">
                                <div className="font-semibold text-indigo-900">14:00 - Consulta Veterinária</div>
                                <div className="text-indigo-700/70">Luna (Persa) - Dra. Maria</div>
                            </div>
                            <div className="rounded-lg border p-3 hover:bg-gray-50 transition-colors cursor-pointer">
                                <div className="font-semibold">15:30 - Vacinação</div>
                                <div className="text-muted-foreground">Rex (Bulldog) - Sala 2</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
