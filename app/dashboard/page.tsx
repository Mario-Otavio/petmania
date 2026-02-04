'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PawPrint, Users, CalendarDays, TrendingUp, Loader2, MoreVertical, Heart, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { getPetsApi } from "@/services/pets";
import { Pet } from "@/services/types";
import { toast } from "sonner";
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from '@/lib/utils';

export default function DashboardPage() {
    const [pets, setPets] = useState<Pet[]>([]);
    const [totalPets, setTotalPets] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const pageSize = 10;

    const loadPets = async (page: number) => {
        try {
            setIsLoading(true);
            const data = await getPetsApi(page, pageSize);
            setPets(data.content);
            setTotalPets(data.total);
            setTotalPages(data.pageCount);
        } catch (error) {
            toast.error("Erro ao carregar pets");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadPets(currentPage);
    }, [currentPage]);

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(prev => prev - 1);
        }
    };

    return (
        <div className="flex flex-col gap-8 pb-10">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Visão Geral</h1>
                <p className="text-gray-500">Bem-vindo ao painel do PetMania. Gerencie seus pets e agendamentos.</p>
            </div>

            {/* Estatísticas Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="border-gray-100 shadow-sm bg-white hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">Total de Pets</CardTitle>
                        <div className="h-8 w-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                            <PawPrint className="h-4 w-4 text-indigo-600" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-gray-900">{isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : totalPets}</div>
                        <p className="text-xs text-gray-500 mt-1">Pets registrados</p>
                    </CardContent>
                </Card>
                <Card className="border-gray-100 shadow-sm bg-white hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">Total de Tutores</CardTitle>
                        <div className="h-8 w-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                            <Users className="h-4 w-4 text-emerald-600" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-gray-900">84</div>
                        <p className="text-xs text-gray-500 mt-1">Tutores registrados</p>
                    </CardContent>
                </Card>
                 <Card className="border-gray-100 shadow-sm bg-white hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">Total de Tutores sem pet</CardTitle>
                        <div className="h-8 w-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                            <Users className="h-4 w-4 text-emerald-600" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-gray-900">84</div>
                        <p className="text-xs text-gray-500 mt-1">Tutores registrados</p>
                    </CardContent>
                </Card>
            </div>

            {/* Pets Grid */}
            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <h2 className="text-2xl font-bold text-gray-900">Pets Registrados</h2>
                        {!isLoading && (
                            <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full">
                                Página {currentPage + 1} de {totalPages}
                            </span>
                        )}
                    </div>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                        {Array.from({ length: 10 }).map((_, i) => (
                            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 space-y-4 animate-pulse">
                                <div className="aspect-square w-full bg-gray-100 rounded-xl" />
                                <div className="space-y-2">
                                    <div className="h-4 w-2/3 bg-gray-100 rounded" />
                                    <div className="h-3 w-1/2 bg-gray-50 rounded" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : pets && pets.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                            {pets.map((pet) => (
                                <div key={pet.id || Math.random()} className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                                    {/* Imagem do Pet */}
                                    <div className="aspect-square w-full relative overflow-hidden bg-gray-50 border-b border-gray-50">
                                        {pet.foto?.url ? (
                                            <img
                                                src={pet.foto.url}
                                                alt={pet.nome}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.src = 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=500';
                                                }}
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-indigo-50/30">
                                                <PawPrint className="h-16 w-16 text-indigo-100 group-hover:scale-110 transition-transform duration-300" />
                                            </div>
                                        )}
                                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-sm border-none cursor-pointer">
                                                        <MoreVertical className="h-4 w-4 text-gray-600" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="rounded-xl">
                                                    <DropdownMenuItem className="cursor-pointer">Ver Perfil</DropdownMenuItem>
                                                    <DropdownMenuItem className="cursor-pointer">Novo Agendamento</DropdownMenuItem>
                                                    <DropdownMenuItem className="cursor-pointer text-red-600">Remover</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                        <div className="absolute bottom-3 left-3">
                                            <span className="bg-white/95 backdrop-blur-sm px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider text-indigo-600 shadow-sm border border-indigo-50">
                                                {pet.raca || 'Sem raça'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Informações do Pet */}
                                    <div className="p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="text-base font-bold text-gray-900 group-hover:text-indigo-600 transition-colors truncate pr-2">
                                                {pet.nome}
                                            </h3>
                                            <Heart className="h-4 w-4 text-rose-500 opacity-20 group-hover:opacity-100 fill-current transition-opacity" />
                                        </div>
                                        
                                        <div className="flex flex-col gap-3">
                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                <Calendar className="h-3.5 w-3.5 text-gray-400" />
                                                <span>{pet.idade} {pet.idade === 1 ? 'ano' : 'anos'}</span>
                                            </div>
                                            
                                            <Button variant="secondary" className="w-full bg-indigo-50/50 text-indigo-600 hover:bg-indigo-600 hover:text-white border-none rounded-xl transition-all duration-300 font-semibold h-9 text-xs cursor-pointer">
                                                Ver detalhes
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Paginação */}
                        <Pagination className="mt-8 pt-4 border-t border-gray-100">
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious 
                                        onClick={(e: React.MouseEvent) => { e.preventDefault(); handlePrevPage(); }}
                                        className={cn(
                                            "rounded-full border-gray-200! cursor-pointer h-9 px-4",
                                            currentPage === 0 && "opacity-50 pointer-events-none"
                                        )}
                                    />
                                </PaginationItem>

                                {Array.from({ length: totalPages }).map((_, i) => (
                                    <PaginationItem key={i}>
                                        <PaginationLink
                                            onClick={(e: React.MouseEvent) => { e.preventDefault(); setCurrentPage(i); }}
                                            isActive={currentPage === i}
                                            className={cn(
                                                "w-9 h-9 rounded-full cursor-pointer",
                                                currentPage === i ? "bg-indigo-600! text-white! hover:bg-indigo-700!" : "border-gray-200! text-gray-600! hover:bg-gray-50!"
                                            )}
                                        >
                                            {i + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}

                                <PaginationItem>
                                    <PaginationNext 
                                        onClick={(e: React.MouseEvent) => { e.preventDefault(); handleNextPage(); }}
                                        className={cn(
                                            "rounded-full border-gray-200! cursor-pointer h-9 px-4",
                                            currentPage >= totalPages - 1 && "opacity-50 pointer-events-none"
                                        )}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </>
                ) : (
                    <div className="bg-white rounded-3xl border-2 border-dashed border-gray-100 py-16 text-center">
                        <div className="h-20 w-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <PawPrint className="h-10 w-10 text-indigo-300" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">Nenhum pet encontrado</h3>
                        <p className="text-gray-500 max-w-xs mx-auto mt-2">
                            Não encontramos pets registrados nesta página.
                        </p>
                        <Button className="mt-6 bg-indigo-600 hover:bg-indigo-700 rounded-xl px-8 shadow-lg shadow-indigo-100 cursor-pointer" onClick={() => setCurrentPage(0)}>
                            Voltar para o início
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
