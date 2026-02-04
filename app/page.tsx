import Link from "next/link";
import { ArrowRight, PawPrint } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Navbar */}
      <header className="flex h-20 items-center justify-between px-6 lg:px-12 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
            <PawPrint className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">PetMania</span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">Serviços</Link>
          <Link href="#" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">Sobre</Link>
          <Link href="#" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">Contato</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button asChild className="bg-indigo-600 hover:bg-indigo-700 rounded-xl px-6">
            <Link href="/login">
              Entrar
            </Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col lg:flex-row items-center justify-between px-6 lg:px-12 py-12 lg:py-24 overflow-hidden">
        <div className="w-full lg:w-1/2 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-600 mb-6 border border-indigo-100">
            <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse"></span>
            Novo aplicativo disponível
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-6">
            Cuide do seu pet com <span className="text-indigo-600">amor e tecnologia</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            PetMania é a plataforma completa para gerenciar a saúde, agendamentos e o bem-estar do seu melhor amigo. Tudo em um só lugar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="rounded-xl px-8 py-6 text-base bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200">
              <Link href="/register">
                Começar agora
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-xl px-8 py-6 text-base">
              <Link href="#">
                Saiba mais
              </Link>
            </Button>
          </div>

          <div className="mt-12 flex items-center gap-4 text-sm text-gray-500">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-8 w-8 rounded-full bg-gray-200 ring-2 ring-white" />
              ))}
            </div>
            <p>Mais de <span className="font-bold text-gray-900">2.000+</span> tutores felizes</p>
          </div>
        </div>

        {/* Hero Image / Abstract */}
        <div className="w-full lg:w-1/2 lg:pl-24 mt-12 lg:mt-0 relative">
          <div className="relative aspect-square w-full max-w-lg mx-auto lg:ml-auto">
            <div className="absolute inset-0 bg-indigo-100 rounded-[3rem] rotate-3 transform transition-transform hover:rotate-6 duration-500"></div>
            <div className="absolute inset-0 bg-indigo-600 rounded-[3rem] -rotate-3 transform transition-transform hover:-rotate-6 duration-500 opacity-10"></div>
            {/* Placeholder for an image */}
            <div className="absolute inset-4 bg-white rounded-[2.5rem] shadow-xl overflow-hidden flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center">
              <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent"></div>
              <p className="absolute bottom-8 left-8 text-white font-bold text-2xl flex items-center gap-2">
                Seu pet merece o melhor
                <ArrowRight className="h-5 w-5" />
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
