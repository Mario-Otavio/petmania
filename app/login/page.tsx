'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, User, Lock, PawPrint } from 'lucide-react';
import { toast } from 'sonner';
import Cookies from 'js-cookie';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { fazerLoginApi } from '@/services/auth';

// Esquema de validação com Zod
const esquemaFormulario = z.object({
    username: z.string().min(1, { message: 'Por favor, insira seu usuário.' }),
    password: z.string().min(1, { message: 'Por favor, insira sua senha.' }),
});

export default function LoginPage() {
    const [estaCarregando, setEstaCarregando] = useState(false);
    const router = useRouter();

    // 1. Definição do formulário
    const formulario = useForm<z.infer<typeof esquemaFormulario>>({
        resolver: zodResolver(esquemaFormulario),
        defaultValues: {
            username: '',
            password: '',
        },
    });

    // 2. Manipulador de envio
    async function aoSubmeter(valores: z.infer<typeof esquemaFormulario>) {
        setEstaCarregando(true);
        try {
            const dados = await fazerLoginApi(valores);

            // Salvar tokens em cookies (seguro para middleware) e localStorage (acesso fácil client-side)
            Cookies.set('token', dados.access_token, { expires: 1 }); // Expira em 1 dia
            Cookies.set('refresh_token', dados.refresh_token, { expires: 7 });

            localStorage.setItem('token', dados.access_token);
            localStorage.setItem('refresh_token', dados.refresh_token);

            toast.success('Login realizado com sucesso!');
            router.push('/dashboard'); // Redirecionar para o dashboard
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Ocorreu um erro ao fazer login.');
            console.error(error);
        } finally {
            setEstaCarregando(false);
        }
    }

    return (
        <div className="flex min-h-screen w-full bg-gray-50">
            {/* Lado Esquerdo - Decorativo */}
            <div className="hidden lg:flex w-1/2 bg-indigo-600 relative overflow-hidden items-center justify-center">
                <div className="absolute inset-0 bg-linear-to-br from-indigo-600 to-purple-700 opacity-90" />

                {/* Formas decorativas */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] bg-size-[20px_20px]" />

                <div className="relative z-10 text-white p-12 max-w-lg">
                    <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                        <PawPrint className="h-6 w-6 text-white" />
                    </div>
                    <h1 className="text-5xl font-bold mb-6">PetMania</h1>
                    <p className="text-xl text-indigo-100 leading-relaxed">
                        Conecte-se com os melhores cuidados para o seu pet.
                        O lugar onde seu melhor amigo é tratado como realeza.
                    </p>
                </div>

                {/* Círculos Decorativos */}
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-500 opacity-20 rounded-full blur-3xl" />
            </div>

            {/* Lado Direito - Formulário */}
            <div className="flex-1 flex items-center justify-center p-4 lg:p-12 relative">
                {/* Decoração de Fundo Mobile */}
                <div className="lg:hidden absolute inset-0 -z-10 bg-white">
                    <div className="absolute inset-x-0 top-0 h-64 bg-indigo-600 rounded-b-[3rem]" />
                </div>

                <Card className="w-full max-w-md shadow-2xl border-gray-100 dark:bg-card">
                    <CardHeader className="text-center space-y-2">
                        <div className="lg:hidden mx-auto mb-2 h-12 w-12 flex items-center justify-center rounded-xl bg-indigo-50">
                            <PawPrint className="h-6 w-6 text-indigo-600" />
                        </div>
                        <CardTitle className="text-2xl font-bold text-gray-900">Bem-vindo de volta!</CardTitle>
                        <CardDescription className="text-gray-500">
                            Insira seus dados para acessar sua conta
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...formulario}>
                            <form onSubmit={formulario.handleSubmit(aoSubmeter)} className="space-y-6">
                                <FormField
                                    control={formulario.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-700">Usuário</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                                    <Input
                                                        placeholder="admin"
                                                        className="pl-9 bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus-visible:ring-indigo-500"
                                                        type="text"
                                                        {...field}
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={formulario.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex justify-between items-center text-gray-700">
                                                Senha
                                            </FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                                    <Input
                                                        type="password"
                                                        placeholder="••••••••"
                                                        className="pl-9 bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus-visible:ring-indigo-500"
                                                        {...field}
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white" type="submit" disabled={estaCarregando}>
                                    {estaCarregando ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Entrando...
                                        </>
                                    ) : 'Entrar'}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
